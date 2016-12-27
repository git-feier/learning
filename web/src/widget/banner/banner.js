// 节点获取和数据定义
var pointer=document.querySelector(".pointer");
var a=document.getElementsByTagName("a")[0];
var img=document.getElementsByTagName("img")[0];
var i=document.getElementsByTagName("i");
var link=["http://open.163.com/","http://study.163.com/","http://www.icourse163.org/"];
var path=["../../../res/images/banner1.jpg","../../../res/images/banner2.jpg","../../../res/images/banner3.jpg"];

//Banner构造函数(ie8+)
function Banner(node1,node2,node3,path1,path2,n,time,nodes){
//node1和node2为子节点,node3为父节点,path1与path2分别为node1与node2对应路径,n为图片张数,time为轮播时间间隔,nodes为子节点集合.
	this.intervalID=0;//定时器初始化
	this.times=0;//当前索引值
	this.index=1;//索引值
	this.node1=node1;
	this.node2=node2;
	this.node3=node3;
	this.path1=path1;
	this.path2=path2;
	this.n=n;
	this.time=time;
	this.nodes=nodes;
}
Banner.prototype={
	start:function(){//启动函数
			this._start();
		},
	_start:function(){//实际的启动函数
			var obj=this;
			this.intervalID=setInterval(circle,this.time);//轮播定时器
			function circle(){
				obj._loop();//调用轮播函数
			}
		},
	_loop:function(){//轮播函数
			if(this.times<this.n-1){
				this.index=++this.times;
			}else{
				this.times=0;
				this.index=this.n;
			}
			this._node();//调用节点函数
		},
	_node:function(){//节点函数(改变节点信息)
			this.node1.setAttribute("href",this.path1[this.times]);
			this.node2.setAttribute("src",this.path2[this.times]);	
			this.nodes[this.index-1].className="other dot tab white";
			this.nodes[this.times].className="current dot tab black";
		},
	fadein:function(element){//淡入函数
			var style=element.style;//获取样式
			style.opacity="0";//初始化透明度
			//定时器回调函数
			function func(){
				var delta=0.01;//透明度改变量
				var opacity=style.opacity-0;
			    opacity+=delta;//保存每次改变之后的值
			    style.opacity=opacity+"";
			    //清除定时器
			    if(style.opacity=="1"){
			      clearInterval(id);
			    }
			}
			//设置定时器
			var id=setInterval(func,5);
		},
	fadeinIE:function(element){//淡入函数(兼容ie8)
	   		element.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity=0)";
	   		var times=0;
	   		var intervalID=setInterval(fade,5);
	   		function fade(){
	   			times++;
	   			var delta=1;
	   			var str1=element.style.filter;
	   			var str2=str1.replace(/[0-9]{1,3}/g,func);
	   			element.style.filter=str2;
	   			if(times==100){
	   				clearInterval(intervalID);
	   			}
	   			function func($1){
	   				return $1-0+delta+"";
	   			}
	   		}
	   	},
	change:function(){//事件函数
			var obj=this;
			var EVENT={
				pause:function(event){//暂停事件函数
					clearInterval(obj.intervalID);
				},
				continuation:function(event){//继续事件函数
					obj.start();
				},
				tab:function(event){//切换事件函数
					event=event||window.event;//兼容设置
					event.target=event.target||event.srcElement;//兼容设置
					for(var i=0;i<obj.n;i++){
						if(event.target!=obj.node3){
							obj.nodes[i].className="other dot tab white";
						}
					}
					for(var j=0;j<obj.n;j++){
						if(event.target==obj.nodes[j]){
							obj.times=j;
							obj._node();
						}
					}
					if(event.target!=obj.node3){
						obj.fadein(obj.node2);
						obj.fadeinIE(obj.node2);	
					}
				}
			};
			return EVENT;
		}
};



//初始化一个banner对象
var banner=new Banner(a,img,pointer,link,path,3,5000,i);
//启动一个轮播图
banner.start();


// 注册事件函数(兼容型)
var addEvent=document.addEventListener?function(elem,type,listener,useCapture){
    elem.addEventListener(type,listener,useCapture);
}:function(elem,type,listener,useCapture){
    elem.attachEvent("on"+type,listener);
};
//监听节点
addEvent(banner.node2,"mouseover",banner.change().pause);
addEvent(banner.node2,"mouseout",banner.change().continuation);
addEvent(banner.node3,"click",banner.change().tab);