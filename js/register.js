function Form(){
    //  form
    this.forms = this._("#form");
    //  input 输入框
    this.bord = this._(".bord");
    //  btn 按钮
    this.btn = this._("#sub_btn");
    //  error  报错信息提示
    this.error = this._(".inp_style_error");
    //  getCode  验证码
    this.getCode = this._("#get_phone_button");
    this.lab = this._("label");
    this.check = this._("#check");
    

    this.init = function(){
        this.events(this.forms,"click",this.targetBord);
        this.events(this.getCode,"click",this.codeHandler);
        this.events(this.bord[1],"blur",this.blurCodeHandler);
        this.events(this.bord[2],"focus",this.focuerrHandler);
        this.events(this.btn,"mouseenter",this.enterHandler);
        this.events(this.lab,"click",this.labHandler);
        this.events(this.btn,"click",this.submitHandler);
        
        // this.blur(this.bord[0]);
        this.color = this.getStyle(this.bord,0,"border");
    }
}
Form.prototype = {
    _count : null,
    _temp : null,
    _arr : [],
    _ : function(select){
        var doms = document.querySelectorAll(select);
        if(doms.length === 0){
              return null;
        }
        return doms.length === 1 ? doms[0] : doms;
    },
    getStyle : function(item,index,style){
        item = getComputedStyle(item[index])[style];
        return item;
    },
    events : function(obj,evt,fn){
        if(!obj && !evt && !fn) return;
        obj.addEventListener(evt,fn.bind(this));
    },
    //  边框变色功能
    targetBord : function(e){
        var e = e || window.event;
        var target = e.target || e.srcElement;
        this.bord = Array.from(this.bord);
        this.bord.filter((item,index)=>{
            if(target === item && this._count !== index){
                this._count = index;
                target.setAttribute("style","border: 1px solid #000;");
            }else{
                this.bord[index].style.border = this.color;
                this._count = null;
            }
        })
        if(!this.getCode){
            return;
        }else{
            if(target === this.getCode && this.bord[0].value === ""){
                this.bord[0].style.border = "1px solid red";
            }
        }
    },
    codeHandler : function(){
        var reg = new RegExp("[\\d]{11}","g");
        var bool = reg.test(this.bord[0].value);
        if(this.bord[0].value != ""){
            if(bool){
                this.getCode.innerHTML = 1000 + Math.floor(Math.random()*(10000-1000)+1);
                return false;
            }
        }
    },
    blurCodeHandler : function(){
        var verify = this.bord[1].value === this.getCode.innerHTML ? true : false;
        if(!verify){
            this.bord[1].value = "";
        }
        return ; 
    },
    
    focuerrHandler : function(){
        if(this.error){
            this.error[1].className += " inp_error";
            this.events(this.bord[2],"blur",this.blurerrHandler1);
            this.events(this.bord[3],"blur",this.blurerrHandler2);
        }
    },
    blurerrHandler1 : function(){
        this._temp = this.error[1].getAttribute("class");
        this.error[1].className = this._temp.replace(" inp_error","");
        var reg = RegExp("[\\w]{6,20}","g");
        if(reg.test(this.bord[2].value)){
            return true;
        }else{
            this.bord[2].style.border = "1px solid red";
        }
    },
    blurerrHandler2 : function(){
        if(this.bord[2].value != this.bord[3].value){
            this.error[2].className += " inp_error";
        }else{
            this.error[2].className = this._temp.replace(" inp_error","");
        }
    },
    enterHandler : function(){
        this.btn.className = "shade";
        this.btn.style.background = "darkred";
        this.events(this.btn,"mouseleave",this.leaveHandler);
    },
    leaveHandler : function(){
        this.btn.style.background = "";
    },
    labHandler : function(){
        if(this._count){
            this.check.style.display = "";
            this._count = null;
        }else{
            this.check.style.display = "inline-block";
            this._count = 1;
        }
    },
    submitHandler : function(){
        this.bord = Array.from(this.bord);
        this.bord.map((item,index)=>{
            if(item.value === ""){
                return false;
            }else{
                this.forms.submit();
            }
        })
    }
}
Form.prototype.constructor = Form;
var form = new Form();
form.init();
