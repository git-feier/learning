//关闭顶部通知栏

var cookie=getCookies();//获取本地cookie
var notify=document.querySelector(".top-notify");
var notifyI=notify.getElementsByTagName("i")[0];
if(cookie.notify!=1){//判断cookie值
	addEvent(notifyI,"click",closeNotify);
	function closeNotify(event){
		var name="notify",
		    value=1,
		    expires=new Date(2020,11);//失效时间
		setCookie(name,value,expires);
		notify.parentNode.removeChild(notify);
		window.location.reload();//重载页面
	}
}else{
		notify.parentNode.removeChild(notify);
}

//导航区关注

//获取关注节点
var nav=document.querySelector(".nav");
var navButton=nav.getElementsByTagName("button")[0];
var a=nav.getElementsByTagName("a");
//初始化一个表单弹窗
var loginPopup=new Popup(loginWindow.html,loginWindow.css,loginWindow.coverCssText,loginWindow.locationCssText);
//注册表单事件
addEvent(navButton,"click",login);
addEvent(nav,"click",getLoginNode);
//表单事件函数
function login(event){
	if(cookie.loginSuc!=1){//如果没有登录cookie
		loginPopup.addevent().start();//弹出登录框
		//获取相关节点
		var loginNode=document.querySelector(".login");
		var ref=loginNode.querySelector(".ref");
		var div=ref.getElementsByTagName("div");
		var input=loginNode.getElementsByTagName("input");
		var button=ref.getElementsByTagName("button")[0];
		var textPrompt="账号",passwordPrompt="密码";
		inputPrompt(input[0],input[1],div[1],textPrompt,passwordPrompt);//调用input信息提示函数
		//表单验证及提交
		addEvent(loginNode,"submit",validate);
		function validate(event){
			Event(event);
			var target=Target(event);
			var result1=/^studyOnline$/.test(input[0].value);//用户名验证
			var result2=/^study\.163\.com$/.test(input[1].value);//密码验证
			var md5_userName="95b9941b277caf1c77ee35fee66fc5f6";//MD5加密用户名
			var md5_password="a972aec008fd064f00ae77c3a6472cc2";//MD5加密密码
			var data={userName:md5_userName,password:md5_password};//Ajax查询参数
			PreventDefault(event);//阻止表单提交
			if(!result1||!result2){//若验证失败
				input[0].value="用户名或密码错误,请重新输入";
				input[0].style.color="red";
				input[1].value="用户名或密码错误,请重新输入";
				input[1].style.color="red";
			}else{//否则
				button.setAttribute("disabled","");//禁用按钮
                button.style.background="gray";//禁用按钮样式设置
                get('http://study.163.com/webDev/login.htm',data,callback);//Ajax提交表单
                function callback(backdata){
                	if(backdata==1){//若登录成功
                	  //console.log('登录成功');
                	  var name="loginSuc",
					  	  value=1,
					      expires=new Date(2020,11);//失效时间
					  setCookie(name,value,expires);//设置登录成功cookie
                	  loginNode.reset();//将表单重置
                	  loginPopup.addevent().end();//关闭弹窗
                	  get('http://study.163.com/webDev/attention.htm',"",function(data){//关注请求
                	  	if(data==1){//若关注成功
                	  		//console.log('关注成功');
                	  		var name="followSuc",
							  	value=1,
							    expires=new Date(2020,11);//失效时间
							setCookie(name,value,expires);//设置关注成功cookie
							care();//禁用关注按钮
                	  	}
                	  });
                	}
                }
			}	
		}
	}
}
//表单关闭图标事件函数
function getLoginNode(event){
	Event(event);
	if(Target(event)==navButton){//若目标节点为navButton
		var closeIcon=document.querySelector(".close");
		addEvent(closeIcon,"click",loginPopup.addevent().end);
	}
}
//禁用关注按钮函数
function care(){
	navButton.setAttribute("disabled","");//禁用关注按钮
	//取消事件注册
	removeEvent(navButton,"click",login);
	removeEvent(nav,"click",getLoginNode);
	//关注成功样式
	navButton.className="jsclick nav button";
	a[0].className="jsclick nav a open";
}
//若关注成功
if(cookie.followSuc==1){
	care();//调用禁用关注按钮函数
}



//机构视频逻辑

//获取节点
var right=document.querySelector(".right");
var agency=getElementsByClassName(right,"agency")[0];
var agencyImg=agency.getElementsByTagName("img")[0];
//初始化一个弹窗
var videoPopup=new Popup(video.html,video.css,video.coverCssText,video.locationCssText);
//打开弹窗
addEvent(agencyImg,"click",videoPopup.addevent().start);
addEvent(agency,"click",getVideoNode);
function getVideoNode(event){
	Event(event);
	if(Target(event)==agencyImg){
		var video=document.querySelector(".video");
		var closeIcon=video.getElementsByTagName("i")[0];
		addEvent(closeIcon,"click",videoPopup.addevent().end);//关闭弹窗
	}	
}


//获取课程列表

//获取相关节点
var tab=left.querySelector(".tab");
var tabButton=tab.getElementsByTagName("button");
var Left=getElementsByClassName(document,"left")[0];
var pageno=getElementsByClassName(Left,"pageno")[0];
var pagenoi=pageno.getElementsByTagName("i");
var backward=getElementsByClassName(Left,"backward")[0];
var forward=getElementsByClassName(Left,"forward")[0];
//页面加载时导入默认课程数据
window.onload=function(){
	requestCoures(1,20,10);//发起默认请求
	backward.style.cursor="default";
}

//tab点击切换
addEvent(tab,"click",switchTab);//样式切换
addEvent(tab,"click",function(event){
	Event(event);
	var target=Target(event);
	if(target==tabButton[1]){
		requestCoures(1,20,20);//切换后默认显示第一页
	}else if(target==tabButton[0]){
		requestCoures(1,20,10);////切换后默认显示第一页
	}
});

//类型判断

var couresType={};//创建一个全局对象,用于类型判断

addEvent(tab,"click",function(event){
	Event(event);
	var target=Target(event);
	if(target==tabButton[0]){
		var type=10;
	}else if(target==tabButton[1]){
		var type=20;
	}
	couresType.type=type;
});


//点击翻页器
addEvent(pageno,"click",function(event){
	Event(event);
	var target=Target(event);
	if(target!=pageno){
		var type=couresType.type?couresType.type:10;//判断类型
		requestCoures(readText(target),20,type);//发起点击请求
		if((target!=pagenoi[0])&&(target!=pagenoi[pagenoi.length-1])){
			backward.style.cursor="pointer";
			forward.style.cursor="pointer";
		}else if(target==pagenoi[0]){
			backward.style.cursor="default";
			forward.style.cursor="pointer";
		}else if(target==pagenoi[pagenoi.length-1]){
			forward.style.cursor="default";
			backward.style.cursor="pointer";
		}
	}
});
//后退
addEvent(backward,"click",function(event){
	for(var j=0;j<pagenoi.length;j++){//循环遍历
		if((pagenoi[j].style.color=="white")&&(j!=0)){//判断当前状态
			var type=couresType.type?couresType.type:10;//判断类型
			requestCoures(j,20,type);//发起后退请求
			if(j==1){
				backward.style.cursor="default";
			}else{
				backward.style.cursor="pointer";
				forward.style.cursor="pointer";
			}
		}
	}
});
//前进
addEvent(forward,"click",function(event){
	for(var j=0;j<pagenoi.length;j++){//循环遍历
		if((pagenoi[j].style.color=="white")&&(j!=pagenoi.length-1)){//判断当前状态
			var type=couresType.type?couresType.type:10;//判断类型
			requestCoures(j+2,20,type);//发起前进请求
			if(j==pagenoi.length-2){
				forward.style.cursor="default";
			}else{
				forward.style.cursor="pointer";
				backward.style.cursor="pointer";
			}
		}
	}	
});

//最热排行
//页面加载时发起请求
addEvent(window,"load",function(){
	var rankCouresPara="";//查询参数
	var rankApi='http://study.163.com/webDev/hotcouresByCategory.htm';//请求地址
	var rankCouresList=new GetList(rankApi,rankCouresPara);//初始化一个课程列表
	rankCouresList.get();//获取课程数据
});
