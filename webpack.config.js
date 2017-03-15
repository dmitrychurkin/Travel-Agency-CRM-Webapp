const path = require('path');
module.exports = {
    entry: './src/scripts/main.js',
    output: {
        path: path.resolve(__dirname, "build/js/"),
        filename: "bundle.js"
    },
    devtool: false,
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                loader: "babel-loader",
                options: {
                    "presets": [
                        ["latest", {
                            "es2015": {
                                "modules": false 
                            }
                        }]
                    ],
                    plugins: ['transform-runtime']
                }
            }
        ]
    }

};