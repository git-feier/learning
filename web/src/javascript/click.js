
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

//构造获取课程列表数据对象
function GetList(api,queryPara){
	//api为请求地址
	//queryPara为查询参数(类型为object)
	this.api=api;
	this.queryPara=queryPara;
}
GetList.prototype={
	get:function(){
			var obj=this;
			get(this.api,this.queryPara,callback);//发起请求
			function callback(data){
				if(obj.queryPara){
					return obj._getCouresData(data);
				}else{
					return obj._getRankData(data);
				}
			}
		},
	_getCouresData:function(data){
			var couresData=JSON.parse(data);//JSON转js对象
			// console.log(couresData);
			var n=this.queryPara.psize;//每页显示的课程数
			//获取通用节点
			var left=document.querySelector(".left");
			var ul=left.getElementsByTagName("ul")[0];
			var li=ul.getElementsByTagName("li");
			//翻页器
			var pageNo=couresData.totalPage;//获取总页数
			var turnPage=left.querySelector(".turn-page");
			var pageno=turnPage.querySelector(".pageno");
			var newI=[];//保存页码
			pageno.innerHTML="";//初始化页码
			for(var j=0;j<pageNo;j++){//加载页码
				var pagenoI=document.createElement("i");
				newI[j]=pageno.appendChild(pagenoI);
				newI[j].innerHTML=j+1;
				if(couresData.pagination.pageIndex==j+1){
					//设置页码样式
					newI[j].style.background="#9dd8b1";
					newI[j].style.color="white";
					newI[j].style.cursor="default";
				}
			}
			//最后一页
			var totalCount=couresData.totalCount;//返回数据总数
			var pageSize=couresData.pagination.pageSize;//每页数据个数
			if(pageSize>couresData.list.length){//若请求的数据个数大于返回的本页数据个数
				n=totalCount%pageSize;
				var remain=pageSize-n;
				for(var k=remain-1;k>=0;k--){
					li[n+k].style.visibility="hidden";//隐藏多余的项
				}
			}else{//否则
				for(var k=0;k<n;k++){
					li[k].style.visibility="visible";//全部显示
				}
			}
			//填充课程列表
			for(var i=0;i<n;i++){//循环填充
				var middlePhotoUrl=couresData.list[i].middlePhotoUrl;//提取图片地址
				var name=couresData.list[i].name;//提取课程名称
				var provider=couresData.list[i].provider;//提取发布机构
				var learnerCount=couresData.list[i].learnerCount;//提取在线人数
				var price=couresData.list[i].price;//提取价格
				var categoryName=couresData.list[i].categoryName;//提取分类
				var description=couresData.list[i].description;//提取描述
				//多行文字字符处理
				description=description.length>64?description.slice(0,60)+"...":description;
				//获取相关节点
				var img=li[i].getElementsByTagName("img")[0];
				var h5=li[i].getElementsByTagName("h5")[0];
				var normal=getElementsByClassName(li[i],"normal")[0];
				var nspan=normal.getElementsByTagName("span");
				var hover=getElementsByClassName(li[i],"hover")[0];
				var hspan=hover.getElementsByTagName("span");
				var p=getElementsByClassName(li[i],"hover")[1];
				//将数据呈现至页面
				img.setAttribute("src",middlePhotoUrl);
				writeText(h5,name);
				//默认状态
				writeText(nspan[0],provider);
				writeText(nspan[1],learnerCount);
				writeText(nspan[2],price==0?"免费":"¥ "+price+".00");
				//hover状态
				writeText(hspan[0],learnerCount+"人在学");
				writeText(hspan[1],"发布者: "+provider);
				writeText(hspan[2],"分类: "+categoryName);
				writeText(p,description);
			}
		},
	_getRankData:function(data){
			var hotCouresData=JSON.parse(data);//JSON转js对象
			//console.log(hotCouresData);
			//获取相关节点
			var rank=getElementsByClassName(document,"hot-rank")[0];
			var ul=rank.getElementsByTagName("ul")[0];
			var li=ul.getElementsByTagName("li");
			var times=0;//记录调用次数
			fillRankData(0);//填充默认数据
			var intervalID=setInterval(update,5000);//每5秒更新一门课
			//更新课程函数
			function update(){
				if(times<10){
					times++;
				}else{
					times=0;
				}
				fillRankData(times);
			}
			//填充课程数据函数
			function fillRankData(times){
				for(var i=0;i<10;i++){
					//获取相关节点
					var img=li[i].getElementsByTagName("img")[0];
					var h5=li[i].getElementsByTagName("h5")[0];
					var span=li[i].getElementsByTagName("span")[0];
					//提取数据
					var name=hotCouresData[i+times].name;
					var smallPhotoUrl=hotCouresData[i+times].smallPhotoUrl;
					var learnerCount=hotCouresData[i+times].learnerCount;
					//填充数据
					img.setAttribute("src",smallPhotoUrl);
					writeText(h5,name);
					writeText(span,learnerCount);
				}
			}
	}
};

//tab点击样式
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
//数据请求
function requestCoures(pageNO,psize,type){
	var couresPara={pageNo:pageNO,psize:psize,type:type};//查询参数
	var api='http://study.163.com/webDev/couresByCategory.htm';//请求地址
	var couresList=new GetList(api,couresPara);//初始化一个课程列表
	couresList.get();//获取课程数据
}