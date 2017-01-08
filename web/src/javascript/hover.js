//获取节点
var left=document.querySelector(".left");
var leftUl=left.getElementsByTagName("ul")[0];
var leftLi=leftUl.getElementsByTagName("li");
//注册事件
for(var i=0;i<20;i++){
	addEvent(leftLi[i],"mouseenter",hover);
	addEvent(leftLi[i],"mouseleave",hover);
}
//事件函数
function hover(event){
	Event(event);
	var li=Target(event);
	var cover=li.querySelector(".cover");
	var h5=li.getElementsByTagName("h5")[0];
	var normal=li.querySelector(".normal");
	var div=li.querySelectorAll(".hover")[0];
	var p=getElementsByClassName(li,"hover")[1];
	var span=div.getElementsByTagName("span");
	if(event.type=="mouseenter"){
		li.className+=" jshover ul li";
		cover.className+=" jshover ul jcover";
		h5.className="jshover ul h5";
		normal.className+=" jshover ul jnormal";
		div.className+=" jshover ul jhover";
		for(var i=0;i<3;i++){
			span[i].className="jshover ul span";
		}
		span[0].className+=" jpeople";
		p.className+=" jshover ul describe";
	}else if(event.type=="mouseleave"){
			li.className=li.className=="hidden jshover ul li"?"hidden":"";
			cover.className="cover";
			h5.className="";
			normal.className="normal";
			div.className="hover";
			for(var i=0;i<3;i++){
				span[i].className="";
			}
			p.className="hover";
		}	
}




