webpackJsonp([1,7],{

/***/ 408:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_flex_layout__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__admin_registration_routing_module__ = __webpack_require__(425);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__admin_registration_component__ = __webpack_require__(414);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminRegistrationModule", function() { return AdminRegistrationModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var AdminRegistrationModule = (function () {
    function AdminRegistrationModule() {
    }
    return AdminRegistrationModule;
}());
AdminRegistrationModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["a" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_material__["a" /* MaterialModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_flex_layout__["FlexLayoutModule"],
            __WEBPACK_IMPORTED_MODULE_5__admin_registration_routing_module__["a" /* AdminRegistrationRoutingModule */]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_6__admin_registration_component__["a" /* AdminRegistrationComponent */]]
    })
], AdminRegistrationModule);

//# sourceMappingURL=admin-registration.module.js.map

/***/ }),

/***/ 414:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__error_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__backend_service__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_config__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__admin_credentials_data_service__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__progress_bar_service__ = __webpack_require__(52);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminRegistrationComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var AdminRegistrationComponent = (function () {
    function AdminRegistrationComponent(backendService, router, errorEmmiter, adminDataResolver, progressBarService) {
        this.backendService = backendService;
        this.router = router;
        this.errorEmmiter = errorEmmiter;
        this.adminDataResolver = adminDataResolver;
        this.progressBarService = progressBarService;
        this.isCanEdit = false;
        this.fbMess = 'Incorrect input';
        this.endPoint = '/api/register-new/';
        this._isSend = false;
    }
    AdminRegistrationComponent.prototype.ngAfterViewChecked = function () {
        this.checked = true;
    };
    AdminRegistrationComponent.prototype.onBlur = function (ngInputRef, refOfInput) {
        if (ngInputRef.touched && ngInputRef.invalid) {
            refOfInput.focus();
        }
    };
    AdminRegistrationComponent.prototype.ngOnInit = function () {
        this.isCanEdit = this.adminDataResolver.getAdminData().canEdit;
        this.adminDataResolver.clearAdminData();
    };
    AdminRegistrationComponent.prototype.onSubmit = function (form) {
        var _this = this;
        if (form.invalid) {
            form.resetForm();
            return;
        }
        if (this._isSend) {
            return;
        }
        this._isSend = true;
        this.progressBarService.emmiter.emit(true);
        var newAdmin = form.value;
        if (this.isCanEdit) {
            newAdmin.role = newAdmin.role || 'E';
        }
        else {
            newAdmin.role = 'O';
        }
        delete newAdmin.repeatPass;
        this.backendService.sendRequest(this.endPoint, {
            method: __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* RequestMethod */].Post,
            body: JSON.stringify(newAdmin),
            headers: __WEBPACK_IMPORTED_MODULE_5__app_config__["a" /* POST_HEADER */]
        })
            .then(function (res) {
            console.log('AdminRegistrationComponent = ', res);
            if (res.ok) {
                var adminData = res.json();
                _this.adminDataResolver.setAdminData(adminData);
                return _this.router.navigate(['dashboard']);
            }
            throw new Error('(:0_^_0:)');
        })
            .catch(function (err) {
            var errMessage;
            var serverInfo;
            var navigateFn = function () { return _this.router.navigate(['login'], { skipLocationChange: true, replaceUrl: false }); };
            if (err.status === 403) {
                var textResponse = err.text();
                serverInfo = textResponse && JSON.parse(textResponse);
                if (serverInfo.exists) {
                    errMessage = 'This name has already taken!';
                }
                else {
                    return navigateFn();
                }
            }
            else {
                navigateFn();
            }
            _this.errorEmmiter.emmiter.emit(errMessage || 'Error occured, try again later');
        })
            .then(function () { return _this.progressBarService.emmiter.emit(_this._isSend = false); });
    };
    return AdminRegistrationComponent;
}());
AdminRegistrationComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Component */])({
        selector: 'app-admin-register',
        template: __webpack_require__(445),
        styles: [__webpack_require__(439)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__backend_service__["a" /* BackendService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__backend_service__["a" /* BackendService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__error_service__["a" /* ErrorEmmiter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__error_service__["a" /* ErrorEmmiter */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_6__admin_credentials_data_service__["a" /* AdminCredentialsDataResolver */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__admin_credentials_data_service__["a" /* AdminCredentialsDataResolver */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_7__progress_bar_service__["a" /* ProgressBarService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__progress_bar_service__["a" /* ProgressBarService */]) === "function" && _e || Object])
], AdminRegistrationComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=admin-registration.component.js.map

/***/ }),

/***/ 425:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__admin_registration_component__ = __webpack_require__(414);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminRegistrationRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_2__admin_registration_component__["a" /* AdminRegistrationComponent */]
    }
];
var AdminRegistrationRoutingModule = (function () {
    function AdminRegistrationRoutingModule() {
    }
    return AdminRegistrationRoutingModule;
}());
AdminRegistrationRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]]
    })
], AdminRegistrationRoutingModule);

//# sourceMappingURL=admin-registration-routing.module.js.map

/***/ }),

/***/ 439:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(31)();
// imports


// module
exports.push([module.i, ".l__cont {\r\n  background-color: #fafafa;\r\n  position: relative;\r\n  z-index: 0;\r\n}\r\n.l__wrap {\r\n  width: 400px;\r\n  margin: auto;\r\n  padding: 50px 0;\r\n}\r\n.l__f {\r\n  display: block;\r\n}\r\n.l__tit {\r\n  font-weight: 200;\r\n  text-align: center;\r\n  color: #00bcd4;\r\n  text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.7);\r\n  padding: 0 20px;\r\n}\r\n\r\n.btn {\r\n  width: 200px;\r\n  color: #fff;\r\n  text-transform: uppercase;\r\n}\r\n@media all and (max-width: 500px) {\r\n  .l__wrap {\r\n    width: 70%;\r\n  }\r\n}\r\n.sub_tit {\r\n    color: #ffd740;\r\n}\r\n.radio-group {\r\n    color: rgb(117, 117, 117);\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 445:
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" fxLayoutAlign=\"center\" class=\"l__cont\">\r\n  <div class=\"l__wrap\">\r\n    <div class=\"l__tit\">\r\n      <h1>\r\n        Registration of new admin\r\n      </h1>\r\n    </div>\r\n    <div>\r\n      <form #f=\"ngForm\" (ngSubmit)=\"onSubmit(f)\" fxLayout=\"column\" fxLayoutGap=\"7%\">\r\n        <md-input-container [dividerColor]=\"ngUserName.touched && ngUserName.invalid ? 'warn' : 'primary'\">\r\n          <input mdInput #userName (blur)=\"onBlur(ngUserName, userName)\" placeholder=\"Name\" name=\"userName\" ngModel #ngUserName=\"ngModel\" minlength=\"3\" maxlength=\"20\" required>\r\n          <md-hint *ngIf=\"ngUserName.touched && ngUserName.invalid\" [ngStyle]=\"userName.validationMessage.length > 30 ? { 'bottom.px': -11, 'color': '#f44336' } : { 'bottom.px': 0, 'color': '#f44336' }\">{{userName.validationMessage || fbMess}}</md-hint>\r\n        </md-input-container>\r\n        <md-input-container [dividerColor]=\"ngPass.touched && ngPass.invalid ? 'warn' : 'primary'\">\r\n          <input mdInput #pass (blur)=\"onBlur(ngPass, pass)\" type=\"password\" placeholder=\"Password\" name=\"pass\" ngModel #ngPass=\"ngModel\" minlength=\"5\" required>\r\n          <md-hint *ngIf=\"ngPass.touched && ngPass.invalid\" [ngStyle]=\"pass.validationMessage.length > 30 ? { 'bottom.px': -11, 'color': '#f44336' } : { 'bottom.px': 0, 'color': '#f44336' }\">{{pass.validationMessage || fbMess}}</md-hint>\r\n        </md-input-container>\r\n        <md-input-container [dividerColor]=\"ngRepeatPass.touched && ngRepeatPass.invalid || ngRepeatPass.value !== ngPass.value ? 'warn' : 'primary'\">\r\n          <input mdInput #repeatPass (blur)=\"onBlur(ngRepeatPass, repeatPass)\" type=\"password\" placeholder=\"Repeat password\" name=\"repeatPass\" ngModel #ngRepeatPass=\"ngModel\" required>\r\n          <md-hint [style.color]=\"'#f44336'\">{{ (ngRepeatPass.touched && ngRepeatPass.invalid) ? repeatPass.validationMessage || fbMess : (ngRepeatPass.value !== ngPass.value) ? 'Passwords must match!' : '' }}</md-hint>\r\n        </md-input-container>\r\n        <div *ngIf=\"isCanEdit\">\r\n            <h3 class=\"sub_tit\">Select Your Role in our business process!</h3>\r\n            <md-radio-group class=\"radio-group\" name=\"role\" fxLayout=\"column\" ngModel>\r\n                <md-radio-button [checked]=\"checked\" fxFlex=\"50px\" value=\"E\">Editor</md-radio-button>\r\n                <md-radio-button fxFlex=\"50px\" value=\"O\">Just admin:)</md-radio-button>\r\n            </md-radio-group>\r\n        </div>\r\n        <button md-raised-button [disabled]=\"!f.form.valid || ngRepeatPass.value !== ngPass.value\" color=\"primary\" fxFlexAlign=\"center\" class=\"btn\">SignIn</button>\r\n      </form>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ })

});
//# sourceMappingURL=1.chunk.js.map