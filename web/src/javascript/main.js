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

//定义数据
var loginWindow={
	html:"<form class='login'>\
			<div class='ref'>\
				<p>登录网易云课堂</p>\
				<div>\
					<input type='text' name='userName'>\
				</div>\
				<div>\
					<input type='password' name='password'>\
				</div>\
				<div>\
					<button type='submit'>登录</button>\
				</div>\
				<i class='login close'></i>\
			</div>\
		</form>",
	css:"<style>\
		.login,.login p,.login input,.login button{margin: 0;padding: 0;outline: 0;}\
		.login{width: 387px;height: 288px;position: absolute;left: 50%;top: 50%;margin-top: -144px;margin-left: -193.5px;background: white;}\
		.login .ref{position: relative;padding-top: 24px;padding-left: 40px;}\
		.login p{margin-bottom: 16px;font: 18px/28px '微软雅黑';color: #444;cursor: default;}\
		.login input{width: 282px;height: 43px;margin-bottom: 15px;border: 1px solid #dfdfdf;padding-left: 11px;box-shadow: inset 2px 2px #f1f1f1;font: 16px/43px '微软雅黑';color: #ccc;}\
		.login button{width: 293px;height: 46px;margin-top: 14px;border: 0;box-shadow: 2px 2px #d5e3da;font: 16px '微软雅黑';color: white;cursor: pointer;background: #20a942;}\
		.login.close{display:block;width: 11px;height: 10px;position: absolute;top: 10px;right: 8px;margin: 0 0 0 174.5px;background: url(res/images/sprite.png) no-repeat -243px 0;cursor: pointer;}\
	    </style>",
	coverCssText:"width: auto;height: auto;position: fixed;left: 0;right: 0;top: 0;bottom: 0;background: #333;opacity: 0.5;-ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(opacity=50)'",
	locationCssText:"position: fixed;left: 0;right: 0;top: 0;bottom: 0;"
};
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
                	  console.log('登录成功');
                	  var name="loginSuc",
					  	  value=1,
					      expires=new Date(2020,11);//失效时间
					  setCookie(name,value,expires);//设置登录成功cookie
                	  loginNode.reset();//将表单重置
                	  loginPopup.addevent().end();//关闭弹窗
                	  get('http://study.163.com/webDev/attention.htm',"",function(data){//关注请求
                	  	if(data==1){//若关注成功
                	  		console.log('关注成功');
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
var rank=getElementsByClassName(right,"hot-rank")[0];
var agencyImg=agency.getElementsByTagName("img")[0];
//定义数据
var video={
 	html:"<div class='video'>\
			<div class='ref'>\
				<h5>请观看下面的视频</h5>\
				<div>\
					<video autoplay controls>\
						<source src='http://mov.bn.netease.com/open-movie/nos/mp4/2014/12/30/SADQ86F5S_shd.mp4' type='video/mp4'>\
						你的浏览器不支持video标签\
					</video>\
				</div>\
				<i></i>\
			</div>\
		</div>",
	css:"<style>.video div,.video h5{margin: 0;padding: 0;border: 0;font: 18px/28px '微软雅黑';color: #444;text-align: left;}\
		.video{position: absolute;left: 50%;top: 50%;margin-top: -338px;margin-left: -475px;}\
		.video .ref{position: relative;width: 950px;height: 676px;padding:24px 30px 40px 31px;background: white;}\
		.video h5{margin-bottom: 22px;}\
		.video video{width: 940px;}\
		.video i{position: absolute;top: 13px;right: 12px;width: 11px;height: 10px;cursor: pointer;background: url(res/images/sprite.png) no-repeat -243px 0;}</style>",
	coverCssText:"width: auto;height: auto;position: fixed;left: 0;right: 0;top: 0;bottom: 0;background: #333;opacity: 0.5;-ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(opacity=50)'",
	locationCssText:"position: fixed;left: 0;right: 0;top: 0;bottom: 0;text-align: center"
};
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


