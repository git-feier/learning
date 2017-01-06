//定义登录窗口
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
//定义视频
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