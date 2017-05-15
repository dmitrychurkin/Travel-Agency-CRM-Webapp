import Utilities from "./Utilities";
import HttpController  from "../plugins/http.module";

class SliderEngine {
    static config(actionCallback: (a: any) => void, arrayLikeObject: MustToBeIterable, interval: number) {
        return new SliderEngine(actionCallback, arrayLikeObject, interval);
    }

    private _iterableIterator: IterableIterator<any>;

    private constructor(
        private _actionCallback: (a: any) => void,
        private _arrayLikeObject: MustToBeIterable,
        private _interval: number) {}

    private _setIterator(subject: MustToBeIterable) {
        return (this._iterableIterator = Array.from(subject)[Symbol.iterator]());
    }
    private _process(subject: MustToBeIterable) {
        let iteratorResult = this._iterableIterator.next();
        if (iteratorResult.done) {
            iteratorResult = this._setIterator(subject).next();
        }
        this._actionCallback(iteratorResult.value);
    }

    start() {
        const { _arrayLikeObject: object } = this;
        if (object.length === 1) {
            return this._actionCallback(object[0]);
        }

        this._actionCallback(this._setIterator(object).next().value);

        setInterval(() => this._process(object), this._interval);
    }
}

export default class Section14 extends Utilities {
    private _sliderMeta: ISliderMeta;
    private _uploadedImages: Array<HTMLImageElement> = [];
    private _imgContainer = document.querySelector(".S14__i-wrap") as HTMLElement;
    private _currentImg: HTMLImageElement;
    private _previousImg: HTMLImageElement;

    private _actionClass = "S14__vis";
    private _transitionDuration = 2000;
    private _isSectionVisible = false;
    constructor(/*private imgSrc: string*/
        private _httpService: HttpController,
        private _url: string
    ) {
        super();
        this._U_IntersectionObserver(".S14__lim", () => this._a());
        this._setListeners();
    }
    private _a() {
        this._isSectionVisible = true;
        let pre = document.querySelectorAll(".S14__pre,.S14__gr"),
            chars = Array.from(document.querySelectorAll(".S14__f, .S14__b"));
        this._U_timelineFactory(this._U_objVarsForTimeline({ paused: false }))
            .add(() => pre[0].classList.add("S14__a"))
            .add(() => pre[1].classList.add("S14__a"), "+=1.3")
            .add(() => pre[2].classList.add("S14__a"), "+=1.3")
            .add(() => SliderEngine.config(this._actionSlider(), this._uploadedImages, this._sliderMeta.slideShow * 1000).start())
            .add(() => chars.forEach(item => item.classList.add("S14__a")), "+=1.3");
    }
    private _actionSlider() {
        const { _actionClass, _transitionDuration, _sliderMeta: { sliderMode } } = this;
        const TRANSITION = sliderMode === "sequensed" ? _transitionDuration : 0;
            return (img: HTMLImageElement) => {
                const { _currentImg, _previousImg } = this;
                if (_currentImg) {
                    _currentImg.classList.remove(_actionClass);
                }
                if (!_previousImg) {
                    this._previousImg = img;
                }
                this._currentImg = img;
                setTimeout(() => {
                    this._previousImg = img;
                    this._setContainerHeight(img);
                    this._centerImgs();
                    this._currentImg.classList.add(_actionClass);
                }, !_currentImg ? 0 : TRANSITION);
            };
    }
    private _centerImgs() {
        if (!this._isSectionVisible) return;
        const { _currentImg, _previousImg } = this;
        const fullWidth = document.body.offsetWidth;
        const fnAlign = (img: HTMLImageElement) => img.style.left = `${(fullWidth - img.offsetWidth) / 2}px`;

        let i = 2;
        do {
            i === 2 ? fnAlign(_currentImg) : fnAlign(_previousImg);
        }while (--i);
    }
    private _setContainerHeight(param?: HTMLImageElement): void {
        if (!this._isSectionVisible) return;
        const currentImg: HTMLImageElement | undefined = param || this._currentImg;
        this._imgContainer.style.height = `${currentImg.offsetHeight}px`;
    }
    private _resizeHandler() {
        this._setContainerHeight();
        this._centerImgs();
    }
    private _setListeners() {
        window.addEventListener("resize", () => this._resizeHandler());
    }

    private  async _allocateImgs(imgPromisesArray: Promise<HTMLImageElement>[]): Promise<void> {
        const { _imgContainer } = this;
        for (const imgPromise of imgPromisesArray) {
            const img: HTMLImageElement = await imgPromise;
            _imgContainer && _imgContainer.appendChild(img);
        }
    }
    private _setAttrs(img: HTMLImageElement, { links: { self }, attributes: { meta: { alt, title } } }: IOfferData): void {
        const { maxWidth } = this._sliderMeta;
        img.className = "S14__image";
        img.src = self;
        img.alt = alt;
        img.title = title;
        img.style.maxWidth = `${maxWidth}px`;
    }
    private _imageUploader(responseJsonData: Array<IOfferData>): void {
        let imgPromisesArray: Promise<HTMLImageElement>[] = [];
        for (const imageData of responseJsonData) {
            const img: HTMLImageElement = new Image();
            this._setAttrs(img, imageData);

            imgPromisesArray.push(new Promise<HTMLImageElement>(resolve => {
                img.onload = () => {
                    resolve(img);
                    this._uploadedImages.push(img);
                };
            }));
        }
        this._allocateImgs(imgPromisesArray);
    }
    private _parseResponse(response: string) {
        const responseJson: IPortOffersResponse = JSON.parse(response);
        const{ meta, data } = responseJson;
        this._sliderMeta = meta;
        this._imageUploader(data);
    }
    getOffers() {
        this._httpService.sendReq({ url: this._url, options: { headers: { "Accept": "application/vnd.api+json" } } })
            .then((response: string) => this._parseResponse(response));
    }
    /*imLoader() {
        let img = <HTMLImageElement>document.querySelector(".S14__image");
        img.src = this.imgSrc;
        img.onload = (e: any) => console.log("Image promo loaded! ", e);
        img.onerror = (e: any) => console.log("Image promo not loaded! ", e);
    }*/
}

interface IPortOffersResponse {
    data: Array<IOfferData>;
    meta: {
        maxWidth: number;
        slideShow: number;
        sliderMode: "sequensed" | "static";
    };
}
interface IOfferData {
    type: "offers";
    id: string;
    attributes: {
        fileName: string;
        fileSize: number;
        meta: {
            alt: string;
            title: string;
        };
    };
    links: {
        self: string;
    };
}
interface ISliderMeta {
    maxWidth: number;
    slideShow: number;
    sliderMode: "sequensed" | "static";
}
type SomeIterable = { length: any };
interface MustToBeIterable extends SomeIterable {
    [key: string]: any;
}