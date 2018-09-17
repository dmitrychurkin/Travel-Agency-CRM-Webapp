const shortid = require('shortid');
const gulp = require('gulp');
const del = require('del');
const scss = require('gulp-sass');
const concat = require('gulp-concat');
const postCss = require('gulp-postcss');
const cssnext = require('postcss-cssnext');
const cleanCss = require('gulp-clean-css');
const url = require('postcss-url');
const rev = require('gulp-rev');
const revRewrite = require('gulp-rev-rewrite');
const revDelete = require('gulp-rev-delete-original');
const imagemin = require('gulp-imagemin');
const ts = require('gulp-typescript');
const webpack = require('webpack');
//const minifyEjs = require('gulp-minify-ejs');
const templateMin = require('gulp-html-minifier');
const gulpIf = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const combine = require('stream-combiner2').obj;
const nodemon = require('gulp-nodemon');

const tsProject = ts.createProject('./src/tsconfig.json');

let isDevelopment;

const DESTINATION_FOLDER = 'dist';
const SRC_FOLDER = 'src';


function gulpCopy(...args) {

  return done => {

    for (const { from, to } of args) {

      const stream = gulp.src(from, { allowEmpty: true }).pipe(gulp.dest(to));
      stream.on('end', done);

    }

  };

}

gulp.task('clean', () => del([DESTINATION_FOLDER]));

gulp.task('compile:server', () => tsProject.src()
                                            .pipe(tsProject())
                                            .js.pipe(gulp.dest(DESTINATION_FOLDER))
);

gulp.task('copy', gulpCopy({ 
  from: `${SRC_FOLDER}/app-files/**/*.*`,
  to: `${DESTINATION_FOLDER}/app-files`
},{
  from: [`${SRC_FOLDER}/assets/**`, ...(isDevelopment ? [] : [`!${SRC_FOLDER}/images`, `!${SRC_FOLDER}/offers`])],
  to: `${DESTINATION_FOLDER}/assets`
},{
  from: './admin/dist/**/*.*',
  to: `${DESTINATION_FOLDER}/assets/admin`
}));

gulp.task('imagemin', 
                  gulp.parallel(
                      () => gulp.src(`${SRC_FOLDER}/assets/images/**`)
                                .pipe(imagemin())
                                .pipe(gulp.dest(`${DESTINATION_FOLDER}/assets/images`)),
                      () => gulp.src(`${SRC_FOLDER}/assets/offers/**`)
                                .pipe(imagemin())
                                .pipe(gulp.dest(`${DESTINATION_FOLDER}/assets/offers`))
                  )
);

// gulp.task('scss', () => {
//   return gulp.src(`${SRC_FOLDER}/client/css/scss/*.scss`)
//             .pipe(gulpIf(isDevelopment, sourcemaps.init()))
//             .pipe(scss.sync({outputStyle: 'compressed'}).on('error', scss.logError))
//             .pipe(gulpIf(isDevelopment, sourcemaps.write()))
//             .pipe(gulp.dest(`${SRC_FOLDER}/client/css`))
// });
gulp.task('pack-css', () => {
  return gulp.src([`${SRC_FOLDER}/client/css/**/*.{css,scss}`, `!${SRC_FOLDER}/client/css/services`])
            .pipe(gulpIf(isDevelopment, sourcemaps.init()))
            .pipe(scss.sync({outputStyle: 'compressed'}).on('error', scss.logError))
            .pipe(concat('main.css'))
            .pipe(postCss([cssnext(), url({url: (asset) => {
              return `${asset.url.replace('../', '/') + (isDevelopment ? '' : '?v=' + shortid.generate())}`;
            }})]))
            .pipe(cleanCss())
            .pipe(gulpIf(isDevelopment, sourcemaps.write(), combine(rev(), revDelete())))
            .pipe(gulp.dest(`${DESTINATION_FOLDER}/assets/css`))
            .pipe(gulpIf(!isDevelopment, combine(rev.manifest('css.json'), gulp.dest(`${DESTINATION_FOLDER}/rev-manifest`))));
});

//gulp.task('pack-css', gulp.series('scss', 'css'));

gulp.task('buildjs', () => new Promise(resolve => webpack(require(`./webpack.${isDevelopment ? 'dev' : 'prod'}`), (err, stats) => {
 
  if (err) {

    console.log('Webpack error =>', err);

  }

  console.log(stats.toString({ colors: true }));

  resolve();

})));

// gulp.task('revision', gulp.series('buildjs', 'pack-css', () => {
//   return gulp.src([`${DESTINATION_FOLDER}/assets/js/**/*.js`, `${DESTINATION_FOLDER}/assets/css/**/*.css`], { base: `${DESTINATION_FOLDER}/assets` })
//     .pipe(rev())
//     .pipe(revDelete()) 
//     .pipe(gulp.dest(`${DESTINATION_FOLDER}/assets`))
//     .pipe(rev.manifest())
//     .pipe(gulp.dest(`${DESTINATION_FOLDER}/rev-manifest`));
// }));

gulp.task('revRewrite', gulp.series(gulp.parallel('buildjs', 'pack-css'), function() {

  return gulp.src(`${SRC_FOLDER}/views/**/*.*`, { since: gulp.lastRun('revRewrite') })
    .pipe(gulpIf(!isDevelopment, revRewrite({ manifest: gulp.src(`${DESTINATION_FOLDER}/rev-manifest/css.json`, { allowEmpty: true }), replaceInExtensions: ['.ejs'] })))
    .pipe(gulpIf(!isDevelopment, revRewrite({ manifest: gulp.src(`${DESTINATION_FOLDER}/rev-manifest/js.json`, { allowEmpty: true }), replaceInExtensions: ['.ejs'] })))
    .pipe(gulpIf(!isDevelopment, templateMin({
      minifyJS: true,
      minifyCSS: true,
      collapseWhitespace: true
    })))
    .pipe(gulp.dest(`${DESTINATION_FOLDER}/views`));
}));

// gulp.task('minify-templates', done => {
//   const stream = gulp.src([`${DESTINATION_FOLDER}/revised-views/**/*.ejs`])
//     .pipe(minifyEjs())
//     .pipe(gulp.dest(`${DESTINATION_FOLDER}/views`));

//     stream.on('end', () => {
//       del([`${DESTINATION_FOLDER}/revised-views`]);
//       done();
//     });
// })

function env(definedEnvironment) {
  return done => {
    process.env.NODE_ENV = definedEnvironment;
    isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
    done();
  };
}
gulp.task('set-dev-node-env', env('development'));

gulp.task('set-prod-node-env', env('production'));


gulp.task('dev',
  gulp.series('clean', 
              'set-dev-node-env',
  gulp.parallel('compile:server',
              'copy',
              'revRewrite'),
              done => {
                gulp.watch([`${SRC_FOLDER}/**/*.ts`, `!${SRC_FOLDER}/client`], gulp.series('compile:server'));
                gulp.watch([`${SRC_FOLDER}/client/ts/**/*.ts`], gulp.series('buildjs'));
                gulp.watch([`${SRC_FOLDER}/client/css/**`], gulp.series('pack-css'));
                nodemon({
                  ext: 'js json ts',
                  exec: 'SET DEBUG=tester-bundler* & node dist',
                  done
                })
              })
);

gulp.task('prod',
  gulp.series('clean', 
              'set-prod-node-env',
  gulp.parallel('compile:server',
              'copy',
              'imagemin',
              'revRewrite'))
);