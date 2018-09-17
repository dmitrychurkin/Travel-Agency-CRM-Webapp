webpackJsonp([0,7],{

/***/ 409:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_flex_layout__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__customize_routing_module__ = __webpack_require__(428);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__customize_component__ = __webpack_require__(415);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__file_storage_component__ = __webpack_require__(430);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__landing_page_settings_component__ = __webpack_require__(432);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__offers_section_component__ = __webpack_require__(418);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__offers_modal_component__ = __webpack_require__(417);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__selected_tab_service__ = __webpack_require__(419);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_app_dashboard_children_customize_slider_promo_section_component__ = __webpack_require__(435);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__modal_dialog_component__ = __webpack_require__(416);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__site_contacts_component__ = __webpack_require__(434);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__slider_promo_modal_component__ = __webpack_require__(420);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__key_people_component__ = __webpack_require__(431);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_angular2_froala_wysiwyg__ = __webpack_require__(437);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__froala_text_editor_service__ = __webpack_require__(413);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__customer_reviews_component__ = __webpack_require__(427);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__our_sponsores_component__ = __webpack_require__(433);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomizeModule", function() { return CustomizeModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





















var CustomizeModule = (function () {
    function CustomizeModule() {
    }
    return CustomizeModule;
}());
CustomizeModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["a" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_material__["a" /* MaterialModule */],
            __WEBPACK_IMPORTED_MODULE_5__customize_routing_module__["a" /* CustomizeRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_flex_layout__["FlexLayoutModule"],
            __WEBPACK_IMPORTED_MODULE_17_angular2_froala_wysiwyg__["a" /* FroalaEditorModule */],
            __WEBPACK_IMPORTED_MODULE_17_angular2_froala_wysiwyg__["b" /* FroalaViewModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__customize_component__["a" /* CustomizeComponent */],
            __WEBPACK_IMPORTED_MODULE_7__file_storage_component__["a" /* FileStorageComponent */],
            __WEBPACK_IMPORTED_MODULE_8__landing_page_settings_component__["a" /* LandingPageSettingsComponent */],
            __WEBPACK_IMPORTED_MODULE_9__offers_section_component__["a" /* OffersSectionComponent */],
            __WEBPACK_IMPORTED_MODULE_10__offers_modal_component__["a" /* OffersModalComponent */],
            __WEBPACK_IMPORTED_MODULE_12_app_dashboard_children_customize_slider_promo_section_component__["a" /* SliderPromoSectionComponent */],
            __WEBPACK_IMPORTED_MODULE_15__slider_promo_modal_component__["a" /* SliderPromoModalComponent */],
            __WEBPACK_IMPORTED_MODULE_13__modal_dialog_component__["a" /* ModalDialogComponent */],
            __WEBPACK_IMPORTED_MODULE_14__site_contacts_component__["a" /* SiteContactsComponent */],
            __WEBPACK_IMPORTED_MODULE_16__key_people_component__["a" /* KeyPeopleComponent */],
            __WEBPACK_IMPORTED_MODULE_19__customer_reviews_component__["a" /* CustomerReviewsComponent */],
            __WEBPACK_IMPORTED_MODULE_20__our_sponsores_component__["a" /* OurSponsoresComponent */]
        ],
        entryComponents: [__WEBPACK_IMPORTED_MODULE_10__offers_modal_component__["a" /* OffersModalComponent */], __WEBPACK_IMPORTED_MODULE_15__slider_promo_modal_component__["a" /* SliderPromoModalComponent */], __WEBPACK_IMPORTED_MODULE_13__modal_dialog_component__["a" /* ModalDialogComponent */]],
        providers: [__WEBPACK_IMPORTED_MODULE_11__selected_tab_service__["a" /* SelectedTabService */], __WEBPACK_IMPORTED_MODULE_18__froala_text_editor_service__["a" /* FroalaEditorService */]]
    })
], CustomizeModule);

//# sourceMappingURL=customize.module.js.map

/***/ }),

/***/ 410:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modal_dialog_component__ = __webpack_require__(416);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__selected_tab_service__ = __webpack_require__(419);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_error_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_progress_bar_service__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_app_backend_service__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__basic_model_types_class__ = __webpack_require__(411);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return filesUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BasicComponentClass; });










// export interface ISomeObj {
//     [key: string]: any;
// }
// interface IImagesProps {
//     type: 'image';
//     id: string;
//     links: {
//         self: string;
//     };
// }
// interface IPublicImgs {
//     isRequestSent: boolean;
//     forChip: boolean;
//     data?: Array<IImagesProps>;
// }
var filesUrl = '/api/files';
var BasicComponentClass = (function () {
    function BasicComponentClass(injector) {
        this.tabIndex = 0;
        this.modalData = { message: 'Please specify group name', placeholder: 'Group name' };
        this.notSpecifiedMessage = '[Not Specified]';
        this._componentModelsArray = [];
        this._isRequestSent = false;
        this._isEditing = false;
        this.publicImages = { isRequestSent: false, forChip: false };
        this._dialog = injector.get(__WEBPACK_IMPORTED_MODULE_1__angular_material__["d" /* MdDialog */]);
        this._selectedTabService = injector.get(__WEBPACK_IMPORTED_MODULE_5__selected_tab_service__["a" /* SelectedTabService */]);
        this._errorService = injector.get(__WEBPACK_IMPORTED_MODULE_6_app_error_service__["a" /* ErrorEmmiter */]);
        this._backendService = injector.get(__WEBPACK_IMPORTED_MODULE_8_app_backend_service__["a" /* BackendService */]);
        this._progressBarService = injector.get(__WEBPACK_IMPORTED_MODULE_7_app_progress_bar_service__["a" /* ProgressBarService */]);
        this._changeDetectorRef = injector.get(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Y" /* ChangeDetectorRef */]);
        this._sanitizer = injector.get(__WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["f" /* DomSanitizer */]);
    }
    BasicComponentClass.prototype._sanitize = function (content) {
        return this._sanitizer.bypassSecurityTrustHtml(content);
    };
    BasicComponentClass.prototype._setArrayOfComponentModels = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this._componentModelsArray).push.apply(_a, args);
        var _a;
    };
    BasicComponentClass.prototype._clearModel = function (modelItem) {
        if (modelItem instanceof __WEBPACK_IMPORTED_MODULE_9__basic_model_types_class__["b" /* ModelBasic */]) {
            for (var prop in modelItem) {
                if (typeof modelItem[prop] === 'boolean') {
                    modelItem[prop] = false;
                }
                else if (prop === 'sanitizedContent') {
                    /*typeof model[prop] === 'object' && !(model[prop] instanceof HTMLImageElement)*/
                    continue;
                }
                else {
                    delete modelItem[prop];
                }
            }
        }
        else if (modelItem instanceof __WEBPACK_IMPORTED_MODULE_9__basic_model_types_class__["c" /* ModelChip */]) {
            for (var prop in modelItem) {
                if (prop in modelItem) {
                    delete modelItem[prop];
                }
            }
        }
    };
    BasicComponentClass.prototype._clearAllModels = function (model) {
        var modelArray = Array.isArray(model) ? model : [model];
        for (var _i = 0, modelArray_1 = modelArray; _i < modelArray_1.length; _i++) {
            var modelItem = modelArray_1[_i];
            if (Array.isArray(modelItem)) {
                this._clearAllModels(modelItem);
            }
            else {
                this._clearModel(modelItem);
            }
        }
    };
    BasicComponentClass.prototype._resetAllModels = function () {
        if (Array.isArray(this._componentModelsArray) && this._componentModelsArray.length > 0) {
            this._clearAllModels(this._componentModelsArray);
        }
        else {
            var OwnPropertyNamesArr = Object.getOwnPropertyNames(this);
            for (var _i = 0, OwnPropertyNamesArr_1 = OwnPropertyNamesArr; _i < OwnPropertyNamesArr_1.length; _i++) {
                var item = OwnPropertyNamesArr_1[_i];
                var objProp = this[item];
                this._clearAllModels(objProp);
            }
        }
        this._isEditing = false;
    };
    BasicComponentClass.prototype._isArrayOfModelEditing = function (model) {
        for (var _i = 0, _a = model || this._componentModelsArray; _i < _a.length; _i++) {
            var itemModel = _a[_i];
            if (Array.isArray(itemModel)) {
                var recursionResult = this._isArrayOfModelEditing(itemModel);
                if (recursionResult) {
                    return true;
                }
            }
            else {
                if (itemModel instanceof __WEBPACK_IMPORTED_MODULE_9__basic_model_types_class__["b" /* ModelBasic */]) {
                    if (itemModel.isEditing === true) {
                        return true;
                    }
                }
                else if (itemModel instanceof __WEBPACK_IMPORTED_MODULE_9__basic_model_types_class__["c" /* ModelChip */]) {
                    if (itemModel) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    BasicComponentClass.prototype._getResource = function (actionOnSuccess, url, reqOptions) {
        var _this = this;
        if (reqOptions === void 0) { reqOptions = {}; }
        var ReqArgs = Object.assign({ headers: __WEBPACK_IMPORTED_MODULE_8_app_backend_service__["b" /* JSON_API_HEADER_BASIC */] }, reqOptions);
        return this._backendService.sendRequest(url, ReqArgs)
            .then(function (response) {
            var jsonResp = response.json();
            actionOnSuccess.call(_this, jsonResp);
        })
            .catch(function () { return _this._showErrMess(); });
    };
    BasicComponentClass.prototype._setBtn = function (btnRef, value) {
        btnRef.disabled = this._isRequestSent = value;
    };
    BasicComponentClass.prototype._requestBlockers = function (btnRef, value) {
        if (value === void 0) { value = true; }
        this._setBtn(btnRef, value);
        this._progressBarService.emmiter.emit(value);
    };
    BasicComponentClass.prototype._onUpdateSuccess = function (ModelObject, message) {
        this._showSucMess(message);
        this._selectedTabService.isChangesSaved = true;
        this._setModelRecord(ModelObject);
    };
    BasicComponentClass.prototype._showSucMess = function (message) {
        if (message === void 0) { message = 'Changes saved'; }
        this._errorService.emmiter.emit(message);
    };
    BasicComponentClass.prototype._showErrMess = function (flagOrMessage) {
        if (flagOrMessage === void 0) { flagOrMessage = 1; }
        var errorMessage;
        if (typeof flagOrMessage === 'string') {
            errorMessage = flagOrMessage;
        }
        else if (typeof flagOrMessage === 'number') {
            errorMessage = flagOrMessage ? __WEBPACK_IMPORTED_MODULE_6_app_error_service__["c" /* errorMessages */].load : 'Oops, error occured!';
        }
        this._errorService.emmiter.emit(errorMessage);
    };
    BasicComponentClass.prototype._setModelRecord = function (modelTarget) {
        this._objectRecord = JSON.stringify(modelTarget);
    };
    BasicComponentClass.prototype._getModalMessage = function (subject) {
        return "Are you sure to delete " + subject + "?";
    };
    BasicComponentClass.prototype._isEditComplete = function (modelIterableObject) {
        for (var _i = 0, modelIterableObject_1 = modelIterableObject; _i < modelIterableObject_1.length; _i++) {
            var item = modelIterableObject_1[_i];
            if (item) {
                return false;
            }
        }
        return true;
    };
    BasicComponentClass.prototype._cloneObj = function (obj) {
        var objStr = JSON.stringify(obj);
        return JSON.parse(objStr);
    };
    BasicComponentClass.prototype._patchRequest = function (url, _a, reqOptArgs) {
        var id = _a.id, type = _a.type, attr = _a.attr, _b = _a.meta, meta = _b === void 0 ? {} : _b;
        if (reqOptArgs === void 0) { reqOptArgs = {}; }
        reqOptArgs = Object.assign({
            method: __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestMethod */].Patch,
            headers: __WEBPACK_IMPORTED_MODULE_8_app_backend_service__["c" /* JSON_API_HEADER_EXTENDED */],
            body: (id && type && attr) ? this._backendService.serializeResource(type, id, attr, meta) : null
        }, reqOptArgs);
        return this._backendService.sendRequest(url, reqOptArgs);
    };
    BasicComponentClass.prototype._onSaveChanges = function (url, ModelObject, method, headers) {
        var _this = this;
        if (method === void 0) { method = __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* RequestMethod */].Patch; }
        if (headers === void 0) { headers = __WEBPACK_IMPORTED_MODULE_8_app_backend_service__["c" /* JSON_API_HEADER_EXTENDED */]; }
        return function (btnSaveRef, _a) {
            var id = _a.id, type = _a.type, attr = _a.attr;
            if (_this._isRequestSent) {
                return;
            }
            _this._requestBlockers(btnSaveRef);
            return _this._patchRequest(url, { id: id, type: type, attr: attr }, { method: method, headers: headers })
                .then(function () { return _this._onUpdateSuccess(ModelObject); })
                .catch(function () { return _this._showErrMess(0); })
                .then(function () { return _this._requestBlockers(btnSaveRef, false); });
        };
    };
    BasicComponentClass.prototype._setArrayOfModels = function (typeOfModel, length) {
        return Array(length).fill(new typeOfModel);
    };
    BasicComponentClass.prototype._getPublicImages = function (forChip) {
        var _this = this;
        if (forChip === void 0) { forChip = false; }
        if (!this.publicImages.data) {
            if (forChip) {
                this.publicImages.forChip = true;
            }
            this.publicImages.isRequestSent = true;
            this._getResource(function (res) { return _this.publicImages.data = res.data; }, filesUrl, { params: 'fields[locationFlag]=P&fields[type]=0' })
                .then(function () { return _this.publicImages.isRequestSent = false; });
        }
    };
    BasicComponentClass.prototype.getNaturalSize = function (imgRef, property) {
        var _this = this;
        if (!imgRef[property] && !imgRef.onload) {
            imgRef.onload = function () { return _this._changeDetectorRef.detectChanges(); };
        }
        else if (imgRef[property] && imgRef.onload) {
            imgRef.onload = null;
        }
        return imgRef[property];
    };
    BasicComponentClass.prototype.isNeedSaveChanges = function (current) {
        var isDiff = this._objectRecord !== JSON.stringify(current);
        if (isDiff) {
            this._selectedTabService.isChangesSaved = false;
        }
        return isDiff;
    };
    // subject: 'contact' | 'group' | 'slide' | 'tour'
    BasicComponentClass.prototype.openDialog = function (action, subject) {
        var data = typeof subject === 'object' ? this.modalData : this._customDialogMessage || this._getModalMessage(subject);
        var dialogRef = this._dialog.open(__WEBPACK_IMPORTED_MODULE_4__modal_dialog_component__["a" /* ModalDialogComponent */], { data: data });
        var sub = dialogRef
            .afterClosed()
            .subscribe(function (result) {
            if (result) {
                action(result, subject);
                sub.unsubscribe();
            }
        });
    };
    return BasicComponentClass;
}());

//# sourceMappingURL=basic-component.class.js.map

/***/ }),

/***/ 411:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ModelBasic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModelImageService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ModelChip; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ModelBasic = (function () {
    function ModelBasic() {
        this.isEditing = false;
    }
    return ModelBasic;
}());

var ModelImageService = (function (_super) {
    __extends(ModelImageService, _super);
    function ModelImageService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ModelImageService;
}(ModelBasic));

var ModelChip = (function () {
    function ModelChip(item, chipRef) {
        this.chipRef = chipRef;
        this.item = Object.assign({}, item);
    }
    return ModelChip;
}());

//# sourceMappingURL=basic-model-types.class.js.map

/***/ }),

/***/ 412:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__basic_component_class__ = __webpack_require__(410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__basic_model_types_class__ = __webpack_require__(411);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BasicActionsComponent; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


// interface IClickedImage {
//     clickedImgRef?: HTMLImageElement;
// }
// interface IModelService extends IClickedImage {
//     content?: any;
//     isEditing: boolean;
// }
// export interface IEditedChip extends IClickedImage {
//     chipRef: MdChip;
//     item: IChipProps;
// }
// export interface IChipProps {
//     destination: string;
//     avatar: string;
//     starCount: number;
// }
// interface IOkActionParams {
//     flag?: 'CHIP';
//     index?: number;
//     subject: ISomeObj;
//     prop?: keyof ISomeObj;
//     model: IModelService | Array<IEditedChip>;
// }
// export class ModelBasic {
//     isEditing = false;
//     content: any;
// }
// export class ModelImageService extends ModelBasic {
//     clickedImgRef: HTMLImageElement;
// }
// export class ModelChip {
//     item: IChipProps;
//     constructor(item: IChipProps, public chipRef: MdChip) {
//         this.item = Object.assign({}, item);
//     }
// }
var BasicActionsComponent = (function (_super) {
    __extends(BasicActionsComponent, _super);
    function BasicActionsComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BasicActionsComponent.prototype.onEdit = function (slideProp, model, flag, isEditingMark, forChipFlag) {
        if (isEditingMark === void 0) { isEditingMark = true; }
        if (forChipFlag === void 0) { forChipFlag = false; }
        // if (flag === 'i') {
        //     this._getPublicImages();
        // }
        if (typeof model !== 'object') {
            throw new Error('Model must to be an object');
        }
        this._isEditing = model.isEditing = true;
        if (flag === 'i') {
            this._getPublicImages(forChipFlag);
        }
        if (!isEditingMark) {
            this._isEditing = false;
        }
        model.content = slideProp;
    };
    BasicActionsComponent.prototype.onBackgroundImgClick = function (model, image, slideImgRef) {
        model.content = image.links.self;
        this._clickImageHelper(model, slideImgRef);
    };
    BasicActionsComponent.prototype.onOk = function (_a) {
        var subject = _a.subject, prop = _a.prop, model = _a.model, flag = _a.flag, index = _a.index;
        switch (flag) {
            case 'CHIP':
                {
                    var modelChipItem = model[index].item;
                    for (var p in modelChipItem) {
                        if (p in modelChipItem) {
                            subject[p] = modelChipItem[p];
                        }
                    }
                }
                break;
            default: {
                subject[prop] = model.content;
            }
        }
        this.onCancelEdit(model, flag, index);
    };
    BasicActionsComponent.prototype.onCancelEdit = function (model, flag, index) {
        switch (flag) {
            case 'CHIP':
                {
                    model[index].chipRef.toggleSelected();
                    delete model[index];
                }
                break;
            default:
                /*for (const prop in model) {
                    if (typeof model[prop] === 'boolean') {
                        model[prop] = false;
                    }else if (typeof model[prop] === 'object' && !(model[prop] instanceof HTMLImageElement)) {
                        continue;
                    }else {
                        delete model[prop];
                    }
                }*/
                this._clearModel(model);
        }
        this._checkEditingState();
    };
    BasicActionsComponent.prototype.onCancelEditSan = function (model, source) {
        this.onCancelEdit(model);
        model.sanitizedContent = this._sanitize(source || this.notSpecifiedMessage);
    };
    BasicActionsComponent.prototype.onAddNewItem = function (subjectModel, modelTemplate) {
        subjectModel.push(modelTemplate);
    };
    BasicActionsComponent.prototype.onFroalaModelChange = function (e, model) {
        model.content = e;
        model.sanitizedContent = this._sanitize(model.content);
    };
    BasicActionsComponent.prototype.deleteSubjectBasic = function (personIndex, componentModelArray) {
        var _this = this;
        return function () {
            (componentModelArray || _this.componentModel).splice(personIndex, 1);
            _this._resetAllModels();
        };
    };
    BasicActionsComponent.prototype._clickImageHelper = function (model, imgRef) {
        if (model.clickedImgRef) {
            model.clickedImgRef.style.opacity = '';
        }
        model.clickedImgRef = imgRef;
        imgRef.style.opacity = .5.toString();
    };
    BasicActionsComponent.prototype._checkEditingState = function () {
        var mode = this._componentModelsArray.length > 0 ? 'defined' : null;
        switch (mode) {
            case 'defined':
                {
                    if (this._isArrayOfModelEditing()) {
                        return;
                    }
                }
                break;
            default: {
                var OwnPropertyNamesArr = Object.getOwnPropertyNames(this);
                for (var _i = 0, OwnPropertyNamesArr_1 = OwnPropertyNamesArr; _i < OwnPropertyNamesArr_1.length; _i++) {
                    var item = OwnPropertyNamesArr_1[_i];
                    var objProp = this[item];
                    if ((Array.isArray(objProp) && this._isArrayOfModelEditing(objProp)) ||
                        (objProp instanceof __WEBPACK_IMPORTED_MODULE_1__basic_model_types_class__["b" /* ModelBasic */] && objProp.isEditing)) {
                        return;
                    }
                }
            }
        }
        this._isEditing = false;
    };
    return BasicActionsComponent;
}(__WEBPACK_IMPORTED_MODULE_0__basic_component_class__["a" /* BasicComponentClass */]));

//# sourceMappingURL=basic-actions-component.class.js.map

/***/ }),

/***/ 413:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(11);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return TextEditorOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FroalaEditorService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var FontAwesome = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css';
var CodeMirrorCSS = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.3.0/codemirror.min.css';
var FroalaEditorCSS = 'https://cdnjs.cloudflare.com/ajax/libs/froala-editor/2.6.0/css/froala_editor.pkgd.min.css';
var FroalaStyleCSS = 'https://cdnjs.cloudflare.com/ajax/libs/froala-editor/2.6.0/css/froala_style.min.css';
var CodeViewerPluginCSS = 'https://cdnjs.cloudflare.com/ajax/libs/froala-editor/2.6.0/css/plugins/code_view.min.css';
var PathwayGothicFont = 'https://fonts.googleapis.com/css?family=Pathway+Gothic+One';
var SourceSansProFont = 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,400';
var IndieFlowerFont = 'https://fonts.googleapis.com/css?family=Indie+Flower';
var jQuery = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.0/jquery.min.js';
var CodeMirrorJS = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.25.0/codemirror.min.js';
var CodeMirrorXml = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.25.0/mode/xml/xml.min.js';
var FroalaEditorJS = 'https://cdnjs.cloudflare.com/ajax/libs/froala-editor/2.6.0/js/froala_editor.pkgd.min.js';
var TextEditorOptions = {
    fontFamily: (_a = {
            'Source Sans Pro,sans-serif': 'Source Sans Pro',
            'Arial,Helvetica,sans-serif': 'Arial',
            'Georgia,serif': 'Georgia',
            'Impact,Charcoal,sans-serif': 'Impact',
            'Tahoma,Geneva,sans-serif': 'Tahoma'
        },
        _a["'Times New Roman',Times,serif"] = 'Times New Roman',
        _a['Verdana,Geneva,sans-serif'] = 'Verdana',
        _a['Indie Flower,cursive'] = 'Indie Flower',
        _a['Pathway Gothic One,sans-serif'] = 'Pathway Gothic One',
        _a),
    /*toolbarButtons: [
        'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|',
        'fontFamily', 'fontSize', 'color', 'paragraphStyle', '|',
        'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-',
        'insertLink', '|',
        'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|',
        'help', 'html', '|',
        'undo', 'redo'
        ],*/
    heightMin: 100,
    heightMax: 400,
    pluginsEnabled: ['align', 'charCounter', 'codeBeautifier', 'codeView', 'colors',
        'emoticons', 'entities', 'fontFamily', 'fontSize', 'link', 'lists',
        'paragraphFormat', 'paragraphStyle', 'quote', 'url']
};
var ResourceLinks = {
    css: [
        FontAwesome,
        CodeMirrorCSS,
        FroalaEditorCSS,
        FroalaStyleCSS,
        CodeViewerPluginCSS,
        PathwayGothicFont,
        SourceSansProFont,
        IndieFlowerFont
    ],
    js: [
        {
            lib: jQuery,
            deps: [{ lib: FroalaEditorJS, deps: [] }]
        },
        {
            lib: CodeMirrorJS,
            deps: [{ lib: CodeMirrorXml, deps: [] }]
        }
    ]
};
var FroalaEditorService = (function () {
    function FroalaEditorService(_doc) {
        this._doc = _doc;
        this._isLinksAllocated = false;
    }
    FroalaEditorService.prototype.resolveLinks = function (_renderer2) {
        var _this = this;
        if (this._isLinksAllocated) {
            return;
        }
        var createElemFn = function (tagName) { return _renderer2.createElement(tagName); };
        var appendElemFn = function (appendTo, newElement) { return _renderer2.appendChild(appendTo, newElement); };
        var setPropsJSFn = function (libLink) {
            var newElement = createElemFn('script');
            newElement.src = libLink;
            newElement.type = 'text/javascript';
            appendElemFn(_this._doc.body, newElement);
            return newElement;
        };
        var iterateOverPluginsJS = function (arrOfResorces) {
            var iterator = function (_a) {
                var lib = _a.lib, deps = _a.deps;
                var newElem = setPropsJSFn(lib);
                if (deps.length > 0) {
                    newElem.onload = function () { return iterateOverPluginsJS(deps); };
                }
            };
            arrOfResorces.forEach(iterator);
        };
        for (var resourceType in ResourceLinks) {
            if (resourceType === 'css') {
                ResourceLinks[resourceType].forEach(function (resourceLink) {
                    var newElem = createElemFn('link');
                    newElem.href = resourceLink;
                    newElem.rel = 'stylesheet';
                    newElem.type = 'text/css';
                    appendElemFn(_this._doc.head, newElem);
                });
            }
            else if (resourceType === 'js') {
                iterateOverPluginsJS(ResourceLinks[resourceType]);
            }
        }
        this._isLinksAllocated = true;
    };
    return FroalaEditorService;
}());
FroalaEditorService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Injectable */])(),
    __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* DOCUMENT */])),
    __metadata("design:paramtypes", [Object])
], FroalaEditorService);

var _a;
//# sourceMappingURL=froala-text-editor.service.js.map

/***/ }),

/***/ 415:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__basic_component_class__ = __webpack_require__(410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__froala_text_editor_service__ = __webpack_require__(413);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomizeComponent; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



var CustomizeComponent = (function (_super) {
    __extends(CustomizeComponent, _super);
    function CustomizeComponent(injector, renderer2, froalaEditorService) {
        var _this = _super.call(this, injector) || this;
        froalaEditorService.resolveLinks(renderer2);
        return _this;
    }
    CustomizeComponent.prototype.isActiveStyle = function (childItem) {
        var currentlySelectedChild = this._selectedTabService.currentlySelectedChild;
        return currentlySelectedChild &&
            currentlySelectedChild._name === childItem._name &&
            currentlySelectedChild.isActive;
    };
    CustomizeComponent.prototype.onIntroCardClick = function (item) {
        this._selectedTabService.currentlySelectedTab = item;
        var childrenArray = this._selectedTabService.currentlySelectedTab.children;
        if (childrenArray.length === 1) {
            childrenArray[0].isActive = true;
            this._selectedTabService.currentlySelectedChild = childrenArray[0];
        }
    };
    CustomizeComponent.prototype.onListItemSelected = function (childItem, listItem) {
        return __awaiter(this, void 0, void 0, function () {
            var result, currentlySelectedChild;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (childItem.isActive) {
                            return [2 /*return*/];
                        }
                        if (!!this._selectedTabService.isChangesSaved) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._showModalOnUnsaved()];
                    case 1:
                        result = _a.sent();
                        if (!result) {
                            return [2 /*return*/];
                        }
                        this._selectedTabService.isChangesSaved = true;
                        _a.label = 2;
                    case 2:
                        if (listItem) {
                            this._selectedTabService.currentlySelectedTab = listItem;
                        }
                        childItem.isActive = true;
                        currentlySelectedChild = this._selectedTabService.currentlySelectedChild;
                        if (currentlySelectedChild && currentlySelectedChild.isActive) {
                            this._selectedTabService.currentlySelectedChild.isActive = false;
                        }
                        this._selectedTabService.currentlySelectedChild = childItem;
                        return [2 /*return*/];
                }
            });
        });
    };
    CustomizeComponent.prototype._showModalOnUnsaved = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this._customDialogMessage = 'All changes will be lost, continue?';
            _this.openDialog(resolve);
        });
    };
    return CustomizeComponent;
}(__WEBPACK_IMPORTED_MODULE_1__basic_component_class__["a" /* BasicComponentClass */]));
CustomizeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Component */])({
        selector: 'app-admin-customize',
        template: __webpack_require__(447),
        styles: [__webpack_require__(440)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Z" /* Injector */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Z" /* Injector */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["_19" /* Renderer2 */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["_19" /* Renderer2 */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__froala_text_editor_service__["a" /* FroalaEditorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__froala_text_editor_service__["a" /* FroalaEditorService */]) === "function" && _c || Object])
], CustomizeComponent);

var _a, _b, _c;
//# sourceMappingURL=customize.component.js.map

/***/ }),

/***/ 416:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__(51);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalDialogComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var ModalDialogComponent = (function () {
    function ModalDialogComponent(data, dialogRef) {
        this.data = data;
        this.dialogRef = dialogRef;
    }
    ModalDialogComponent.prototype.ngOnInit = function () {
        this.isDataObject = typeof this.data === 'object';
    };
    return ModalDialogComponent;
}());
ModalDialogComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Component */])({
        selector: 'app-modal-dialog',
        template: "\n        <h3 md-dialog-title>{{isDataObject ? data.message : data}}</h3>\n        <md-dialog-content *ngIf=\"isDataObject\">\n            <div fxLayout=\"row\">\n                <md-input-container style=\"margin:auto\">\n                    <input mdInput [placeholder]=\"data.placeholder\" [(ngModel)]=\"name\">\n                </md-input-container>\n            </div>\n        </md-dialog-content>\n        <md-dialog-actions fxLayout=\"row\" fxLayoutAlign=\"space-between\">\n            <button md-button md-dialog-close>CANCEL</button>\n            <button md-button (click)=\"dialogRef.close(name || true)\">OK</button>\n        </md-dialog-actions>\n    "
    }),
    __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__angular_material__["e" /* MD_DIALOG_DATA */])),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["f" /* MdDialogRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["f" /* MdDialogRef */]) === "function" && _a || Object])
], ModalDialogComponent);

var _a;
//# sourceMappingURL=modal-dialog.component.js.map

/***/ }),

/***/ 417:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_animations__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_scheduler_async__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_scheduler_async___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_scheduler_async__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_scheduler_asap__ = __webpack_require__(464);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_scheduler_asap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_scheduler_asap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_timer__ = __webpack_require__(457);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_timer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_timer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__offers_section_component__ = __webpack_require__(418);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__basic_component_class__ = __webpack_require__(410);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OffersModalComponent; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};










var MenuActions;
(function (MenuActions) {
    MenuActions[MenuActions["Resize"] = 1] = "Resize";
    MenuActions[MenuActions["Timeout"] = 2] = "Timeout";
    MenuActions[MenuActions["Mode"] = 3] = "Mode";
})(MenuActions || (MenuActions = {}));
;
var OffersModalComponent = (function (_super) {
    __extends(OffersModalComponent, _super);
    function OffersModalComponent(document, injector) {
        var _this = _super.call(this, injector) || this;
        _this.document = document;
        _this.selectedMenuItem = MenuActions.Resize;
        return _this;
    }
    Object.defineProperty(OffersModalComponent.prototype, "currentMaxWidth", {
        get: function () {
            var maxWidth = this.offers.meta.maxWidth;
            if (typeof maxWidth === 'number') {
                return maxWidth;
            }
            return parseInt(maxWidth, 10);
        },
        enumerable: true,
        configurable: true
    });
    OffersModalComponent.prototype.selectedMenuAnimHelper = function (value) {
        return this.selectedMenuItem === value ? 'active' : 'inactive';
    };
    OffersModalComponent.prototype.ngAfterViewChecked = function () {
        var _this = this;
        if (this._mdSelect && !this._mdSelect.selected) {
            __WEBPACK_IMPORTED_MODULE_6_rxjs_scheduler_asap__["asap"].schedule(function () {
                _this._mdSelect.options.forEach(function (mdOption) {
                    if (mdOption.value === _this.offers.meta.sliderMode) {
                        mdOption.select();
                    }
                });
            });
        }
        this._center();
    };
    OffersModalComponent.prototype.ngAfterViewInit = function () {
        var _a = this.offers.meta, slideShow = _a.slideShow, sliderMode = _a.sliderMode;
        this._startSideshow(slideShow, sliderMode);
    };
    OffersModalComponent.prototype.ngOnDestroy = function () {
        this._clearTimeout();
    };
    OffersModalComponent.prototype._startSideshow = function (timeout, mode) {
        var _this = this;
        var ModeTimeResolution = mode === 'static' ? 0 : 2000;
        var length = this.imgs.length;
        if (length === 0) {
            return;
        }
        else if (length === 1) {
            this.currentImg = this.imgs.first.nativeElement;
            return this.currentImg.classList.add('S14__vis');
        }
        var it = this.imgs.toArray()[Symbol.iterator]();
        this._sub = this.initializeSlider(timeout)
            .subscribe(function () {
            __WEBPACK_IMPORTED_MODULE_5_rxjs_scheduler_async__["async"].schedule(function () {
                var result = it.next();
                if (result.done) {
                    it = _this.imgs.toArray()[Symbol.iterator]();
                    result = it.next();
                }
                _this.currentImg = result.value.nativeElement;
                _this.currentImg.classList.add('S14__vis');
            }, !_this.currentImg ? 0 : ModeTimeResolution);
        });
    };
    OffersModalComponent.prototype.onSliderInput = function (e) {
        this.resizedMaxWidth = e.value;
    };
    OffersModalComponent.prototype.initializeSlider = function (timeout) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].timer(0, timeout * 1000)
            .do(function () {
            if (_this.previousImg = _this.currentImg) {
                _this.previousImg.classList.remove('S14__vis');
            }
        });
    };
    OffersModalComponent.prototype._clearTimeout = function () {
        if (this._sub) {
            this._sub.unsubscribe();
        }
    };
    OffersModalComponent.prototype._center = function () {
        var _this = this;
        if (this.imgs) {
            this.imgs.forEach(function (elRef) {
                var img = elRef.nativeElement;
                img.style.left = (_this.document.body.offsetWidth - 18 - img.offsetWidth) / 2 + "px";
            });
        }
    };
    OffersModalComponent.prototype.onSliderModeChange = function (_a) {
        var value = _a.value;
        this._sliderMode = value;
        this._clearTimeout();
        this._startSideshow(this._slideShow || this.offers.meta.slideShow, value);
    };
    OffersModalComponent.prototype.onSlideShowChange = function (e) {
        if (this._slideShow === e) {
            return;
        }
        this._slideShow = e;
        this._clearTimeout();
        this._startSideshow(e, this._sliderMode || this.offers.meta.sliderMode);
    };
    OffersModalComponent.prototype.onCancel = function () {
        if (!this._isRequestSent) {
            this.componentRef.destroy();
        }
    };
    OffersModalComponent.prototype.isButtonSaveShow = function () {
        var _a = this, resizedMaxWidth = _a.resizedMaxWidth, _slideShow = _a._slideShow, _sliderMode = _a._sliderMode;
        var _b = this.offers.meta, maxWidth = _b.maxWidth, slideShow = _b.slideShow, sliderMode = _b.sliderMode;
        if ((resizedMaxWidth && maxWidth !== resizedMaxWidth) ||
            (_slideShow && slideShow !== _slideShow) ||
            (_sliderMode && sliderMode !== _sliderMode)) {
            return true;
        }
        return false;
    };
    OffersModalComponent.prototype.onSaveChanges = function (btnSaveRef) {
        var _this = this;
        var _a = this, _isRequestSent = _a._isRequestSent, resizedMaxWidth = _a.resizedMaxWidth, _slideShow = _a._slideShow, _sliderMode = _a._sliderMode;
        var _b = this.offers.meta, maxWidth = _b.maxWidth, slideShow = _b.slideShow, sliderMode = _b.sliderMode;
        if (!_isRequestSent) {
            var attributesObject_1 = {};
            if (resizedMaxWidth && maxWidth !== resizedMaxWidth) {
                attributesObject_1.maxWidth = resizedMaxWidth;
            }
            if (_slideShow && slideShow !== _slideShow) {
                attributesObject_1.slideShow = _slideShow;
            }
            if (_sliderMode && sliderMode !== _sliderMode) {
                attributesObject_1.sliderMode = _sliderMode;
            }
            if (Object.keys(attributesObject_1).length > 0) {
                this._setBtn(btnSaveRef, true);
                return this._patchRequest(__WEBPACK_IMPORTED_MODULE_8__offers_section_component__["b" /* offersURL */], { id: '1', type: 'offers', attr: attributesObject_1 })
                    .then(function () {
                    _this._showSucMess();
                    for (var metaField in attributesObject_1) {
                        if (attributesObject_1[metaField]) {
                            _this.offers.meta[metaField] = attributesObject_1[metaField];
                        }
                    }
                    delete _this._sliderMode;
                    delete _this._slideShow;
                    delete _this.resizedMaxWidth;
                })
                    .catch(function () { return _this._showErrMess(0); })
                    .then(function () {
                    _this._setBtn(btnSaveRef, false);
                });
            }
        }
    };
    return OffersModalComponent;
}(__WEBPACK_IMPORTED_MODULE_9__basic_component_class__["a" /* BasicComponentClass */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* ViewChildren */])('imgRef'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* QueryList */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* QueryList */]) === "function" && _a || Object)
], OffersModalComponent.prototype, "imgs", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_2__angular_material__["g" /* MdSelect */]),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_material__["g" /* MdSelect */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_material__["g" /* MdSelect */]) === "function" && _b || Object)
], OffersModalComponent.prototype, "_mdSelect", void 0);
OffersModalComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Component */])({
        selector: 'app-modal-section',
        template: __webpack_require__(451),
        styles: [__webpack_require__(443)],
        host: {
            'style': 'display:block;position:absolute;z-index:100;top:0;width:100%;min-width:1000px',
            '[@appear]': 'true'
        },
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["a" /* trigger */])('appear', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["b" /* transition */])('void=>*', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["c" /* style */])({ opacity: 0 }),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["d" /* animate */])('1s', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["c" /* style */])({ opacity: 1 }))
                ]),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["b" /* transition */])('*=>void', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["c" /* style */])({ opacity: 1 }),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["d" /* animate */])('1s', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["c" /* style */])({ opacity: 0 }))
                ])
            ]),
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["a" /* trigger */])('menuItemAppear', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["e" /* state */])('active', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["c" /* style */])({ opacity: 1, transform: 'translateY(0)' })),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["e" /* state */])('inactive', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["c" /* style */])({ opacity: 0, transform: 'translateY(-100%)' })),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["b" /* transition */])('inactive=>active', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["d" /* animate */])('300ms 300ms ease-in')
                ]),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["b" /* transition */])('active=>inactive', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["d" /* animate */])('300ms ease-out')
                ])
            ])
        ]
    }),
    __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* DOCUMENT */])),
    __metadata("design:paramtypes", [Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Z" /* Injector */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Z" /* Injector */]) === "function" && _c || Object])
], OffersModalComponent);

var _a, _b, _c;
//# sourceMappingURL=offers-modal.component.js.map

/***/ }),

/***/ 418:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__offers_modal_component__ = __webpack_require__(417);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__basic_component_class__ = __webpack_require__(410);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return offersURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OffersSectionComponent; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var offersURL = '/offers';
var OffersSectionComponent = (function (_super) {
    __extends(OffersSectionComponent, _super);
    function OffersSectionComponent(injector) {
        var _this = _super.call(this, injector) || this;
        _this._isFocused = false;
        _this.isNeedEdit = false;
        return _this;
    }
    OffersSectionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._getResource(function (jsRes) { return _this.offers = jsRes; }, offersURL);
    };
    OffersSectionComponent.prototype.ngAfterViewChecked = function () {
        var _a = this, inputField = _a.inputField, _isFocused = _a._isFocused;
        if (inputField && !_isFocused) {
            inputField.nativeElement.focus();
            this._isFocused = true;
        }
    };
    OffersSectionComponent.prototype.onEdit = function (_a) {
        var _b = _a.attributes.meta, alt = _b.alt, title = _b.title;
        this.isNeedEdit = true;
        this.alt = alt;
        this.title = title;
    };
    OffersSectionComponent.prototype.onOk = function (offer) {
        var _this = this;
        this.isNeedEdit = this._isFocused = false;
        var id = offer.id;
        var _a = this, alt = _a.alt, title = _a.title;
        var resetModels = function () { return _this.alt = _this.title = ''; };
        if (offer.attributes.meta.alt === alt && offer.attributes.meta.title === title) {
            return resetModels();
        }
        var meta = { alt: alt, title: title };
        this._patchRequest(offersURL + "/" + id, { id: id, type: 'offers', attr: { meta: meta } })
            .then(function () { return Object.assign(offer.attributes.meta, meta); })
            .catch(function () { return _this._showErrMess(0); })
            .then(resetModels);
    };
    OffersSectionComponent.prototype.openModal = function () {
        if (this.offers) {
            var OffersModComponent = this._selectedTabService.attachViewToDOM(__WEBPACK_IMPORTED_MODULE_1__offers_modal_component__["a" /* OffersModalComponent */]);
            OffersModComponent.instance.componentRef = OffersModComponent;
            OffersModComponent.instance.offers = this.offers;
        }
    };
    return OffersSectionComponent;
}(__WEBPACK_IMPORTED_MODULE_2__basic_component_class__["a" /* BasicComponentClass */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('inputField'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* ElementRef */]) === "function" && _a || Object)
], OffersSectionComponent.prototype, "inputField", void 0);
OffersSectionComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Component */])({
        selector: 'app-offers-section',
        template: __webpack_require__(452)
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Z" /* Injector */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Z" /* Injector */]) === "function" && _b || Object])
], OffersSectionComponent);

var _a, _b;
//# sourceMappingURL=offers-section.component.js.map

/***/ }),

/***/ 419:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__(51);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectedTabService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var SelectedTabService = (function () {
    function SelectedTabService(_document, _componentFactoryResolver, _appRef, _injector) {
        this._document = _document;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._appRef = _appRef;
        this._injector = _injector;
        this.listOfTabs = [
            {
                header: 'General Site Settings',
                _name: 'contacts',
                ico: 'settings_applications',
                children: [
                    {
                        tabName: 'Site Contacts Info',
                        _name: 'contacts',
                        ico: 'receipt',
                        isActive: false
                    }
                ]
            },
            {
                header: 'Landing Page Settings',
                _name: 'landing',
                ico: 'developer_board',
                children: [
                    {
                        tabName: 'Our Key People (S6)',
                        _name: 'key_people',
                        ico: 'supervisor_account',
                        isActive: false
                    },
                    {
                        tabName: 'Slider Promo Section (S8)',
                        _name: 'slider',
                        ico: 'perm_media',
                        isActive: false
                    },
                    {
                        tabName: 'Customers Reviews(S9)',
                        _name: 'reviews',
                        ico: 'thumbs_up_down',
                        isActive: false
                    },
                    {
                        tabName: 'Our Sponsores(S12)',
                        _name: 'sponsores',
                        ico: 'trending_up',
                        isActive: false
                    },
                    {
                        tabName: 'Offers Section (S14)',
                        _name: 'offers',
                        ico: 'stars',
                        isActive: false
                    }
                ]
            },
            {
                header: 'Administrators Managment',
                _name: 'admin managment system',
                ico: 'face',
                children: []
            },
            {
                header: 'File Storage Manager',
                _name: 'file uploads',
                ico: 'note_add',
                children: [
                    {
                        tabName: 'File Storage',
                        _name: 'file uploads',
                        ico: 'note_add',
                        isActive: false
                    }
                ]
            }
        ];
        this.isChangesSaved = true;
        this._domPortalHost = new __WEBPACK_IMPORTED_MODULE_2__angular_material__["b" /* DomPortalHost */](_document.body, _componentFactoryResolver, _appRef, _injector);
    }
    SelectedTabService.prototype.attachViewToDOM = function (Component) {
        var componentPortal = new __WEBPACK_IMPORTED_MODULE_2__angular_material__["c" /* ComponentPortal */](Component);
        return this._domPortalHost.attachComponentPortal(componentPortal);
    };
    return SelectedTabService;
}());
SelectedTabService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Injectable */])(),
    __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* DOCUMENT */])),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* ComponentFactoryResolver */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* ComponentFactoryResolver */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ApplicationRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ApplicationRef */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Z" /* Injector */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Z" /* Injector */]) === "function" && _c || Object])
], SelectedTabService);

var _a, _b, _c;
//# sourceMappingURL=selected-tab.service.js.map

/***/ }),

/***/ 420:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_scheduler_async__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_scheduler_async___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_scheduler_async__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_debounceTime__ = __webpack_require__(458);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_debounceTime__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SliderPromoModalComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// transform: translateY(-46px);
var hostStyles = [
    'display:block',
    'background-color:#0e1312',
    'position:absolute',
    'top:0',
    'z-index:10',
    'width:100%',
    'min-width:1000px',
    'transition:1s',
    'opacity:0'
];
var SliderPromoModalComponent = (function () {
    function SliderPromoModalComponent() {
    }
    SliderPromoModalComponent.prototype._onMouseMove = function () {
        if (!this._moveSub.closed) {
            this.isActive = true;
        }
    };
    SliderPromoModalComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isActive = true;
        this._modalAnimation = '1';
        this._initSub = __WEBPACK_IMPORTED_MODULE_2_rxjs_scheduler_async__["async"].schedule(function () { return _this.isActive = false; }, 2000);
        this._moveSub = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].fromEvent(window, 'mousemove')
            .do(function () { return _this._initSub.unsubscribe(); })
            .debounceTime(2000)
            .subscribe(function () { return _this.isActive = false; });
    };
    SliderPromoModalComponent.prototype.onCloseModal = function () {
        var _this = this;
        this._modalAnimation = '0';
        this._moveSub.unsubscribe();
        this.isActive = false;
        __WEBPACK_IMPORTED_MODULE_2_rxjs_scheduler_async__["async"].schedule(function () { return _this.componentRef.destroy(); }, 1000);
    };
    return SliderPromoModalComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* HostBinding */])('class.active'),
    __metadata("design:type", Boolean)
], SliderPromoModalComponent.prototype, "isActive", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* HostBinding */])('style.opacity'),
    __metadata("design:type", String)
], SliderPromoModalComponent.prototype, "_modalAnimation", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* HostListener */])('mousemove'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SliderPromoModalComponent.prototype, "_onMouseMove", null);
SliderPromoModalComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Component */])({
        selector: 'app-slider-promo-modal',
        template: __webpack_require__(455),
        styles: [__webpack_require__(444)],
        host: {
            'class': 'slider-promo-mod',
            'style': hostStyles.join(';')
        }
    })
], SliderPromoModalComponent);

//# sourceMappingURL=slider-promo-modal.component.js.map

/***/ }),

/***/ 421:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FroalaEditorDirective; });


var FroalaEditorDirective = (function () {
    function FroalaEditorDirective(el) {
        // editor options
        this._opts = {
            immediateAngularModelUpdate: false,
            angularIgnoreAttrs: null
        };
        this.SPECIAL_TAGS = ['img', 'button', 'input', 'a'];
        this.INNER_HTML_ATTR = 'innerHTML';
        this._hasSpecialTag = false;
        this._listeningEvents = [];
        this._editorInitialized = false;
        this._oldModel = null;
        // Begin ControlValueAccesor methods.
        this.onChange = function (_) { };
        this.onTouched = function () { };
        // froalaModel directive as output: update model if editor contentChanged
        this.froalaModelChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* EventEmitter */]();
        // froalaInit directive as output: send manual editor initialization
        this.froalaInit = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* EventEmitter */]();
        var element = el.nativeElement;
        // check if the element is a special tag
        if (this.SPECIAL_TAGS.indexOf(element.tagName.toLowerCase()) != -1) {
            this._hasSpecialTag = true;
        }
        // jquery wrap and store element
        this._$element = $(element);
    }
    // Form model content changed.
    FroalaEditorDirective.prototype.writeValue = function (content) {
        this.updateEditor(content);
    };
    FroalaEditorDirective.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    FroalaEditorDirective.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    Object.defineProperty(FroalaEditorDirective.prototype, "froalaEditor", {
        // End ControlValueAccesor methods.
        // froalaEditor directive as input: store the editor options
        set: function (opts) {
            this._opts = opts || this._opts;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FroalaEditorDirective.prototype, "froalaModel", {
        // froalaModel directive as input: store initial editor content
        set: function (content) {
            this.updateEditor(content);
        },
        enumerable: true,
        configurable: true
    });
    // Update editor with model contents.
    FroalaEditorDirective.prototype.updateEditor = function (content) {
        if (JSON.stringify(this._oldModel) == JSON.stringify(content)) {
            return;
        }
        this._model = content;
        if (this._editorInitialized) {
            this.setContent();
        }
    };
    // update model if editor contentChanged
    FroalaEditorDirective.prototype.updateModel = function () {
        var modelContent = null;
        if (this._hasSpecialTag) {
            var attributeNodes = this._$element[0].attributes;
            var attrs = {};
            for (var i = 0; i < attributeNodes.length; i++) {
                var attrName = attributeNodes[i].name;
                if (this._opts.angularIgnoreAttrs && this._opts.angularIgnoreAttrs.indexOf(attrName) != -1) {
                    continue;
                }
                attrs[attrName] = attributeNodes[i].value;
            }
            if (this._$element[0].innerHTML) {
                attrs[this.INNER_HTML_ATTR] = this._$element[0].innerHTML;
            }
            modelContent = attrs;
        }
        else {
            var returnedHtml = this._$element.froalaEditor('html.get');
            if (typeof returnedHtml === 'string') {
                modelContent = returnedHtml;
            }
        }
        this._oldModel = modelContent;
        // Update froalaModel.
        this.froalaModelChange.emit(modelContent);
        // Update form model.
        this.onChange(modelContent);
    };
    // register event on jquery element
    FroalaEditorDirective.prototype.registerEvent = function (element, eventName, callback) {
        if (!element || !eventName || !callback) {
            return;
        }
        this._listeningEvents.push(eventName);
        element.on(eventName, callback);
    };
    FroalaEditorDirective.prototype.initListeners = function () {
        var self = this;
        // bind contentChange and keyup event to froalaModel
        this.registerEvent(this._$element, 'froalaEditor.contentChanged', function () {
            setTimeout(function () {
                self.updateModel();
            }, 0);
        });
        if (this._opts.immediateAngularModelUpdate) {
            this.registerEvent(this._editor, 'keyup', function () {
                setTimeout(function () {
                    self.updateModel();
                }, 0);
            });
        }
    };
    // register events from editor options
    FroalaEditorDirective.prototype.registerFroalaEvents = function () {
        if (!this._opts.events) {
            return;
        }
        for (var eventName in this._opts.events) {
            if (this._opts.events.hasOwnProperty(eventName)) {
                this.registerEvent(this._$element, eventName, this._opts.events[eventName]);
            }
        }
    };
    FroalaEditorDirective.prototype.createEditor = function () {
        if (this._editorInitialized) {
            return;
        }
        this.setContent(true);
        // Registering events before initializing the editor will bind the initialized event correctly.
        this.registerFroalaEvents();
        // init editor
        this._editor = this._$element.froalaEditor(this._opts).data('froala.editor').$el;
        this.initListeners();
        this._editorInitialized = true;
    };
    FroalaEditorDirective.prototype.setHtml = function () {
        this._$element.froalaEditor('html.set', this._model || '', true);
        //This will reset the undo stack everytime the model changes externally. Can we fix this?
        this._$element.froalaEditor('undo.reset');
        this._$element.froalaEditor('undo.saveStep');
    };
    FroalaEditorDirective.prototype.setContent = function (firstTime) {
        if (firstTime === void 0) { firstTime = false; }
        var self = this;
        // set initial content
        if (this._model || this._model == '') {
            this._oldModel = this._model;
            if (this._hasSpecialTag) {
                var tags = this._model;
                // add tags on element
                if (tags) {
                    for (var attr in tags) {
                        if (tags.hasOwnProperty(attr) && attr != this.INNER_HTML_ATTR) {
                            this._$element.attr(attr, tags[attr]);
                        }
                    }
                    if (tags.hasOwnProperty(this.INNER_HTML_ATTR)) {
                        this._$element[0].innerHTML = tags[this.INNER_HTML_ATTR];
                    }
                }
            }
            else {
                if (firstTime) {
                    this.registerEvent(this._$element, 'froalaEditor.initialized', function () {
                        self.setHtml();
                    });
                }
                else {
                    self.setHtml();
                }
            }
        }
    };
    FroalaEditorDirective.prototype.destroyEditor = function () {
        if (this._editorInitialized) {
            this._$element.off(this._listeningEvents.join(" "));
            this._editor.off('keyup');
            this._$element.froalaEditor('destroy');
            this._listeningEvents.length = 0;
            this._editorInitialized = false;
        }
    };
    FroalaEditorDirective.prototype.getEditor = function () {
        if (this._$element) {
            return this._$element.froalaEditor.bind(this._$element);
        }
        return null;
    };
    // send manual editor initialization
    FroalaEditorDirective.prototype.generateManualController = function () {
        var self = this;
        var controls = {
            initialize: this.createEditor.bind(this),
            destroy: this.destroyEditor.bind(this),
            getEditor: this.getEditor.bind(this),
        };
        this.froalaInit.emit(controls);
    };
    // TODO not sure if ngOnInit is executed after @inputs
    FroalaEditorDirective.prototype.ngOnInit = function () {
        // check if output froalaInit is present. Maybe observers is private and should not be used?? TODO how to better test that an output directive is present.
        if (!this.froalaInit.observers.length) {
            this.createEditor();
        }
        else {
            this.generateManualController();
        }
    };
    FroalaEditorDirective.prototype.ngOnDestroy = function () {
        this.destroyEditor();
    };
    FroalaEditorDirective.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* Directive */], args: [{
                    selector: '[froalaEditor]',
                    providers: [{
                            provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* NG_VALUE_ACCESSOR */], useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* forwardRef */])(function () { return FroalaEditorDirective; }),
                            multi: true
                        }]
                },] },
    ];
    /** @nocollapse */
    FroalaEditorDirective.ctorParameters = function () { return [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* ElementRef */], },
    ]; };
    FroalaEditorDirective.propDecorators = {
        'froalaEditor': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* Input */] },],
        'froalaModel': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* Input */] },],
        'froalaModelChange': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Output */] },],
        'froalaInit': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Output */] },],
    };
    return FroalaEditorDirective;
}());
//# sourceMappingURL=editor.directive.js.map

/***/ }),

/***/ 422:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__editor_directive__ = __webpack_require__(421);
/* unused harmony reexport FroalaEditorDirective */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__editor_module__ = __webpack_require__(436);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__editor_module__["a"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ 423:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__view_directive__ = __webpack_require__(424);
/* unused harmony reexport FroalaViewDirective */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__view_module__ = __webpack_require__(438);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__view_module__["a"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ 424:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FroalaViewDirective; });

var FroalaViewDirective = (function () {
    function FroalaViewDirective(renderer, element) {
        this.renderer = renderer;
        this._element = element.nativeElement;
    }
    Object.defineProperty(FroalaViewDirective.prototype, "froalaView", {
        // update content model as it comes
        set: function (content) {
            this._element.innerHTML = content;
        },
        enumerable: true,
        configurable: true
    });
    FroalaViewDirective.prototype.ngAfterViewInit = function () {
        this.renderer.setElementClass(this._element, "fr-view", true);
    };
    FroalaViewDirective.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* Directive */], args: [{
                    selector: '[froalaView]'
                },] },
    ];
    /** @nocollapse */
    FroalaViewDirective.ctorParameters = function () { return [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Renderer */], },
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* ElementRef */], },
    ]; };
    FroalaViewDirective.propDecorators = {
        'froalaView': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* Input */] },],
    };
    return FroalaViewDirective;
}());
//# sourceMappingURL=view.directive.js.map

/***/ }),

/***/ 426:
/***/ (function(module, exports) {

;
//# sourceMappingURL=Interfaces.js.map

/***/ }),

/***/ 427:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__basic_actions_component_class__ = __webpack_require__(412);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__basic_model_types_class__ = __webpack_require__(411);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__froala_text_editor_service__ = __webpack_require__(413);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerReviewsComponent; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CustomerReviewsComponent = (function (_super) {
    __extends(CustomerReviewsComponent, _super);
    function CustomerReviewsComponent(injector) {
        var _this = _super.call(this, injector) || this;
        _this._resourceUrl = '/api/customer-reviews';
        _this.editorOpts = __WEBPACK_IMPORTED_MODULE_3__froala_text_editor_service__["b" /* TextEditorOptions */];
        _this.avatarModel = new __WEBPACK_IMPORTED_MODULE_2__basic_model_types_class__["a" /* ModelImageService */];
        _this.nameModel = new __WEBPACK_IMPORTED_MODULE_2__basic_model_types_class__["b" /* ModelBasic */];
        _this.designationModel = new __WEBPACK_IMPORTED_MODULE_2__basic_model_types_class__["b" /* ModelBasic */];
        _this.reviewModel = new __WEBPACK_IMPORTED_MODULE_2__basic_model_types_class__["b" /* ModelBasic */];
        _this._setArrayOfComponentModels(_this.avatarModel, _this.nameModel, _this.designationModel, _this.reviewModel);
        return _this;
    }
    CustomerReviewsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._getResource(function (jsRes) {
            _this._setModelRecord(_this.componentModel = jsRes.data.attributes.customerReviews);
            var selectedTab = Array.isArray(_this.componentModel) && _this.componentModel[_this.tabIndex];
            _this.reviewModel.sanitizedContent = _this._sanitize((selectedTab && selectedTab.review) || _this.notSpecifiedMessage);
        }, this._resourceUrl);
    };
    Object.defineProperty(CustomerReviewsComponent.prototype, "templateNewPerson", {
        get: function () {
            return { avatarUrl: '', name: '', designation: '', review: '' };
        },
        enumerable: true,
        configurable: true
    });
    CustomerReviewsComponent.prototype.onTabChange = function (_a) {
        var index = _a.index;
        this.reviewModel.sanitizedContent = this._sanitize(this.componentModel[index].review || this.notSpecifiedMessage);
    };
    CustomerReviewsComponent.prototype.onSave = function (btnSaveRef) {
        _super.prototype._onSaveChanges.call(this, this._resourceUrl, this.componentModel)(btnSaveRef, { id: '1', type: 'customer_reviews', attr: { customerReviews: this.componentModel } });
    };
    CustomerReviewsComponent.prototype.deleteSubjectBasic = function (reviewIndex, componentModelArray) {
        var _this = this;
        return function () {
            _super.prototype.deleteSubjectBasic.call(_this, reviewIndex, componentModelArray)();
            var arrayItem = _this.componentModel[_this.tabIndex];
            _this.reviewModel.sanitizedContent = _this._sanitize((arrayItem && arrayItem.review) || _this.notSpecifiedMessage);
        };
    };
    return CustomerReviewsComponent;
}(__WEBPACK_IMPORTED_MODULE_1__basic_actions_component_class__["a" /* BasicActionsComponent */]));
CustomerReviewsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Component */])({
        selector: 'app-customer-reviews',
        template: __webpack_require__(446),
        styles: ["\n        .tab-avatar {\n            width:30px;\n            height:30px;\n            border-radius:50%;\n            position:relative;\n            top:8px\n        }\n        .align-cards {\n            width:92%;\n            margin:30px 0\n        }\n        h3 {\n            color: rgba(0,0,0,.54);\n        }\n        .action-btn-cont {\n            margin-top:10px;\n        }\n        .ok-btn-gap {\n            margin-left:40px\n        }\n    "]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Z" /* Injector */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Z" /* Injector */]) === "function" && _a || Object])
], CustomerReviewsComponent);

var _a;
//# sourceMappingURL=customer-reviews.component.js.map

/***/ }),

/***/ 428:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__customize_component__ = __webpack_require__(415);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomizeRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ROUTES = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_2__customize_component__["a" /* CustomizeComponent */]
    }
];
var CustomizeRoutingModule = (function () {
    function CustomizeRoutingModule() {
    }
    return CustomizeRoutingModule;
}());
CustomizeRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forChild(ROUTES)
        ],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]]
    })
], CustomizeRoutingModule);

//# sourceMappingURL=customize-routing.module.js.map

/***/ }),

/***/ 429:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_scheduler_async__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_scheduler_async___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_scheduler_async__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__basic_component_class__ = __webpack_require__(410);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileStorageBasic; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var FileStorageBasic = (function (_super) {
    __extends(FileStorageBasic, _super);
    function FileStorageBasic() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._downloadFilesURL = '/api/download';
        _this._FTP_Empty_flags = {
            'file storage': !!1,
            'public images': !!1,
            'offers': !!1,
            'public media': !!1,
            'public docs': !!1
        };
        _this.allowedFileTypes = {
            images: {
                mimes: 'image/jpeg,image/png,image/gif,image/tiff,image/bmp,',
                exts: ['jpg', 'jpeg', 'png', 'gif', 'tiff', 'bmp', 'jfif']
            },
            media: {
                mimes: 'video/avi,video/mp4,video/x-flv,video/webm,video/ogg,audio/mp3,audio/ogg,audio/webm,audio/x-wav,audio/aac,',
                exts: ['avi', 'mp4', 'flv', 'webm', 'ogv', 'ogg', 'mp3', 'weba', 'wav', 'oga', 'aac']
            },
            docs: {
                mimes: 'application/pdf,text/plain,application/msword',
                exts: ['pdf', 'txt', 'doc', 'docx']
            }
        };
        _this.tabs = [
            {
                name: 'file storage',
                flag: 'S'
            },
            {
                name: 'public images',
                flag: 'P'
            },
            {
                name: 'offers',
                flag: 'O'
            },
            {
                name: 'public media',
                flag: 'P'
            },
            {
                name: 'public docs',
                flag: 'P'
            }
        ];
        _this.renameFileFields = {
            modelFileName: '',
            fileId: '',
            fileExt: '',
            cancelAll: function () {
                this.modelFileName = this.fileId = this.fileExt = '';
            }
        };
        return _this;
    }
    FileStorageBasic.prototype._fetchAllFiles = function () {
        var _this = this;
        if (FileStorageBasic._files) {
            this.filesResponse = FileStorageBasic._files;
            return Promise.resolve(this.filesResponse.data);
        }
        return this._getResource(function (jsRes) { return FileStorageBasic._files = _this.filesResponse = jsRes; }, __WEBPACK_IMPORTED_MODULE_2__basic_component_class__["b" /* filesUrl */])
            .then(function () { return !_this.filesResponse ? [] : _this.filesResponse.data; });
    };
    FileStorageBasic.prototype.MOVE = function (file, response, moveToFlag) {
        var status = response.status, ok = response.ok;
        var dataResponse = response.json();
        if (ok && status === 200 && file.id === dataResponse.data.id) {
            file.attributes.locationFlag = moveToFlag;
            file.links.self = dataResponse.links.self;
        }
    };
    FileStorageBasic.prototype.RENAME = function (file, response) {
        var status = response.status, ok = response.ok;
        if (ok && status === 204) {
            var _a = this.renameFileFields, modelFileName = _a.modelFileName, fileExt = _a.fileExt;
            file.attributes.fileName = modelFileName + "." + fileExt;
            this._notifyQQ(file, 'RENAME');
        }
    };
    FileStorageBasic.prototype.DELETE = function (file, response, index) {
        var status = response.status, ok = response.ok;
        if (ok && status === 204) {
            this.filesResponse.data.splice(index, 1);
            this._notifyQQ(file, 'DELETE');
        }
    };
    FileStorageBasic.prototype.DOWNLOAD = function (file) {
        var id = file.id, _a = file.attributes, fileName = _a.fileName, locationFlag = _a.locationFlag;
        return window.location.href = this._downloadFilesURL + "?id=" + id + "&file=" + fileName + "&location=" + locationFlag;
    };
    FileStorageBasic.prototype._requestSender = function (file, ACTION, metaInfo) {
        var _this = this;
        if (this._isRequestSent) {
            return;
        }
        this._isRequestSent = true;
        var id = file.id, _a = file.attributes, fileName = _a.fileName, locationFlag = _a.locationFlag, fileSize = _a.fileSize;
        var baseObject = { fileName: fileName, locationFlag: locationFlag };
        var meta = { ACTION: ACTION };
        var method = __WEBPACK_IMPORTED_MODULE_0__angular_http__["c" /* RequestMethod */].Patch;
        switch (ACTION) {
            case 'MOVE':
                meta = Object.assign(meta, { newLocation: metaInfo });
                break;
            case 'RENAME':
                meta = Object.assign(meta, { newName: this.renameFileFields.modelFileName + "." + this.renameFileFields.fileExt });
                break;
            case 'DELETE': {
                baseObject = Object.assign(baseObject, { fileSize: fileSize });
                method = __WEBPACK_IMPORTED_MODULE_0__angular_http__["c" /* RequestMethod */].Delete;
            }
        }
        if (ACTION !== 'RENAME') {
            this._progressBarService.emmiter.emit(true);
        }
        return this._patchRequest(__WEBPACK_IMPORTED_MODULE_2__basic_component_class__["b" /* filesUrl */] + "/" + file.id, { id: id, type: 'files', attr: baseObject, meta: meta }, { method: method })
            .then(function (response) { return _this[ACTION](file, response, metaInfo); })
            .catch(function () { return _this._showErrMess(0); })
            .then(function () {
            _this._isRequestSent = false;
            _this.renameFileFields.cancelAll();
            _this._setFTP_Flags_IsEmpty();
            if (ACTION !== 'RENAME') {
                _this._progressBarService.emmiter.emit(false);
            }
        });
    };
    FileStorageBasic.prototype._notifyQQ = function (renamedFileProps, action) {
        var fileQQArray = this.UPLOADER.getUploads({ status: this.qq.status.UPLOAD_SUCCESSFUL });
        for (var _i = 0, fileQQArray_1 = fileQQArray; _i < fileQQArray_1.length; _i++) {
            var _a = fileQQArray_1[_i], id = _a.id, uuid = _a.uuid, status = _a.status;
            if (uuid === renamedFileProps.id && status === 'upload successful') {
                switch (action) {
                    case 'RENAME':
                        this.UPLOADER.setName(id, renamedFileProps.attributes.fileName);
                        break;
                    case 'DELETE':
                        this.UPLOADER.cancel(id);
                }
            }
        }
    };
    FileStorageBasic.prototype._addFileOnComplete__QQ = function (uploadedFileProps) {
        this.filesResponse.data.push(uploadedFileProps);
        this._setFTP_Flags_IsEmpty();
    };
    FileStorageBasic.prototype._removeFileOnDelete__QQ = function (deletedPayload) {
        var _loop_1 = function (deletedItem) {
            var uuid = deletedItem.uuid, status = deletedItem.status;
            if (uuid && status === 'deleted') {
                this_1.filesResponse.data.forEach(function (file, i, arrayFiles) {
                    if (file.id === uuid) {
                        arrayFiles.splice(i, 1);
                    }
                });
            }
        };
        var this_1 = this;
        for (var _i = 0, deletedPayload_1 = deletedPayload; _i < deletedPayload_1.length; _i++) {
            var deletedItem = deletedPayload_1[_i];
            _loop_1(deletedItem);
        }
        this._setFTP_Flags_IsEmpty();
    };
    FileStorageBasic.prototype._getFileExt = function (fileName) {
        return fileName.split('.')[1];
    };
    FileStorageBasic.prototype._setFTP_Flags_IsEmpty = function (allFiles) {
        var _this = this;
        var FilesToIterate = allFiles || this.filesResponse.data;
        var _a = this.allowedFileTypes, images = _a.images, media = _a.media, docs = _a.docs;
        var _indicators = Array(this.tabs.length).fill(!!1);
        for (var _i = 0, FilesToIterate_1 = FilesToIterate; _i < FilesToIterate_1.length; _i++) {
            var _b = FilesToIterate_1[_i].attributes, locationFlag = _b.locationFlag, fileName = _b.fileName;
            if (locationFlag === this.tabs[0].flag && _indicators[0]) {
                delete _indicators[0];
                this._FTP_Empty_flags[this.tabs[0].name] = false;
            }
            else if (locationFlag === this.tabs[1].flag && _indicators[1] && images.exts.includes(this._getFileExt(fileName))) {
                delete _indicators[1];
                this._FTP_Empty_flags[this.tabs[1].name] = false;
                // for offers only images
            }
            else if (locationFlag === this.tabs[2].flag && _indicators[2] && images.exts.includes(this._getFileExt(fileName))) {
                delete _indicators[2];
                this._FTP_Empty_flags[this.tabs[2].name] = false;
            }
            else if (locationFlag === this.tabs[3].flag && _indicators[3] && media.exts.includes(this._getFileExt(fileName))) {
                delete _indicators[3];
                this._FTP_Empty_flags[this.tabs[3].name] = false;
            }
            else if (locationFlag === this.tabs[4].flag && _indicators[4] && docs.exts.includes(this._getFileExt(fileName))) {
                delete _indicators[4];
                this._FTP_Empty_flags[this.tabs[4].name] = false;
            }
        }
        _indicators.forEach(function (item, i) {
            if (item) {
                _this._FTP_Empty_flags[_this.tabs[i].name] = true;
            }
        });
    };
    FileStorageBasic.prototype._concatFilePropsTypes = function () {
        var mimes = '', exts = [];
        for (var fileType in this.allowedFileTypes) {
            if (typeof this.allowedFileTypes[fileType] === 'object') {
                mimes += this.allowedFileTypes[fileType].mimes;
                exts = exts.concat(this.allowedFileTypes[fileType].exts);
            }
        }
        return [mimes, exts];
    };
    FileStorageBasic.prototype._onFileStorageActive = function () {
        var _this = this;
        var $this = this;
        var allowedFileTypesArr = this._concatFilePropsTypes();
        __webpack_require__.e/* import() */(5).then(__webpack_require__.bind(null, 468)).then(function (qq) {
            _this.qq = qq;
            _this.UPLOADER = new qq.FineUploader({
                debug: true,
                element: document.getElementById('fine-uploader'),
                template: 'qq-simple-thumbnails-template',
                thumbnails: {
                    placeholders: {
                        waitingPath: '/images/file-uploader/waiting-generic.png',
                        notAvailablePath: '/images/file-uploader/not_available-generic.png'
                    }
                },
                request: {
                    endpoint: '/api/uploads/'
                },
                deleteFile: {
                    enabled: true,
                    endpoint: '/api/uploads'
                },
                retry: {
                    enableAuto: true
                },
                validation: {
                    acceptFiles: allowedFileTypesArr[0],
                    allowedExtensions: allowedFileTypesArr[1]
                },
                callbacks: {
                    onError: function (id, name, errorReason, xhrOrXdr) {
                        _this._showErrMess(errorReason);
                    },
                    onComplete: function (id, name, responseJSON, xhr) {
                        this.setName(id, responseJSON.data.attributes.fileName);
                        if (responseJSON.success) {
                            $this._addFileOnComplete__QQ(responseJSON.data);
                        }
                    },
                    onDeleteComplete: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        var isError = args[2];
                        if (!isError) {
                            $this._removeFileOnDelete__QQ(this.getUploads({ status: qq.status.DELETED }));
                            if (this.getNetUploads() === 0) {
                                this.reset();
                            }
                        }
                    },
                    onCancel: function (id, name) {
                        var _this = this;
                        var dropArea = document.querySelector('.qq-upload-list-selector');
                        __WEBPACK_IMPORTED_MODULE_1_rxjs_scheduler_async__["async"].schedule(function () {
                            if (!dropArea.firstElementChild) {
                                _this.reset();
                            }
                        }, 50);
                    },
                    onSubmitDelete: function () {
                        if ($this._isRequestSent) {
                            return false;
                        }
                    }
                }
            });
            _this._f_u__Patch(_this.UPLOADER);
        }).catch(function (err) { return _this._showErrMess(err.message); });
    };
    FileStorageBasic.prototype._sanitizeTemplate = function () {
        // tslint:disable-next-line:max-line-length
        var styles = ".qq-btn{box-shadow:0 1px 1px rgba(255,255,255,.37) inset,1px 0 1px rgba(255,255,255,.07) inset,0 1px 0 rgba(0,0,0,.36),0 -2px 12px rgba(0,0,0,.08) inset;padding:3px 4px;border:1px solid #ccc;border-radius:2px;color:inherit;background-color:#fff}.qq-upload-continue,.qq-upload-delete,.qq-upload-pause{display:inline}.qq-upload-delete{background-color:#e65c47;color:#fafafa;border-color:#dc523d;text-shadow:0 1px 1px rgba(0,0,0,.55)}.qq-upload-delete:hover{background-color:#f56b56}.qq-upload-cancel{background-color:#f5d7d7;border-color:#e6c8c8}.qq-upload-cancel:hover{background-color:#ffe1e1}.qq-upload-retry{background-color:#ebf6e0;border-color:#d2ddc7}.qq-upload-retry:hover{background-color:#f7ffec}.qq-upload-continue,.qq-upload-pause{background-color:#00abc7;color:#fafafa;border-color:#2dadc2;text-shadow:0 1px 1px rgba(0,0,0,.55)}.qq-upload-continue:hover,.qq-upload-pause:hover{background-color:#0fbad6}.qq-upload-button{display:inline;width:105px;margin-bottom:10px;padding:7px 10px;text-align:center;float:left;background:#00abc7;color:#fff;border-radius:2px;border:1px solid #2dadc2;box-shadow:0 1px 1px rgba(255,255,255,.37) inset,1px 0 1px rgba(255,255,255,.07) inset,0 1px 0 rgba(0,0,0,.36),0 -2px 12px rgba(0,0,0,.08) inset}.qq-upload-button-hover{background:#33b6cc}.qq-upload-button-focus{outline:1px dotted #000}.qq-uploader{position:relative;min-height:200px;max-height:490px;overflow-y:hidden;width:inherit;border-radius:6px;background-color:#fdfdfd;border:1px dashed #ccc;padding:20px}.qq-uploader:before{content:attr(qq-drop-area-text) \" \";position:absolute;font-size:200%;left:0;width:100%;text-align:center;top:45%;opacity:.25}.qq-upload-drop-area,.qq-upload-extra-drop-area{position:absolute;top:0;left:0;width:100%;height:100%;min-height:30px;z-index:2;background:#f9f9f9;border-radius:4px;border:1px dashed #ccc;text-align:center}.qq-upload-drop-area span{display:block;position:absolute;top:50%;width:100%;margin-top:-8px;font-size:16px}.qq-upload-extra-drop-area{position:relative;margin-top:50px;font-size:16px;padding-top:30px;height:20px;min-height:40px}.qq-upload-drop-area-active{background:#fdfdfd;border-radius:4px;border:1px dashed #ccc}.qq-upload-list{margin:0;padding:0;list-style:none;max-height:450px;overflow-y:auto;box-shadow:0 1px 0 rgba(15,15,50,.14);clear:both}.qq-upload-list li{margin:0;padding:9px;line-height:15px;font-size:16px;color:#424242;background-color:#f6f6f6;border-top:1px solid #fff;border-bottom:1px solid #ddd}.qq-upload-list li:first-child{border-top:none}.qq-upload-list li:last-child{border-bottom:none}.qq-upload-cancel,.qq-upload-continue,.qq-upload-delete,.qq-upload-failed-text,.qq-upload-file,.qq-upload-pause,.qq-upload-retry,.qq-upload-size,.qq-upload-spinner{margin-right:12px;display:inline}.qq-upload-file{vertical-align:middle;display:inline-block;width:300px;text-overflow:ellipsis;white-space:nowrap;overflow-x:hidden;height:18px}.qq-upload-spinner{display:inline-block;background:url(/images/file-uploader/loading.gif);width:15px;height:15px;vertical-align:text-bottom}.qq-drop-processing{display:block}.qq-drop-processing-spinner{display:inline-block;background:url(/images/file-uploader/processing.gif);width:24px;height:24px;vertical-align:text-bottom}.qq-upload-cancel,.qq-upload-continue,.qq-upload-delete,.qq-upload-pause,.qq-upload-retry,.qq-upload-size{font-size:12px;font-weight:400;cursor:pointer;vertical-align:middle}.qq-upload-status-text{font-size:14px;font-weight:700;display:block}.qq-upload-failed-text{display:none;font-style:italic;font-weight:700}.qq-upload-failed-icon{display:none;width:15px;height:15px;vertical-align:text-bottom}.qq-upload-fail .qq-upload-failed-text{display:inline}.qq-upload-retrying .qq-upload-failed-text{display:inline}.qq-upload-list li.qq-upload-success{background-color:#ebf6e0;color:#424242;border-bottom:1px solid #d3ded1;border-top:1px solid #f7fff5}.qq-upload-list li.qq-upload-fail{background-color:#f5d7d7;color:#424242;border-bottom:1px solid #decaca;border-top:1px solid #fce6e6}.qq-progress-bar{display:block;display:block;background:#00abc7;width:0;height:15px;border-radius:6px;margin-bottom:3px}.qq-total-progress-bar{height:25px;border-radius:9px}.qq-total-progress-bar-container{margin-left:9px;display:inline;float:right;width:500px}INPUT.qq-edit-filename{position:absolute;opacity:0;z-index:-1}.qq-upload-file.qq-editable{cursor:pointer;margin-right:4px}.qq-edit-filename-icon.qq-editable{display:inline-block;cursor:pointer}INPUT.qq-edit-filename.qq-editing{position:static;height:28px;padding:0 8px;margin-right:10px;margin-bottom:-5px;border:1px solid #ccc;border-radius:2px;font-size:16px;opacity:1}.qq-edit-filename-icon{display:none;background:url(/images/file-uploader/edit.gif);width:15px;height:15px;vertical-align:text-bottom;margin-right:16px}.qq-hide{display:none}.qq-thumbnail-selector{vertical-align:middle;margin-right:12px}.qq-uploader DIALOG{display:none}.qq-uploader DIALOG[open]{display:block}.qq-uploader DIALOG{display:none}.qq-uploader DIALOG[open]{display:block}.qq-uploader DIALOG .qq-dialog-buttons{text-align:center;padding-top:10px}.qq-uploader DIALOG .qq-dialog-buttons BUTTON{margin-left:5px;margin-right:5px}.qq-uploader DIALOG .qq-dialog-message-selector{padding-bottom:10px}.qq-uploader DIALOG::backdrop{background-color:rgba(0,0,0,.7)}";
        var template = "\n            <style>" + styles + "</style>\n            <script type=\"text/template\" id=\"qq-simple-thumbnails-template\">\n                <div class=\"qq-uploader-selector qq-uploader\" qq-drop-area-text=\"Drop files here\">\n                    <div class=\"qq-total-progress-bar-container-selector qq-total-progress-bar-container\">\n                        <div role=\"progressbar\" aria-valuenow=\"0\" aria-valuemin=\"0\" aria-valuemax=\"100\" \n                        class=\"qq-total-progress-bar-selector qq-progress-bar qq-total-progress-bar\"></div>\n                    </div>\n                    <div class=\"qq-upload-drop-area-selector qq-upload-drop-area\" qq-hide-dropzone>\n                        <span class=\"qq-upload-drop-area-text-selector\"></span>\n                    </div>\n                    <div class=\"qq-upload-button-selector qq-upload-button\">\n                        <div>Upload a file</div>\n                    </div>\n                    <span class=\"qq-drop-processing-selector qq-drop-processing\">\n                        <span>Processing dropped files...</span>\n                        <span class=\"qq-drop-processing-spinner-selector qq-drop-processing-spinner\"></span>\n                    </span>\n                    <ul class=\"qq-upload-list-selector qq-upload-list\" aria-live=\"polite\" aria-relevant=\"additions removals\">\n                        <li>\n                            <div class=\"qq-progress-bar-container-selector\">\n                                <div role=\"progressbar\" aria-valuenow=\"0\" aria-valuemin=\"0\" aria-valuemax=\"100\" \n                                class=\"qq-progress-bar-selector qq-progress-bar\"></div>\n                            </div>\n                            <span class=\"qq-upload-spinner-selector qq-upload-spinner\"></span>\n                            <img class=\"qq-thumbnail-selector\" qq-max-size=\"100\" qq-server-scale>\n                            <span class=\"qq-upload-file-selector qq-upload-file\"></span>\n                            <span class=\"qq-edit-filename-icon-selector qq-edit-filename-icon\" aria-label=\"Edit filename\"></span>\n                            <input class=\"qq-edit-filename-selector qq-edit-filename\" tabindex=\"0\" type=\"text\">\n                            <span class=\"qq-upload-size-selector qq-upload-size\"></span>\n                            <button type=\"button\" id=\"f-u__cancelBtn\" \n                                class=\"qq-btn qq-upload-cancel-selector qq-upload-cancel\">Cancel</button>\n                            <button type=\"button\" id=\"f-u__retryBtn\" \n                                class=\"qq-btn qq-upload-retry-selector qq-upload-retry\">Retry</button>\n                            <button type=\"button\" class=\"qq-btn qq-upload-delete-selector qq-upload-delete\">Delete</button>\n                            <span role=\"status\" class=\"qq-upload-status-text-selector qq-upload-status-text\"></span>\n                        </li>\n                    </ul>\n\n                    <dialog class=\"qq-alert-dialog-selector\">\n                        <div class=\"qq-dialog-message-selector\"></div>\n                        <div class=\"qq-dialog-buttons\">\n                            <button type=\"button\" class=\"qq-cancel-button-selector\">Close</button>\n                        </div>\n                    </dialog>\n\n                    <dialog class=\"qq-confirm-dialog-selector\">\n                        <div class=\"qq-dialog-message-selector\"></div>\n                        <div class=\"qq-dialog-buttons\">\n                            <button type=\"button\" class=\"qq-cancel-button-selector\">No</button>\n                            <button type=\"button\" class=\"qq-ok-button-selector\">Yes</button>\n                        </div>\n                    </dialog>\n\n                    <dialog class=\"qq-prompt-dialog-selector\">\n                        <div class=\"qq-dialog-message-selector\"></div>\n                        <input type=\"text\">\n                        <div class=\"qq-dialog-buttons\">\n                            <button type=\"button\" class=\"qq-cancel-button-selector\">Cancel</button>\n                            <button type=\"button\" class=\"qq-ok-button-selector\">Ok</button>\n                        </div>\n                    </dialog>\n                </div>\n            </script>\n            ";
        this.simpleThumbnail = this._sanitize(template);
    };
    FileStorageBasic.prototype._f_u__Patch = function (fileUploaderLink) {
        // Patch for cancel / retry buttons
        function onClickBtnCancel(e) {
            var target = e.target;
            var fileId = target.parentNode && target.parentNode.getAttribute('qq-file-id');
            if (target.id && target.id === 'f-u__cancelBtn') {
                fileUploaderLink.cancel(+fileId);
            }
            else if (target.id && target.id === 'f-u__retryBtn') {
                fileUploaderLink.retry(+fileId);
            }
        }
        window.addEventListener('click', onClickBtnCancel);
    };
    return FileStorageBasic;
}(__WEBPACK_IMPORTED_MODULE_2__basic_component_class__["a" /* BasicComponentClass */]));

//# sourceMappingURL=file-storage-basic.class.js.map

/***/ }),

/***/ 430:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__file_storage_basic_class__ = __webpack_require__(429);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileStorageComponent; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FileStorageComponent = (function (_super) {
    __extends(FileStorageComponent, _super);
    function FileStorageComponent(injector) {
        var _this = _super.call(this, injector) || this;
        _this.menuModel = [
            {
                name: 'Move to Storage',
                ico: 'storage',
                action: function (file) {
                    this.MoveFile(file, 'S');
                },
                flags: ['P', 'O']
            },
            {
                name: 'Move to Public',
                ico: 'accessibility',
                action: function (file) {
                    this.MoveFile(file, 'P');
                },
                flags: ['S', 'O']
            },
            {
                name: 'Move to Offers',
                ico: 'announcement',
                action: function (file) {
                    this.MoveFile(file, 'O');
                },
                flags: ['S', 'P'],
                _offers: true
            },
            {
                name: 'Rename',
                ico: 'loop',
                action: function (file) {
                    this.RenameFile(file);
                }
            },
            {
                name: 'Delete',
                ico: 'delete_forever',
                action: function (file, index) {
                    this.DeleteFile(file, index);
                }
            },
            {
                name: 'Download',
                ico: 'get_app',
                action: function (file) {
                    this.DownloadFile(file);
                }
            }
        ];
        _this.$this = _this;
        return _this;
    }
    FileStorageComponent.prototype.ngDoCheck = function () {
        var _a = this, inputRef = _a.inputRef, _isRequestSent = _a._isRequestSent, _focusResolveLink = _a._focusResolveLink;
        if (inputRef && !_isRequestSent && typeof _focusResolveLink === 'function') {
            _focusResolveLink();
        }
    };
    FileStorageComponent.prototype.fileSorter = function (_a, tab) {
        var _b = _a.attributes, fileName = _b.fileName, locationFlag = _b.locationFlag;
        var fileExt = this._getFileExt(fileName);
        var _c = this.allowedFileTypes, images = _c.images, media = _c.media, docs = _c.docs;
        if ((tab.name === this.tabs[0].name && locationFlag === this.tabs[0].flag) ||
            (tab.name === this.tabs[1].name && locationFlag === this.tabs[1].flag && images.exts.includes(fileExt)) ||
            (tab.name === this.tabs[2].name && locationFlag === this.tabs[2].flag && images.exts.includes(fileExt)) ||
            (tab.name === this.tabs[3].name && locationFlag === this.tabs[3].flag && media.exts.includes(fileExt)) ||
            (tab.name === this.tabs[4].name && locationFlag === this.tabs[4].flag && docs.exts.includes(fileExt))) {
            return true;
        }
        return false;
    };
    FileStorageComponent.prototype.isEmpty = function (tab) {
        return this._FTP_Empty_flags[tab.name];
    };
    FileStorageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._sanitizeTemplate();
        this._onFileStorageActive();
        this._fetchAllFiles()
            .then(function (files) { return _this._setFTP_Flags_IsEmpty(files); });
    };
    FileStorageComponent.prototype.getMenuArray = function (tab, _a) {
        var _b = _a.attributes, fileName = _b.fileName, locationFlag = _b.locationFlag;
        var fileExt = this._getFileExt(fileName);
        var _c = this.allowedFileTypes, images = _c.images, media = _c.media, docs = _c.docs;
        return this.menuModel.filter(function (item, i) {
            if ((media.exts.includes(fileExt) ||
                docs.exts.includes(fileExt)) &&
                item._offers) {
                return false;
            }
            if (item.flags && !item.flags.includes(locationFlag)) {
                return false;
            }
            return true;
        });
    };
    FileStorageComponent.prototype.MoveFile = function (file, newLocationFlag) {
        var ACTION = 'MOVE';
        return this._requestSender(file, ACTION, newLocationFlag);
    };
    FileStorageComponent.prototype.RenameFile = function (file) {
        var _this = this;
        this.renameFileFields.fileId = file.id;
        var splitedFileArr = file.attributes.fileName.split('.');
        this.renameFileFields.fileExt = splitedFileArr.pop();
        this.renameFileFields.modelFileName = splitedFileArr.join('.');
        var _a = this._createDefersOnRename(), focusPromise = _a[0], blurPromise = _a[1];
        focusPromise.then(function () {
            _this.inputRef.nativeElement.focus();
            delete _this._focusResolveLink;
        });
        blurPromise.then(function () {
            _this._onInputBlur(file);
            delete _this.blurResolveLink;
        });
    };
    FileStorageComponent.prototype.DeleteFile = function (file, index) {
        var ACTION = 'DELETE';
        this._requestSender(file, ACTION, index);
    };
    FileStorageComponent.prototype._onInputBlur = function (file) {
        if (this._isRequestSent) {
            return;
        }
        var _a = this.renameFileFields, modelFileName = _a.modelFileName, fileExt = _a.fileExt;
        var compiledFileName = modelFileName + "." + fileExt;
        if (file.attributes.fileName === compiledFileName) {
            return this.renameFileFields.cancelAll();
        }
        for (var _i = 0, _b = this.filesResponse.data; _i < _b.length; _i++) {
            var fileName = _b[_i].attributes.fileName;
            if (fileName === compiledFileName) {
                this.renameFileFields.cancelAll();
                return this._showErrMess('File name must to be unique in File Storage!');
            }
        }
        var ACTION = 'RENAME';
        this._requestSender(file, ACTION);
    };
    FileStorageComponent.prototype.DownloadFile = function (file) {
        this._progressBarService.autoStop();
        this.DOWNLOAD(file);
    };
    FileStorageComponent.prototype.displayFileName = function (file) {
        var _a = this.renameFileFields, modelFileName = _a.modelFileName, fileExt = _a.fileExt, fileId = _a.fileId;
        var id = file.id, fileName = file.attributes.fileName;
        if (id === fileId) {
            var compiledFileName = modelFileName + "." + fileExt;
            return compiledFileName === '.' ? fileName : compiledFileName;
        }
        return fileName;
    };
    FileStorageComponent.prototype._createDefersOnRename = function () {
        return [this._promiseFactory('_focusResolveLink'), this._promiseFactory('blurResolveLink')];
    };
    FileStorageComponent.prototype._promiseFactory = function (propertyName) {
        var _this = this;
        return new Promise(function (resolve) { return _this[propertyName] = resolve; });
    };
    return FileStorageComponent;
}(__WEBPACK_IMPORTED_MODULE_0__file_storage_basic_class__["a" /* FileStorageBasic */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])('input'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* ElementRef */]) === "function" && _a || Object)
], FileStorageComponent.prototype, "inputRef", void 0);
FileStorageComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_0" /* Component */])({
        selector: 'app-file-storage',
        template: __webpack_require__(448),
        styles: [__webpack_require__(441)]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_core__["Z" /* Injector */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_core__["Z" /* Injector */]) === "function" && _b || Object])
], FileStorageComponent);

var _a, _b;
//# sourceMappingURL=file-storage.component.js.map

/***/ }),

/***/ 431:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__froala_text_editor_service__ = __webpack_require__(413);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__basic_actions_component_class__ = __webpack_require__(412);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__basic_model_types_class__ = __webpack_require__(411);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KeyPeopleComponent; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*const TestReview = `Lorem ipsum dolor sit amet, consectetur adipisicing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`;*/
var KeyPeopleComponent = (function (_super) {
    __extends(KeyPeopleComponent, _super);
    // sanitizedContent: SafeHtml;
    function KeyPeopleComponent(/*private _sanitizer: DomSanitizer,*/ injector) {
        var _this = _super.call(this, injector) || this;
        _this._resourceUrl = '/api/key-people';
        _this.editorOpts = __WEBPACK_IMPORTED_MODULE_1__froala_text_editor_service__["b" /* TextEditorOptions */];
        /*mainContent = {
            title: 'Who we are?',
            article: `The travel agency <strong>wings for world</strong> was born in 2009, and
            within a few years of growth and success, shows a considerable growth
            record that is phenomenal by any standard. This success proves that the
            principle of the service with efficiency creates an environment in
            which you can achieve the goals of large dimensions. Today, Wings for
            World is a major conglomerate with diverse interests in air ticketing,
            travel, travel-related services, tours in and out, and package tours,
            travel and leisure cruise tour. <span style="font-family: Indie Flower,cursive;">​<strong>​<em>Hello world</em></strong></span>`
        };
        peoples = [
            {
                avatarUrl: '/images/cat1.jfif',
                name: 'Suchintha Fernando',
                position: 'CEO',
                review: TestReview
            },
            {
                avatarUrl: '',
                name: 'Summudu Fernando',
                position: 'VP',
                review: TestReview
            },
            {
                avatarUrl: '/images/cat3.jfif',
                name: 'Somebody Else',
                position: 'Janitor',
                review: TestReview
            }
        ];*/
        _this.titleModel = new __WEBPACK_IMPORTED_MODULE_3__basic_model_types_class__["b" /* ModelBasic */];
        _this.articleModel = new __WEBPACK_IMPORTED_MODULE_3__basic_model_types_class__["b" /* ModelBasic */];
        // avatarModel: Array<ModelImageService>;
        _this.avatarModel = new __WEBPACK_IMPORTED_MODULE_3__basic_model_types_class__["a" /* ModelImageService */];
        _this.nameModel = new __WEBPACK_IMPORTED_MODULE_3__basic_model_types_class__["b" /* ModelBasic */];
        _this.positionModel = new __WEBPACK_IMPORTED_MODULE_3__basic_model_types_class__["b" /* ModelBasic */];
        _this.reviewModel = new __WEBPACK_IMPORTED_MODULE_3__basic_model_types_class__["b" /* ModelBasic */];
        _this._setArrayOfComponentModels(_this.avatarModel, _this.nameModel, _this.positionModel, _this.reviewModel);
        return _this;
    }
    // private _sanitize(content: string): SafeHtml {
    //     return this._sanitizer.bypassSecurityTrustHtml(content);
    // }
    KeyPeopleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._getResource(function (jsRes) {
            _this._setModelRecord(_this.componentModel = jsRes.data.attributes.keyPeople);
            // this.avatarModel = this._setArrayOfModels<ModelImageService>(ModelImageService, this.componentModel.people.length);
            // this.sanitizedContent =
            _this.articleModel.sanitizedContent = _this._sanitize(_this.componentModel.article || _this.notSpecifiedMessage);
            var selectedTab = Array.isArray(_this.componentModel.people) && _this.componentModel.people[_this.tabIndex];
            _this.reviewModel.sanitizedContent =
                _this._sanitize((selectedTab && selectedTab.review) || _this.notSpecifiedMessage);
        }, this._resourceUrl);
    };
    Object.defineProperty(KeyPeopleComponent.prototype, "templateNewPerson", {
        get: function () {
            return { avatarUrl: '', name: '', position: '', review: '' };
        },
        enumerable: true,
        configurable: true
    });
    /*onFroalaModelChange(e) {
        this.articleModel.content = e;
        this.sanitizedContent = this._sanitize(this.articleModel.content);
    }*/
    /*deleteSubject(personIndex: number) {
        return () => this.componentModel.people.splice(personIndex, 1);
    }*/
    /*onEditMain(slideProp, model) {
        super.onEdit(slideProp, model);
        this._isEditing = false;
    }*/
    /*onCancelEditMain(model: IModelService, source?: string) {
        super.onCancelEdit(model);
        // this.sanitizedContent =
        model.sanitizedContent = this._sanitize(source || this.notSpecifiedMessage);
    }*/
    // onAddNewItem() {
    // this.avatarModel.push(new ModelImageService);
    // super.onAddNewItem(this.componentModel.people, this.templateNewPerson);
    // }
    KeyPeopleComponent.prototype.onTabChange = function (_a) {
        var index = _a.index;
        console.log('onTabChange ', index);
        this.reviewModel.sanitizedContent = this._sanitize(this.componentModel.people[index].review || this.notSpecifiedMessage);
    };
    KeyPeopleComponent.prototype.onSave = function (btnSaveRef) {
        _super.prototype._onSaveChanges.call(this, this._resourceUrl, this.componentModel)(btnSaveRef, { id: '1', type: 'keypeople', attr: { keyPeople: this.componentModel } });
    };
    KeyPeopleComponent.prototype.deleteSubjectBasic = function (personIndex, componentModelArray) {
        var _this = this;
        return function () {
            _super.prototype.deleteSubjectBasic.call(_this, personIndex, componentModelArray)();
            var arrayItem = componentModelArray[_this.tabIndex];
            _this.reviewModel.sanitizedContent = _this._sanitize((arrayItem && arrayItem.review) || _this.notSpecifiedMessage);
        };
    };
    return KeyPeopleComponent;
}(__WEBPACK_IMPORTED_MODULE_2__basic_actions_component_class__["a" /* BasicActionsComponent */]));
KeyPeopleComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Component */])({
        selector: 'app-key-people',
        template: __webpack_require__(449),
        styles: ["\n        .align-cards {\n            width:92%;\n            margin:30px 0\n        }\n        .tab-avatar {\n            width:30px;\n            height:30px;\n            border-radius:50%;\n            position:relative;\n            top:8px\n        }\n        h3 {\n            color: rgba(0,0,0,.54);\n        }\n        .action-btn-cont {\n            margin-top:10px;\n        }\n        .ok-btn-gap {\n            margin-left:40px\n        }\n    "]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Z" /* Injector */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Z" /* Injector */]) === "function" && _a || Object])
], KeyPeopleComponent);

var _a;
//# sourceMappingURL=key-people.component.js.map

/***/ }),

/***/ 432:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_Interfaces__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_Interfaces___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_app_Interfaces__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LandingPageSettingsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LandingPageSettingsComponent = (function () {
    function LandingPageSettingsComponent() {
        this.onSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* EventEmitter */](true);
    }
    Object.defineProperty(LandingPageSettingsComponent.prototype, "sectionTab", {
        get: function () {
            return this._selectedSectionTab;
        },
        set: function (tab) {
            this._selectedSectionTab = tab;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LandingPageSettingsComponent.prototype, "sectionList", {
        get: function () {
            return this._sectionList;
        },
        set: function (list) {
            this._sectionList = list;
        },
        enumerable: true,
        configurable: true
    });
    LandingPageSettingsComponent.prototype.onSectionSelect = function (section) {
        this.onSelected.emit(this.sectionTab = section);
    };
    return LandingPageSettingsComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_app_Interfaces__["IMenuSubTab"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_app_Interfaces__["IMenuSubTab"]) === "function" && _a || Object),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_app_Interfaces__["IMenuSubTab"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_app_Interfaces__["IMenuSubTab"]) === "function" && _b || Object])
], LandingPageSettingsComponent.prototype, "sectionTab", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* Input */])(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], LandingPageSettingsComponent.prototype, "sectionList", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Output */])(),
    __metadata("design:type", Object)
], LandingPageSettingsComponent.prototype, "onSelected", void 0);
LandingPageSettingsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Component */])({
        selector: 'app-landing-page-settings',
        template: __webpack_require__(450),
        styles: [__webpack_require__(442)]
    })
], LandingPageSettingsComponent);

var _a, _b;
//# sourceMappingURL=landing-page-settings.component.js.map

/***/ }),

/***/ 433:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__basic_actions_component_class__ = __webpack_require__(412);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__basic_model_types_class__ = __webpack_require__(411);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OurSponsoresComponent; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var OurSponsoresComponent = (function (_super) {
    __extends(OurSponsoresComponent, _super);
    function OurSponsoresComponent(injector) {
        var _this = _super.call(this, injector) || this;
        _this._resourceUrl = '/api/sponsores';
        _this.avatarModel = new __WEBPACK_IMPORTED_MODULE_2__basic_model_types_class__["a" /* ModelImageService */];
        _this._setArrayOfComponentModels(_this.avatarModel);
        return _this;
    }
    OurSponsoresComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._getResource(function (jsRes) {
            _this._setModelRecord(_this.componentModel = jsRes.data.attributes.sponsores);
        }, this._resourceUrl);
    };
    Object.defineProperty(OurSponsoresComponent.prototype, "templateNewSponsor", {
        get: function () {
            return { avatarUrl: '' };
        },
        enumerable: true,
        configurable: true
    });
    OurSponsoresComponent.prototype.onSave = function (btnSaveRef) {
        _super.prototype._onSaveChanges.call(this, this._resourceUrl, this.componentModel)(btnSaveRef, { id: '1', type: 'sponsores', attr: { sponsores: this.componentModel } });
    };
    return OurSponsoresComponent;
}(__WEBPACK_IMPORTED_MODULE_1__basic_actions_component_class__["a" /* BasicActionsComponent */]));
OurSponsoresComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Component */])({
        selector: 'app-our-sponsores',
        template: __webpack_require__(453),
        styles: ["\n        .tab-avatar {\n            width:30px;\n            height:30px;\n            border-radius:50%;\n            position:relative;\n            top:8px\n        }\n        .align-cards {\n            width:92%;\n            margin:30px 0\n        }\n        .action-btn-cont {\n            margin-top:10px;\n            width: 155px;\n        }\n        .ok-btn-gap {\n            margin-left:40px\n        }\n    "]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Z" /* Injector */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Z" /* Injector */]) === "function" && _a || Object])
], OurSponsoresComponent);

var _a;
//# sourceMappingURL=our-sponsores.component.js.map

/***/ }),

/***/ 434:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__basic_component_class__ = __webpack_require__(410);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SiteContactsComponent; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SiteContactsComponent = (function (_super) {
    __extends(SiteContactsComponent, _super);
    function SiteContactsComponent(injector) {
        var _this = _super.call(this, injector) || this;
        _this._api = '/api/contacts';
        _this.isSkypeHas = false;
        _this.modelEdit = [];
        return _this;
    }
    SiteContactsComponent.prototype.ngOnInit = function () {
        this._getResource(this._onGetResourse, this._api);
    };
    SiteContactsComponent.prototype.deleteAction = function (values, index) {
        var _this = this;
        return function (newTabName, subject) {
            if (typeof subject === 'string') {
                values.splice(index, 1);
                switch (subject) {
                    case 'group':
                        {
                            _this.selectedTab = (index === values.length - 1 || index === 0) ?
                                values[index] :
                                values[index - 1];
                            _this.modelEdit.length = 0;
                            _this._isEditing = false;
                        }
                        break;
                    case 'contact':
                        {
                            delete _this.modelEdit[index];
                            _this._isEditing = !_this._isEditComplete(_this.modelEdit);
                        }
                        _this.isSkypeHas = false;
                }
            }
            else {
                if (_this._isNewGropMatched(newTabName)) {
                    return _this._showErrMess('Group with this name already exists!');
                }
                _this.contactsModel.push({ group: newTabName, values: [] });
                if (!_this.selectedTab) {
                    _this.selectedTab = _this.contactsModel[_this.tabIndex = 0];
                }
            }
        };
    };
    SiteContactsComponent.prototype.getValues = function (group, obj, index) {
        var model = this.modelEdit[index];
        if (model && model.$modelValue) {
            var splittedArray = model.$modelValue.split(',');
            this.isSkypeHas = splittedArray.length > 1;
            return this._modifyUnique(splittedArray, group, index);
        }
        else if (obj.values.toString()) {
            return this._modifyUnique(obj.values, group, index);
        }
        return this.notSpecifiedMessage;
    };
    SiteContactsComponent.prototype.onEdit = function (obj, index) {
        this.modelEdit[index] = this._cloneObj(Object.assign({ $modelValue: obj.values.join(', ') }, obj));
        this._isEditing = true;
    };
    SiteContactsComponent.prototype.onOk = function (obj, index) {
        var editedModel = this.modelEdit[index];
        if (!editedModel.type || !editedModel.$modelValue) {
            return;
        }
        editedModel.values = editedModel.$modelValue
            .split(',')
            .map(function (addr) { return addr.trim(); });
        for (var prop in obj) {
            if (prop in obj) {
                obj[prop] = this.modelEdit[index][prop];
            }
        }
        delete this.modelEdit[index];
        this._isEditing = !this._isEditComplete(this.modelEdit);
    };
    SiteContactsComponent.prototype.onTabChange = function (tabIndex) {
        this.modelEdit.length = 0;
        this.isSkypeHas = false;
        this.selectedTab = this.contactsModel[tabIndex];
    };
    SiteContactsComponent.prototype.onSave = function (btnSaveRef) {
        _super.prototype._onSaveChanges.call(this, this._api, this.contactsModel)(btnSaveRef, { id: '1', type: 'contacts', attr: { contacts: this.contactsModel } });
    };
    SiteContactsComponent.prototype._onGetResourse = function (jsRes) {
        this._setModelRecord(this.contactsModel = jsRes.data.attributes.contacts);
        this.selectedTab = this.contactsModel[0];
    };
    SiteContactsComponent.prototype._isNewGropMatched = function (newGroupName) {
        for (var _i = 0, _a = this.contactsModel; _i < _a.length; _i++) {
            var group = _a[_i].group;
            if (newGroupName.toLowerCase() === group.toLowerCase()) {
                return true;
            }
        }
        return false;
    };
    SiteContactsComponent.prototype._modifyUnique = function (arrayValues, group, valuesIndex) {
        var _this = this;
        return arrayValues.map(function (item, i, array) {
            if (group.toLowerCase() === 'skype' && valuesIndex === 0 && i === 0 && array.length > 1) {
                _this.isSkypeHas = true;
                return item + "*";
            }
            return item;
        }).join(', ');
    };
    return SiteContactsComponent;
}(__WEBPACK_IMPORTED_MODULE_1__basic_component_class__["a" /* BasicComponentClass */]));
SiteContactsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Component */])({
        selector: 'app-site-contacts',
        template: __webpack_require__(454),
        styles: ["\n        .btn-gap {\n            margin-left:40px\n        }\n    "]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Z" /* Injector */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Z" /* Injector */]) === "function" && _a || Object])
], SiteContactsComponent);

var _a;
//# sourceMappingURL=site-contacts.component.js.map

/***/ }),

/***/ 435:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__basic_actions_component_class__ = __webpack_require__(412);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__slider_promo_modal_component__ = __webpack_require__(420);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__basic_model_types_class__ = __webpack_require__(411);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SliderPromoSectionComponent; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// import { filesUrl } from './file-storage-basic.class';
var SliderPromoSectionComponent = (function (_super) {
    __extends(SliderPromoSectionComponent, _super);
    /*modelTemplate: ISlideProps = {
            type: 'slide',
            title: '',
            backgroundImage: '',
            description: '',
            chips: []
    };*/
    /*chipTemplate: IChipProps = {
            destination: '',
            avatar: '',
            starCount: 0
    };*/
    /*publicImages: {
        isRequestSent: boolean;
        forChip: boolean;
        data?: Array<{ id: string; type: 'image', links: { self: string } }>;
    } = { isRequestSent: false, forChip: false };*/
    // sliderModel: Array<ISlideProps>;
    function SliderPromoSectionComponent(/*private _changeDetectorRef: ChangeDetectorRef,*/ injector) {
        var _this = _super.call(this, injector) || this;
        _this._slidesUrl = '/api/slider-promo/';
        // modelTitle: string;
        // isTitleEditing = false;
        _this.modelTitle = new __WEBPACK_IMPORTED_MODULE_3__basic_model_types_class__["b" /* ModelBasic */];
        // modelDesc: string;
        // isDescEditing = false;
        _this.modelDesc = new __WEBPACK_IMPORTED_MODULE_3__basic_model_types_class__["b" /* ModelBasic */];
        // modelBgImg: IModelBgSlideImg  | object = {};
        _this.modelBgImg = new __WEBPACK_IMPORTED_MODULE_3__basic_model_types_class__["a" /* ModelImageService */];
        _this.modelChips = [];
        _this.modelButtonDesc = new __WEBPACK_IMPORTED_MODULE_3__basic_model_types_class__["b" /* ModelBasic */];
        _this._setArrayOfComponentModels(_this.modelTitle, _this.modelDesc, _this.modelBgImg, _this.modelChips, _this.modelButtonDesc);
        return _this;
    }
    SliderPromoSectionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._getResource(function (jsRes) { return _this._setModelRecord(_this.componentModel = jsRes.data.attributes.slides); }, this._slidesUrl);
    };
    Object.defineProperty(SliderPromoSectionComponent.prototype, "modelTemplate", {
        get: function () {
            return {
                type: 'slide',
                title: '',
                backgroundImage: '',
                description: '',
                chips: [],
                buttonDesc: ''
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderPromoSectionComponent.prototype, "chipTemplate", {
        get: function () {
            return {
                destination: '',
                avatar: '',
                starCount: 0
            };
        },
        enumerable: true,
        configurable: true
    });
    /*onOk(action: 'TIT' | 'B_IMG' | 'DESC' | 'CHIP', subject: ISlideProps | IChipProps, index?: number) {
        switch (action) {
            case 'TIT':
                (<ISlideProps>subject).title = this.modelTitle;
            break;
            case 'DESC':
                (<ISlideProps>subject).description = this.modelDesc;
            break;
            case 'B_IMG':
                (<ISlideProps>subject).backgroundImage = (<IModelBgSlideImg>this.modelBgImg).modelUrl;
            break;
            case 'CHIP':
                this.modelChips[index].chipRef.toggleSelected();
                const modelChipItem: IChipProps = this.modelChips[index].item;
                for (const prop in modelChipItem) {
                    if (prop in modelChipItem) {
                        (<IChipProps>subject)[prop] = modelChipItem[prop];
                    }
                }
                delete this.modelChips[index];
        }

        this.onCancelEdit(action);
    }*/
    /*onBackgroundImgClick(image: IImagesProps, slideImgRef: HTMLImageElement) {
        (<IModelBgSlideImg>this.modelBgImg).modelUrl = image.links.self;
        this._clickImageHelper(this.modelBgImg, slideImgRef);
    }*/
    /*onEdit(slide: ISlideProps, action: 'TIT' | 'B_IMG' | 'DESC') {
        switch (action) {
            case 'TIT':
                this.isTitleEditing = true;
                this.modelTitle = slide.title;
            break;
            case 'DESC':
                this.isDescEditing = true;
                this.modelDesc = slide.description;
            break;
            case 'B_IMG':
                (<IModelBgSlideImg>this.modelBgImg).modelUrl = slide.backgroundImage || '';
                this._getPublicImages();
        }
        this._isEditing = true;
    }*/
    /*onCancelEdit(action: 'TIT' | 'B_IMG' | 'DESC' | 'CHIP') {
        switch (action) {
            case 'TIT': {
                delete this.modelTitle;
                this.isTitleEditing = false;
            }
            break;
            case 'DESC': {
                delete this.modelDesc;
                this.isDescEditing = false;
            }
            break;
            case 'B_IMG':
                this.modelBgImg = {};
        }

        this._checkEditingState();
    }*/
    /*addNewTour(slide: ISlideProps) {
        const newChipProps: IChipProps = {
            destination: '',
            avatar: '',
            starCount: 0
        };
        slide.chips.push(newChipProps);
    }*/
    /*getNaturalSize(imgRef: HTMLImageElement, property: string) {
        if (!imgRef[property] && !imgRef.onload) {
            imgRef.onload = () => this._changeDetectorRef.detectChanges();
        }else if (imgRef[property] && imgRef.onload) {
            imgRef.onload = null;
        }
        return imgRef[property];
    }*/
    /*getAvatarImage(chip: IChipProps, index: number) {
        const fn = avatarUrl => avatarUrl ? `url(${avatarUrl})` : !!avatarUrl;
        if (this.modelChips[index]) {
            console.log('index i = ', index, this.modelChips[index].item);
            return fn(this.modelChips[index].item.avatar);
        }
        return fn(chip.avatar);
    }*/
    SliderPromoSectionComponent.prototype.getChipStarCount = function (chip, index) {
        var modelChipItem = this.modelChips[index];
        if (modelChipItem) {
            return modelChipItem.item.starCount;
        }
        return chip.starCount;
    };
    SliderPromoSectionComponent.prototype.onAvatarImageClick = function (index, imageLink, imgRef) {
        this.modelChips[index].item.avatar = imageLink;
        this._clickImageHelper(this.modelChips[index], imgRef);
    };
    SliderPromoSectionComponent.prototype.onChipClick = function (chipRef, item, index) {
        if (this.modelChips[index]) {
            return;
        }
        this.modelChips[index] = new __WEBPACK_IMPORTED_MODULE_3__basic_model_types_class__["c" /* ModelChip */](item, chipRef);
        chipRef.toggleSelected();
        this._getPublicImages(true);
        this._isEditing = true;
    };
    SliderPromoSectionComponent.prototype.onStartCountChange = function (e, index) {
        var count = +e;
        if (count < 0) {
            this.modelChips[index].item.starCount = 0;
        }
        else if (count > 5) {
            this.modelChips[index].item.starCount = 5;
        }
        else {
            this.modelChips[index].item.starCount = count;
        }
    };
    /*onEditChipCancel(chip: IChipProps, index: number) {
        this.modelChips[index].chipRef.toggleSelected();
        delete this.modelChips[index];
        this._checkEditingState();
    }*/
    /*onAddNewSlide() {
        const lastElem = this.sliderModel.length - 1;
        const addBaseObject: ISlideProps = {
            type: 'slide',
            title: '',
            backgroundImage: '',
            description: '',
            chips: []
        };
        this.sliderModel.push(addBaseObject);
    }*/
    SliderPromoSectionComponent.prototype.onViewSlides = function () {
        var sliderPromoModal = this._selectedTabService.attachViewToDOM(__WEBPACK_IMPORTED_MODULE_2__slider_promo_modal_component__["a" /* SliderPromoModalComponent */]);
        sliderPromoModal.instance.modelData = this.componentModel;
        sliderPromoModal.instance.componentRef = sliderPromoModal;
    };
    SliderPromoSectionComponent.prototype.onSave = function (btnRef) {
        _super.prototype._onSaveChanges.call(this, this._slidesUrl, this.componentModel)(btnRef, { id: '1', type: 'slides', attr: { slides: this.componentModel } });
    };
    /*private _clickImageHelper(assignTarget: any, imgRef: HTMLImageElement) {
        if (assignTarget.clickedImgRef) {
            assignTarget.clickedImgRef.style.opacity = '';
        }
        assignTarget.clickedImgRef = imgRef;
        imgRef.style.opacity = .5.toString();
    }*/
    /*private _checkEditingState() {
        if (!this.isTitleEditing &&
            !this.isDescEditing &&
            Object.keys(this.modelBgImg).length === 0 &&
            this._isEditComplete<IEditedChip>(this.modelChips)) {

            this._isEditing = false;
        }
    }*/
    /*private _getPublicImages(forChip= false) {
        if (!this.publicImages.data) {
            if (forChip) {
                this.publicImages.forChip = true;
            }
            this.publicImages.isRequestSent = true;
            this._getResource(res => this.publicImages.data = res.data, filesUrl, { params: 'fields[locationFlag]=P' })
                .then(() => this.publicImages.isRequestSent = false);
        }
    }*/
    SliderPromoSectionComponent.prototype.deleteSubject = function (slideIndex, chipIndex) {
        var _this = this;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var subject = args[1];
            switch (subject) {
                case 'slide':
                    {
                        _this.componentModel.splice(slideIndex, 1);
                        _this._resetAllModels();
                        _this.modelChips.length = 0;
                    }
                    break;
                case 'tour':
                    {
                        _this.componentModel[slideIndex]
                            .chips
                            .splice(chipIndex, 1);
                        delete _this.modelChips[chipIndex];
                    }
                    break;
            }
            _this._checkEditingState();
        };
    };
    return SliderPromoSectionComponent;
}(__WEBPACK_IMPORTED_MODULE_1__basic_actions_component_class__["a" /* BasicActionsComponent */]));
SliderPromoSectionComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Component */])({
        selector: 'app-slider-promo-section',
        template: __webpack_require__(456),
        styles: ["\n        h3 {\n            color: rgba(0,0,0,.54);\n        }\n        .chip-avatar {\n            background-size:cover;\n            width:30px;\n            height:30px;\n            border-radius:50%\n        }\n        .action-btn-cont {\n            margin-top:10px;\n        }\n        .ok-btn-gap {\n            margin-left:40px\n        }\n    "]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Z" /* Injector */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Z" /* Injector */]) === "function" && _a || Object])
], SliderPromoSectionComponent);

var _a;
/*interface IChipProps {
    destination: string;
    avatar: string;
    starCount: number;
}*/
//# sourceMappingURL=slider-promo-section.component.js.map

/***/ }),

/***/ 436:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__editor_directive__ = __webpack_require__(421);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FroalaEditorModule; });


var FroalaEditorModule = (function () {
    function FroalaEditorModule() {
    }
    FroalaEditorModule.forRoot = function () {
        return { ngModule: FroalaEditorModule, providers: [] };
    };
    FroalaEditorModule.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */], args: [{
                    declarations: [__WEBPACK_IMPORTED_MODULE_1__editor_directive__["a" /* FroalaEditorDirective */]],
                    exports: [__WEBPACK_IMPORTED_MODULE_1__editor_directive__["a" /* FroalaEditorDirective */]]
                },] },
    ];
    /** @nocollapse */
    FroalaEditorModule.ctorParameters = function () { return []; };
    return FroalaEditorModule;
}());
//# sourceMappingURL=editor.module.js.map

/***/ }),

/***/ 437:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__editor__ = __webpack_require__(422);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__view__ = __webpack_require__(423);
/* unused harmony reexport FroalaEditorDirective */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__editor__["a"]; });
/* unused harmony reexport FroalaViewDirective */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__view__["a"]; });
/* unused harmony export FERootModule */





var MODULES = [
    __WEBPACK_IMPORTED_MODULE_1__editor__["a" /* FroalaEditorModule */],
    __WEBPACK_IMPORTED_MODULE_2__view__["a" /* FroalaViewModule */]
];
var FERootModule = (function () {
    function FERootModule() {
    }
    FERootModule.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */], args: [{
                    imports: [
                        __WEBPACK_IMPORTED_MODULE_1__editor__["a" /* FroalaEditorModule */].forRoot(),
                        __WEBPACK_IMPORTED_MODULE_2__view__["a" /* FroalaViewModule */].forRoot()
                    ],
                    exports: MODULES
                },] },
    ];
    /** @nocollapse */
    FERootModule.ctorParameters = function () { return []; };
    return FERootModule;
}());
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 438:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__view_directive__ = __webpack_require__(424);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FroalaViewModule; });


var FroalaViewModule = (function () {
    function FroalaViewModule() {
    }
    FroalaViewModule.forRoot = function () {
        return { ngModule: FroalaViewModule, providers: [] };
    };
    FroalaViewModule.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */], args: [{
                    declarations: [__WEBPACK_IMPORTED_MODULE_1__view_directive__["a" /* FroalaViewDirective */]],
                    exports: [__WEBPACK_IMPORTED_MODULE_1__view_directive__["a" /* FroalaViewDirective */]]
                },] },
    ];
    /** @nocollapse */
    FroalaViewModule.ctorParameters = function () { return []; };
    return FroalaViewModule;
}());
//# sourceMappingURL=view.module.js.map

/***/ }),

/***/ 440:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(31)();
// imports


// module
exports.push([module.i, ".nav__container {\r\n    width: 100%;\r\n    height: calc(100vh - 72px);\r\n}\r\n.nav__side-nav {\r\n    height: calc(100vh - 72px);\r\n    width: 240px;\r\n    box-shadow: 3px 0 6px rgba(0,0,0,.24);\r\n}\r\n.list {\r\n    padding-top: 0;\r\n}\r\n.list__label {\r\n    background: rgba(0,0,0,.32);\r\n    color: #fff;\r\n    border: none;\r\n    font-size: 10px;\r\n    letter-spacing: 1px;\r\n    line-height: 24px;\r\n    text-transform: uppercase;\r\n    font-weight: 400;\r\n    margin: 0;\r\n    padding: 0 16px;\r\n}\r\n.list__item {\r\n    color: rgba(0,0,0,.54);\r\n    background-color: #fafafa;\r\n    cursor: pointer;\r\n    -webkit-transition: .5s ease-out;\r\n    transition: .5s ease-out;\r\n}\r\n.list__item:hover {\r\n    background-color: rgba(0,0,0,.14);\r\n    color: #00bcd4;\r\n}\r\n.card__wrap {\r\n    width: 100%;\r\n}\r\n.card__content {\r\n    width: 90%;\r\n    margin: auto;\r\n    margin-top: 30px;\r\n}\r\n/*#fine-uploader {\r\n    width: 96%;\r\n    margin: auto;\r\n    padding: 50px 0;\r\n}*/\r\n.headings {\r\n    padding: 0 20px;\r\n    color: rgba(0,0,0,.54);\r\n    text-align: center;\r\n    font-weight: 100;\r\n}\r\n.intro-cards {\r\n    width: 250px;\r\n    cursor: pointer;\r\n    margin-bottom: 50px;\r\n}\r\n.intro-imgs {\r\n    font-size: 7em;\r\n    color: #00bcd4;\r\n    text-shadow: 1px 1px 2px #000;\r\n    -webkit-transform: translateX(-135%);\r\n            transform: translateX(-135%);\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 441:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(31)();
// imports


// module
exports.push([module.i, ".general {\r\n    width: 100%;\r\n    height: 300px;\r\n    text-align: center; \r\n    color: rgba(0,0,0,.54);\r\n    padding: 0 30px;\r\n}\r\n.f-s__fasade {\r\n    width: 92%;\r\n    margin-top: 30px;\r\n    margin-bottom: 40px;\r\n}\r\n\r\n.f-s__file-cont {\r\n    background-color: rgba(128, 128, 128, 0.2);\r\n    margin: 30px 0;\r\n}\r\n.f-s__img-cont {\r\n    width: 300px;\r\n    height: 150px;\r\n}\r\n.f-s__img {\r\n    margin: auto;\r\n    max-width: 300px;\r\n    max-height: 150px;\r\n}\r\n.fs__f-text-cont {\r\n    font-size: 1.8em;\r\n    text-align: center;\r\n    width: 20%;\r\n    padding: 0 20px;\r\n    color: rgba(0,0,0,.54);\r\n    overflow: auto;\r\n}\r\n.fs__fname-text-cont {\r\n    width: 60%;\r\n}\r\n.f-s__text {\r\n    margin: auto;\r\n}\r\n.f-u {\r\n    margin: 0 auto;\r\n}\r\n.fs__menu-cont {\r\n    width: 50px;\r\n}\r\n.f-s__img-ico {\r\n    font-size: 10em;\r\n    position: relative;\r\n    top: -5px;\r\n    left: 43px;\r\n    text-shadow: 1px 1px 2px #808080;\r\n    color: #808080;\r\n}\r\n/*.menu-item {\r\n    width: 70%;\r\n}\r\n.menu-ico {\r\n    padding-left: 20px;\r\n    margin-right: 0;\r\n}*/\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 442:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(31)();
// imports


// module
exports.push([module.i, ".section-card {\r\n    width: 40%;\r\n    margin-top: 30px;\r\n    color: rgba(0,0,0,.54);\r\n    cursor: pointer;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 443:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(31)();
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Pathway+Gothic+One);", ""]);

// module
exports.push([module.i, ".S14 {\r\n    max-width: 1366px;\r\n    overflow: auto;\r\n    height: calc(100vh - 144px);\r\n}\r\n.S14__wrap {\r\n    background-color: #111;\r\n    color: #fff;\r\n    \r\n    width: 100%;\r\n    height: auto;\r\n}\r\n.S14__tit {\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-pack: center;\r\n      -ms-flex-pack: center;\r\n          justify-content: center;\r\n  position: relative;\r\n  background-color: rgba(256,256,256,.03);\r\n  background-image: -webkit-linear-gradient(top, #111, #0c0c0c);\r\n  background-image: -o-linear-gradient(top, #111, #0c0c0c);\r\n  font-family: 'Pathway Gothic One', Arial, Helvetica, sans-serif;\r\n  text-align: center;\r\n  line-height: 1.4em;\r\n  text-transform: uppercase;\r\n  white-space:nowrap;\r\n}\r\n/*.S14__pre, .S14__gr {\r\n    opacity: 0;\r\n    transition: opacity 2s linear;\r\n}*/\r\n\r\n.S14__gr {\r\n    font-weight: bolder;\r\n}\r\n\r\n/*.S14__a.S14__pre, .S14__a.S14__gr, .S14__a.S14__image {\r\n    opacity: 1;\r\n}*/\r\n.S14__f, .S14__b {\r\n  text-transform: lowercase;\r\n  vertical-align: middle;\r\n}\r\n/*.S14__a.S14__f, .S14__a.S14__b*/\r\n .S14__f, .S14__b{\r\n  text-shadow: 0 0 20px #fefcc9,\r\n  10px -10px 30px #feec85,\r\n  -20px -20px 40px #ffae34,\r\n  20px -40px 50px #ec760c,\r\n  -20px -60px 60px #cd4606,\r\n  0 -80px 70px #973716,\r\n  10px -90px 80px #451b0e;\r\n}\r\n/*.S14__f, .S14__b {\r\n  transition: text-shadow 1.1s ease-out;\r\n  text-shadow: 0 0 0 #fefcc9,\r\n  0 0 0 #feec85,\r\n  0 0 0 #ffae34,\r\n  0 0 0 #ec760c,\r\n  0 0 0 #cd4606,\r\n  0 0 0 #973716,\r\n  0 0 0 #451b0e;\r\n}*/\r\n/*.S14__a.S14__f*/\r\n .S14__f {\r\n  animation: S14__f 1s ease-in-out 1s infinite alternate;\r\n  -moz-animation: S14__f 1s ease-in-out 1s infinite alternate;\r\n  -webkit-animation: S14__f 1s ease-in-out 1s infinite alternate;\r\n  -o-animation: S14__f 1s ease-in-out 1s infinite alternate;\r\n}\r\n\r\n/*.S14__a.S14__b*/\r\n.S14__b {\r\n  animation: S14__f .65s ease-in-out 1s infinite alternate;\r\n  -moz-animation: S14__f .65s ease-in-out 1s infinite alternate;\r\n  -webkit-animation: S14__f .65s ease-in-out 1s infinite alternate;\r\n  -o-animation: S14__f .65s ease-in-out 1s infinite alternate;\r\n}\r\n.S14__i-wrap {\r\n    width: 100%;\r\n    height: 100%;\r\n    padding-bottom: 100px;\r\n}\r\n\r\n.S14__image {\r\n    /*max-width: 400px;*/\r\n    width: 100%;\r\n    display: block;\r\n    /*margin: 0 auto;*/\r\n    -webkit-transition: opacity 2s linear;\r\n    transition: opacity 2s linear;\r\n    opacity: 0;\r\n}\r\n@keyframes S14__f\r\n{\r\n0% {text-shadow: 0 0 20px #fefcc9,\r\n  10px -10px 30px #feec85,\r\n  -20px -20px 40px #ffae34,\r\n  20px -40px 50px #ec760c,\r\n  -20px -60px 60px #cd4606,\r\n  0 -80px 70px #973716,\r\n  10px -90px 80px #451b0e;}\r\n100% {text-shadow: 0 0 20px #fefcc9,\r\n  10px -10px 30px #fefcc9,\r\n  -20px -20px 40px #feec85,\r\n  22px -42px 60px #ffae34,\r\n  -22px -58px 50px #ec760c,\r\n  0 -82px 80px #cd4606,\r\n  10px -90px 80px  #973716;}\r\n}\r\n\r\n@-webkit-keyframes S14__f\r\n{\r\n0% {text-shadow: 0 0 20px #fefcc9,\r\n  10px -10px 30px #feec85,\r\n  -20px -20px 40px #ffae34,\r\n  20px -40px 50px #ec760c,\r\n  -20px -60px 60px #cd4606,\r\n  0 -80px 70px #973716,\r\n  10px -90px 80px #451b0e;}\r\n100% {text-shadow: 0 0 20px #fefcc9,\r\n  10px -10px 30px #fefcc9,\r\n  -20px -20px 40px #feec85,\r\n  22px -42px 60px #ffae34,\r\n  -22px -58px 50px #ec760c,\r\n  0 -82px 80px #cd4606,\r\n  10px -90px 80px  #973716;}\r\n}\r\n@media all and (min-width: 1px) {\r\n    .S14__wrap {\r\n        padding-top: 100px;\r\n    }\r\n    .S14__tit {\r\n        -webkit-box-orient: vertical;\r\n        -webkit-box-direction: normal;\r\n            -ms-flex-direction: column;\r\n                flex-direction: column;\r\n    }\r\n    .S14__pre {\r\n        font-size: 1.7em;\r\n        letter-spacing: 0.1em;\r\n    }\r\n    .S14__del {\r\n        display: none;\r\n    }\r\n    .S14__gr {\r\n        font-size: 2.7em;\r\n        letter-spacing: 0.1em;\r\n    }\r\n    .S14__wo {\r\n      padding-bottom: 50px;\r\n    }\r\n}\r\n@media all and (min-width: 350px) {\r\n    .S14__pre {\r\n        font-size: 1.8em;\r\n    }\r\n    .S14__gr {\r\n        font-size: 3.5em;\r\n    }\r\n}\r\n@media all and (min-width: 500px) {\r\n   \r\n    .S14__gr {\r\n        font-size: 4.5em;\r\n    }\r\n}\r\n@media all and (min-width: 700px) {\r\n    .S14__pre {\r\n        font-size: 2.5em;\r\n    }\r\n    .S14__gr {\r\n        font-size: 6em;\r\n    }\r\n}\r\n@media all and (min-width: 1000px) {\r\n    .S14__gr {\r\n        font-size: 6.5em;\r\n    }\r\n}\r\n@media all and (min-width: 1190px) {\r\n    .S14__wrap {\r\n        padding-top: 200px;\r\n    }\r\n    .S14__pre {\r\n        position: relative;\r\n        top: 60%;\r\n    }\r\n    .S14__gr {\r\n        font-size: 9em;\r\n        position: relative;\r\n        top: 30%;\r\n    }\r\n    .S14__del {\r\n        display: inline;\r\n    }\r\n    .S14__tit {\r\n        -webkit-box-orient: horizontal;\r\n        -webkit-box-direction: normal;\r\n            -ms-flex-direction: row;\r\n                flex-direction: row;\r\n        margin-bottom: 150px;\r\n    }\r\n    .S14__wo {\r\n      padding-bottom: 0;\r\n    }\r\n    .S14__w1 {\r\n        padding-right: 5%;\r\n    }\r\n    .S14__w2 {\r\n        padding-left: 5%;\r\n    }\r\n}\r\n.S14__c-w, .S14__ph {\r\n    font-family: 'Source Sans Pro', Arial, Helvetica, sans-serif;\r\n    padding: 0 20px;\r\n    text-align: center;\r\n}\r\n.S14__c-w {\r\n    padding-bottom: 150px;\r\n}\r\n.S14__c-t, .S14__ph a {\r\n    font-size: 2em;\r\n    font-weight: 200;\r\n    color: #fff;\r\n}\r\n.S14__image {\r\n    position: absolute;\r\n}\r\n.S14__image.S14__vis {\r\n    opacity: 1;\r\n    z-index: 2;\r\n}\r\n.S14__i-wrap {\r\n    position: relative;\r\n    -webkit-transition: height .1s ease-out;\r\n    transition: height .1s ease-out;\r\n}\r\n\r\n.mdMenu-item {\r\n    position: absolute;\r\n    left: -890px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 444:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(31)();
// imports


// module
exports.push([module.i, "/*@import url('https://fonts.googleapis.com/css?family=Pathway+Gothic+One');*/\r\n.bottom-tb {\r\n    /*background-color: rgba(160, 206, 212, 0.64);*/\r\n    position: fixed;\r\n    bottom: 0;\r\n    -webkit-transform: translateY(62px);\r\n            transform: translateY(62px);\r\n    -webkit-transition: .5s ease-out;\r\n    transition: .5s ease-out;\r\n    border-top: 1px solid #e0e0e0;\r\n}\r\n.bottom-tb.active {\r\n    -webkit-transform: translateY(0);\r\n            transform: translateY(0);\r\n}\r\n.S8 {\r\n    height: 100vh;\r\n    overflow: hidden;\r\n}\r\n.S8__slider {\r\n    background-color: #0e1312;\r\n    min-height: 400px;\r\n}\r\n.S8__s-b {\r\n    background-size: cover;\r\n    height: 100vh;\r\n    width: 100%;\r\n}\r\n\r\n.S8__s-c{\r\n    position: absolute;\r\n    top: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    z-index: 3;\r\n    overflow: hidden;\r\n}\r\n.S8__slide .S8__s-c::before{\r\n    content: '';\r\n    display: block;\r\n    -webkit-transform: translateX(-44%) rotateZ(45deg);\r\n            transform: translateX(-44%) rotateZ(45deg);\r\n    position: absolute;\r\n    z-index: 1;\r\n    width: 200%;\r\n    height: 200%;\r\n}\r\n\r\n.S8__s-c::before{\r\n    background-color: rgba(233, 156, 126, .7);\r\n}\r\n\r\n\r\n.S8__slide .S8__t{\r\n    font-family: 'Pathway Gothic One', Arial, Helvetica, sans-serif;\r\n    position: absolute;\r\n    z-index: 2;\r\n    top: 15%;\r\n    left: 7%;\r\n    color: #fff;\r\n    max-height: 375px;\r\n    overflow: hidden;\r\n}\r\n.S8__t-h-link, .S8__t-link{\r\n    color: #fff;\r\n    text-decoration: none;\r\n    display: inline-block;\r\n    margin: auto;\r\n    border-radius: 16px;\r\n    border: 2px solid #fff;\r\n}\r\n.S8__t-h-link {\r\n    border: none;\r\n}\r\n\r\n.S8__t-link button, .S8__t-h-link button {\r\n    outline: none;\r\n    border-radius: 16px;\r\n    border: none;\r\n    cursor: pointer;\r\n    width: 256px;\r\n    height: 55px;\r\n    color: #fff;\r\n    background-color: transparent;\r\n    font-size: 1.8em;\r\n    font-family: 'Pathway Gothic One', Arial, Helvetica, sans-serif;\r\n}\r\n.S8__t-h-link button {\r\n    width: 390px;\r\n    height: auto;\r\n    max-width: 390px;\r\n    padding: 0 20px;\r\n    min-height: 55px;\r\n    font-size: 3em;\r\n    text-align: left;\r\n}\r\n\r\n.S8__t-desc{\r\n    margin-top: 20px;\r\n    margin-bottom: 40px;\r\n    font-size: 1.3em;\r\n    width: 400px;\r\n}\r\n\r\n\r\n.S8__plugin{\r\n    position: absolute;\r\n    top: 20%;\r\n    left: 60%;\r\n    z-index: 3;\r\n}\r\n\r\n.chips-material{\r\n    display: inline-block;\r\n    margin: auto;\r\n}\r\n.chip__cont {\r\n    display: -webkit-inline-box;\r\n    display: -ms-inline-flexbox;\r\n    display: inline-flex;\r\n    background-color: #e4e4e4;\r\n    color: rgba(0,0,0,0.6);\r\n    border-radius: 16px;\r\n}\r\n.chip__bg {\r\n    background-size: cover;\r\n    width: 30px;\r\n    height: 30px;\r\n    border-radius: 50%;\r\n}\r\n.chip__capt {\r\n    margin: 0;\r\n    padding: 0;\r\n    font-family: 'Pathway Gothic One', Arial, Helvetica, sans-serif;\r\n    font-weight: 600;\r\n    padding-left: 7px;\r\n    font-size: 1.2em;\r\n    line-height: 28px;\r\n}\r\n.chip__stars{\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-align: center;\r\n        -ms-flex-align: center;\r\n            align-items: center;\r\n    padding-left: 7px;\r\n}\r\n.chip__stars svg{\r\n    width: 24px; \r\n    height: 24px;\r\n    padding-right: 3px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 446:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"componentModel; else Spinner\" fxLayout=\"column\">\r\n    <md-card fxFlexAlign=\"center\" class=\"align-cards\">\r\n        <md-tab-group *ngIf=\"componentModel.length; else NoContent\" dynamicHeight=\"true\" [(selectedIndex)]=\"tabIndex\" (selectChange)=\"onTabChange($event)\">\r\n            <md-tab [disabled]=\"_isEditing && tabIndex != index\" *ngFor=\"let person of componentModel; index as index\">\r\n                <ng-template md-tab-label>\r\n                    <span *ngIf=\"!person.avatarUrl\">Review {{index + 1}}</span>\r\n                    <img class=\"tab-avatar\" *ngIf=\"person.avatarUrl\" [src]=\"tabIndex == index ? avatarModel.content || person.avatarUrl : person.avatarUrl\">\r\n                </ng-template>\r\n\r\n                <div>\r\n                    <h3>1. Background Image: </h3>\r\n                    <img *ngIf=\"avatarModel.content || person.avatarUrl; else NotSpecified\" style=\"max-width:500px\" [src]=\"avatarModel.content || person.avatarUrl\">\r\n                </div>\r\n                <div *ngIf=\"avatarModel.isEditing\">\r\n                    <h4>Select background slide image:</h4>\r\n                    <ng-container *ngIf=\"!publicImages.isRequestSent; else Spinner\">\r\n                        <ng-container *ngIf=\"publicImages.data?.length > 0; else PublicEmpty\">\r\n                            <md-tab-group [dynamicHeight]=\"true\">\r\n                                <md-tab *ngFor=\"let image of publicImages.data; index as i\">\r\n                                    <ng-template md-tab-label>\r\n                                        <span>Image {{i + 1}}</span>\r\n                                        <img style=\"width:30px;position:relative;top:10px;left:20px\" [src]=\"image.links.self\">\r\n                                    </ng-template>\r\n                                    <div fxLayout=\"row\">\r\n                                        <div>\r\n                                            <img #slideImgRef (click)=\"onBackgroundImgClick(avatarModel, image, slideImgRef)\" style=\"width:300px;cursor:pointer;transition:.7s\" [src]=\"image.links.self\">\r\n                                        </div>\r\n                                        <div style=\"margin-left:25%\">\r\n                                            <p><i>Natural image size:</i></p>\r\n                                            <p>{{getNaturalSize(slideImgRef, 'naturalWidth')}} &#10006; {{getNaturalSize(slideImgRef, 'naturalHeight')}}</p>\r\n                                        </div>\r\n                                    </div>\r\n                                </md-tab>\r\n                            </md-tab-group>\r\n                        </ng-container>\r\n                    </ng-container>\r\n                </div>\r\n                <div class=\"action-btn-cont\" fxLayout=\"row\">\r\n                    <button *ngIf=\"!avatarModel.isEditing\" (click)=\"onEdit(person.avatarUrl, avatarModel, 'i')\" md-raised-button color=\"accent\">EDIT</button>\r\n                    <ng-container *ngIf=\"avatarModel.isEditing\">\r\n                        <button (click)=\"onCancelEdit(avatarModel)\" md-raised-button color=\"accent\">CANCEL</button>\r\n                        <button class=\"ok-btn-gap\" (click)=\"onOk({ subject: person, prop: 'avatarUrl', model: avatarModel})\" md-raised-button color=\"warn\" [disabled]=\"!avatarModel.clickedImgRef\">OK</button>\r\n                    </ng-container>\r\n                </div>\r\n                <hr>\r\n                <div>\r\n                    <h3>2. Name:</h3>\r\n                    <h4>{{nameModel.content || person.name || notSpecifiedMessage}}</h4>\r\n                </div>\r\n                <div *ngIf=\"nameModel.isEditing\">\r\n                    <md-input-container dividerColor=\"accent\">\r\n                        <input mdInput placeholder=\"Edit name\" [(ngModel)]=\"nameModel.content\" >\r\n                    </md-input-container>\r\n                </div>\r\n                <div class=\"action-btn-cont\" fxLayout=\"row\">\r\n                    <button *ngIf=\"!nameModel.isEditing\" (click)=\"onEdit(person.name, nameModel)\" md-raised-button color=\"accent\">EDIT</button>\r\n                    <ng-container *ngIf=\"nameModel.isEditing\">\r\n                        <button (click)=\"onCancelEdit(nameModel)\" md-raised-button color=\"accent\">CANCEL</button>\r\n                        <button class=\"ok-btn-gap\" (click)=\"onOk({ subject: person, prop: 'name', model: nameModel})\" md-raised-button color=\"warn\">OK</button>\r\n                    </ng-container>\r\n                </div>\r\n                <hr>\r\n                <div>\r\n                    <h3>2. Position & Designation:</h3>\r\n                    <h4>{{designationModel.content || person.designation || notSpecifiedMessage}}</h4>\r\n                </div>\r\n                <div *ngIf=\"designationModel.isEditing\">\r\n                    <md-input-container dividerColor=\"accent\">\r\n                        <input mdInput placeholder=\"Edit designation\" [(ngModel)]=\"designationModel.content\" >\r\n                    </md-input-container>\r\n                </div>\r\n                <div class=\"action-btn-cont\" fxLayout=\"row\">\r\n                    <button *ngIf=\"!designationModel.isEditing\" (click)=\"onEdit(person.designation, designationModel)\" md-raised-button color=\"accent\">EDIT</button>\r\n                    <ng-container *ngIf=\"designationModel.isEditing\">\r\n                        <button (click)=\"onCancelEdit(designationModel)\" md-raised-button color=\"accent\">CANCEL</button>\r\n                        <button class=\"ok-btn-gap\" (click)=\"onOk({ subject: person, prop: 'designation', model: designationModel})\" md-raised-button color=\"warn\">OK</button>\r\n                    </ng-container>\r\n                </div>\r\n                <hr>\r\n                <div>\r\n                    <div>\r\n                        <h3>4. Review: </h3>\r\n                        <p class=\"fr-view\" [innerHTML]=\"reviewModel.sanitizedContent\"></p>\r\n                    </div>\r\n                    <div style=\"min-height:215px\" *ngIf=\"reviewModel.isEditing\" [froalaEditor]=\"editorOpts\" [froalaModel]=\"reviewModel.content\" (froalaModelChange)=\"onFroalaModelChange($event, reviewModel)\"></div>\r\n                        <div class=\"action-btn-cont\">\r\n                            <button *ngIf=\"!reviewModel.isEditing\" (click)=\"onEdit(person.review, reviewModel)\" md-raised-button color=\"accent\">EDIT</button>\r\n                            <ng-container *ngIf=\"reviewModel.isEditing\">\r\n                                <button (click)=\"onCancelEditSan(reviewModel, person.review)\"  md-raised-button color=\"accent\">CANCEL</button>\r\n                                <button class=\"ok-btn-gap\" (click)=\"onOk({ subject: person, prop: 'review', model: reviewModel })\" md-raised-button color=\"warn\">OK</button>\r\n                            </ng-container>\r\n                        </div>\r\n                </div>\r\n                <hr>\r\n                <div style=\"margin:30px 0\" fxLayout=\"row\">\r\n                    <button class=\"ok-btn-gap\" md-raised-button color=\"warn\" (click)=\"openDialog(deleteSubjectBasic(index), 'person')\">DELETE PERSON</button>\r\n                </div>\r\n            </md-tab>\r\n        </md-tab-group>\r\n    </md-card>\r\n    <div style=\"margin:30px 0;width:100%\" fxLayout=\"row\" fxLayoutAlign=\"space-around\">\r\n        <button md-raised-button color=\"primary\" (click)=\"onAddNewItem(componentModel, templateNewPerson)\">ADD NEW PERSON</button>\r\n        <button #btnRef class=\"ok-btn-gap\" *ngIf=\"isNeedSaveChanges(componentModel)\" (click)=\"onSave(btnRef)\" md-raised-button color=\"warn\">SAVE CHANGES</button>\r\n    </div>\r\n</div>\r\n\r\n<ng-template #PublicEmpty>\r\n    <div \r\n    fxLayout=\"row\" \r\n    [style.height]=\"'153px'\">\r\n        <div fxLayout=\"row\" style=\"height:inherit;width:100%\"><div style=\"margin:auto;color:rgba(0,0,0,.4)\">Public Storage empty!</div></div>\r\n    </div>\r\n</ng-template>\r\n<ng-template #Spinner>\r\n    <div \r\n    fxLayout=\"row\" \r\n    [style.height]=\"\r\n    publicImages.isRequestSent && !publicImages.forChip ?\r\n      '353px' : \r\n    publicImages.isRequestSent && publicImages.forChip ?\r\n      '153px' : \r\n      'calc(100vh - 137px)'\">\r\n        <div fxLayout=\"row\" style=\"height:inherit;width:100%\"><md-spinner style=\"margin:auto\" color=\"accent\"></md-spinner></div>\r\n    </div>\r\n</ng-template>\r\n<ng-template #NoContent>\r\n    <div fxLayout=\"row\" fxLayoutAlign=\"center center\" style=\"height:300px;width:100%\">\r\n        <h1 style=\"color:rgba(0,0,0,.4)\">No Reviews here yet...</h1>\r\n    </div>\r\n</ng-template>\r\n<ng-template #NotSpecified>\r\n    <span>{{notSpecifiedMessage}}</span>\r\n</ng-template>"

/***/ }),

/***/ 447:
/***/ (function(module, exports) {

module.exports = "<md-sidenav-container class=\"nav__container\">\r\n        <md-sidenav class=\"nav__side-nav\" #sideNav mode=\"side\" [opened]=\"true\">\r\n            <md-list class=\"list\" dense>\r\n                <ng-container *ngFor=\"let listItem of _selectedTabService.listOfTabs\">\r\n                    <h3 class=\"list__label\">{{listItem.header}}</h3>\r\n                    <md-list-item \r\n                        [mdTooltip]=\"childItem.tabName\"\r\n                        class=\"list__item\" \r\n                        (click)=\"onListItemSelected(childItem, listItem)\" \r\n                        [ngStyle]=\"isActiveStyle(childItem) ? {background: 'rgba(0,0,0,.14)', color: '#00bcd4'} : {background: '', color: ''}\" \r\n                        *ngFor=\"let childItem of listItem.children\">\r\n                        <md-icon md-list-icon>{{childItem.ico}}</md-icon>\r\n                        <p md-line>{{childItem.tabName}}</p>\r\n                    </md-list-item>\r\n                    <md-divider></md-divider>\r\n                </ng-container>\r\n            </md-list>\r\n        </md-sidenav>\r\n        <div>\r\n            <ng-container *ngIf=\"_selectedTabService.currentlySelectedTab\">\r\n                <md-toolbar color=\"primary\">\r\n                    <span>{{_selectedTabService.currentlySelectedTab.header}}</span>\r\n                </md-toolbar>\r\n            </ng-container>\r\n            <div [ngSwitch]=\"_selectedTabService.currentlySelectedTab?._name\">\r\n                <md-card *ngSwitchCase=\"'some content'\" class=\"card__content\">\r\n                        <md-card-content>\r\n                                <md-tab-group>\r\n                                    <md-tab textLabel=\"File Storage\">\r\n                                        <h1>Some tab content</h1>\r\n                                        <p>...</p>\r\n                                    </md-tab>\r\n                                    <md-tab label=\"Files in Public\">\r\n                                        <h1>Some more tab content</h1>\r\n                                        <p>...</p>\r\n                                    </md-tab>\r\n                                </md-tab-group>\r\n                        </md-card-content>\r\n                </md-card>\r\n                <ng-container *ngSwitchCase=\"'contacts'\">\r\n                    <app-site-contacts></app-site-contacts>\r\n                </ng-container>\r\n                <ng-container *ngSwitchCase=\"'landing'\">\r\n                    <app-landing-page-settings (onSelected)=\"onListItemSelected($event)\" [sectionTab]=\"_selectedTabService.currentlySelectedChild\" [sectionList]=\"_selectedTabService.currentlySelectedTab.children\"></app-landing-page-settings>\r\n                </ng-container>\r\n                <ng-container *ngSwitchCase=\"'file uploads'\">\r\n                    <app-file-storage></app-file-storage>\r\n                </ng-container>\r\n                <ng-container *ngSwitchDefault>\r\n                    <h1 class=\"headings\">This is that place, where You can make our business better...</h1>\r\n                    <div fxLayout=\"row\" fxLayoutAlign=\"space-around\" fxLayoutWrap=\"wrap\">  \r\n                        <md-card *ngFor=\"let item of _selectedTabService.listOfTabs\" (click)=\"onIntroCardClick(item)\" class=\"intro-cards\">\r\n                            <md-card-title class=\"headings\">{{item.header}}</md-card-title>\r\n                            <div fxLayout=\"row\" fxLayoutAlign=\"center\">   \r\n                                <md-card-content>\r\n                                    <md-icon class=\"intro-imgs\">{{item.ico}}</md-icon>\r\n                                </md-card-content>\r\n                            </div>\r\n                        </md-card> \r\n                    </div>\r\n                </ng-container>\r\n            </div>\r\n        </div>\r\n</md-sidenav-container>\r\n\r\n"

/***/ }),

/***/ 448:
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"row\" fxLayoutAlign=\"center\">\r\n  <md-card class=\"f-s__fasade\">\r\n    <md-tab-group [dynamicHeight]=\"true\" class=\"f-s__fix\">\r\n      <md-tab [label]=\"tab.name | titlecase\" *ngFor=\"let tab of tabs; index as indexOfTab\">\r\n        <ng-template #Empty>\r\n          <div class=\"general\" fxLayout=\"row\"><h1 class=\"f-s__text\">{{(indexOfTab == 0 ? tab.name.split(' ')[0] : tab.name) | titlecase}} Storage is empty</h1></div>\r\n        </ng-template>\r\n        <ng-container *ngIf=\"filesResponse; else Spinner\">\r\n          <ng-container *ngIf=\"!isEmpty(tab); else Empty\">\r\n            <ng-container *ngFor=\"let file of filesResponse.data; index as indexOfFile\">\r\n              <md-card class=\"f-s__file-cont\" *ngIf=\"fileSorter(file, tab)\">\r\n                  <div fxLayout=\"row\">\r\n\r\n                    <div class=\"f-s__img-cont\" *ngIf=\"allowedFileTypes.images.exts.includes(file.attributes.fileName.split('.')[1])\" fxLayout=\"row\">\r\n                      <img class=\"f-s__img\" [src]=\"file.links.self\">\r\n                    </div>\r\n\r\n                    <div class=\"f-s__img-cont\" *ngIf=\"allowedFileTypes.media.exts.includes(file.attributes.fileName.split('.')[1])\" fxLayout=\"row\">\r\n                      <div><md-icon class=\"f-s__img-ico\">music_video</md-icon></div>\r\n                    </div>\r\n\r\n                    <div class=\"f-s__img-cont\" *ngIf=\"allowedFileTypes.docs.exts.includes(file.attributes.fileName.split('.')[1])\" fxLayout=\"row\">\r\n                      <div><md-icon class=\"f-s__img-ico\">chrome_reader_mode</md-icon></div>\r\n                    </div>\r\n                    \r\n                    <div class=\"fs__f-text-cont fs__fname-text-cont\" fxLayout=\"column\">\r\n                      \r\n                      <div class=\"f-s__text\" *ngIf=\"renameFileFields.fileId === file.id && !_isRequestSent; else RenameInput\" fxFlexAlign=\"center\" >\r\n                          <input #input (blur)=\"blurResolveLink()\" [(ngModel)]=\"renameFileFields.modelFileName\" style=\"height: 15px\" spellcheck=\"false\"><span>.</span><span>{{renameFileFields.fileExt}}</span>\r\n                      </div>\r\n                      <ng-template #RenameInput>\r\n                        <p class=\"f-s__text\" fxFlexAlign=\"center\">{{displayFileName(file)}}</p>\r\n                      </ng-template>\r\n                    </div>\r\n                    <div class=\"fs__f-text-cont\" fxLayout=\"row\">\r\n                      <p class=\"f-s__text\" fxFlexAlign=\"center\">{{(file.attributes.fileSize / 1024).toFixed(2)}}Kb</p>\r\n                    </div>\r\n                    <div class=\"fs__menu-cont\" fxLayout=\"row\">\r\n                      \r\n                      <button class=\"f-s__text\" md-icon-button [mdMenuTriggerFor]=\"appMenu\" (onMenuOpen)=\"appMenu.focusFirstItem()\">\r\n                        <md-icon>more_vert</md-icon>\r\n                      </button>\r\n                      \r\n                      <md-menu #appMenu=\"mdMenu\">\r\n                          <button *ngFor=\"let menuItem of getMenuArray(tab, file)\" (click)=\"menuItem.action.call($this, file, indexOfFile)\" fxLayout=\"row\" md-menu-item>\r\n                            <md-icon fxFlexAlign=\"center\">{{menuItem.ico}}</md-icon>\r\n                            <span fxFlexAlign=\"center\">{{menuItem.name}}</span>\r\n                          </button>\r\n                      </md-menu>\r\n\r\n                    </div>\r\n                  </div>\r\n              </md-card>\r\n            </ng-container>\r\n          </ng-container>\r\n        </ng-container>\r\n      </md-tab>\r\n    </md-tab-group>\r\n  </md-card>\r\n</div>\r\n\r\n<div fxLayout=\"row\" fxLayoutAlign=\"center\">\r\n  <md-card class=\"f-s__fasade\">\r\n      <!-- The element where Fine Uploader will exist. -->\r\n      <div class=\"f-u\" id=\"fine-uploader\"></div>\r\n      <div [innerHTML]=\"simpleThumbnail\"></div>\r\n  </md-card>\r\n</div>\r\n\r\n\r\n\r\n<ng-template #Spinner>\r\n  <div class=\"general\" fxLayout=\"row\">\r\n    <md-spinner class=\"f-s__text\" color=\"accent\"></md-spinner>\r\n  </div>\r\n</ng-template>\r\n\r\n\r\n\r\n<!--<ng-template #EmptyPublic>\r\n  <div class=\"general\" fxLayout=\"row\"><h1 class=\"f-s__text\">Public Storage is empty</h1></div>\r\n</ng-template>-->"

/***/ }),

/***/ 449:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"componentModel; else Spinner\" fxLayout=\"column\">\r\n    <md-card fxFlexAlign=\"center\" class=\"align-cards\">\r\n        <div>\r\n            <div>\r\n                <h3>1. Section Title:</h3>\r\n                <h4>{{((titleModel.content || componentModel.title) | uppercase) || notSpecifiedMessage}}</h4>\r\n            </div>\r\n            <div>\r\n                <div *ngIf=\"titleModel.isEditing\">\r\n                    <md-input-container dividerColor=\"accent\">\r\n                        <input mdInput placeholder=\"Edit section title\" [(ngModel)]=\"titleModel.content\">\r\n                    </md-input-container>\r\n                </div>\r\n                <div class=\"action-btn-cont\">\r\n                    <button *ngIf=\"!titleModel.isEditing\" (click)=\"onEdit(componentModel.title, titleModel, null, false)\" md-raised-button color=\"accent\">EDIT</button>\r\n                    <ng-container *ngIf=\"titleModel.isEditing\">\r\n                        <button (click)=\"onCancelEdit(titleModel)\" md-raised-button color=\"accent\">CANCEL</button>\r\n                        <button class=\"ok-btn-gap\" (click)=\"onOk({ subject: componentModel, prop: 'title', model: titleModel})\" md-raised-button color=\"warn\">OK</button>\r\n                    </ng-container>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <hr>\r\n        <div>\r\n            <div>\r\n                <h3>2. Article Content:</h3>\r\n                <p class=\"fr-view\" [innerHTML]=\"articleModel.sanitizedContent\"></p>\r\n            </div>\r\n            <div>\r\n                <div style=\"min-height:215px\" *ngIf=\"articleModel.isEditing\" [froalaEditor]=\"editorOpts\" [froalaModel]=\"articleModel.content\" (froalaModelChange)=\"onFroalaModelChange($event, articleModel)\"></div>\r\n                <div class=\"action-btn-cont\">\r\n                    <button *ngIf=\"!articleModel.isEditing\" (click)=\"onEdit(componentModel.article, articleModel, null, false)\" md-raised-button color=\"accent\">EDIT</button>\r\n                    <ng-container *ngIf=\"articleModel.isEditing\">\r\n                        <button (click)=\"onCancelEditSan(articleModel, componentModel.article)\" md-raised-button color=\"accent\">CANCEL</button>\r\n                        <button class=\"ok-btn-gap\" (click)=\"onOk({ subject: componentModel, prop: 'article', model: articleModel})\" md-raised-button color=\"warn\">OK</button>\r\n                    </ng-container>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </md-card>\r\n    <md-card fxFlexAlign=\"center\" class=\"align-cards\">\r\n        <md-tab-group *ngIf=\"componentModel.people.length; else NoContent\" dynamicHeight=\"true\" [(selectedIndex)]=\"tabIndex\" (selectChange)=\"onTabChange($event)\">\r\n            <md-tab [disabled]=\"_isEditing && tabIndex != indexOfPeople\" *ngFor=\"let person of componentModel.people; index as indexOfPeople\">\r\n                <ng-template md-tab-label>\r\n                    <span *ngIf=\"!person.avatarUrl\">Person {{indexOfPeople + 1}}</span>\r\n                    <img class=\"tab-avatar\" *ngIf=\"person.avatarUrl\" [src]=\"tabIndex == indexOfPeople ? avatarModel.content || person.avatarUrl : person.avatarUrl\">\r\n                </ng-template>\r\n                <div>\r\n                    <div>\r\n                        <div>\r\n                            <h3>1. Avatar Photo: </h3>\r\n                            <img *ngIf=\"avatarModel.content || person.avatarUrl; else NotSpecified\" style=\"max-width:500px\" [src]=\"avatarModel.content || person.avatarUrl\">\r\n                        </div>\r\n                        <div *ngIf=\"avatarModel.isEditing\">\r\n                            <h4>Select background slide image:</h4>\r\n                            <ng-container *ngIf=\"!publicImages.isRequestSent; else Spinner\">\r\n                                <ng-container *ngIf=\"publicImages.data?.length > 0; else PublicEmpty\">\r\n                                    <md-tab-group [dynamicHeight]=\"true\">\r\n                                        <md-tab *ngFor=\"let image of publicImages.data; index as i\">\r\n                                            <ng-template md-tab-label>\r\n                                                <span>Image {{i + 1}}</span>\r\n                                                <img style=\"width:30px;position:relative;top:10px;left:20px\" [src]=\"image.links.self\">\r\n                                            </ng-template>\r\n                                            <div fxLayout=\"row\">\r\n                                                <div>\r\n                                                    <img #slideImgRef (click)=\"onBackgroundImgClick(avatarModel, image, slideImgRef)\" style=\"width:300px;cursor:pointer;transition:.7s\" [src]=\"image.links.self\">\r\n                                                </div>\r\n                                                <div style=\"margin-left:25%\">\r\n                                                    <p><i>Natural image size:</i></p>\r\n                                                    <p>{{getNaturalSize(slideImgRef, 'naturalWidth')}} &#10006; {{getNaturalSize(slideImgRef, 'naturalHeight')}}</p>\r\n                                                </div>\r\n                                            </div>\r\n                                        </md-tab>\r\n                                    </md-tab-group>\r\n                                </ng-container>\r\n                            </ng-container>\r\n                        </div>\r\n                        <div class=\"action-btn-cont\" fxLayout=\"row\">\r\n                            <button *ngIf=\"!avatarModel.isEditing\" (click)=\"onEdit(person.avatarUrl, avatarModel, 'i')\" md-raised-button color=\"accent\">EDIT</button>\r\n                            <ng-container *ngIf=\"avatarModel.isEditing\">\r\n                                <button (click)=\"onCancelEdit(avatarModel)\" md-raised-button color=\"accent\">CANCEL</button>\r\n                                <button class=\"ok-btn-gap\" (click)=\"onOk({ subject: person, prop: 'avatarUrl', model: avatarModel })\" md-raised-button color=\"warn\" [disabled]=\"!avatarModel.clickedImgRef\">OK</button>\r\n                            </ng-container>\r\n                        </div>\r\n                    </div>\r\n                    <hr>\r\n                    <div>\r\n                        <div>\r\n                            <h3>2. Full Name: </h3>\r\n                            <h4>{{nameModel.content || person.name || notSpecifiedMessage}}</h4>\r\n                        </div>\r\n                        <div *ngIf=\"nameModel.isEditing\">\r\n                            <md-input-container dividerColor=\"accent\">\r\n                                <input mdInput placeholder=\"Edit fullname\" [(ngModel)]=\"nameModel.content\" >\r\n                                <md-hint [style.color]=\"'#f44336'\" align=\"end\">Remember to be short and sweet!</md-hint>\r\n                            </md-input-container>\r\n                        </div>\r\n                        <div class=\"action-btn-cont\">\r\n                            <button *ngIf=\"!nameModel.isEditing\" (click)=\"onEdit(person.name, nameModel)\" md-raised-button color=\"accent\">EDIT</button>\r\n                            <ng-container *ngIf=\"nameModel.isEditing\">\r\n                                <button (click)=\"onCancelEdit(nameModel)\"  md-raised-button color=\"accent\">CANCEL</button>\r\n                                <button class=\"ok-btn-gap\" (click)=\"onOk({ subject: person, prop: 'name', model: nameModel })\" md-raised-button color=\"warn\">OK</button>\r\n                            </ng-container>\r\n                        </div>\r\n                    </div>\r\n                    <hr>\r\n                    <div>\r\n                        <div>\r\n                            <h3>3. Position: </h3>\r\n                            <h4>{{positionModel.content || person.position || notSpecifiedMessage}}</h4>\r\n                        </div>\r\n                        <div *ngIf=\"positionModel.isEditing\">\r\n                            <md-input-container dividerColor=\"accent\">\r\n                                <input mdInput placeholder=\"Edit position\" [(ngModel)]=\"positionModel.content\" >\r\n                            </md-input-container>\r\n                        </div>\r\n                        <div class=\"action-btn-cont\">\r\n                            <button *ngIf=\"!positionModel.isEditing\" (click)=\"onEdit(person.position, positionModel)\" md-raised-button color=\"accent\">EDIT</button>\r\n                            <ng-container *ngIf=\"positionModel.isEditing\">\r\n                                <button (click)=\"onCancelEdit(positionModel)\"  md-raised-button color=\"accent\">CANCEL</button>\r\n                                <button class=\"ok-btn-gap\" (click)=\"onOk({ subject: person, prop: 'position', model: positionModel })\" md-raised-button color=\"warn\">OK</button>\r\n                            </ng-container>\r\n                        </div>\r\n                    </div>\r\n                    <hr>\r\n                    <div>\r\n                        <div>\r\n                            <h3>4. Review: </h3>\r\n                            <p class=\"fr-view\" [innerHTML]=\"reviewModel.sanitizedContent\"></p>\r\n                            <!--<p>{{reviewModel.content || person.review || notSpecifiedMessage}}</p>-->\r\n                        </div>\r\n                        <!--<div *ngIf=\"reviewModel.isEditing\">\r\n                            <md-input-container dividerColor=\"accent\">\r\n                                <textarea \r\n                                mdInput \r\n                                [style.width.px]=\"500\"\r\n                                placeholder=\"Short review\" \r\n                                [(ngModel)]=\"reviewModel.content\" \r\n                                mdTextareaAutosize\r\n                                [mdAutosizeMinRows]=\"5\"\r\n                                [mdAutosizeMaxRows]=\"7\"></textarea>\r\n                            </md-input-container>\r\n                        </div>-->\r\n                        <div style=\"min-height:215px\" *ngIf=\"reviewModel.isEditing\" [froalaEditor]=\"editorOpts\" [froalaModel]=\"reviewModel.content\" (froalaModelChange)=\"onFroalaModelChange($event, reviewModel)\"></div>\r\n                        <div class=\"action-btn-cont\">\r\n                            <button *ngIf=\"!reviewModel.isEditing\" (click)=\"onEdit(person.review, reviewModel)\" md-raised-button color=\"accent\">EDIT</button>\r\n                            <ng-container *ngIf=\"reviewModel.isEditing\">\r\n                                <button (click)=\"onCancelEditSan(reviewModel, person.review)\"  md-raised-button color=\"accent\">CANCEL</button>\r\n                                <button class=\"ok-btn-gap\" (click)=\"onOk({ subject: person, prop: 'review', model: reviewModel })\" md-raised-button color=\"warn\">OK</button>\r\n                            </ng-container>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <hr>\r\n                <div style=\"margin:30px 0\" fxLayout=\"row\">\r\n                    <button class=\"ok-btn-gap\" md-raised-button color=\"warn\" (click)=\"openDialog(deleteSubjectBasic(indexOfPeople, componentModel.people), 'person')\">DELETE PERSON</button>\r\n                </div>\r\n            </md-tab>\r\n        </md-tab-group>\r\n    </md-card>\r\n    <div style=\"margin:30px 0;width:100%\" fxLayout=\"row\" fxLayoutAlign=\"space-around\">\r\n        <button md-raised-button color=\"primary\" (click)=\"onAddNewItem(componentModel.people, templateNewPerson)\">ADD NEW PERSON</button>\r\n        <button md-raised-button color=\"accent\">VIEW SECTION</button>\r\n        <button #btnRef class=\"ok-btn-gap\" *ngIf=\"isNeedSaveChanges(componentModel)\" (click)=\"onSave(btnRef)\" md-raised-button color=\"warn\">SAVE CHANGES</button>\r\n    </div>\r\n</div>\r\n\r\n<ng-template #PublicEmpty>\r\n    <div \r\n    fxLayout=\"row\" \r\n    [style.height]=\"'153px'\">\r\n        <div fxLayout=\"row\" style=\"height:inherit;width:100%\"><div style=\"margin:auto;color:rgba(0,0,0,.4)\">Public Storage empty!</div></div>\r\n    </div>\r\n</ng-template>\r\n<ng-template #Spinner>\r\n    <div \r\n    fxLayout=\"row\" \r\n    [style.height]=\"\r\n    publicImages.isRequestSent && !publicImages.forChip ?\r\n      '353px' : \r\n    publicImages.isRequestSent && publicImages.forChip ?\r\n      '153px' : \r\n      'calc(100vh - 137px)'\">\r\n        <div fxLayout=\"row\" style=\"height:inherit;width:100%\"><md-spinner style=\"margin:auto\" color=\"accent\"></md-spinner></div>\r\n    </div>\r\n</ng-template>\r\n<ng-template #NoContent>\r\n    <div fxLayout=\"row\" fxLayoutAlign=\"center center\" style=\"height:300px;width:100%\">\r\n        <h1 style=\"color:rgba(0,0,0,.4)\">No Bosses here yet...</h1>\r\n    </div>\r\n</ng-template>\r\n<ng-template #NotSpecified>\r\n    <span>{{notSpecifiedMessage}}</span>\r\n</ng-template>"

/***/ }),

/***/ 450:
/***/ (function(module, exports) {

module.exports = "<div style=\"width: 100%\" fxLayout=\"column\">\n  <ng-container *ngIf=\"!sectionTab; else Sections\">\n    <md-card class=\"section-card\" (click)=\"onSectionSelect(section)\" fxFlexAlign=\"center\" *ngFor=\"let section of sectionList; index as i\">\n      <div fxLayout=\"row\" fxLayoutAlign=\"space-between\">\n        <md-card-title [style.margin]=\"0\">{{i + 1}}. {{section.tabName}}</md-card-title>\n        <md-icon>{{section.ico}}</md-icon>\n      </div>\n    </md-card>\n  </ng-container>\n</div>\n\n<ng-template #Sections>\n  <div [ngSwitch]=\"sectionTab._name\">\n    <ng-container *ngSwitchCase=\"'key_people'\">\n      <app-key-people></app-key-people>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"'slider'\">\n      <app-slider-promo-section></app-slider-promo-section>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"'reviews'\">\n      <app-customer-reviews></app-customer-reviews>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"'offers'\">\n      <app-offers-section></app-offers-section>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"'sponsores'\">\n      <app-our-sponsores></app-our-sponsores>\n    </ng-container>\n  </div>\n</ng-template>"

/***/ }),

/***/ 451:
/***/ (function(module, exports) {

module.exports = "\r\n<div class=\"container\">\r\n    <md-toolbar style=\"height:80px\" color=\"primary\">\r\n    <div style=\"width:100%\" *ngIf=\"offers?.data.length > 0\" fxLayout=\"row\" fxLayoutAlign=\"space-between\">\r\n        <div>\r\n            <button \r\n            color=\"accent\" \r\n            md-icon-button \r\n            [mdMenuTriggerFor]=\"offersCustomMdMenu\"\r\n            (onMenuOpen)=\"offersCustomMdMenu.focusFirstItem()\">\r\n                <md-icon>menu</md-icon>\r\n            </button>\r\n            <md-menu #offersCustomMdMenu=\"mdMenu\">\r\n                <button (click)=\"selectedMenuItem=1\" md-menu-item>\r\n                    <md-icon>content_cut</md-icon>\r\n                    <span>Adjust image size</span>\r\n                </button>\r\n                <button (click)=\"selectedMenuItem=2\" md-menu-item>\r\n                    <md-icon>timer</md-icon>\r\n                    <span>Slideshow timeout</span>\r\n                </button>\r\n                <button (click)=\"selectedMenuItem=3\" md-menu-item>\r\n                    <md-icon>developer_mode</md-icon>\r\n                    <span>Slider mode</span>\r\n                </button>\r\n            </md-menu>\r\n        </div>\r\n        <div style=\"position:relative\">\r\n            <div class=\"mdMenu-item\" fxLayout=\"row\" [@menuItemAppear]=\"selectedMenuAnimHelper(1)\">\r\n                <p style=\"padding-right:30px\" fxFlexAlign=\"center\">Adjust image width: {{resizedMaxWidth || currentMaxWidth}}px</p>\r\n                <div fxFlexAlign=\"center\" fxLayout=\"row\">\r\n                    <span fxFlexAlign=\"center\">10px</span>\r\n                    <md-slider \r\n                    fxFlexAlign=\"center\" \r\n                    style=\"width:400px\" \r\n                    (input)=\"onSliderInput($event)\" \r\n                    [value]=\"currentMaxWidth\"\r\n                    min=\"10\" \r\n                    [max]=\"document.body.offsetWidth <= 1000 ? 1000 : document.body.offsetWidth\" \r\n                    [thumbLabel]=\"true\"></md-slider>\r\n                    <span fxFlexAlign=\"center\">{{document.body.offsetWidth <= 1000 ? 1000 : document.body.offsetWidth}}<span>px</span></span>\r\n                </div>\r\n            </div>\r\n            <div class=\"mdMenu-item\" [@menuItemAppear]=\"selectedMenuAnimHelper(2)\">\r\n                <span>Slideshow: </span>\r\n                <md-input-container dividerColor=\"accent\">\r\n                    <input type=\"number\" \r\n                    mdInput\r\n                    [style.width.px]=\"50\" \r\n                    min=\"4\" \r\n                    max=\"100\" \r\n                    (ngModelChange)=\"onSlideShowChange($event)\"\r\n                    [ngModel]=\"offers.meta.slideShow\">\r\n                </md-input-container>\r\n                <span>s</span>\r\n            </div>\r\n            <div class=\"mdMenu-item\" [@menuItemAppear]=\"selectedMenuAnimHelper(3)\">\r\n                <div style=\"position:relative;top:17px\">\r\n                    <span>Slider Mode: </span>\r\n                    <md-select (change)=\"onSliderModeChange($event)\" style=\"position:relative;top:-5px;padding-left:20px\">\r\n                        <md-option value=\"sequensed\">Sequensed</md-option>\r\n                        <md-option value=\"static\">Static</md-option>\r\n                    </md-select>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    </md-toolbar>\r\n    <section class=\"S14\">\r\n                <div class=\"S14__wrap\" id=\"offer\">\r\n                    <div class=\"S14__tit\">\r\n                        <div class=\"S14__wo S14__w1\">\r\n                            <span class=\"S14__pre\">Get our</span>\r\n                            <span class=\"S14__del\">&nbsp;</span>\r\n                        </div>\r\n                        <div class=\"S14__wo\">\r\n                            <span class=\"S14__gr\">\r\n                                <span class=\"S14__f\">h</span>\r\n                                <span class=\"S14__b\">o</span>\r\n                                <span class=\"S14__f\">t</span>\r\n                                <span>&nbsp;</span>\r\n                                <span class=\"S14__f\">o</span>\r\n                                <span class=\"S14__b\">f</span>\r\n                                <span class=\"S14__f\">f</span>\r\n                                <span class=\"S14__b\">e</span>\r\n                                <span class=\"S14__f\">r</span>\r\n                            </span>\r\n                        </div>\r\n                        <div class=\"S14__wo S14__w2\">\r\n                            <span class=\"S14__pre\">today!</span>\r\n                        </div>\r\n                        <div class=\"S14__lim\"></div>\r\n                    </div>\r\n                    <div class=\"S14__i-wrap\" [style.height.px]=\"currentImg?.offsetHeight\">\r\n                        <ng-container *ngIf=\"offers?.data.length > 0; else NoOffers\">\r\n                            <img #imgRef\r\n                            class=\"S14__image\" \r\n                            [ngStyle]=\"{'max-width.px': resizedMaxWidth || currentMaxWidth}\"\r\n                            \r\n                            *ngFor=\"let offer of offers?.data\" \r\n                            [src]=\"offer.links.self\"\r\n                            [alt]=\"offer.attributes.meta.alt\" \r\n                            [title]=\"offer.attributes.meta.title\">\r\n                        </ng-container>\r\n                        <ng-template #NoOffers>\r\n                            <div style=\"width:100%\" fxLayout=\"row\">\r\n                                <h3 style=\"color:#fff;margin:auto\">You didn't upload offers yet :)</h3>\r\n                            </div>\r\n                        </ng-template>\r\n                    </div>\r\n                    <div class=\"S14__c-w\"></div>\r\n                </div>\r\n    </section>\r\n    <md-toolbar style=\"height:64px\" color=\"primary\">\r\n        <div style=\"width:100%\" fxLayout=\"row\" fxLayoutAlign=\"space-around\">\r\n            <button (click)=\"onCancel()\" color=\"accent\" md-raised-button>CANCEL</button>\r\n            <button #btnSaveRef *ngIf=\"offers?.data.length > 0 && isButtonSaveShow()\" (click)=\"onSaveChanges(btnSaveRef)\" color=\"warn\" md-raised-button>SAVE CHANGES</button>\r\n        </div>\r\n    </md-toolbar>\r\n</div>\r\n"

/***/ }),

/***/ 452:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"offers; else Spinner\" fxLayout=\"column\">\r\n    <md-card fxFlexAlign=\"center\" style=\"width:92%; margin: 30px 0\">\r\n        <md-card-content>\r\n            <md-tab-group *ngIf=\"offers.data.length; else NoContent\" [dynamicHeight]=\"true\" [(selectedIndex)]=\"tabIndex\">\r\n                <md-tab label=\"Offer {{i + 1}}\" [disabled]=\"isNeedEdit && tabIndex != i\" *ngFor=\"let offer of offers.data; index as i\">\r\n                    <md-card>\r\n                        <md-card-header>\r\n                            <md-card-title>{{offer.attributes.fileName}}</md-card-title>\r\n                            <md-card-subtitle>{{(offer.attributes.fileSize / 1024).toFixed(2)}}kb</md-card-subtitle>\r\n                        </md-card-header>\r\n                        <img \r\n                        style=\"max-width:600px\" \r\n                        md-card-image \r\n                        [src]=\"offer.links.self\" \r\n                        [alt]=\"offer.attributes.meta.alt\" \r\n                        [title]=\"offer.attributes.meta.title\">\r\n                        <md-card-content>\r\n                            <div fxLayout=\"column\" style=\"font-size:2em\">\r\n                                <div fxFlex=\"50px\">\r\n                                    <span>Alt = \"</span><span *ngIf=\"!isNeedEdit; else Alt\">{{alt || offer.attributes.meta.alt}}</span><span>\"</span>\r\n                                    <ng-template #Alt><input #inputField [(ngModel)]=\"alt\" spellcheck=\"false\" autocomplete=\"off\"></ng-template>\r\n                                </div>\r\n                                <div>\r\n                                    <span>Title = \"</span><span *ngIf=\"!isNeedEdit; else Title\">{{title || offer.attributes.meta.title}}</span><span>\"</span>\r\n                                    <ng-template #Title><input [(ngModel)]=\"title\" spellcheck=\"false\" autocomplete=\"off\"></ng-template>\r\n                                </div>\r\n                            </div>\r\n                        </md-card-content>\r\n        \r\n                        <md-card-actions>\r\n                            <button md-button (click)=\"onEdit(offer)\" *ngIf=\"!isNeedEdit; else Ok\">EDIT</button>\r\n                            <ng-template #Ok><button md-button (click)=\"onOk(offer)\">OK</button></ng-template>\r\n                        </md-card-actions>\r\n                    </md-card>\r\n                </md-tab>\r\n            </md-tab-group>\r\n        </md-card-content>\r\n    </md-card>\r\n    <div style=\"margin:50px 0\" fxLayout=\"row\" fxLayoutAlign=\"center\">\r\n        <button (click)=\"openModal()\" style=\"width:200px\" md-raised-button color=\"accent\">VIEW SECTION</button>\r\n    </div>\r\n</div>\r\n\r\n<ng-template #NoContent>\r\n    <div fxLayout=\"row\" fxLayoutAlign=\"center center\" style=\"height:300px;width:100%\">\r\n        <h1 style=\"color:rgba(0,0,0,.4)\">No Offers here yet...</h1>\r\n    </div>\r\n</ng-template>\r\n\r\n<ng-template #Spinner>\r\n    <div fxLayout=\"row\" style=\"height: calc(100vh - 137px)\">\r\n        <div fxLayout=\"row\" style=\"height:inherit;width:100%\"><md-spinner style=\"margin:auto\" color=\"accent\"></md-spinner></div>\r\n    </div>\r\n</ng-template>"

/***/ }),

/***/ 453:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"componentModel; else Spinner\" fxLayout=\"column\">\r\n    <md-card fxFlexAlign=\"center\" class=\"align-cards\">\r\n        <md-tab-group *ngIf=\"componentModel.length; else NoContent\" dynamicHeight=\"true\" [(selectedIndex)]=\"tabIndex\">\r\n            <md-tab [disabled]=\"_isEditing && tabIndex != index\" *ngFor=\"let sponsor of componentModel; index as index\">\r\n                <ng-template md-tab-label>\r\n                    <span *ngIf=\"!sponsor.avatarUrl\">{{notSpecifiedMessage}}</span>\r\n                    <img class=\"tab-avatar\" *ngIf=\"sponsor.avatarUrl\" [src]=\"sponsor.avatarUrl\">\r\n                </ng-template>\r\n\r\n                <div fxLayout=\"column\" fxLayoutAlign=\"space-around center\" style=\"min-height:300px\">\r\n                    <img *ngIf=\"avatarModel.content || sponsor.avatarUrl; else NotSpecified\" style=\"max-width:500px;margin:30px\" [src]=\"avatarModel.content || sponsor.avatarUrl\">\r\n                    <ng-container *ngIf=\"avatarModel.isEditing\">\r\n                        <ng-container *ngIf=\"!publicImages.isRequestSent; else Spinner\">\r\n                            <ng-container *ngIf=\"publicImages.data?.length > 0; else PublicEmpty\">\r\n                                <md-tab-group style=\"width:100%\" [dynamicHeight]=\"true\">\r\n                                    <md-tab *ngFor=\"let image of publicImages.data; index as i\">\r\n                                        <ng-template md-tab-label>\r\n                                            <span>Image {{i + 1}}</span>\r\n                                            <img style=\"width:30px;position:relative;top:10px;left:20px\" [src]=\"image.links.self\">\r\n                                        </ng-template>\r\n                                        <div fxLayout=\"row\">\r\n                                            <div>\r\n                                                <img #slideImgRef (click)=\"onBackgroundImgClick(avatarModel, image, slideImgRef)\" [style.width.px]=\"publicImages.forChip ? 100 : 300\" style=\"cursor:pointer;transition:.7s\" [src]=\"image.links.self\">\r\n                                            </div>\r\n                                            <div style=\"margin-left:25%\">\r\n                                                <p><i>Natural image size:</i></p>\r\n                                                <p>{{getNaturalSize(slideImgRef, 'naturalWidth')}} &#10006; {{getNaturalSize(slideImgRef, 'naturalHeight')}}</p>\r\n                                            </div>\r\n                                        </div>\r\n                                    </md-tab>\r\n                                </md-tab-group>\r\n                            </ng-container>\r\n                        </ng-container>\r\n                    </ng-container>\r\n                    <div style=\"width:100%\" fxLayout=\"column\" fxLayoutAlign=\"center center\">\r\n                        <hr style=\"width:100%\">\r\n                        <div fxLayout=\"row\" fxLayoutAlign=\"space-around\">\r\n                            <button class=\"action-btn-cont\" *ngIf=\"!avatarModel.isEditing\" (click)=\"onEdit(sponsor.avatarUrl, avatarModel, 'i', true, true)\" md-raised-button color=\"accent\">{{!sponsor.avatarUrl ? 'SELECT SPONSOR' : 'EDIT'}}</button>\r\n                            <button #btnOkRef [disabled]=\"!avatarModel.clickedImgRef\" class=\"action-btn-cont\" *ngIf=\"avatarModel.isEditing\" (click)=\"onOk({ subject: sponsor, prop: 'avatarUrl', model: avatarModel })\" md-raised-button color=\"warn\">OK</button>\r\n                            <button class=\"action-btn-cont ok-btn-gap\" (click)=\"openDialog(deleteSubjectBasic(index), 'sponsor')\" md-raised-button color=\"warn\">DELETE SPONSOR</button>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </md-tab>\r\n        </md-tab-group>\r\n    </md-card>\r\n    <div style=\"margin:30px 0;width:100%\" fxLayout=\"row\" fxLayoutAlign=\"space-around\">\r\n        <button md-raised-button color=\"primary\" (click)=\"onAddNewItem(componentModel, templateNewSponsor)\">ADD NEW SPONSOR</button>\r\n        <button #btnRef class=\"ok-btn-gap\" *ngIf=\"isNeedSaveChanges(componentModel)\" (click)=\"onSave(btnRef)\" md-raised-button color=\"warn\">SAVE CHANGES</button>\r\n    </div>\r\n</div>\r\n\r\n<ng-template #PublicEmpty>\r\n    <div \r\n    fxLayout=\"row\" \r\n    [style.height]=\"'153px'\">\r\n        <div fxLayout=\"row\" style=\"height:inherit;width:100%\"><div style=\"margin:auto;color:rgba(0,0,0,.4)\">Public Storage empty!</div></div>\r\n    </div>\r\n</ng-template>\r\n<ng-template #Spinner>\r\n    <div \r\n    fxLayout=\"row\" \r\n    [style.height]=\"\r\n    publicImages.isRequestSent && !publicImages.forChip ?\r\n      '353px' : \r\n    publicImages.isRequestSent && publicImages.forChip ?\r\n      '153px' : \r\n      'calc(100vh - 137px)'\">\r\n        <div fxLayout=\"row\" style=\"height:inherit;width:100%\"><md-spinner style=\"margin:auto\" color=\"accent\"></md-spinner></div>\r\n    </div>\r\n</ng-template>\r\n<ng-template #NoContent>\r\n    <div fxLayout=\"row\" fxLayoutAlign=\"center center\" style=\"height:300px;width:100%\">\r\n        <h1 style=\"color:rgba(0,0,0,.4)\">No Sponsors here yet...</h1>\r\n    </div>\r\n</ng-template>\r\n<ng-template #NotSpecified>\r\n    <div fxLayout=\"row\" fxLayoutAlign=\"center center\" style=\"height:300px;width:100%\">\r\n        <h1 style=\"color:rgba(0,0,0,.4)\"><span>{{notSpecifiedMessage}}</span></h1>\r\n    </div>\r\n</ng-template>"

/***/ }),

/***/ 454:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"contactsModel; else Spinner\" fxLayout=\"column\">\r\n    <md-card fxFlexAlign=\"center\" style=\"width:92%; margin: 30px 0\">\r\n        <md-tab-group *ngIf=\"contactsModel?.length > 0; else NoContactsYet\" [dynamicHeight]=\"true\" [(selectedIndex)]=\"tabIndex\" (selectChange)=\"onTabChange(tabIndex)\">\r\n            <md-tab [disabled]=\"tabIndex != indexTab && _isEditing\" [label]=\"contact.group | uppercase\" *ngFor=\"let contact of contactsModel; index as indexTab\">\r\n                <ng-container *ngIf=\"contact.values.length > 0; else NoContactsYet\">\r\n                    <div *ngFor=\"let contactType of contact.values; index as ind; count as num\">\r\n                        <h3>{{ind + 1}}. {{(modelEdit[ind]?.type || contactType.type || notSpecifiedMessage) | titlecase}} <span *ngIf=\"(contact.group | lowercase) === 'skype' && selectedTab?.values[0]?.type && ind == 0\">*</span>:</h3>\r\n                        <div><span>{{getValues(contact.group, contactType, ind)}}</span></div>\r\n                        <div style=\"margin-top:10px\">\r\n                            <ng-container *ngIf=\"!modelEdit[ind]\">\r\n                                <button (click)=\"onEdit(contactType, ind)\" md-raised-button color=\"accent\">EDIT</button>\r\n                                <button class=\"btn-gap\" (click)=\"openDialog(deleteAction(contact.values, ind), 'contact')\" md-raised-button color=\"warn\">DELETE</button>\r\n                            </ng-container>\r\n\r\n                            <ng-container *ngIf=\"modelEdit[ind]\">\r\n                                <md-input-container dividerColor=\"accent\">\r\n                                    <input style=\"width:300px\" #inputRef \r\n                                    mdInput \r\n                                    placeholder=\"Contact title\"\r\n                                    [(ngModel)]=\"modelEdit[ind].type\" \r\n                                    required=\"true\">\r\n                                    <md-hint [style.color]=\"'#f44336'\">{{inputRef.validationMessage}}</md-hint>\r\n                                </md-input-container>\r\n                                <md-input-container dividerColor=\"accent\">\r\n                                    <textarea style=\"width:300px\" #textareaRef\r\n                                    mdInput \r\n                                    mdTextareaAutosize \r\n                                    [mdAutosizeMinRows]=\"3\"\r\n                                    [mdAutosizeMaxRows]=\"7\"\r\n                                    placeholder=\"{{contact.group | titlecase}} contact details\" \r\n                                    [(ngModel)]=\"modelEdit[ind].$modelValue\"\r\n                                    required=\"true\"></textarea>\r\n                                    <md-hint [style.color]=\"'#f44336'\">{{textareaRef.validationMessage}}</md-hint>\r\n                                </md-input-container>\r\n                                <div style=\"margin-top:10px\">\r\n                                    <button (click)=\"onOk(contactType, ind)\" md-raised-button color=\"warn\">OK</button>\r\n                                </div>\r\n                            </ng-container>\r\n                        </div>\r\n                        <hr>\r\n                    </div>\r\n                </ng-container>\r\n                \r\n            </md-tab>\r\n        </md-tab-group>\r\n        <ng-template #NoContactsYet>\r\n            <h1 style=\"color:rgba(0,0,0,.4)\">Nothing here Yet!</h1>\r\n        </ng-template>\r\n        <ng-container *ngIf=\"contactsModel?.length > 0\">\r\n            <button (click)=\"selectedTab.values.push({type: '', values: []})\" md-raised-button color=\"primary\">ADD {{selectedTab?.group | uppercase}}</button>\r\n            <p *ngIf=\"(selectedTab?.group | lowercase) === 'skype' && (selectedTab?.values[0]?.type || isSkypeHas)\"><i style=\"color:rgba(0,0,0,.4)\">* \r\n                            <!--remember that you may specify as much as you want skype addresses but for the clients will be available only first in this list-->\r\n                to prevent confusion I desided to keep open for public only first in this list skype address. You may specify as much as you want, but for the clients will be accessible only first.</i>\r\n            </p>\r\n        </ng-container>\r\n    </md-card>\r\n    <div style=\"margin:10px 0\" fxLayout=\"row\" fxLayoutAlign=\"space-around\">\r\n        <button (click)=\"openDialog(deleteAction(), modalData)\" md-raised-button color=\"primary\">ADD GROUP</button>\r\n        <button *ngIf=\"contactsModel?.length > 0\" (click)=\"openDialog(deleteAction(contactsModel, tabIndex), 'group')\" md-raised-button color=\"warn\">DELETE GROUP</button>\r\n        <button #btnSaveRef *ngIf=\"isNeedSaveChanges(contactsModel)\" (click)=\"onSave(btnSaveRef)\" md-raised-button color=\"warn\">SAVE CHANGES</button>\r\n    </div>\r\n</div>\r\n\r\n<ng-template #Spinner>\r\n    <div fxLayout=\"row\" style=\"height: calc(100vh - 137px)\">\r\n        <div fxLayout=\"row\" style=\"height:inherit;width:100%\"><md-spinner style=\"margin:auto\" color=\"accent\"></md-spinner></div>\r\n    </div>\r\n</ng-template>"

/***/ }),

/***/ 455:
/***/ (function(module, exports) {

module.exports = "\r\n<section>\r\n    <md-tab-group>\r\n    <md-tab label=\"Slide {{indexOfSlide + 1}}\" *ngFor=\"let slide of modelData; index as indexOfSlide\">\r\n        <div class=\"S8__slider\">\r\n            <div class=\"S8__slides\">\r\n                <div class=\"S8__slide\">\r\n                    <div class=\"S8__s-b\" [style.backgroundImage]=\"slide.backgroundImage && 'url('+ slide.backgroundImage +')'\"></div>\r\n                    <div class=\"S8__s-c\">\r\n                        <div class=\"S8__t\">\r\n                            <a class=\"S8__t-h-link\">\r\n                                <button>{{slide.title | titlecase}}</button>\r\n                            </a>\r\n                            <p class=\"S8__t-desc\">{{slide.description}}</p>\r\n                            <a class=\"S8__t-link\"><button>{{slide.buttonDesc}}</button></a>\r\n                        </div>\r\n                        <div class=\"S8__plugin\">\r\n                            <div class=\"chips-material\">\r\n                                <div class=\"chip\" *ngFor=\"let chip of slide.chips\">\r\n                                    <div class=\"chip__cont\">\r\n                                        <div class=\"chip__bg\" [style.backgroundImage]=\"chip.avatar && 'url('+ chip.avatar +')'\"></div>\r\n                                        <p class=\"chip__capt\">{{chip.destination}}</p>\r\n                                        <div class=\"chip__stars\">\r\n                                            <svg style=\"width:22px;height:22px\" xmlns=\"http://www.w3.org/2000/svg\" *ngFor=\"let star of 'huilo'.split(''); index as starIndex\">\r\n                                                <path class=\"chip__st\" transform=\"scale(.09)\" [attr.fill]=\"starIndex + 1 > chip.starCount ? 'rgb(148, 148, 146)' : '#F8D64E'\" d=\"m48,234 73-226 73,226-192-140h238z\"></path>\r\n                                            </svg>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </md-tab>\r\n    </md-tab-group>\r\n    <md-toolbar [class.active]=\"isActive\" color=\"primary\" class=\"bottom-tb\">\r\n        <div fxLayout=\"row\" fxLayoutAlign=\"center\" style=\"width:100%\">\r\n            <button md-raised-button (click)=\"onCloseModal()\" color=\"accent\">CLOSE</button>\r\n        </div>\r\n    </md-toolbar>\r\n</section>"

/***/ }),

/***/ 456:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"componentModel; else Spinner\" fxLayout=\"column\">\r\n    <md-card fxFlexAlign=\"center\" style=\"width:92%; margin: 30px 0\">\r\n        <md-tab-group *ngIf=\"componentModel.length; else NoContent\" [(selectedIndex)]=\"tabIndex\" [dynamicHeight]=\"true\" (selectChange)=\"modelChips.length=0\">\r\n            <md-tab [disabled]=\"_isEditing && tabIndex != i\" *ngFor=\"let slide of componentModel; let i=index\">\r\n                <ng-template md-tab-label>\r\n                    <span>Slide {{i + 1}}</span>\r\n                </ng-template>\r\n                <div>\r\n                    <h3>Title</h3>\r\n                    <h4>{{(modelTitle.content || slide.title || notSpecifiedMessage) | uppercase}}</h4>\r\n                </div>\r\n                <div *ngIf=\"modelTitle.isEditing\">\r\n                    <md-input-container dividerColor=\"accent\">\r\n                        <input mdInput placeholder=\"Edit slide Title\" [(ngModel)]=\"modelTitle.content\" >\r\n                        <md-hint [style.color]=\"'#f44336'\" align=\"end\">Remember to be short and sweet!</md-hint>\r\n                    </md-input-container>\r\n                </div>\r\n                <div class=\"action-btn-cont\" fxLayout=\"row\">\r\n                    <button *ngIf=\"!modelTitle.isEditing\" (click)=\"onEdit(slide.title, modelTitle)\" md-raised-button color=\"accent\">EDIT</button>\r\n                    <ng-container *ngIf=\"modelTitle.isEditing\">\r\n                        <button (click)=\"onCancelEdit(modelTitle)\" md-raised-button color=\"accent\">CANCEL</button>\r\n                        <button class=\"ok-btn-gap\" (click)=\"onOk({ subject: slide, prop: 'title', model: modelTitle})\" md-raised-button color=\"warn\">OK</button>\r\n                    </ng-container>\r\n                </div>\r\n                <hr>\r\n                <div>\r\n                    <h3>Background Image</h3>\r\n                    <p><i>For the best user experience natural <strong>image width must to be >= 1280px</strong> and <strong>image height >= 1024px</strong></i></p>\r\n                    <img *ngIf=\"modelBgImg.content || slide.backgroundImage; else NotSpecified\" style=\"max-width:500px\" [src]=\"modelBgImg.content || slide.backgroundImage\">\r\n                </div>\r\n                <div *ngIf=\"modelBgImg.isEditing\">\r\n                    <h4>Select background slide image:</h4>\r\n                    <ng-container *ngIf=\"!publicImages.isRequestSent; else Spinner\">\r\n                        <ng-container *ngIf=\"publicImages.data?.length > 0; else PublicEmpty\">\r\n                            <md-tab-group [dynamicHeight]=\"true\">\r\n                                <md-tab *ngFor=\"let image of publicImages.data; index as i\">\r\n                                    <ng-template md-tab-label>\r\n                                        <span>Image {{i + 1}}</span>\r\n                                        <img style=\"width:30px;position:relative;top:10px;left:20px\" [src]=\"image.links.self\">\r\n                                    </ng-template>\r\n                                    <div fxLayout=\"row\">\r\n                                        <div>\r\n                                            <img #slideImgRef (click)=\"onBackgroundImgClick(modelBgImg, image, slideImgRef)\" style=\"width:300px;cursor:pointer;transition:.7s\" [src]=\"image.links.self\">\r\n                                        </div>\r\n                                        <div style=\"margin-left:25%\">\r\n                                            <p><i>Natural image size:</i></p>\r\n                                            <p>{{getNaturalSize(slideImgRef, 'naturalWidth')}} &#10006; {{getNaturalSize(slideImgRef, 'naturalHeight')}}</p>\r\n                                        </div>\r\n                                    </div>\r\n                                </md-tab>\r\n                            </md-tab-group>\r\n                        </ng-container>\r\n                    </ng-container>\r\n                </div>\r\n                <div class=\"action-btn-cont\" fxLayout=\"row\">\r\n                    <button *ngIf=\"!modelBgImg.isEditing\" (click)=\"onEdit(slide.backgroundImage, modelBgImg, 'i')\" md-raised-button color=\"accent\">EDIT</button>\r\n                    <ng-container *ngIf=\"modelBgImg.isEditing\">\r\n                        <button (click)=\"onCancelEdit(modelBgImg)\" md-raised-button color=\"accent\">CANCEL</button>\r\n                        <button class=\"ok-btn-gap\" (click)=\"onOk({ subject: slide, prop: 'backgroundImage', model: modelBgImg})\" md-raised-button color=\"warn\" [disabled]=\"!modelBgImg.clickedImgRef\">OK</button>\r\n                    </ng-container>\r\n                </div>\r\n                <hr>\r\n                <div>\r\n                    <h3>Slide Description</h3>\r\n                    <p>{{modelDesc.content || slide.description || notSpecifiedMessage}}</p>\r\n                </div>\r\n                <div *ngIf=\"modelDesc.isEditing\">\r\n                    <md-input-container style=\"width:50%\" dividerColor=\"accent\">\r\n                        <textarea \r\n                        mdInput \r\n                        mdTextareaAutosize \r\n                        [mdAutosizeMinRows]=\"5\"\r\n                        placeholder=\"Slide description\" \r\n                        [(ngModel)]=\"modelDesc.content\"></textarea>\r\n                    </md-input-container>\r\n                </div>\r\n                <div class=\"action-btn-cont\" fxLayout=\"row\">\r\n                    <button *ngIf=\"!modelDesc.isEditing\" (click)=\"onEdit(slide.description, modelDesc)\" md-raised-button color=\"accent\">EDIT</button>\r\n                    <ng-container *ngIf=\"modelDesc.isEditing\">\r\n                        <button (click)=\"onCancelEdit(modelDesc)\" md-raised-button color=\"accent\">CANCEL</button>\r\n                        <button class=\"ok-btn-gap\" (click)=\"onOk({ subject: slide, prop: 'description', model: modelDesc})\" md-raised-button color=\"warn\">OK</button>\r\n                    </ng-container>\r\n                </div>\r\n                <hr>\r\n                <div>\r\n                    <h3>Tours</h3>\r\n                    \r\n                        <ng-container *ngFor=\"let chip of slide.chips; index as j\">\r\n                            <md-chip-list class=\"mat-chip-list-stacked\">\r\n                            <md-chip #chipRef\r\n                            style=\"width:330px;display:block;margin:20px 0;cursor:pointer\"\r\n                            color=\"primary\"\r\n                            (click)=\"onChipClick(chipRef, chip, j)\">\r\n                                <div fxLayout=\"row\" fxLayoutAlign=\"space-between\">\r\n                                    <div fxFlexAlign=\"center\" class=\"chip-avatar\" [style.backgroundImage]=\"modelChips[j] ? ( modelChips[j].item.avatar ? 'url('+ modelChips[j].item.avatar +')' : null) : ( chip.avatar ? 'url('+ chip.avatar +')' : null )\"></div>\r\n                                    <p fxFlexAlign=\"center\" style=\"padding:0 10px;font-weight:bold;text-align:center;width:154px\">{{modelChips[j]?.item.destination || chip.destination}}</p>\r\n                                    <div style=\"width:126px;height:26px\" fxFlexAlign=\"center\">\r\n                                        <ng-container *ngFor=\"let star of 'Putin'.split(''); index as starIndex\">\r\n                                            <svg style=\"width:22px;height:22px\" xmlns=\"http://www.w3.org/2000/svg\">\r\n                                                <path class=\"chip__st\" transform=\"scale(.09)\" [attr.fill]=\"starIndex + 1 > getChipStarCount(chip, j) ? 'rgb(148, 148, 146)' : '#F8D64E'\" d=\"m48,234 73-226 73,226-192-140h238z\"></path>\r\n                                            </svg>\r\n                                        </ng-container>\r\n                                    </div>\r\n                                </div>\r\n                            </md-chip>\r\n                            \r\n                                <div *ngIf=\"modelChips[j]\">\r\n                                    <div>\r\n                                        <h4>1. Select avatar:</h4>\r\n                                        <ng-container *ngIf=\"!publicImages.isRequestSent; else Spinner\">\r\n                                            <ng-container *ngIf=\"publicImages.data?.length > 0; else PublicEmpty\">\r\n                                                <md-tab-group [dynamicHeight]=\"true\">\r\n                                                    <md-tab *ngFor=\"let image of publicImages.data; index as i\">\r\n                                                        <ng-template md-tab-label>\r\n                                                            <span>Image {{i + 1}}</span>\r\n                                                            <img style=\"width:30px;position:relative;top:10px;left:20px\" [src]=\"image.links.self\">\r\n                                                        </ng-template>\r\n                                                        <div fxLayout=\"row\">\r\n                                                            <div>\r\n                                                                <img #imgRef (click)=\"onAvatarImageClick(j, image.links.self, imgRef)\" style=\"width:100px;cursor:pointer;transition:.7s\" [src]=\"image.links.self\">\r\n                                                            </div>\r\n                                                            <div style=\"margin-left:25%\">\r\n                                                                <p><i>Natural image size:</i></p>\r\n                                                                <p>{{getNaturalSize(imgRef, 'naturalWidth')}} &#10006; {{getNaturalSize(imgRef, 'naturalHeight')}}</p>\r\n                                                            </div>\r\n                                                        </div>\r\n                                                    </md-tab>\r\n                                                </md-tab-group>\r\n                                            </ng-container>\r\n                                        </ng-container>\r\n                                    </div>\r\n                                    <div>\r\n                                        <h4>2. Edit destination of tour:</h4>\r\n                                        <md-input-container dividerColor=\"accent\">\r\n                                            <input mdInput placeholder=\"Edit destination of tour\" [(ngModel)]=\"modelChips[j]?.item.destination\">\r\n                                            <md-hint [style.color]=\"'#f44336'\" align=\"end\">Remember to be short and sweet!</md-hint>\r\n                                        </md-input-container>\r\n                                    </div>\r\n                                    <div>\r\n                                        <h4>3. Star rating of destination:</h4>\r\n                                        <md-input-container dividerColor=\"accent\">\r\n                                            <input [style.width.px]=\"starCountRef.validationMessage.length * 7 || 30\" #starCountRef mdInput type=\"number\" min=\"0\" max=\"5\" [ngModel]=\"modelChips[j]?.item.starCount\" (ngModelChange)=\"onStartCountChange($event, j)\">\r\n                                            <md-hint *ngIf=\"starCountRef.validationMessage\" [style.color]=\"'#f44336'\">{{starCountRef.validationMessage}}</md-hint>\r\n                                        </md-input-container>\r\n                                    </div>\r\n                                    <div style=\"margin-top:20px\">\r\n                                        <button (click)=\"onCancelEdit(modelChips, 'CHIP', j)\" md-raised-button color=\"accent\">CANCEL</button>\r\n                                        <button class=\"ok-btn-gap\" md-raised-button color=\"warn\" (click)=\"openDialog(deleteSubject(i, j), 'tour')\">DELETE TOUR</button>\r\n                                        <button class=\"ok-btn-gap\" (click)=\"onOk({ subject: chip, model: modelChips, flag: 'CHIP', index: j })\" md-raised-button color=\"warn\">OK</button>\r\n                                    </div>\r\n                                    \r\n                                </div>\r\n                            \r\n                            </md-chip-list>\r\n                        </ng-container>\r\n                    <div style=\"margin:30px 0\" fxLayout=\"row\">\r\n                        <button md-raised-button color=\"primary\" (click)=\"onAddNewItem(slide.chips, chipTemplate)\">ADD NEW TOUR</button>\r\n                    </div>\r\n                </div>\r\n                <hr>\r\n                <div>\r\n                    <h3>Button name</h3>\r\n                    <h4>{{(modelButtonDesc.content || slide.buttonDesc || notSpecifiedMessage)}}</h4>\r\n                </div>\r\n                <div *ngIf=\"modelButtonDesc.isEditing\">\r\n                    <md-input-container dividerColor=\"accent\">\r\n                        <input mdInput placeholder=\"Edit button name\" [(ngModel)]=\"modelButtonDesc.content\" >\r\n                        <md-hint [style.color]=\"'#f44336'\" align=\"end\">Remember to be short and sweet!</md-hint>\r\n                    </md-input-container>\r\n                </div>\r\n                <div class=\"action-btn-cont\" fxLayout=\"row\">\r\n                    <button *ngIf=\"!modelButtonDesc.isEditing\" (click)=\"onEdit(slide.buttonDesc, modelButtonDesc)\" md-raised-button color=\"accent\">EDIT</button>\r\n                    <ng-container *ngIf=\"modelButtonDesc.isEditing\">\r\n                        <button (click)=\"onCancelEdit(modelButtonDesc)\" md-raised-button color=\"accent\">CANCEL</button>\r\n                        <button class=\"ok-btn-gap\" (click)=\"onOk({ subject: slide, prop: 'buttonDesc', model: modelButtonDesc})\" md-raised-button color=\"warn\">OK</button>\r\n                    </ng-container>\r\n                </div>\r\n                <hr>\r\n                <div style=\"margin:30px 0\" fxLayout=\"row\">\r\n                    <button md-raised-button color=\"warn\" (click)=\"openDialog(deleteSubject(i), 'slide')\">DELETE SLIDE</button>\r\n                </div>\r\n            </md-tab>\r\n        </md-tab-group>\r\n    </md-card>\r\n    <div style=\"margin:30px 0\" fxLayout=\"row\" fxLayoutAlign=\"space-around\">\r\n        <button (click)=\"onAddNewItem(componentModel, modelTemplate)\" md-raised-button color=\"primary\">ADD NEW SLIDE</button>\r\n        <button *ngIf=\"componentModel.length\" (click)=\"onViewSlides()\" md-raised-button color=\"accent\">VIEW SLIDES</button>\r\n        <button #btnRef *ngIf=\"isNeedSaveChanges(componentModel)\" (click)=\"onSave(btnRef)\" md-raised-button color=\"warn\">SAVE CHANGES</button>\r\n    </div>\r\n</div>\r\n<ng-template #PublicEmpty>\r\n    <div \r\n    fxLayout=\"row\" \r\n    [style.height]=\"'153px'\">\r\n        <div fxLayout=\"row\" style=\"height:inherit;width:100%\"><div style=\"margin:auto;color:rgba(0,0,0,.4)\">Public Storage empty!</div></div>\r\n    </div>\r\n</ng-template>\r\n<ng-template #Spinner>\r\n    <div \r\n    fxLayout=\"row\" \r\n    [style.height]=\"\r\n    publicImages.isRequestSent && !publicImages.forChip ?\r\n      '353px' : \r\n    publicImages.isRequestSent && publicImages.forChip ?\r\n      '153px' : \r\n      'calc(100vh - 137px)'\">\r\n        <div fxLayout=\"row\" style=\"height:inherit;width:100%\"><md-spinner style=\"margin:auto\" color=\"accent\"></md-spinner></div>\r\n    </div>\r\n</ng-template>\r\n<ng-template #NoContent>\r\n    <div fxLayout=\"row\" fxLayoutAlign=\"center center\" style=\"height:300px;width:100%\">\r\n        <h1 style=\"color:rgba(0,0,0,.4)\">No Slides here yet...</h1>\r\n    </div>\r\n</ng-template>\r\n<ng-template #NotSpecified>\r\n    <span>{{notSpecifiedMessage}}</span>\r\n</ng-template>"

/***/ }),

/***/ 457:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(1);
var timer_1 = __webpack_require__(460);
Observable_1.Observable.timer = timer_1.timer;
//# sourceMappingURL=timer.js.map

/***/ }),

/***/ 458:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(1);
var debounceTime_1 = __webpack_require__(461);
Observable_1.Observable.prototype.debounceTime = debounceTime_1.debounceTime;
//# sourceMappingURL=debounceTime.js.map

/***/ }),

/***/ 459:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var isNumeric_1 = __webpack_require__(467);
var Observable_1 = __webpack_require__(1);
var async_1 = __webpack_require__(125);
var isScheduler_1 = __webpack_require__(53);
var isDate_1 = __webpack_require__(466);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var TimerObservable = (function (_super) {
    __extends(TimerObservable, _super);
    function TimerObservable(dueTime, period, scheduler) {
        if (dueTime === void 0) { dueTime = 0; }
        _super.call(this);
        this.period = -1;
        this.dueTime = 0;
        if (isNumeric_1.isNumeric(period)) {
            this.period = Number(period) < 1 && 1 || Number(period);
        }
        else if (isScheduler_1.isScheduler(period)) {
            scheduler = period;
        }
        if (!isScheduler_1.isScheduler(scheduler)) {
            scheduler = async_1.async;
        }
        this.scheduler = scheduler;
        this.dueTime = isDate_1.isDate(dueTime) ?
            (+dueTime - this.scheduler.now()) :
            dueTime;
    }
    /**
     * Creates an Observable that starts emitting after an `initialDelay` and
     * emits ever increasing numbers after each `period` of time thereafter.
     *
     * <span class="informal">Its like {@link interval}, but you can specify when
     * should the emissions start.</span>
     *
     * <img src="./img/timer.png" width="100%">
     *
     * `timer` returns an Observable that emits an infinite sequence of ascending
     * integers, with a constant interval of time, `period` of your choosing
     * between those emissions. The first emission happens after the specified
     * `initialDelay`. The initial delay may be a {@link Date}. By default, this
     * operator uses the `async` IScheduler to provide a notion of time, but you
     * may pass any IScheduler to it. If `period` is not specified, the output
     * Observable emits only one value, `0`. Otherwise, it emits an infinite
     * sequence.
     *
     * @example <caption>Emits ascending numbers, one every second (1000ms), starting after 3 seconds</caption>
     * var numbers = Rx.Observable.timer(3000, 1000);
     * numbers.subscribe(x => console.log(x));
     *
     * @example <caption>Emits one number after five seconds</caption>
     * var numbers = Rx.Observable.timer(5000);
     * numbers.subscribe(x => console.log(x));
     *
     * @see {@link interval}
     * @see {@link delay}
     *
     * @param {number|Date} initialDelay The initial delay time to wait before
     * emitting the first value of `0`.
     * @param {number} [period] The period of time between emissions of the
     * subsequent numbers.
     * @param {Scheduler} [scheduler=async] The IScheduler to use for scheduling
     * the emission of values, and providing a notion of "time".
     * @return {Observable} An Observable that emits a `0` after the
     * `initialDelay` and ever increasing numbers after each `period` of time
     * thereafter.
     * @static true
     * @name timer
     * @owner Observable
     */
    TimerObservable.create = function (initialDelay, period, scheduler) {
        if (initialDelay === void 0) { initialDelay = 0; }
        return new TimerObservable(initialDelay, period, scheduler);
    };
    TimerObservable.dispatch = function (state) {
        var index = state.index, period = state.period, subscriber = state.subscriber;
        var action = this;
        subscriber.next(index);
        if (subscriber.closed) {
            return;
        }
        else if (period === -1) {
            return subscriber.complete();
        }
        state.index = index + 1;
        action.schedule(state, period);
    };
    TimerObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var _a = this, period = _a.period, dueTime = _a.dueTime, scheduler = _a.scheduler;
        return scheduler.schedule(TimerObservable.dispatch, dueTime, {
            index: index, period: period, subscriber: subscriber
        });
    };
    return TimerObservable;
}(Observable_1.Observable));
exports.TimerObservable = TimerObservable;
//# sourceMappingURL=TimerObservable.js.map

/***/ }),

/***/ 460:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var TimerObservable_1 = __webpack_require__(459);
exports.timer = TimerObservable_1.TimerObservable.create;
//# sourceMappingURL=timer.js.map

/***/ }),

/***/ 461:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(7);
var async_1 = __webpack_require__(125);
/**
 * Emits a value from the source Observable only after a particular time span
 * has passed without another source emission.
 *
 * <span class="informal">It's like {@link delay}, but passes only the most
 * recent value from each burst of emissions.</span>
 *
 * <img src="./img/debounceTime.png" width="100%">
 *
 * `debounceTime` delays values emitted by the source Observable, but drops
 * previous pending delayed emissions if a new value arrives on the source
 * Observable. This operator keeps track of the most recent value from the
 * source Observable, and emits that only when `dueTime` enough time has passed
 * without any other value appearing on the source Observable. If a new value
 * appears before `dueTime` silence occurs, the previous value will be dropped
 * and will not be emitted on the output Observable.
 *
 * This is a rate-limiting operator, because it is impossible for more than one
 * value to be emitted in any time window of duration `dueTime`, but it is also
 * a delay-like operator since output emissions do not occur at the same time as
 * they did on the source Observable. Optionally takes a {@link IScheduler} for
 * managing timers.
 *
 * @example <caption>Emit the most recent click after a burst of clicks</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.debounceTime(1000);
 * result.subscribe(x => console.log(x));
 *
 * @see {@link auditTime}
 * @see {@link debounce}
 * @see {@link delay}
 * @see {@link sampleTime}
 * @see {@link throttleTime}
 *
 * @param {number} dueTime The timeout duration in milliseconds (or the time
 * unit determined internally by the optional `scheduler`) for the window of
 * time required to wait for emission silence before emitting the most recent
 * source value.
 * @param {Scheduler} [scheduler=async] The {@link IScheduler} to use for
 * managing the timers that handle the timeout for each value.
 * @return {Observable} An Observable that delays the emissions of the source
 * Observable by the specified `dueTime`, and may drop some values if they occur
 * too frequently.
 * @method debounceTime
 * @owner Observable
 */
function debounceTime(dueTime, scheduler) {
    if (scheduler === void 0) { scheduler = async_1.async; }
    return this.lift(new DebounceTimeOperator(dueTime, scheduler));
}
exports.debounceTime = debounceTime;
var DebounceTimeOperator = (function () {
    function DebounceTimeOperator(dueTime, scheduler) {
        this.dueTime = dueTime;
        this.scheduler = scheduler;
    }
    DebounceTimeOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new DebounceTimeSubscriber(subscriber, this.dueTime, this.scheduler));
    };
    return DebounceTimeOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var DebounceTimeSubscriber = (function (_super) {
    __extends(DebounceTimeSubscriber, _super);
    function DebounceTimeSubscriber(destination, dueTime, scheduler) {
        _super.call(this, destination);
        this.dueTime = dueTime;
        this.scheduler = scheduler;
        this.debouncedSubscription = null;
        this.lastValue = null;
        this.hasValue = false;
    }
    DebounceTimeSubscriber.prototype._next = function (value) {
        this.clearDebounce();
        this.lastValue = value;
        this.hasValue = true;
        this.add(this.debouncedSubscription = this.scheduler.schedule(dispatchNext, this.dueTime, this));
    };
    DebounceTimeSubscriber.prototype._complete = function () {
        this.debouncedNext();
        this.destination.complete();
    };
    DebounceTimeSubscriber.prototype.debouncedNext = function () {
        this.clearDebounce();
        if (this.hasValue) {
            this.destination.next(this.lastValue);
            this.lastValue = null;
            this.hasValue = false;
        }
    };
    DebounceTimeSubscriber.prototype.clearDebounce = function () {
        var debouncedSubscription = this.debouncedSubscription;
        if (debouncedSubscription !== null) {
            this.remove(debouncedSubscription);
            debouncedSubscription.unsubscribe();
            this.debouncedSubscription = null;
        }
    };
    return DebounceTimeSubscriber;
}(Subscriber_1.Subscriber));
function dispatchNext(subscriber) {
    subscriber.debouncedNext();
}
//# sourceMappingURL=debounceTime.js.map

/***/ }),

/***/ 462:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Immediate_1 = __webpack_require__(465);
var AsyncAction_1 = __webpack_require__(232);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var AsapAction = (function (_super) {
    __extends(AsapAction, _super);
    function AsapAction(scheduler, work) {
        _super.call(this, scheduler, work);
        this.scheduler = scheduler;
        this.work = work;
    }
    AsapAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        // If delay is greater than 0, request as an async action.
        if (delay !== null && delay > 0) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        // Push the action to the end of the scheduler queue.
        scheduler.actions.push(this);
        // If a microtask has already been scheduled, don't schedule another
        // one. If a microtask hasn't been scheduled yet, schedule one now. Return
        // the current scheduled microtask id.
        return scheduler.scheduled || (scheduler.scheduled = Immediate_1.Immediate.setImmediate(scheduler.flush.bind(scheduler, null)));
    };
    AsapAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        // If delay exists and is greater than 0, or if the delay is null (the
        // action wasn't rescheduled) but was originally scheduled as an async
        // action, then recycle as an async action.
        if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
            return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
        }
        // If the scheduler queue is empty, cancel the requested microtask and
        // set the scheduled flag to undefined so the next AsapAction will schedule
        // its own.
        if (scheduler.actions.length === 0) {
            Immediate_1.Immediate.clearImmediate(id);
            scheduler.scheduled = undefined;
        }
        // Return undefined so the action knows to request a new async id if it's rescheduled.
        return undefined;
    };
    return AsapAction;
}(AsyncAction_1.AsyncAction));
exports.AsapAction = AsapAction;
//# sourceMappingURL=AsapAction.js.map

/***/ }),

/***/ 463:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AsyncScheduler_1 = __webpack_require__(233);
var AsapScheduler = (function (_super) {
    __extends(AsapScheduler, _super);
    function AsapScheduler() {
        _super.apply(this, arguments);
    }
    AsapScheduler.prototype.flush = function (action) {
        this.active = true;
        this.scheduled = undefined;
        var actions = this.actions;
        var error;
        var index = -1;
        var count = actions.length;
        action = action || actions.shift();
        do {
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        } while (++index < count && (action = actions.shift()));
        this.active = false;
        if (error) {
            while (++index < count && (action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsapScheduler;
}(AsyncScheduler_1.AsyncScheduler));
exports.AsapScheduler = AsapScheduler;
//# sourceMappingURL=AsapScheduler.js.map

/***/ }),

/***/ 464:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var AsapAction_1 = __webpack_require__(462);
var AsapScheduler_1 = __webpack_require__(463);
/**
 *
 * Asap Scheduler
 *
 * <span class="informal">Perform task as fast as it can be performed asynchronously</span>
 *
 * `asap` scheduler behaves the same as {@link async} scheduler when you use it to delay task
 * in time. If however you set delay to `0`, `asap` will wait for current synchronously executing
 * code to end and then it will try to execute given task as fast as possible.
 *
 * `asap` scheduler will do its best to minimize time between end of currently executing code
 * and start of scheduled task. This makes it best candidate for performing so called "deferring".
 * Traditionally this was achieved by calling `setTimeout(deferredTask, 0)`, but that technique involves
 * some (although minimal) unwanted delay.
 *
 * Note that using `asap` scheduler does not necessarily mean that your task will be first to process
 * after currently executing code. In particular, if some task was also scheduled with `asap` before,
 * that task will execute first. That being said, if you need to schedule task asynchronously, but
 * as soon as possible, `asap` scheduler is your best bet.
 *
 * @example <caption>Compare async and asap scheduler</caption>
 *
 * Rx.Scheduler.async.schedule(() => console.log('async')); // scheduling 'async' first...
 * Rx.Scheduler.asap.schedule(() => console.log('asap'));
 *
 * // Logs:
 * // "asap"
 * // "async"
 * // ... but 'asap' goes first!
 *
 * @static true
 * @name asap
 * @owner Scheduler
 */
exports.asap = new AsapScheduler_1.AsapScheduler(AsapAction_1.AsapAction);
//# sourceMappingURL=asap.js.map

/***/ }),

/***/ 465:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
Some credit for this helper goes to http://github.com/YuzuJS/setImmediate
*/

var root_1 = __webpack_require__(20);
var ImmediateDefinition = (function () {
    function ImmediateDefinition(root) {
        this.root = root;
        if (root.setImmediate && typeof root.setImmediate === 'function') {
            this.setImmediate = root.setImmediate.bind(root);
            this.clearImmediate = root.clearImmediate.bind(root);
        }
        else {
            this.nextHandle = 1;
            this.tasksByHandle = {};
            this.currentlyRunningATask = false;
            // Don't get fooled by e.g. browserify environments.
            if (this.canUseProcessNextTick()) {
                // For Node.js before 0.9
                this.setImmediate = this.createProcessNextTickSetImmediate();
            }
            else if (this.canUsePostMessage()) {
                // For non-IE10 modern browsers
                this.setImmediate = this.createPostMessageSetImmediate();
            }
            else if (this.canUseMessageChannel()) {
                // For web workers, where supported
                this.setImmediate = this.createMessageChannelSetImmediate();
            }
            else if (this.canUseReadyStateChange()) {
                // For IE 6–8
                this.setImmediate = this.createReadyStateChangeSetImmediate();
            }
            else {
                // For older browsers
                this.setImmediate = this.createSetTimeoutSetImmediate();
            }
            var ci = function clearImmediate(handle) {
                delete clearImmediate.instance.tasksByHandle[handle];
            };
            ci.instance = this;
            this.clearImmediate = ci;
        }
    }
    ImmediateDefinition.prototype.identify = function (o) {
        return this.root.Object.prototype.toString.call(o);
    };
    ImmediateDefinition.prototype.canUseProcessNextTick = function () {
        return this.identify(this.root.process) === '[object process]';
    };
    ImmediateDefinition.prototype.canUseMessageChannel = function () {
        return Boolean(this.root.MessageChannel);
    };
    ImmediateDefinition.prototype.canUseReadyStateChange = function () {
        var document = this.root.document;
        return Boolean(document && 'onreadystatechange' in document.createElement('script'));
    };
    ImmediateDefinition.prototype.canUsePostMessage = function () {
        var root = this.root;
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `root.postMessage` means something completely different and can't be used for this purpose.
        if (root.postMessage && !root.importScripts) {
            var postMessageIsAsynchronous_1 = true;
            var oldOnMessage = root.onmessage;
            root.onmessage = function () {
                postMessageIsAsynchronous_1 = false;
            };
            root.postMessage('', '*');
            root.onmessage = oldOnMessage;
            return postMessageIsAsynchronous_1;
        }
        return false;
    };
    // This function accepts the same arguments as setImmediate, but
    // returns a function that requires no arguments.
    ImmediateDefinition.prototype.partiallyApplied = function (handler) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var fn = function result() {
            var _a = result, handler = _a.handler, args = _a.args;
            if (typeof handler === 'function') {
                handler.apply(undefined, args);
            }
            else {
                (new Function('' + handler))();
            }
        };
        fn.handler = handler;
        fn.args = args;
        return fn;
    };
    ImmediateDefinition.prototype.addFromSetImmediateArguments = function (args) {
        this.tasksByHandle[this.nextHandle] = this.partiallyApplied.apply(undefined, args);
        return this.nextHandle++;
    };
    ImmediateDefinition.prototype.createProcessNextTickSetImmediate = function () {
        var fn = function setImmediate() {
            var instance = setImmediate.instance;
            var handle = instance.addFromSetImmediateArguments(arguments);
            instance.root.process.nextTick(instance.partiallyApplied(instance.runIfPresent, handle));
            return handle;
        };
        fn.instance = this;
        return fn;
    };
    ImmediateDefinition.prototype.createPostMessageSetImmediate = function () {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages
        var root = this.root;
        var messagePrefix = 'setImmediate$' + root.Math.random() + '$';
        var onGlobalMessage = function globalMessageHandler(event) {
            var instance = globalMessageHandler.instance;
            if (event.source === root &&
                typeof event.data === 'string' &&
                event.data.indexOf(messagePrefix) === 0) {
                instance.runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };
        onGlobalMessage.instance = this;
        root.addEventListener('message', onGlobalMessage, false);
        var fn = function setImmediate() {
            var _a = setImmediate, messagePrefix = _a.messagePrefix, instance = _a.instance;
            var handle = instance.addFromSetImmediateArguments(arguments);
            instance.root.postMessage(messagePrefix + handle, '*');
            return handle;
        };
        fn.instance = this;
        fn.messagePrefix = messagePrefix;
        return fn;
    };
    ImmediateDefinition.prototype.runIfPresent = function (handle) {
        // From the spec: 'Wait until any invocations of this algorithm started before this one have completed.'
        // So if we're currently running a task, we'll need to delay this invocation.
        if (this.currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // 'too much recursion' error.
            this.root.setTimeout(this.partiallyApplied(this.runIfPresent, handle), 0);
        }
        else {
            var task = this.tasksByHandle[handle];
            if (task) {
                this.currentlyRunningATask = true;
                try {
                    task();
                }
                finally {
                    this.clearImmediate(handle);
                    this.currentlyRunningATask = false;
                }
            }
        }
    };
    ImmediateDefinition.prototype.createMessageChannelSetImmediate = function () {
        var _this = this;
        var channel = new this.root.MessageChannel();
        channel.port1.onmessage = function (event) {
            var handle = event.data;
            _this.runIfPresent(handle);
        };
        var fn = function setImmediate() {
            var _a = setImmediate, channel = _a.channel, instance = _a.instance;
            var handle = instance.addFromSetImmediateArguments(arguments);
            channel.port2.postMessage(handle);
            return handle;
        };
        fn.channel = channel;
        fn.instance = this;
        return fn;
    };
    ImmediateDefinition.prototype.createReadyStateChangeSetImmediate = function () {
        var fn = function setImmediate() {
            var instance = setImmediate.instance;
            var root = instance.root;
            var doc = root.document;
            var html = doc.documentElement;
            var handle = instance.addFromSetImmediateArguments(arguments);
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement('script');
            script.onreadystatechange = function () {
                instance.runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
            return handle;
        };
        fn.instance = this;
        return fn;
    };
    ImmediateDefinition.prototype.createSetTimeoutSetImmediate = function () {
        var fn = function setImmediate() {
            var instance = setImmediate.instance;
            var handle = instance.addFromSetImmediateArguments(arguments);
            instance.root.setTimeout(instance.partiallyApplied(instance.runIfPresent, handle), 0);
            return handle;
        };
        fn.instance = this;
        return fn;
    };
    return ImmediateDefinition;
}());
exports.ImmediateDefinition = ImmediateDefinition;
exports.Immediate = new ImmediateDefinition(root_1.root);
//# sourceMappingURL=Immediate.js.map

/***/ }),

/***/ 466:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isDate(value) {
    return value instanceof Date && !isNaN(+value);
}
exports.isDate = isDate;
//# sourceMappingURL=isDate.js.map

/***/ }),

/***/ 467:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isArray_1 = __webpack_require__(72);
function isNumeric(val) {
    // parseFloat NaNs numeric-cast false positives (null|true|false|"")
    // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
    // subtraction forces infinities to NaN
    // adding 1 corrects loss of precision from parseFloat (#15100)
    return !isArray_1.isArray(val) && (val - parseFloat(val) + 1) >= 0;
}
exports.isNumeric = isNumeric;
;
//# sourceMappingURL=isNumeric.js.map

/***/ })

});
//# sourceMappingURL=0.chunk.js.map