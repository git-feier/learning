//弹窗构造函数
function Popup(html,css,coverCssText,locationCssText){
//参数类型为String;
//html为html;
//css为带有style的内联样式;
//coverCssText和locationCssText分别是遮盖行内css声明和弹窗定位行内声明;
	var parentnode=0;
	var covernode=0;
	this.html=html;
	this.css=css;
	this.coverCssText=coverCssText;
	this.locationCssText=locationCssText;
	this.parentnode=parentnode;
}
Popup.prototype={
	_writeHTML:function(){
				this.parentnode.innerHTML=this.html;
			  },
	_writeCSS:function(){
				var body=document.getElementsByTagName("body")[0];
				var div=document.createElement("div");
				this.newStyle=body.appendChild(div);//在body末尾增加节点;
				this.newStyle.innerHTML=this.css;
				if(!this.newStyle.innerHTML){//兼容ie8
					this.newStyle.innerHTML="_"+this.css;
				}	
			 },
	addevent:function(){
			var obj=this;
			var EVENT={
					start:function(event){
						     obj.covernode=document.createElement("div");
						     obj.parentnode=document.createElement("div");
						     var body=document.getElementsByTagName("body")[0];
						     obj.newDiv1=body.appendChild(obj.covernode);//在body末尾增加节点
						     obj.newDiv2=body.appendChild(obj.parentnode);//在body末尾增加节点
						     obj.newDiv1.style.cssText=obj.coverCssText;
						     obj.newDiv2.style.cssText=obj.locationCssText;
						     obj._writeHTML();
							 obj._writeCSS();
						  },
					end:function(event){
							 obj.newDiv1.parentNode.removeChild(obj.newDiv1);
							 obj.newDiv2.parentNode.removeChild(obj.newDiv2);
							 obj.newStyle.parentNode.removeChild(obj.newStyle);
							 
					}
				};
			return EVENT;
		}
}


