import Utilities from "./Utilities";

interface State {
    done: boolean;
    visible: boolean;
}
export default class Section3 extends Utilities {

    private Figure_1: State;
    private Figure_2: State;
    private Figure_3: State;

    private _Helper = function(this: Section3, obj1: State, obj2: State, fn: () => any){
        obj1.done = true;
        if (obj2.visible) {
            fn.call(this);
        }
    };
    constructor(fn: () => void) {
        super();
        this.Figure_1 = this._Obj;
        this.Figure_2 = this._Obj;
        this.Figure_3 = this._Obj;
        this._U_IOSetter(".S3__pr-w", [ () => (this.Figure_1.visible = true, this._icon1(), fn()), () => (this.Figure_2.visible = true, this._icon2()), () => (this.Figure_3.visible = true, this._icon3()) ], true, 0);
    }
    private get _Obj() {
        return {
            done: false,
            visible: false
        };
    }
    private _icon1() {
        let halfTitle = document.querySelector(".S3__ht")!,
            halfTitleWrapper = document.querySelector(".S3__ht-w")!,
            { Figure_1, Figure_2, _Helper, _icon2 } = this;

        return new TimelineMax(this._U_objVarsForTimeline({ paused: false }))
                            .add(() => document.querySelector(".S3__t")!.classList.add("S3__a_o"))

                            .add(() => {
                                halfTitle.classList.add("S3__a_tw");
                                halfTitleWrapper.classList.add("S3__a_th");
                            }, "+=1")

                            .to("#S3__leadership .S3__mC", 1, {
                                attr: {
                                    r: 75
                                },
                                ease: Strong.easeOut
                            }, "+=1")

                            .to(".S3__pr-c.S3__f-i-c", 1, {
                                css: {
                                    x: 0,
                                    opacity: 1
                                },
                                ease: Circ.easeOut
                            })
                            .to("#S3__bowl", 2, {
                                attr: {
                                    transform: "matrix(1,0,0,1,0,0)"
                                },
                                ease: Strong.easeOut
                            }, "-=1.5")
                            .call(_Helper, [Figure_1, Figure_2, _icon2], this, "-=2");
        }
        private _icon2() {
            if (!this.Figure_1.done) return;
            let{ Figure_2, Figure_3, _Helper, _icon3 } = this;
            return new TimelineMax(this._U_objVarsForTimeline({paused: false}))
                            .to("#S3__people .S3__mC", 1, {
                                attr: {
                                    r: 75
                                },
                                ease: Strong.easeOut
                            })
                            .to(".S3__pr-c.S3__s-i-c", 1, {
                                css: {
                                    x: 0,
                                    opacity: 1
                                },
                                ease: Circ.easeOut
                            })
                            .to(".S3__H1", 0.7, {
                                attr: {
                                    transform: "matrix(0.7,0,0,0.7,43.3951,51.464)"
                                },
                                ease: Back.easeInOut.config(1)
                            }, "-=1.3")
                            .to(".S3__R2", 0.7, {
                                attr: {
                                    transform: "matrix(1,0,0,1,0,0)"
                                },
                                ease: Back.easeInOut.config(1)
                            }, "-=0.55")
                            .to(".S3__R3", 0.7, {
                                attr: {
                                    transform: "matrix(1,0,0,1,0,-10)"
                                },
                                ease: Back.easeInOut.config(1)
                            }, "-=1.1")
                            .to(".S3__R4", 0.6, {
                                attr: {
                                    transform: "matrix(1,0,0,1,0,0)"
                                },
                                ease: Back.easeInOut.config(1)
                            }, "-=0.35")
                            .call(_Helper, [ Figure_2, Figure_3, _icon3 ], this, "-=1.9");
        }
        private _icon3() {
            if (!this.Figure_2.done) return;
            return new TimelineMax(this._U_objVarsForTimeline({ paused: false }, [
                        () => {
                                this.Figure_3.done = true;
                                document.querySelector(".S3__pr.S3__a-a")!.classList.remove("S3__a-a");
                                this._U_GC({}, this);
                            }
                            ]))
                            .to("#S3__price .S3__mC", 1, {
                                attr: {
                                    r: 92
                                },
                                ease: Strong.easeOut
                            })
                            .to(".S3__pr-c.S3__t-i-c", 1, {
                                css: {
                                    x: 0,
                                    opacity: 1
                                },
                                ease: Circ.easeOut
                            })
                            .to(".S3__pT", 0.7, {
                                attr: {
                                    transform: "matrix(-1, 1.7, 1.7, 1, -200, 400)"
                                }
                            }, "-=1")
                            .to(".S3__rM", 0.1, {
                                attr: {
                                    r: 0
                                }
                            }, "-=0.9")
                            .to(".S3_pric", 0.5, {
                                attr: {
                                    transform: "matrix(0.2, 0, 0, 0.2, 20, 0)"
                                }
                            }, "-=1");
        }
}
