
class ClientFormValidator{
    //constructor(){
        
        //this.ValidFlag = true;
    //}
    
    _checkValidity(target){
        
        if (target.checkValidity) {
            return target.checkValidity();
        }
        // stub
        return true;
    }
    whiteSpaceWatcher(value, target){
        let arrValue = value.split(' ').filter(item=>!!item);
        if (arrValue.length > 1) {
            target.value = arrValue.join(' ');
        }else{
            target.value = arrValue.join('');
        }
    }
    validateField(target){
        let value = target.value.trim();
        let targetParent = target.parentNode;
        if (value) {
            targetParent.classList.add('F__dirty');
            if (this._checkValidity(target)){
                this.whiteSpaceWatcher(value, target);
                this.setMessage(target);
                targetParent.classList.add('F__valid');
            }else{
                //this.ValidFlag = false;
                this.setMessage(target);
                targetParent.classList.add('F__invalid'); 
            }
                    
                
        }else{
            if (target.required) {
                //this.ValidFlag = false;
                this.setMessage(target);
                targetParent.classList.add('F__invalid'); 
            }
            targetParent.classList.remove('F__dirty');
            target.value = '';   
        }
        targetParent.classList.remove('F__active');
        //this.ActiveField = null;
    }
    setMessage(target){
        target.parentNode.querySelector('.F__inform').innerHTML = target.validationMessage || '';
    }
    
}