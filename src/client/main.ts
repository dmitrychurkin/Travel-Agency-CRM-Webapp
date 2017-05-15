
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
class Material {
    static RippleMaterial: RippleMaterial = new RippleMaterial();
    static Chip: Chip = new Chip();
}
class WFW extends Utilities {
    static onInit() {
        U._U_SetScrollOnLoad();
        WFW.siteUP();
        window.removeEventListener("DOMContentLoaded", WFW.onInit);
    }
    private static siteUP() {
        window._WFW_ = new WFW();
    }

    httpService: HttpController;
    private Menu: Menu;
    private S1: Section1;
    private S2: Section2;
    private S3: Section3;
    private S4: Section4;
    private S5: Section5;
    private S6: Section6;
    public S7: Section7;
    private S8: Section8;
    private S9: Section9;
    private S10: Section10;
    private S11_12: Section1112;
    private S13: Section13;
    private S14: Section14;
    private constructor() {
        super();
        // Experimental Feature!!!!!!!!!!!
        let fnImages = () => {
            // this._U_IReady(".Intersector", "IReady")(),
            document.querySelector(".Intersector")!.classList.add("IReady"),
            // this.S14.imLoader();
            this.S14.getOffers();
            let videoEl = <HTMLVideoElement>document.querySelector(".S10__vid");
            videoEl.poster = "/images/Lonely-Blue.jpg";
        };
        /** Release shim Function! */
        this._U_FnShim();
        /** Release shim RequestAnimFrame! */
        this._U_Polyfill_Helper();
        this.httpService = new HttpController();
        // this.snackBarService = new SnackBarService();
        this.Menu = new Menu();
        this.S1 = new Section1();
        this.S2 = new Section2();
        this.S3 = new Section3(fnImages);
        this.S4 = new Section4();
        this.S5 = new Section5();
        this.S6 = new Section6();
        this.S7 = new Section7(this.httpService, { services: "/services/", order: "/order/" });
        this.S8 = new Section8(Material.Chip);
        this.S9 = new Section9();
        this.S10 = new Section10();
        this.S11_12 = new Section1112();
        this.S13 = new Section13();
        this.S14 = new Section14(/*"/images/newromefare.jpg"*/this.httpService, encodeURI("/offers?fields[offers]=meta"));
        const { BgImg } = this.S1;
        this.httpService.configureAndSendRequest([
            "https://fonts.googleapis.com/css?family=Indie+Flower",
            "https://fonts.googleapis.com/css?family=Pathway+Gothic+One",
            "https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,400",
        ], {
            actions: {
                actionsOnSuccess: [(response: string) => this._U_TagsFact("style", response)]
            },
            options: {
                mode: "cors",
                cache: "force-cache",
                responseAs: "text"
            }
        });
        let S1_Font = this.S1.OnFontLoaded()!, S5_Font = this.S5.OnFontLoaded()!, S2_Font = this.S2.FBS2()!;
        this._U_WebFontsLoaderWrapper([{
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
        this._U_WaitForImagesPlugin(BgImg, [this.S1.actionsWaitForImagesPlugin()!]);

        new SkypeTooltip, new ScrollToTop;
    }
};
U._U_EventListSetter("DOMContentLoaded", WFW.onInit);