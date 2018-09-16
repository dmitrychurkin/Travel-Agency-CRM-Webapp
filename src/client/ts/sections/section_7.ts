import Utilities from "./Utilities";
import HttpController from "../plugins/http.module";
import ParserS7 from "../plugins/parserS7";
type IncomingContent = {
    c: string;
    s?: string;
    j?: string;
    w?: boolean;
};
export default class Section7 extends Utilities {
    private readonly  S7: HTMLElement = document.getElementById("S7")!;
    private readonly ContWrapper: HTMLElement = <HTMLElement>document.querySelector(".S7__cont-wrapper");
    private readonly CardsWrapper: HTMLElement = <HTMLElement>document.querySelector(".S7__card-wrap");
    private readonly Placeholder: HTMLElement = <HTMLElement>document.querySelector(".S7__placeholder");
    private readonly LoadedContent: HTMLElement = <HTMLElement>document.querySelector(".S7__loadedcont");
    private readonly ease: Sine = Sine.easeOut;
    private flipTarget: HTMLElement;
    private clonedFlipper: HTMLElement;
    private ContainerSpinner: HTMLElement;
    private ContainerContent: HTMLElement;
    private permitToClose: boolean = false;
    private permitToOpen: boolean = true;
    private fetchedContent: Promise<IncomingContent>;
    // private ResponseStore: Map<string, IS>;
    private Parser: ParserS7 = new ParserS7();
    isCanSendForm: boolean = true;
    private ServiceModule: any;
    constructor(private Http: HttpController,  private URIs: { services: string , order: string}) {
        super();
        this._U_EventListSetter("click", this._onCl());
        let cards = document.querySelectorAll(".S7__flipper"),
            cardsIt = cards[Symbol.iterator]();
        this._U_IOSetter(".S7__lim", [
            () => {
                let titleCl = document.querySelector(".S7__title")!.classList;
                setTimeout(() => titleCl.remove("S7__trans"), 1000), titleCl.remove("S7__a");
            },
            ...Array(cards.length).fill(() => {
                let currentCard = cardsIt.next().value;
                setTimeout(() => (
                    currentCard.classList.remove("S7__animate"),
                    currentCard.classList.add("S7__anim-end")
                ), 1000);
                currentCard.classList.add("S7__animate");
            })
        ]);
    }
    private _createSpinner() {
        const{ Placeholder } = this;
        return this._U_TagsFact("div", document.getElementById("sp")!.innerHTML, Placeholder, {class: "S7__containerSpinner"});
    }
    private _insertContent(content: string) {
        const{ LoadedContent } = this;
        return this._U_TagsFact("div", content, LoadedContent, {class: "S7__containerContent"});
    }
    private _computedScrollTo(activeTarget: HTMLElement) {
        return activeTarget.getBoundingClientRect().top + window.pageYOffset + (activeTarget.offsetHeight / 2) - (window.innerHeight / 2);
    }
    private _onCl() {
        return (e: any) => {
            let target = e.target, { permitToOpen, permitToClose } = this;
            if (target.closest(".S7__form-wrapper_close") && permitToClose) {
                this.permitToClose = false;
                return this._closePane();
            }

            let f = target.closest(".S7__flipper");
            if (f && f.classList.contains("S7__anim-end") && permitToOpen) {
                const{ /*S7, ResponseStore,*/ Parser, Http, URIs: { services } } = this;

                this.permitToOpen = false;
                this.flipTarget = f;

                this._openPane(<HTMLElement>this.flipTarget.parentNode);
                /*let actionFn = (resObj: Map<string, IS>) => {
                    let codeId: any = this.flipTarget.dataset,
                        objWithData = resObj.get(S7.id)![codeId.code],
                        locator = objWithData.meta,
                        assets = resObj.get(S7.id)![locator];

                    if (assets.isWatched) return {
                        c: objWithData.c,
                        w: true
                    };
                    const{ atob } = window, { c } = objWithData, { s, j } = assets;
                    assets.isWatched = true;
                    assets.s = assets.j = null;
                    return {
                        c: objWithData.c = atob(c),
                        s: atob(s),
                        j: atob(j)
                    };
                };*/
                const parserFn = () => {
                    const dataset: any = this.flipTarget.dataset;
                    const LC = this.LoadedContent.style;
                    if (dataset.tint) {
                        LC.backgroundColor = "rgba(128, 128, 128, 0.34)";
                    }else {
                        LC.backgroundColor = "";
                    }
                    return Parser.InitParsing(dataset.code);
                };
                if (/*ResponseStore*/Parser.Model) {
                    this.fetchedContent = Promise.resolve(/*ResponseStore*/).then(/*actionFn*/ parserFn);
                }else {
                    this.fetchedContent = Http.sendReq({
                        url: services,
                        options: {
                            cache: "no-cache",
                            responseAs: "json"
                        }
                    })
                    .then((res: string) => {
                        // this.ResponseStore = new Map().set(S7.id, JSON.parse(res));
                        Parser.Model =  JSON.parse(res);
                        setTimeout(() => Parser.AllocateAddons());
                        // return actionFn(this.ResponseStore);
                        return parserFn();
                    });
                }
            }
            return;
        };
    }
    private get _notificator(){
        return document.querySelector("#N__register .N__fail .mes")!.innerHTML;
    }
    private _openPane(flipTargParent: HTMLElement) {
        const   { S7, Placeholder, CardsWrapper, ContWrapper, LoadedContent,  ease } = this;
        let clonedTarget = this.clonedFlipper = <HTMLElement>flipTargParent.cloneNode(true),
            flipperElement = clonedTarget.firstElementChild;
        Placeholder.appendChild(clonedTarget);
        Placeholder.style.left = flipTargParent.offsetLeft  + "px";
        Placeholder.style.top = flipTargParent.offsetTop  + "px";
        flipTargParent.classList.add("S7__active");
        clonedTarget.style.margin = "0";
        this._U_timelineFactory(this._U_objVarsForTimeline({paused: false}))
            .add([
                TweenLite.to(<{}>flipperElement, 1, {
                    rotationX: 180,
                    boxShadow: "none",
                    ease
                }),
                TweenLite.to(window, 1, {
                    scrollTo: {
                        y: this._computedScrollTo(flipTargParent)
                    },
                    ease
                })
            ])
            .add([
                TweenLite.to(CardsWrapper, 1, {
                    z: -300,
                    ease
                }),
                TweenLite.to(<{}>flipperElement, 1, {
                    width: S7.offsetWidth,
                    height: window.innerHeight,
                    ease
                }),
                TweenLite.to(Placeholder, 1, {
                    left: 0,
                    top: 0,
                    ease
                }),
                TweenLite.to(".S7__title", .3, {
                    autoAlpha: 0,
                    ease
                }),
                TweenLite.to(<{}>flipperElement!.firstElementChild, 1, {
                    backgroundColor: "#fff",
                    ease
                }),
                TweenLite.to(".S7__container", 1, {
                    height: window.innerHeight,
                    ease
                }),
                TweenLite.to(window, 1, {
                    scrollTo: {
                        y: "#S7"
                    },
                    ease
                })
            ], "-=0.3", "start", 0)
            .add(() => {
                this.ContainerSpinner = <HTMLElement>this._createSpinner();
            }, "-=0.3")
            .add(() => {
                let commonActions = () => {
                        this.ContainerSpinner.remove();
                        delete this.ContainerSpinner;
                        let lowHeight = null, helperFn = () => this.ContainerContent.offsetHeight <= window.innerHeight ? (lowHeight = true, window.innerHeight) : this.ContainerContent.offsetHeight;

                        return this._U_timelineFactory(this._U_objVarsForTimeline({paused: false}, [() => {
                            delete this.fetchedContent;
                            this.permitToClose = true;
                        }]))
                            .add([
                                TweenLite.to(Placeholder, 1, {
                                    height: helperFn(),
                                    ease,
                                    clearProps: lowHeight ? "" : "height"
                                }),
                                TweenLite.to(LoadedContent, 1, {
                                    opacity: 1,
                                    ease
                                })
                            ]);

                    },
                    container = <HTMLElement>S7.firstElementChild;
                Placeholder.style.backgroundColor = "#fff";
                Placeholder.style.height = container.offsetHeight + "px";
                Placeholder.style.position = "static";
                container.style.height = "";
                clonedTarget.style.display = "none";
                ContWrapper.style.position = "absolute";
                ContWrapper.style.zIndex = "-1";
                LoadedContent.style.display = "block";
                // async
                this.fetchedContent.then(objWithData => {
                    const{ c, s, j/*, w*/ } = objWithData;
                    this.ContainerContent = <HTMLElement>this._insertContent(c);
                    if (/*!w*/s && j) {
                        this._U_TagsFact("style", s!);
                        this._U_TagsFact("script", j!);
                    }

                    let dataset: any = this.flipTarget.dataset;

                    this.ServiceModule = new window._FM_(dataset.subject);
                    const{ServiceModule} = this;
                    if (dataset.subject === "form") {
                        ServiceModule.setModule({
                            onClS: () => ServiceModule.canceller(),
                            onClF: (enableAll: () => void) => ServiceModule.snackBar.closePane(null, enableAll),
                            onAfClose: () => { this.isCanSendForm = true; ServiceModule.snackBar.destroyPane(); }
                        }, () => { ServiceModule.unsetModule(); this._closePane(); } );
                    }
                    // commonActions();
                })
                .catch(() => {
                    let prob = <HTMLElement>Placeholder.querySelector(".S7__network-problem")!;
                    prob.style.display = "block";
                    prob.querySelector("h2")!.innerHTML = this._notificator;
                    this.ContainerContent = LoadedContent;
                    // commonActions();
                })
                .then(commonActions);
                // end async
            });
    }
    private _closePane() {
        const{ S7, Placeholder, LoadedContent, ContWrapper, CardsWrapper, ContainerContent, flipTarget, clonedFlipper, ease, ServiceModule } = this;
        let helperFn = () => {
                if (Placeholder.style.height) {
                    return Placeholder;
                }
                return LoadedContent.offsetHeight < ContWrapper.offsetHeight ? LoadedContent : Container;
            },
            activeTarget = <HTMLElement>flipTarget.parentNode,

            Container = S7.firstElementChild,
            flipperChild = <HTMLElement>clonedFlipper.firstElementChild;
        if (ServiceModule) {
            ServiceModule.unsetModule();
        }
        return this._U_timelineFactory(this._U_objVarsForTimeline({paused: false}, [() => {
            activeTarget.classList.remove("S7__active");
            clonedFlipper.remove();
            delete this.clonedFlipper, delete this.flipTarget;
            Placeholder.style.left = Placeholder.style.top = "";
            this.permitToOpen = true;
        }]))
            .add([
                TweenLite.to(LoadedContent, 1, {
                    opacity: 0,
                    clearProps: "opacity",
                    ease
                }),

                TweenLite.to(<{}>helperFn(), 1, {
                    height: ContWrapper.offsetHeight,
                    clearProps: "height",
                    ease
                }),
                TweenLite.to(window, 1, {
                    scrollTo: {
                        y: "#S7"
                    },
                    ease
                })
            ], "+=0", "start", 0)
            .add(() => {
                flipperChild.style.width = S7.offsetWidth + "px";
                LoadedContent.style.display =
                    clonedFlipper.style.display =
                        Placeholder.style.position =
                            Placeholder.style.backgroundColor =
                                ContWrapper.style.position =
                                    ContWrapper.style.zIndex = "";

                flipperChild.style.height = ContWrapper.offsetHeight + "px";

                if (ContainerContent.id === "S7__lc") {
                    let networkProblem = <HTMLElement>Placeholder.querySelector(".S7__network-problem")!;
                    networkProblem.style.display = "";
                }
                let cont = Placeholder.querySelector(".S7__containerContent");
                cont && cont.remove();
                delete this.ContainerContent;
            })
            .add([
                TweenLite.to(flipperChild, 1, {
                    width: activeTarget.offsetWidth,
                    height: activeTarget.offsetHeight,
                    clearProps: "width,height",
                    ease
                }),
                TweenLite.to(Placeholder, 1, {
                    left: activeTarget.offsetLeft,
                    top: activeTarget.offsetTop + CardsWrapper.offsetTop,
                    ease
                }),
                TweenLite.to(<{}>flipperChild.firstElementChild, 1, {
                    backgroundColor: "#444",
                    clearProps: "background-color",
                    ease
                }),

                TweenLite.to(".S7__title", 1, {
                    autoAlpha: 1,
                    clearProps: "visibility,opacity",
                    ease
                }),
                TweenLite.to(CardsWrapper, 1, {
                    z: 0,
                    clearProps: "transform",
                    ease
                }),
                TweenLite.to(window, 1, {
                    scrollTo: {
                        y: this._computedScrollTo(activeTarget)
                    },
                    ease
                })
            ], "+=0", "start", 0)
            .add(TweenLite.to(flipperChild, 1, {
                rotationX: 0,
                boxShadow: "6px 11px 14px 0px rgba(0, 0, 0, 0.26)",
                ease
            }), "-=0.3");
    }
}