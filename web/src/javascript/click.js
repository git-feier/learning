//tab点击切换
var tab=left.querySelector(".tab");
addEvent(tab,"click",switchTab);
function switchTab(event){
	Event(event);
	var target=Target(event);
	var tab=target.parentNode;
	var button=tab.getElementsByTagName("button");
	if(target==button[0]){
		button[0].className="jsclick tab button checked";
		button[1].className="jsclick tab button nochecked";
	}else if(target==button[1]){
		button[1].className="jsclick tab button checked";
		button[0].className="jsclick tab button nochecked";
	}
}
//cookie设置函数
function setCookie(name,value,expires,path,domain,secure){
	var cookie=encodeURIComponent(name)+"="+encodeURIComponent(value);
	if(expires)
		cookie+="; expires="+expires.toGMTString();
	if(path)
		cookie+="; path="+path;
	if(domain)
		cookie+="; domain="+domain;
	if(secure)
		cookie+="; secure="+secure;
	document.cookie=cookie;
}
//读取cookie(cookie转js对象)
function getCookies(){
    var cookie = {};//创建一个空对象
    var all = document.cookie;//得到cookie字符串
    if (all === ''){//如果all为空字符串
        return cookie;//直接返回空对象
    }else{//否则
        var list = all.split('; ');//将字符串转换成数组
        for (var i = 0; i < list.length; i++) {//遍历数组
            var item = list[i];
            var p = item.indexOf('=');//得到"="的索引值
            var name = item.substring(0, p);//提取name属性名
            name = decodeURIComponent(name);//解码name属性名
            var value = item.substring(p + 1);//提取value值
            value = decodeURIComponent(value);//解码value值
            cookie[name] = value;//组合成对象
        }
        return cookie;//返回对象
    }
}

// 方法
// get(url, options, callback)    get是Ajax请求GET方法的封装
// 参数
// url    {String}    请求资源的url
// options    {Object}    请求的查询参数
// callback    {Function}    请求的回调函数，接收XMLHttpRequest对象的responseText属性作为参数
// 返回
// void
function get(url,options,callback){//定义get函数
	//查询参数序列化
	function serialize(options){
		if(!options){//如果没有查询参数
			return "";//返回空字符
		}else{//否则
			var pairs=[];//定义一个数组
			for(var name in options){//遍历对象属性
				if(!options.hasOwnProperty(name)) continue;//过滤掉继承的属性和方法
				if(typeof options[name]==="function") continue;//过滤掉方法
				var value=options[name].toString();//属性值转字符串
				name=encodeURIComponent(name);//URI编码
				value=encodeURIComponent(value);//URI编码
				pairs.push(name+"="+value);//属性名和属性值放入数组
			}
			return pairs.join("&");//返回字符串
		}
	}
	var xhr=new XMLHttpRequest();//创建Ajax对象
	xhr.open("get",url+'?'+serialize(options));//开启一个异步请求
	xhr.send(null);//发送请求
	xhr.onreadystatechange=function(){//注册事件 处理返回数据
		if(xhr.readyState==4){//若请求完毕
			if(xhr.status>=200&&xhr.status<300||xhr.status==304){//若请求成功
				callback(xhr.responseText);//调用回调函数处理响应结果
			}else{//若请求失败
				alert('Requst was unsuccessful:'+xhr.status);//返回请求失败原因
			}
	    }
	}	
}