class FormModule extends ClientFormValidator{
    constructor(endPoint='countries.json'){
        super();
        //this.formName = 'Air ticketing and reservation';
        //this.ActiveField = null;
        this.SentPoint = 'api'
        //this.coutries = endPoint;
        this.deadline = 923;
        this._LSSupport();
        this.setListenersOnInputs();
        this.setOnResize();
        this.setOnSubmit();
    }
    // testValidationAPI(){
    //     let fname = document.getElementById('first_name');
    //     fname.setCustomValidity('Fuck You!');
    //     console.log(fname.validationMessage);
    //     console.log(fname.validity);
    // }
    
    formSender(){
        return new Promise((resolve, reject)=>{
            console.log('About to Send');
            HTTP.configureAndSendRequest([this.SentPoint], {
                options: {
                    method: 'POST',
                    cache: 'no-cache'
                },
                actions: {
                    actionsOnSuccess: [res=>{
                        console.log(res);
                        resolve(res);
                    }],
                    actionsOnFail: [err=>{
                        console.log(err);
                        reject(err);
                    }]
                }
            });
        });
            
    }
    setOnSubmit(){
        
        for (let form of document.forms){
            form.addEventListener('submit', e=>{
                console.log(e);
                if (!e.isTrusted) return;
                e.preventDefault();
                let target = e.target;
                let invalidCollection = target.querySelectorAll('.F__invalid');
                //console.log(invalidCollection);
                if (invalidCollection > 0) return;
                //Handle POST
                // this.formSender().then(res=>{
                //     console.log("From setOnSubmit ", res);
                // }).catch(err=>{
                //     console.log("From err setOnSubmit ", err);
                // });
                let buffer = this._userDataBuffLS();
                for (let input of document.querySelectorAll(".F__form-wrap input:not([type=submit]), .F__form-wrap textarea")) {
                    buffer(input);
                }
                buffer()();
            });
        }
    }
    _LSSupport() {
       this.LS = ("localStorage" in window) || false; 
    }
    _userDataBuffLS(dataAttr = "data-cache") {
        const LS__MODEL = {};
        
        return input => {
            if (input && input.hasAttribute(dataAttr)) {
                LS__MODEL[input.id] = input.value;
            }
            return () => {
                if (this.LS) {
                    localStorage.setItem("user", JSON.stringify(LS__MODEL));
                }
            };
        };
    }
    _userDataUnBuffLS() {
        const LS__MODEL = JSON.parse(localStorage.getItem("user"));
        if (!this.LS || !LS__MODEL) return false;
        return input => {
            let field = input.id.toString();
            if (field in LS__MODEL) {
                input.setAttribute("value", LS__MODEL[field]);
            }
        };    
    }
    _userDataKillBuffLS() {
        this.LS && localStorage.removeItem("user");
    }
    setListenersOnInputs(){
        let inputsArr = document.querySelectorAll('.F__form-wrap input:not([type=submit])');
        let textareas = document.querySelectorAll('.F__form-wrap textarea');
        this.onFocus = e=>{
            let target = e.target;
            let targetParent = target.parentNode;
            //console.dir(target);
            targetParent.classList.remove('F__valid');
            targetParent.classList.remove('F__invalid');
            //this.ActiveField = target.parentNode;
            //this.ActiveField.classList.add('F__active');
            targetParent.classList.add('F__active');
        };
        this.onBlur = e=>{
            let target = e.target;
            //console.dir(target);
           this.validateField(target);
        };
        
        window.addEventListener('DOMContentLoaded', e=>{
            for (let form of document.forms){
                form.reset();
            }
        });
        let unbuffer = this._userDataUnBuffLS();
        for (let input of [...inputsArr, ...textareas]){
            if (input.type === 'checkbox' || input.type === 'radio') continue;
            if (unbuffer) {
                unbuffer(input);
            }
            this.createMesPh(input);
            this.setDefaultsForDateType(input);
            this.checkDefaults(input);
            input.addEventListener('focus', this.onFocus);
            input.addEventListener('blur', this.onBlur);
        }
        
    }
    createMesPh(input){
        let div = document.createElement('div');
        div.className = 'F__inform';
        div.innerHTML = '';
        input.parentNode.insertBefore(div, input.nextElementSibling);
    }
    setDefaultsForDateType(input){
        if (input.type.includes('date')){
            //console.log(input);
            input.parentNode.classList.add('F__dirty');
            setTimeout(()=>{
                input.value = new Date().toISOString().substring(0, 10);
            });
            
            input.min = new Date().toISOString().substring(0, 10);
        }
    }
    checkDefaults(input){
        if (input.value) {
            input.parentNode.classList.add('F__dirty');
        }
    }
    _OnLayoutChange(elementsToAppend, appendTo){
        let isLayoutChanged = false;
        const insertionPointToUp = document.querySelectorAll("[data-ins-point]");
        return ()=>{
            const docWidth = document.documentElement.offsetWidth;
            if (docWidth < this.deadline && !isLayoutChanged){
                isLayoutChanged = true;
                elementsToAppend.forEach(el=>{
                    let isDataLayoutUp = el.hasAttribute("data-layout-up");
                    isDataLayoutUp ? appendTo[0].insertBefore(el, insertionPointToUp[0]) : appendTo[1].appendChild(el);
                });
            }else if (docWidth >= this.deadline && isLayoutChanged) {
                isLayoutChanged = false;
                elementsToAppend.forEach(el=>{
                    let isDataLayoutUp = el.hasAttribute("data-layout-up");
                    isDataLayoutUp ? appendTo[1].insertBefore(el, insertionPointToUp[1]) : appendTo[0].appendChild(el);
                });
            }
        };  
    }
    setOnResize(){
        let Fn = this._OnLayoutChange(Array.from(document.querySelectorAll('[data-layout]')), document.querySelectorAll('.F__layout-block'));
        Fn();
        window.addEventListener('resize', Fn);
    }
    
}
new FormModule();