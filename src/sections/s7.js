import Utilities from './Utilities';

export default class Section_7 extends Utilities{
    
    constructor(Http, SnackBar, Scheduller, linkWithServices, endPointLink){
        super();
        /**Setup */
        this.linkWithServices = linkWithServices;
        this.SentPoint = endPointLink;
        this.CardClassName = 'S7__card';
        this.ease = Sine.easeOut;

        /**Event Handlers */
        this.OnAnimEnd = null;
        this.OnClHand = null;
        this.OnResizeHand = null;

        /**Services DI */
        this.Http = Http;
        this.SnackBar = SnackBar;
        this.Scheduller = Scheduller;
    
        /**DOM Links */
        this.S7 = document.getElementById('S7');
        this.ContWrapper = document.querySelector('.S7__cont-wrapper');
        this.CardsWrapper = document.querySelector('.S7__card-wrap');
        this.Placeholder = document.querySelector('.S7__placeholder');
        this.LoadedContent = document.querySelector('.S7__loadedcont');

        this.flipTarget = null;
        this.clonedFlipper = null;
        this.permitToOpen = true;
        this.permitToClose = false;

        /**Backend content */
        this.fetchedContent = null;
        this.ResponseStore = null;
        this.ContainerContent = null;
        this.ContainerSpinner = null;
        this.FormModule = null;
        this.isCanSendForm = true;
        this.ReqID = null;

        /**Layout */
        this.Cards = null;

        /**Methods and helpers */
        this._setOnCl();
        this._LayoutPlaner();
        this._titleTw();
    }
    get _notificator(){
        return document.querySelector('#N__register .N__fail .mes').innerHTML;
    }
    _onClHand(){
        this.OnClHand = e =>{
            let target = e.target, { permitToOpen, permitToClose } = this;
        /**TODO: get polyfill closest */
            if (target.closest('.S7__form-wrapper_close') && permitToClose){
                
                this.permitToClose = false;
                return this._closePane();
            }

            let f = target.closest('.S7__flipper');
            if (f && f.classList.contains('S7__anim-end') && permitToOpen){
                const{ S7, ResponseStore, Http, linkWithServices } = this;

                this.permitToOpen = false;
                this.flipTarget = f;

                this._openPane(this.flipTarget.parentNode);
                let actionFn = resObj=>{
                    const objWithData = resObj.get(S7.id)[this.flipTarget.getAttribute('data-code')],
                        locator = objWithData['meta'],
                        assets = resObj.get(S7.id)[locator];
                   
                    if (assets.isWatched) return {
                        c: objWithData.c,
                        //r: assets.r
                        w: true
                    };
                    const{ atob } = window, { c } = objWithData, { s, j/*, r */} = assets;     
                    
                    assets.isWatched = true;
                    assets.s = assets.j = null;
                    return {
                        c: objWithData.c = atob(c),
                        s: atob(s),
                        j: atob(j)
                        //r: assets.r = atob(r)
                    };
                };
                if (ResponseStore){
                    this.fetchedContent = Promise.resolve(ResponseStore).then(actionFn);
                }else{
                    this.fetchedContent = Http.sendReq({ 
                        url: linkWithServices,
                        options: {
                            cache: 'no-cache',
                            resposeAs: 'json'
                        }
                    })
                    .then(res=>{
                        this.ResponseStore = new Map().set(S7.id, JSON.parse(res));
                        return actionFn(this.ResponseStore);
                    });
                    
                }
            
               
            }
        };
        return this.OnClHand;
    }
    _setOnCl(){
        this.S7.addEventListener('click', this._onClHand());
        delete this._setOnCl;
    }
    _createSpinner(){
        /*this.ContainerSpinner = document.createElement('div');
        this.ContainerSpinner.className = 'S7__containerSpinner';
        this.ContainerSpinner.innerHTML = document.getElementById('sp').innerHTML;
        this.Placeholder.appendChild(this.ContainerSpinner);*/
        const{ Placeholder } = this;
        return this._U_TagsFact('div', Placeholder, document.getElementById('sp').innerHTML, {class: 'S7__containerSpinner'});
    }
    _insertContent(content){
        /*let ContainerContent = document.createElement('div');
        ContainerContent.className = 'S7__containerContent';
        ContainerContent.innerHTML = content;
        this.LoadedContent.appendChild(ContainerContent);
        return ContainerContent;*/
        const{ LoadedContent } = this;
        return this._U_TagsFact('div', LoadedContent, content, {class: 'S7__containerContent'});
    }
    
    _onAnimEnd(section, count){
        this.OnAnimEnd = e=>{
            --count;
            e.target.classList.remove('S7__animate');
            e.target.classList.add('S7__anim-end');
            
            if (count == 0) {
                section.removeEventListener('animationend', this.OnAnimEnd);
                this.OnAnimEnd = null;
            }
        };
        delete this._onAnimEnd;
        return this.OnAnimEnd;
    }
    _setOnAnimEnd(count){
        this.S7.addEventListener('animationend', this._onAnimEnd(this.S7, count));
        delete this._setOnAnimEnd;
    }
    _titleTw(){
        let title = document.querySelector('.S7__title'),
            tw = TweenLite.from(title, 1, {
                paused: true,
                onComplete: ()=>tw.kill(),
                autoAlpha: 0,
                clearProps: 'transform',
                y: 50
            });
        return new IntersectionObserver((ent, obs)=>{
            tw.play();
            obs.disconnect();
            delete this._titleTw;
        }).observe(title);  
    }
    _setIO(cards){
        for (let card of cards){
            let observer = new IntersectionObserver((ent, obs)=>{
                ent[0].target.classList.add('S7__animate');
                obs.disconnect();
            }, {
                threshold: .9
            });
            observer.observe(card.firstElementChild);
        }
        delete this._setIO;
    }
    _computedScrollTo(activeTarget){
        return activeTarget.getBoundingClientRect().top + window.pageYOffset + (activeTarget.offsetHeight/2) - (window.innerHeight/2);
    }
    _openPane(flipTargParent){
        const{ S7, Placeholder, CardsWrapper, ContWrapper, LoadedContent,  ease } = this;

        let clonedTarget = this.clonedFlipper = flipTargParent.cloneNode(true),
            flipperElement = clonedTarget.firstElementChild;
        Placeholder.appendChild(clonedTarget);
        Placeholder.style.left = flipTargParent.offsetLeft + 'px';
        Placeholder.style.top = flipTargParent.offsetTop + 'px';
        flipTargParent.classList.add('S7__active');
        
        this._U_timelineFactory(this._U_objVarsForTimeline({paused: false}))
            .add([
                TweenLite.to(flipperElement, 1, {
                    rotationX: 180,
                    boxShadow: 'none',
                    ease
                }),
                TweenLite.to(window, 1, {
                    scrollTo:{
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
                TweenLite.to(flipperElement, 1, {
                
                    width: S7.offsetWidth,
                    height: window.innerHeight,
                    ease
                }),
                TweenLite.to(Placeholder, 1, {
                    left: 0,
                    top: 0,
                    ease
                }),
                TweenLite.to('.S7__title', .3, {
                    autoAlpha: 0,
                    ease
                }),
                TweenLite.to(flipperElement.firstElementChild, 1, {
                    backgroundColor: '#fff',
                    ease
                }),
                TweenLite.to('.S7__container', 1, {
                    height: window.innerHeight,
                    ease
                }),
                TweenLite.to(window, 1, {
                    scrollTo: {
                        y: '#S7'
                    },
                    ease
                })
            ], '-=0.3', 'start', 0)
            .add(()=>{
                this.ContainerSpinner = this._createSpinner();
            }, '-=0.3')
            .add(()=>{
                let commonActions = ()=>{
                        this.ContainerSpinner.remove();
                        this.ContainerSpinner = null;
                        let lowHeight = null, helperFn = ()=>this.ContainerContent.offsetHeight <= window.innerHeight ? (lowHeight = true, window.innerHeight) : this.ContainerContent.offsetHeight;
                         
                        return this._U_timelineFactory(this._U_objVarsForTimeline({paused: false}, [()=>{
                            this.fetchedContent = null;
                            this.permitToClose = true;
                        }]))
                            .add([
                                TweenLite.to(Placeholder, 1, {
                                    height: helperFn(),
                                    ease,
                                    clearProps: lowHeight ? '' : 'height'
                                }),
                                TweenLite.to(LoadedContent, 1, {
                                    opacity: 1,
                                    ease
                                })
                            ]);
                    
                    },
                    container = S7.firstElementChild;
                Placeholder.style.backgroundColor = '#fff';
                Placeholder.style.height = container.offsetHeight + 'px';
                Placeholder.style.position = 'static';
                container.style.height = '';
                clonedTarget.style.display = 'none';
                ContWrapper.style.position = 'absolute';
                ContWrapper.style.zIndex = -1;
                LoadedContent.style.display = 'block';
                //async
                this.fetchedContent.then(objWithData =>{
                    let $this = this;
                    const{c, s, j, w/*, r*/} = objWithData;
                    this.ContainerContent = this._insertContent(c);
                    if (!w){
                        this._U_TagsFact('style', null, s);
                        this._U_TagsFact('script', null, j);
                    }
                         
                    //overkill!!!
                    this.FormModule = new window.FormModule();///eval(r);
                    const{ FormModule, SnackBar, Scheduller } = this;
                    FormModule.Http = this.Http;
                    FormModule.setModule(
                        { 
                            widget: SnackBar, 
                            onClS(){
                                FormModule.canceller(SnackBar, Scheduller);
                            }, 
                            onClF(enableAll){ 
                                SnackBar.closePane(null, enableAll); 
                            }, 
                            onAfterClose(){ 
                                $this.isCanSendForm = true; 
                            }
                        }, 
                        ()=>{
                            FormModule.onCloseForm();
                            this._closePane();
                               
                        }, null/*()=>console.log('InProggress')*/, this);
                        
                    commonActions();
                })
                .catch(()=>{
                    let prob = Placeholder.querySelector('.S7__network-problem');
                    prob.style.display = 'block';
                    prob.querySelector('h2').innerHTML = this._notificator;
                    this.ContainerContent = LoadedContent;
                    commonActions();
                });
                    
                //end async
            });
       
    }
    _closePane(){
        const{ S7, Placeholder, LoadedContent, ContWrapper, CardsWrapper, ContainerContent, flipTarget, clonedFlipper, ease } = this;
        let helperFn = ()=>{
                if (Placeholder.style.height){
                    return Placeholder;
                }
                return LoadedContent.offsetHeight < ContWrapper.offsetHeight ? LoadedContent : Container;
            },
            activeTarget = flipTarget.parentNode,
        
            Container = S7.firstElementChild,
            flipperChild = clonedFlipper.firstElementChild;
        return this._U_timelineFactory(this._U_objVarsForTimeline({paused: false}, [()=>{
            activeTarget.classList.remove('S7__active');
            clonedFlipper.remove();
            this.clonedFlipper = this.flipTarget = null;
            Placeholder.style.left = Placeholder.style.top = '';
            this.permitToOpen = true;
        }]))
            .add([
                TweenLite.to(LoadedContent, 1, {
                    opacity: 0,
                    clearProps: 'opacity',
                    ease
                }),
                
                TweenLite.to(helperFn(), 1, {
                    height: ContWrapper.offsetHeight,
                    clearProps: 'height',
                    ease
                }),
                TweenLite.to(window, 1, {
                    scrollTo: {
                        y: '#S7'
                    },
                    ease
                })
            ], '+=0', 'start', 0)
            .add(()=>{
                flipperChild.style.width = S7.offsetWidth + 'px';
                LoadedContent.style.display = 
                    clonedFlipper.style.display = 
                        Placeholder.style.position = 
                            Placeholder.style.backgroundColor = 
                                ContWrapper.style.position = 
                                    ContWrapper.style.zIndex = '';
                
                flipperChild.style.height = ContWrapper.offsetHeight + 'px';
                
                if (ContainerContent.id === 'S7__lc') {
                    Placeholder.querySelector('.S7__network-problem').style.display = '';
                }//else{
                    //ContainerContent.remove();
                //}
                let cont = Placeholder.querySelector('.S7__containerContent');
                cont && cont.remove();
                this.ContainerContent = null; 
               
            })
            .add([
                TweenLite.to(flipperChild, 1, {
                    width: activeTarget.offsetWidth,
                    height: activeTarget.offsetHeight,
                    clearProps: 'width,height',
                    ease
                }),
                TweenLite.to(Placeholder, 1, {
                    left: activeTarget.offsetLeft,
                    top: activeTarget.offsetTop + CardsWrapper.offsetTop,
                    ease
                }),
                TweenLite.to(flipperChild.firstElementChild, 1, {
                    backgroundColor: '#444',
                    clearProps: 'background-color',
                    ease
                }),
                
                TweenLite.to('.S7__title', 1, {
                    autoAlpha: 1,
                    clearProps: 'visibility,opacity',
                    ease
                }),
                TweenLite.to(CardsWrapper, 1, {
                    z: 0,
                    clearProps: 'transform',
                    ease
                }),
                TweenLite.to(window, 1, {
                    scrollTo:{
                        y: this._computedScrollTo(activeTarget)
                    },
                    ease
                })
            ], '+=0', 'start', 0)
            .add(TweenLite.to(flipperChild, 1, {
                    
                rotationX: 0,
                boxShadow: '6px 11px 14px 0px rgba(0, 0, 0, 0.26)',
            
                ease
            }), '-=0.3');
    }
    _onResizeHand(){
        delete this._onResizeHand;
        return this._layoutHandler();
    }    
    _LayoutPlaner(){
        this.OnResizeHand = this._onResizeHand();
        this.OnResizeHand();
        window.addEventListener('resize', this.OnResizeHand);
        delete this._LayoutPlaner;
    }
    _layoutHandler(){
        const{ CardsWrapper, CardClassName, Cards } = this;
        let cardsStore = CardsWrapper.querySelectorAll(`.${CardClassName}`);
        this._setIO(cardsStore);
        this._setOnAnimEnd(cardsStore.length);
        let arrBreakpoints = new Map([
                    [1, { max: 540, min: 0 }],
                    [2, { max: 860, min: 541 }],
                    [3, { max: 1099, min: 861 }],
                    [4, { max: 1200, min: 1100 }],
                    [5, { max: Infinity, min: 1201 }]
        ]);
                
        return ()=>{
            let docWidth = document.body.offsetWidth;
            arrBreakpoints.forEach((value, key) => {
                if (Cards != key && docWidth <= value.max && docWidth >= value.min){
                    this.Cards = key;
                    let numberOfRows = Math.ceil(cardsStore.length/this.Cards);
                    let it = cardsStore[Symbol.iterator]();
                    while(CardsWrapper.children.length != 0){
                        CardsWrapper.firstElementChild.remove();
                    }
                    do{
                        let RowDiv = document.createElement('div');
                        RowDiv.className = 'S7__din-row';
                                
                        for (let i = 0; i < this.Cards; ++i){
                            let elem = it.next();
                            if (!elem.done){
                                RowDiv.appendChild(elem.value);
                            }else{
                                break;
                            }
                        }
                        CardsWrapper.appendChild(RowDiv);
                                
                    }while(CardsWrapper.children.length != numberOfRows);  
                }
            });
        };
                
    }

}


