 //注册事件函数(兼容型)
var addEvent=document.addEventListener?function(elem,type,listener,useCapture){
    elem.addEventListener(type,listener,useCapture);
}:function(elem,type,listener,useCapture){
    elem.attachEvent("on"+type,listener);
};
//取消事件注册(兼容型)
var removeEvent=document.removeEventListener?function(elem,type,listener,useCapture){
    elem.removeEventListener(type,listener,useCapture);
}:function(elem,type,listener,useCapture){
    elem.detachEvent("on"+type,listener);
};
//事件对象函数(兼容型)
function Target(event){
    return event.target||event.srcElement;
}
//event函数(兼容型)
function Event(event){
    event=event||window.event;
}
//阻止事件默认行为函数(兼容型)
function PreventDefault(event){
    if(event.preventDefault){
        event.preventDefault();
    }else{
        event.returnValue=false;
    }
}

//getElementsByClassName(兼容型)
function getElementsByClassName(root,className){
    //判断className是否包含于root节点下的nodeName中
    function hasClassName(str1,str2){
        //转换成数组作比较
        var className=str1.split(" ");
        var nodeName=str2.split(" ");
        var flag=0;
        for(var i=0;i<className.length;i++){
            for(var j=0;j<nodeName.length;j++){
                if(className[i]==nodeName[j]){
                    flag++;
                    break;
                }
            }
        }
        if(flag==className.length){
            return true;
        }else{
            return false;
        }
    }
    //判断是否原生支持,若支持则使用原生支持
    if(root.getElementsByClassName){
      return root.getElementsByClassName(className);
    }else{//否则,使用以下代码模拟支持
      var childnodes=root.getElementsByTagName("*");
      var result=[];
      for(var i=0;i<childnodes.length;i++){
        if(hasClassName(className,childnodes[i].className)){
            result.push(childnodes[i]);
        }
      }
      return result;
    }
}
//input输入框提示兼容(替代placeholder属性)
function inputPrompt(textNode,passwordNode,parentNode,textPrompt,passwordPrompt){
    //textNode,passwordNode为input节点,类型分别为text和password;
    //parentNode为passwordNode的父节点;
    //textPrompt为textNode提示信息;
    //passwordPrompt为passwordNode提示信息;
    var newInput=document.createElement("input");//创建一个新的文本输入框
    var oldInput=parentNode.replaceChild(newInput,passwordNode);//替换密码输入框
    textNode.value=textPrompt;//写入文本提示信息
    newInput.value=passwordPrompt;//写入密码提示信息
    //监听输入框
    addEvent(textNode,"focus",focus);
    addEvent(newInput,"focus",focus);
    addEvent(oldInput,"focus",focus);
    addEvent(textNode,"blur",blur);
    addEvent(oldInput,"blur",blur);
    //获得焦点函数
    function focus(event){
        Event(event);
        if(Target(event)==textNode){//若是textNode
            textNode.value="";//将值清空
            textNode.style.color="black";//将字体颜色设置成黑色
        }else if(Target(event)==newInput){//若是newInput
            newInput=parentNode.replaceChild(oldInput,newInput);//替换输入框为密码输入框
            oldInput.focus();//自动获取焦点
            oldInput.value="";//将值清空
            oldInput.style.color="black";//将字体颜色设置成黑色
            }else if(Target(event)==oldInput){//若是oldInput
                oldInput.value="";//将值清空
                oldInput.style.color="black";//将字体颜色设置成黑色
            }
    }
    //失去焦点函数
    function blur(event){
        Event(event);
        var target=Target(event);
        if(target.value==""){//若值为空
            if(target==textNode){//若为textNode
                textNode.value=textPrompt;//重新写入文本提示信息
                textNode.style.color="";//恢复字体默认颜色
            }else if(target==oldInput){//若为oldInput
                oldInput=parentNode.replaceChild(newInput,oldInput);//替换输入框为newInput
                newInput.value=passwordPrompt;//重新写入密码提示信息
                newInput.style.color="";//恢复字体默认颜色
            }
        }
        
    }       
}
//textContent兼容函数
function readText(node){
    return node.textContent||node.innerText;
}
function writeText(node,value){
    if(node.textContent){
        node.textContent=value;
    }else{
        node.innerText=value;
    }
}
//getStyle函数(获取元素的实际样式)
var getStyle=function(element, cssPropertyName){
    if(!window.getComputedStyle){//如果不支持window.getComputedStyle
      window.getComputedStyle=function(element){//则创建window.getComputedStyle函数
         return element.currentStyle;//ie中支持currentStyle,用它模拟实现
      }
    }
    return window.getComputedStyle(element)[cssPropertyName];//利用window.getComputedStyle获取结果
}