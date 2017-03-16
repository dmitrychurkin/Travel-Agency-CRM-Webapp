import Utilities, { U } from "./Utilities";

class AnimModule {

        private static SettingsObj(r: number, windmill: boolean= false, {animType, y}: { animType: "hover" | "rotate", y: number } = { animType: "rotate", y: 0 }) {
                    let ease = Power0.easeNone, position = "absolute";
                    switch (animType) {
                        case "rotate": {
                            return {
                                rotation: r > 0 ? "360deg" : "-360deg",
                                position,
                                svgOrigin: windmill ? "331px 201px" : "200px 200px",
                                ease
                            };
                        }
                        case "hover": {
                            return {
                                y,
                                position,
                                ease
                            };
                        }
                    }
                    return {};
        }
        private static rotateAnimation() {
                    let Planes = U._U_timelineFactory({repeat: -1, tweens: [
                                    TweenLite.to(["#S5__m-s #airplane1", "#S5__m-s #airplane2"], 60, this.SettingsObj(1))
                                ]}),
                        CountryObj = U._U_timelineFactory({repeat: -1, tweens: [
                                        TweenLite.to("#S5__m-s #countryObjects", 240, this.SettingsObj(1))
                                    ]}),
                        FlotingGlobe = U._U_timelineFactory({repeat: -1, tweens: [
                                            TweenLite.to("#S5__m-s #floatingGlobe", 360, this.SettingsObj(-1))
                                        ]}),
                        Windmill = U._U_timelineFactory({repeat: -1, tweens: [
                                        TweenLite.to("#S5__m-s #windmill", 2, this.SettingsObj(1, true))
                                    ]}),
                        CirclesRight = U._U_timelineFactory({repeat: -1, tweens: [
                                            TweenLite.to(["#S5__m-s #circle1", "#S5__m-s #circle5"], 12, this.SettingsObj(1))
                                        ]}),
                        CirclesLeft = U._U_timelineFactory({repeat: -1, tweens: [
                                        TweenLite.to("#S5__m-s #circle4", 24, this.SettingsObj(-1))
                                    ]});
                    return [
                        Planes,
                        CountryObj,
                        FlotingGlobe,
                        Windmill,
                        CirclesRight ,
                        CirclesLeft
                    ];
        }
        private static hoverAnimation() {
            let h = () => U._U_timelineFactory({repeat: -1, yoyo: true});
            return [
                h().to("#S5__m-s #cloud1", 3, this.SettingsObj(0, false, {animType: "hover", y: 5})),
                h().to("#S5__m-s #cloud2", 3, this.SettingsObj(0, false, {animType: "hover", y: -3})),
                h().to("#S5__m-s #cloud3", 3, this.SettingsObj(0, false, {animType: "hover", y: 3})),
                h().to("#S5__m-s #globe", 5, this.SettingsObj(0, false, {animType: "hover", y: 10}))
            ];
        }

        private static cWAn(selector1: string, selector2: string) {
                    let group1 = U._U_timelineFactory().staggerTo(document.querySelectorAll(selector1), 1, {
                                    attr: {
                                        transform: function(...target: Array<Element>){

                                            let a = target[1].getAttribute("transform"), s = "scale";
                                            return `${a!.slice(0, a!.indexOf(s))}${s}(1)`;
                                        }
                                    },
                                    ease: Elastic.easeOut.config(1, 0.5)
                                }, 0.3);
                    let group2 = U._U_timelineFactory().staggerTo(document.querySelectorAll(selector2), 1, {
                                    attr: {
                                        transform: function(...target: Array<Element>){
                                            let a = target[1].getAttribute("transform"), s = "scale";
                                            return `${a!.slice(0, a!.indexOf(s))}${s}(1)`;
                                        }
                                    },
                                    ease: Elastic.easeOut.config(1, 0.5)
                                }, 0.3);
                    return [
                        group1,
                        group2
                    ];
        }
        static AnL() {
            return U._U_timelineFactory({tweens: [...this.rotateAnimation(), ...this.hoverAnimation()], align: "start", paused: true});
        }
        static AnWGr1() {
            return U._U_timelineFactory(U._U_objVarsForTimeline({paused: false, delay: 1, tweens: [...this.cWAn("#S5__m-s .cloud1 text", "#S5__m-s .cloud2 text")], align: "start", autoRemoveChildren: true}));
        }
        static AnWGr2() {
            return U._U_timelineFactory(U._U_objVarsForTimeline({paused: false, tweens: [...this.cWAn("#S5__m-s .cloud3 text", "#S5__m-s .cloud4 text")], align: "start", autoRemoveChildren: true}));
        }
}
export default class Section5 extends Utilities {
    private RootAnim: TimelineLite;
    constructor() {
        let _$this: any = super();
        let CentralScene = <HTMLElement>document.querySelector(".S5__c-s")!;
        (function(w, cs){
                if (navigator.userAgent.match(/msie/i) || navigator.userAgent.match(/trident/i) ) {
                    let IE = function(){
                        cs.style.height = window.innerWidth + "px";
                    };
                    IE();
                    w.onresize = IE;
                    _$this._U_EventListSetter("resize", IE);
                }
        })(window, CentralScene);
        this.RootAnim = AnimModule.AnL();
        this._U_IntersectionObserver(".S5", this._U_StateTrigger(
            () => this._U_animationPlay(this.RootAnim),
            () => this._U_animationPause(this.RootAnim)
        ), false, 0);
        this._U_IOSetter(".S5__lim", [
            () => {
                CentralScene.classList.add("S5_v");
                AnimModule.AnWGr1();
            },
            () => AnimModule.AnWGr2()
        ]);
    }
    OnFontLoaded(): PromiseResolverFn {
            let link: PromiseResolverFn  = null;
            new Promise(res => (link = res)).then(() => {
                    document.querySelector(".S5__notOk")!.classList.remove("S5__notOk"),
                    document.querySelector(".S5__t-notOk")!.classList.remove("S5__t-notOk"),
                    Array.from(document.querySelectorAll(".S5__b-notOk")).forEach(el => el.classList.remove("S5__b-notOk"));
            });
            this._U_GC({}, Object.getPrototypeOf(this), false);
            return link!;
    }
}