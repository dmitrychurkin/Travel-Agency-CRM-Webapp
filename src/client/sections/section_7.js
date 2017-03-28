import * as tslib_1 from "tslib";
import Utilities from "./Utilities";
import ParserS7 from "../plugins/parserS7";
var Section7 = (function (_super) {
    tslib_1.__extends(Section7, _super);
    function Section7(Http, URIs) {
        var _this = _super.call(this) || this;
        _this.Http = Http;
        _this.URIs = URIs;
        _this.S7 = document.getElementById("S7");
        _this.ContWrapper = document.querySelector(".S7__cont-wrapper");
        _this.CardsWrapper = document.querySelector(".S7__card-wrap");
        _this.Placeholder = document.querySelector(".S7__placeholder");
        _this.LoadedContent = document.querySelector(".S7__loadedcont");
        _this.ease = Sine.easeOut;
        _this.permitToClose = false;
        _this.permitToOpen = true;
        _this.Parser = new ParserS7();
        _this.isCanSendForm = true;
        _this._U_EventListSetter("click", _this._onCl());
        var cards = document.querySelectorAll(".S7__flipper"), cardsIt = cards[Symbol.iterator]();
        _this._U_IOSetter(".S7__lim", [
            function () {
                var titleCl = document.querySelector(".S7__title").classList;
                setTimeout(function () { return titleCl.remove("S7__trans"); }, 1000), titleCl.remove("S7__a");
            }
        ].concat(Array(cards.length).fill(function () {
            var currentCard = cardsIt.next().value;
            setTimeout(function () { return (currentCard.classList.remove("S7__animate"),
                currentCard.classList.add("S7__anim-end")); }, 1000);
            currentCard.classList.add("S7__animate");
        })));
        return _this;
    }
    Section7.prototype._createSpinner = function () {
        var Placeholder = this.Placeholder;
        return this._U_TagsFact("div", document.getElementById("sp").innerHTML, Placeholder, { class: "S7__containerSpinner" });
    };
    Section7.prototype._insertContent = function (content) {
        var LoadedContent = this.LoadedContent;
        return this._U_TagsFact("div", content, LoadedContent, { class: "S7__containerContent" });
    };
    Section7.prototype._computedScrollTo = function (activeTarget) {
        return activeTarget.getBoundingClientRect().top + window.pageYOffset + (activeTarget.offsetHeight / 2) - (window.innerHeight / 2);
    };
    Section7.prototype._onCl = function () {
        var _this = this;
        return function (e) {
            var target = e.target, _a = _this, permitToOpen = _a.permitToOpen, permitToClose = _a.permitToClose;
            if (target.closest(".S7__form-wrapper_close") && permitToClose) {
                _this.permitToClose = false;
                return _this._closePane();
            }
            var f = target.closest(".S7__flipper");
            if (f && f.classList.contains("S7__anim-end") && permitToOpen) {
                var _b = _this, Parser_1 = _b.Parser, Http = _b.Http, services = _b.URIs.services;
                _this.permitToOpen = false;
                _this.flipTarget = f;
                _this._openPane(_this.flipTarget.parentNode);
                var parserFn_1 = function () {
                    var dataset = _this.flipTarget.dataset;
                    var LC = _this.LoadedContent.style;
                    if (dataset.tint) {
                        LC.backgroundColor = "rgba(128, 128, 128, 0.34)";
                    }
                    else {
                        LC.backgroundColor = "";
                    }
                    return Parser_1.InitParsing(dataset.code);
                };
                if (Parser_1.Model) {
                    _this.fetchedContent = Promise.resolve().then(parserFn_1);
                }
                else {
                    _this.fetchedContent = Http.sendReq({
                        url: services,
                        options: {
                            cache: "no-cache",
                            responseAs: "json"
                        }
                    })
                        .then(function (res) {
                        Parser_1.Model = JSON.parse(res);
                        setTimeout(function () { return Parser_1.AllocateAddons(); });
                        return parserFn_1();
                    });
                }
            }
            return;
        };
    };
    Object.defineProperty(Section7.prototype, "_notificator", {
        get: function () {
            return document.querySelector("#N__register .N__fail .mes").innerHTML;
        },
        enumerable: true,
        configurable: true
    });
    Section7.prototype._openPane = function (flipTargParent) {
        var _this = this;
        var _a = this, S7 = _a.S7, Placeholder = _a.Placeholder, CardsWrapper = _a.CardsWrapper, ContWrapper = _a.ContWrapper, LoadedContent = _a.LoadedContent, ease = _a.ease;
        var clonedTarget = this.clonedFlipper = flipTargParent.cloneNode(true), flipperElement = clonedTarget.firstElementChild;
        Placeholder.appendChild(clonedTarget);
        Placeholder.style.left = flipTargParent.offsetLeft + "px";
        Placeholder.style.top = flipTargParent.offsetTop + "px";
        flipTargParent.classList.add("S7__active");
        clonedTarget.style.margin = "0";
        this._U_timelineFactory(this._U_objVarsForTimeline({ paused: false }))
            .add([
            TweenLite.to(flipperElement, 1, {
                rotationX: 180,
                boxShadow: "none",
                ease: ease
            }),
            TweenLite.to(window, 1, {
                scrollTo: {
                    y: this._computedScrollTo(flipTargParent)
                },
                ease: ease
            })
        ])
            .add([
            TweenLite.to(CardsWrapper, 1, {
                z: -300,
                ease: ease
            }),
            TweenLite.to(flipperElement, 1, {
                width: S7.offsetWidth,
                height: window.innerHeight,
                ease: ease
            }),
            TweenLite.to(Placeholder, 1, {
                left: 0,
                top: 0,
                ease: ease
            }),
            TweenLite.to(".S7__title", .3, {
                autoAlpha: 0,
                ease: ease
            }),
            TweenLite.to(flipperElement.firstElementChild, 1, {
                backgroundColor: "#fff",
                ease: ease
            }),
            TweenLite.to(".S7__container", 1, {
                height: window.innerHeight,
                ease: ease
            }),
            TweenLite.to(window, 1, {
                scrollTo: {
                    y: "#S7"
                },
                ease: ease
            })
        ], "-=0.3", "start", 0)
            .add(function () {
            _this.ContainerSpinner = _this._createSpinner();
        }, "-=0.3")
            .add(function () {
            var commonActions = function () {
                _this.ContainerSpinner.remove();
                delete _this.ContainerSpinner;
                var lowHeight = null, helperFn = function () { return _this.ContainerContent.offsetHeight <= window.innerHeight ? (lowHeight = true, window.innerHeight) : _this.ContainerContent.offsetHeight; };
                return _this._U_timelineFactory(_this._U_objVarsForTimeline({ paused: false }, [function () {
                        delete _this.fetchedContent;
                        _this.permitToClose = true;
                    }]))
                    .add([
                    TweenLite.to(Placeholder, 1, {
                        height: helperFn(),
                        ease: ease,
                        clearProps: lowHeight ? "" : "height"
                    }),
                    TweenLite.to(LoadedContent, 1, {
                        opacity: 1,
                        ease: ease
                    })
                ]);
            }, container = S7.firstElementChild;
            Placeholder.style.backgroundColor = "#fff";
            Placeholder.style.height = container.offsetHeight + "px";
            Placeholder.style.position = "static";
            container.style.height = "";
            clonedTarget.style.display = "none";
            ContWrapper.style.position = "absolute";
            ContWrapper.style.zIndex = "-1";
            LoadedContent.style.display = "block";
            _this.fetchedContent.then(function (objWithData) {
                var c = objWithData.c, s = objWithData.s, j = objWithData.j;
                _this.ContainerContent = _this._insertContent(c);
                if (s && j) {
                    _this._U_TagsFact("style", s);
                    _this._U_TagsFact("script", j);
                }
                var dataset = _this.flipTarget.dataset;
                _this.ServiceModule = new window._FM_(dataset.subject);
                var ServiceModule = _this.ServiceModule;
                if (dataset.subject === "form") {
                    ServiceModule.setModule({
                        onClS: function () { return ServiceModule.canceller(); },
                        onClF: function (enableAll) { return ServiceModule.snackBar.closePane(null, enableAll); },
                        onAfClose: function () { _this.isCanSendForm = true; ServiceModule.snackBar.destroyPane(); }
                    }, function () { ServiceModule.unsetModule(); _this._closePane(); });
                }
            })
                .catch(function () {
                var prob = Placeholder.querySelector(".S7__network-problem");
                prob.style.display = "block";
                prob.querySelector("h2").innerHTML = _this._notificator;
                _this.ContainerContent = LoadedContent;
            })
                .then(commonActions);
        });
    };
    Section7.prototype._closePane = function () {
        var _this = this;
        var _a = this, S7 = _a.S7, Placeholder = _a.Placeholder, LoadedContent = _a.LoadedContent, ContWrapper = _a.ContWrapper, CardsWrapper = _a.CardsWrapper, ContainerContent = _a.ContainerContent, flipTarget = _a.flipTarget, clonedFlipper = _a.clonedFlipper, ease = _a.ease, ServiceModule = _a.ServiceModule;
        var helperFn = function () {
            if (Placeholder.style.height) {
                return Placeholder;
            }
            return LoadedContent.offsetHeight < ContWrapper.offsetHeight ? LoadedContent : Container;
        }, activeTarget = flipTarget.parentNode, Container = S7.firstElementChild, flipperChild = clonedFlipper.firstElementChild;
        if (ServiceModule) {
            ServiceModule.unsetModule();
        }
        return this._U_timelineFactory(this._U_objVarsForTimeline({ paused: false }, [function () {
                activeTarget.classList.remove("S7__active");
                clonedFlipper.remove();
                delete _this.clonedFlipper, delete _this.flipTarget;
                Placeholder.style.left = Placeholder.style.top = "";
                _this.permitToOpen = true;
            }]))
            .add([
            TweenLite.to(LoadedContent, 1, {
                opacity: 0,
                clearProps: "opacity",
                ease: ease
            }),
            TweenLite.to(helperFn(), 1, {
                height: ContWrapper.offsetHeight,
                clearProps: "height",
                ease: ease
            }),
            TweenLite.to(window, 1, {
                scrollTo: {
                    y: "#S7"
                },
                ease: ease
            })
        ], "+=0", "start", 0)
            .add(function () {
            flipperChild.style.width = S7.offsetWidth + "px";
            LoadedContent.style.display =
                clonedFlipper.style.display =
                    Placeholder.style.position =
                        Placeholder.style.backgroundColor =
                            ContWrapper.style.position =
                                ContWrapper.style.zIndex = "";
            flipperChild.style.height = ContWrapper.offsetHeight + "px";
            if (ContainerContent.id === "S7__lc") {
                var networkProblem = Placeholder.querySelector(".S7__network-problem");
                networkProblem.style.display = "";
            }
            var cont = Placeholder.querySelector(".S7__containerContent");
            cont && cont.remove();
            delete _this.ContainerContent;
        })
            .add([
            TweenLite.to(flipperChild, 1, {
                width: activeTarget.offsetWidth,
                height: activeTarget.offsetHeight,
                clearProps: "width,height",
                ease: ease
            }),
            TweenLite.to(Placeholder, 1, {
                left: activeTarget.offsetLeft,
                top: activeTarget.offsetTop + CardsWrapper.offsetTop,
                ease: ease
            }),
            TweenLite.to(flipperChild.firstElementChild, 1, {
                backgroundColor: "#444",
                clearProps: "background-color",
                ease: ease
            }),
            TweenLite.to(".S7__title", 1, {
                autoAlpha: 1,
                clearProps: "visibility,opacity",
                ease: ease
            }),
            TweenLite.to(CardsWrapper, 1, {
                z: 0,
                clearProps: "transform",
                ease: ease
            }),
            TweenLite.to(window, 1, {
                scrollTo: {
                    y: this._computedScrollTo(activeTarget)
                },
                ease: ease
            })
        ], "+=0", "start", 0)
            .add(TweenLite.to(flipperChild, 1, {
            rotationX: 0,
            boxShadow: "6px 11px 14px 0px rgba(0, 0, 0, 0.26)",
            ease: ease
        }), "-=0.3");
    };
    return Section7;
}(Utilities));
export default Section7;
