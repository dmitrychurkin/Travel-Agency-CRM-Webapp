import Utilities from "./Utilities";

export default class Section2 extends Utilities {
        private TimelineLooped: TimelineLite;
        private MainText: Element = document.querySelector(".S2__mT")!;
        private BottomTextAll: Array<Element> = Array.from(document.querySelectorAll(".S2__bc"));

        constructor() {
            super();
            this._U_IntersectionObserver(".S2", () => this._combineScene1(), true, .5);
        }
        private _combineScene1() {
            let Plane = document.querySelector(".S2__plane")!;
            return this._U_timelineFactory(this._U_objVarsForTimeline({ paused: false }, [() => document.querySelector(".S2__mr2")!.remove()]))
                    .to(Plane, 0.5, {
                        autoAlpha: 1,
                        ease: Power4.easeIn
                    })
                    .to(Plane, 0.7, {
                        attr: {
                            transform: "matrix(1,0,0,1,0,0)"
                        },
                        ease: Power4.easeIn
                    })
                    .to(Plane, 0.2, {
                        autoAlpha: 0,
                        ease: Power4.easeIn
                    }, "-=0.1")
                    .to(".S2__bird", 0.5, {
                        attr: {
                            transform: "matrix(1,0,0,1,0,0)"
                        },
                        ease: Power4.easeIn
                    }, "-=0.3")
                    .to(".S2__blueObj", 0.4, {
                        attr: {
                            transform: "matrix(1,0,0,1,0,0)"
                        },
                        autoAlpha: 1,
                        ease: Elastic.easeOut
                    })
                    .to(this.MainText, 1.5, {
                        strokeDashoffset: 0,
                        ease: Sine.easeIn
                    })
                    .to(this.MainText, 1, {
                        attr: {
                            fill: "#053961"
                        },
                        ease: Power4.easeIn
                    }, "-=1.2")
                    .call(() => {
                        let color = "#ff7f00";
                        this.MainText.setAttribute("fill", "url('#S2__shine')");
                        Plane.remove();
                        document.querySelector(".S2__mr1")!.remove();
                        this.BottomTextAll.forEach( el => (el.setAttribute("fill", color), el.setAttribute("stroke", color)));
                    })
                    .to(".S2__line", 1.5, {
                        attr: {
                            x2: 978,
                            stroke: "#00f"
                        },
                        ease: Power4.easeOut
                    })
                    .to(this.MainText, 0.7, {
                        strokeDashoffset: function(...target: Array<Element>){
                            return +target[1].getAttribute("stroke-dasharray")!;
                        },
                        ease: Power4.easeIn
                    }, "-=2")

                    .to(".S2__bottomText", 1, {
                        attr: {
                            transform: "matrix(1,0,0,1,0,0)"
                        },
                        ease: Sine.easeOut
                    }, "-=1")
                    .add(() => this._combineScene2(), "-=0.5");
        }
        private _combineScene2() {
            let onRepeat: PromiseResolverFn = null,
                Bird = document.querySelector(".S2__bird")!,
                BlueObj = document.querySelector(".S2__blueObj")!,
                Gradient = Array.from(document.querySelectorAll("#S2__shine stop")).reverse();
            new Promise(res => (onRepeat = res)).then(() => (
                    this._U_GC({TimelineLooped: !!1}, this, false),
                    this._U_GC({}, Object.getPrototypeOf(this), false)
                )
            );
            this.TimelineLooped = this._U_timelineFactory({paused: false, repeat: -1, repeatDelay: 5, onRepeat})
                        .staggerTo(Gradient, 0.3, {
                                attr: {
                                    offset: "100%"
                                }
                        }, 0.1, () => {
                            Gradient.forEach((item) => item.setAttribute("offset", "0%"));
                        })
                        .to(Bird, 0.5, {
                            attr: {
                                transform: "matrix(1,0,0,1,0,10)"
                            },
                            ease:  Sine.easeOut
                        })
                        .to(Bird, 0.5, {
                            attr: {
                                transform: "matrix(1,0,0,1,0,0)"
                            },
                            ease:  Sine.easeOut
                        })
                        .to(BlueObj, 0.5, {
                            attr: {
                                transform: "matrix(1,0,0,1,0,10)"
                            },
                            ease:  Sine.easeOut
                        }, "-=0.5")
                        .to(BlueObj, 0.5, {
                            attr: {
                                transform: "matrix(1,0,0,1,0,0)"
                            },
                            ease:  Sine.easeOut
                        });
        }

        FBS2(): PromiseResolverFn {
            let link: PromiseResolverFn = null,
                p = new Promise(res => (link = res));

            p.then(() => (
                    this.MainText.classList.remove("S2__nOk"),
                    this.BottomTextAll.forEach(el => el.classList.remove("S2__nOk")),
                    this.BottomTextAll.forEach(el => el.setAttribute("y", "255"))
                )
            );
            return link!;
        }

}
