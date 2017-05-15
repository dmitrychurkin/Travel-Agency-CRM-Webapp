import * as tslib_1 from "tslib";
import Utilities from "./Utilities";
var SliderEngine = (function () {
    function SliderEngine(_actionCallback, _arrayLikeObject, _interval) {
        this._actionCallback = _actionCallback;
        this._arrayLikeObject = _arrayLikeObject;
        this._interval = _interval;
    }
    SliderEngine.config = function (actionCallback, arrayLikeObject, interval) {
        return new SliderEngine(actionCallback, arrayLikeObject, interval);
    };
    SliderEngine.prototype._setIterator = function (subject) {
        return (this._iterableIterator = Array.from(subject)[Symbol.iterator]());
    };
    SliderEngine.prototype._process = function (subject) {
        var iteratorResult = this._iterableIterator.next();
        if (iteratorResult.done) {
            iteratorResult = this._setIterator(subject).next();
        }
        this._actionCallback(iteratorResult.value);
    };
    SliderEngine.prototype.start = function () {
        var _this = this;
        var object = this._arrayLikeObject;
        if (object.length === 1) {
            return this._actionCallback(object[0]);
        }
        this._actionCallback(this._setIterator(object).next().value);
        setInterval(function () { return _this._process(object); }, this._interval);
    };
    return SliderEngine;
}());
var Section14 = (function (_super) {
    tslib_1.__extends(Section14, _super);
    function Section14(_httpService, _url) {
        var _this = _super.call(this) || this;
        _this._httpService = _httpService;
        _this._url = _url;
        _this._uploadedImages = [];
        _this._imgContainer = document.querySelector(".S14__i-wrap");
        _this._actionClass = "S14__vis";
        _this._transitionDuration = 2000;
        _this._isSectionVisible = false;
        _this._U_IntersectionObserver(".S14__lim", function () { return _this._a(); });
        _this._setListeners();
        return _this;
    }
    Section14.prototype._a = function () {
        var _this = this;
        this._isSectionVisible = true;
        var pre = document.querySelectorAll(".S14__pre,.S14__gr"), chars = Array.from(document.querySelectorAll(".S14__f, .S14__b"));
        this._U_timelineFactory(this._U_objVarsForTimeline({ paused: false }))
            .add(function () { return pre[0].classList.add("S14__a"); })
            .add(function () { return pre[1].classList.add("S14__a"); }, "+=1.3")
            .add(function () { return pre[2].classList.add("S14__a"); }, "+=1.3")
            .add(function () { return SliderEngine.config(_this._actionSlider(), _this._uploadedImages, _this._sliderMeta.slideShow * 1000).start(); })
            .add(function () { return chars.forEach(function (item) { return item.classList.add("S14__a"); }); }, "+=1.3");
    };
    Section14.prototype._actionSlider = function () {
        var _this = this;
        var _b = this, _actionClass = _b._actionClass, _transitionDuration = _b._transitionDuration, sliderMode = _b._sliderMeta.sliderMode;
        var TRANSITION = sliderMode === "sequensed" ? _transitionDuration : 0;
        return function (img) {
            var _b = _this, _currentImg = _b._currentImg, _previousImg = _b._previousImg;
            if (_currentImg) {
                _currentImg.classList.remove(_actionClass);
            }
            if (!_previousImg) {
                _this._previousImg = img;
            }
            _this._currentImg = img;
            setTimeout(function () {
                _this._previousImg = img;
                _this._setContainerHeight(img);
                _this._centerImgs();
                _this._currentImg.classList.add(_actionClass);
            }, !_currentImg ? 0 : TRANSITION);
        };
    };
    Section14.prototype._centerImgs = function () {
        if (!this._isSectionVisible)
            return;
        var _b = this, _currentImg = _b._currentImg, _previousImg = _b._previousImg;
        var fullWidth = document.body.offsetWidth;
        var fnAlign = function (img) { return img.style.left = (fullWidth - img.offsetWidth) / 2 + "px"; };
        var i = 2;
        do {
            i === 2 ? fnAlign(_currentImg) : fnAlign(_previousImg);
        } while (--i);
    };
    Section14.prototype._setContainerHeight = function (param) {
        if (!this._isSectionVisible)
            return;
        var currentImg = param || this._currentImg;
        this._imgContainer.style.height = currentImg.offsetHeight + "px";
    };
    Section14.prototype._resizeHandler = function () {
        this._setContainerHeight();
        this._centerImgs();
    };
    Section14.prototype._setListeners = function () {
        var _this = this;
        window.addEventListener("resize", function () { return _this._resizeHandler(); });
    };
    Section14.prototype._allocateImgs = function (imgPromisesArray) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _imgContainer, imgPromisesArray_1, imgPromisesArray_1_1, imgPromise, img, e_1_1, e_1, _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _imgContainer = this._imgContainer;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 6, 7, 8]);
                        imgPromisesArray_1 = tslib_1.__values(imgPromisesArray), imgPromisesArray_1_1 = imgPromisesArray_1.next();
                        _c.label = 2;
                    case 2:
                        if (!!imgPromisesArray_1_1.done) return [3, 5];
                        imgPromise = imgPromisesArray_1_1.value;
                        return [4, imgPromise];
                    case 3:
                        img = _c.sent();
                        _imgContainer && _imgContainer.appendChild(img);
                        _c.label = 4;
                    case 4:
                        imgPromisesArray_1_1 = imgPromisesArray_1.next();
                        return [3, 2];
                    case 5: return [3, 8];
                    case 6:
                        e_1_1 = _c.sent();
                        e_1 = { error: e_1_1 };
                        return [3, 8];
                    case 7:
                        try {
                            if (imgPromisesArray_1_1 && !imgPromisesArray_1_1.done && (_b = imgPromisesArray_1.return)) _b.call(imgPromisesArray_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7];
                    case 8: return [2];
                }
            });
        });
    };
    Section14.prototype._setAttrs = function (img, _b) {
        var self = _b.links.self, _c = _b.attributes.meta, alt = _c.alt, title = _c.title;
        var maxWidth = this._sliderMeta.maxWidth;
        img.className = "S14__image";
        img.src = self;
        img.alt = alt;
        img.title = title;
        img.style.maxWidth = maxWidth + "px";
    };
    Section14.prototype._imageUploader = function (responseJsonData) {
        var _this = this;
        var imgPromisesArray = [];
        var _loop_1 = function (imageData) {
            var img = new Image();
            this_1._setAttrs(img, imageData);
            imgPromisesArray.push(new Promise(function (resolve) {
                img.onload = function () {
                    resolve(img);
                    _this._uploadedImages.push(img);
                };
            }));
        };
        var this_1 = this;
        try {
            for (var responseJsonData_1 = tslib_1.__values(responseJsonData), responseJsonData_1_1 = responseJsonData_1.next(); !responseJsonData_1_1.done; responseJsonData_1_1 = responseJsonData_1.next()) {
                var imageData = responseJsonData_1_1.value;
                _loop_1(imageData);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (responseJsonData_1_1 && !responseJsonData_1_1.done && (_b = responseJsonData_1.return)) _b.call(responseJsonData_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        this._allocateImgs(imgPromisesArray);
        var e_2, _b;
    };
    Section14.prototype._parseResponse = function (response) {
        var responseJson = JSON.parse(response);
        var meta = responseJson.meta, data = responseJson.data;
        this._sliderMeta = meta;
        this._imageUploader(data);
    };
    Section14.prototype.getOffers = function () {
        var _this = this;
        this._httpService.sendReq({ url: this._url, options: { headers: { "Accept": "application/vnd.api+json" } } })
            .then(function (response) { return _this._parseResponse(response); });
    };
    return Section14;
}(Utilities));
export default Section14;
