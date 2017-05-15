import * as tslib_1 from "tslib";
import HttpController from "./plugins/http.module";
import RippleMaterial from "./plugins/rippleMaterial";
import SkypeTooltip from "./plugins/skypeTooltip";
import ScrollToTop from "./plugins/scrollToTop";
import Chip from "./plugins/chip";
import Utilities, { U } from "./sections/Utilities";
import Menu from "./sections/menu";
import Section1 from "./sections/section_1";
import Section2 from "./sections/section_2";
import Section3 from "./sections/section_3";
import Section4 from "./sections/section_4";
import Section5 from "./sections/section_5";
import Section6 from "./sections/section_6";
import Section7 from "./sections/section_7";
import Section8 from "./sections/section_8";
import Section9 from "./sections/section_9";
import Section10 from "./sections/section_10";
import Section1112 from "./sections/section11_12";
import Section13 from "./sections/section_13";
import Section14 from "./sections/section_14";
var Material = (function () {
    function Material() {
    }
    return Material;
}());
Material.RippleMaterial = new RippleMaterial();
Material.Chip = new Chip();
var WFW = (function (_super) {
    tslib_1.__extends(WFW, _super);
    function WFW() {
        var _this = _super.call(this) || this;
        var fnImages = function () {
            document.querySelector(".Intersector").classList.add("IReady"),
                _this.S14.getOffers();
            var videoEl = document.querySelector(".S10__vid");
            videoEl.poster = "/images/Lonely-Blue.jpg";
        };
        _this._U_FnShim();
        _this._U_Polyfill_Helper();
        _this.httpService = new HttpController();
        _this.Menu = new Menu();
        _this.S1 = new Section1();
        _this.S2 = new Section2();
        _this.S3 = new Section3(fnImages);
        _this.S4 = new Section4();
        _this.S5 = new Section5();
        _this.S6 = new Section6();
        _this.S7 = new Section7(_this.httpService, { services: "/services/", order: "/order/" });
        _this.S8 = new Section8(Material.Chip);
        _this.S9 = new Section9();
        _this.S10 = new Section10();
        _this.S11_12 = new Section1112();
        _this.S13 = new Section13();
        _this.S14 = new Section14(_this.httpService, encodeURI("/offers?fields[offers]=meta"));
        var BgImg = _this.S1.BgImg;
        _this.httpService.configureAndSendRequest([
            "https://fonts.googleapis.com/css?family=Indie+Flower",
            "https://fonts.googleapis.com/css?family=Pathway+Gothic+One",
            "https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,400",
        ], {
            actions: {
                actionsOnSuccess: [function (response) { return _this._U_TagsFact("style", response); }]
            },
            options: {
                mode: "cors",
                cache: "force-cache",
                responseAs: "text"
            }
        });
        var S1_Font = _this.S1.OnFontLoaded(), S5_Font = _this.S5.OnFontLoaded(), S2_Font = _this.S2.FBS2();
        _this._U_WebFontsLoaderWrapper([{
                family: "Indie Flower:latin",
                success: [S1_Font],
                error: [S1_Font]
            },
            {
                family: "Pathway Gothic One:bold:latin",
                success: [S2_Font, S5_Font]
            },
            {
                family: "Source Sans Pro:200,400:latin"
            }]);
        _this._U_WaitForImagesPlugin(BgImg, [_this.S1.actionsWaitForImagesPlugin()]);
        new SkypeTooltip, new ScrollToTop;
        return _this;
    }
    WFW.onInit = function () {
        U._U_SetScrollOnLoad();
        WFW.siteUP();
        window.removeEventListener("DOMContentLoaded", WFW.onInit);
    };
    WFW.siteUP = function () {
        window._WFW_ = new WFW();
    };
    return WFW;
}(Utilities));
;
U._U_EventListSetter("DOMContentLoaded", WFW.onInit);
