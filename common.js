var homeurl = "http://www.valubio.com/";
var htmlurl="http://www.valubio.com/";
var imgurl='http://www.valubio.com/';
var company_name='sw';
//var homeurl="http://wl.tstmobile.com/ShoppingMall/";
var hxAppKey="362594500#igg";


/**
 * 监听键盘事件
 */
document.onkeydown=function(event){ 
	var e = event || window.event || arguments.callee.caller.arguments[0]; 
	if(e && e.keyCode==27){ // 按 Esc
	
	} 
	if(e && e.keyCode==113){ // 按 F2
	
	} 
	if(e && e.keyCode==13){// enter 	
		enterClick();
	} 
}; 
	
	
/**
 * 选择器的自定义属性操作
 */
function setSelectTag(name,tag,value) {
	$("#"+name+" option["+tag+"="+value+"]").attr("selected", true);
}
function getSelectTag(name,tag) {
	return $("#"+name).find("option:selected").attr(tag);
}

/**
 * 打印对象
 */
function printObject(obj){
	var description = ""; 
	 for(var i in obj){ 
	  var property=obj[i]; 
	  description+=i+" = "+property+"\n"; 
	 } 
	 return description;
}

/**
 * 获得file的路径
 */
var getObjectURL = function getObjectURL(file) {
	var url = null;
	if (window.createObjectURL != undefined) { // basic
		url = window.createObjectURL(file);
	} else if (window.URL != undefined) { // mozilla(firefox)
		url = window.URL.createObjectURL(file);
	} else if (window.webkitURL != undefined) { // webkit or chrome
		url = window.webkitURL.createObjectURL(file);
	}
	return url;
};

/**
 * 复选框
 */

// 全选 或者全不选
 
function checkClick(name) {
	var a = document.getElementsByName(name);    
    var n = a.length;   
    if(a[0].checked){
    	for (var i=0; i<n; i++){
        	a[i].checked =true;
        }	
    }else{
    	for (var i=0; i<n; i++){
        	a[i].checked =false;
        }
    }
}

// 单选

function checkClickOne(name) {
	var a = document.getElementsByName(name);    
    var n = a.length;
    var isAll=true;
    for (var i=1; i<n; i++){
    	if(!a[i].checked){// 有一个未选择 则不是全选
    		isAll=false;
    	}
    }
    
    a[0].checked =isAll;
}

// 获得选中的
function getAllCheck(name){
	var arr=[];
	var a = document.getElementsByName(name);    
    var n = a.length;
    for (var i=1; i<n; i++){// 从1开始
    	if(a[i].checked){
    		arr.push(i);
    	}
    }
    return arr;
}

// 获得未选中的
function getAllNoCheck(name){
	var arr=[];
	var a = document.getElementsByName(name);    
    var n = a.length;
    for (var i=1; i<n; i++){// 从1开始
    	if(!a[i].checked){
    		arr.push(i);
    	}
    }
    return arr;
}
/**
 * 导航栏
 */

var  isLoad=false;
window.onbeforeunload=function checkLeave(e){  
    var event = e ? e : (window.event ? window.event : null);  // 此方法为了在firefox中的兼容

    /*
	 * console.log(document.body.clientWidth);
	 * if(event.clientX>document.body.clientWidth && event.clientY < 0 ||
	 * event.altKey){ console.log("123"); window.parent.backNacigationBar(2);
	 * }else{ console.log("789"); alert("你正在刷新页面"); }
	 */
	/*
	 * console.log("==========="+isLoad); if(!isLoad){ isLoad=true; }else{
	 * window.parent.backNacigationBar(1); };
	 */
};

var barArr = [];

function addNacigationBar(title) {
	barArr.push(title);
	refreshNacigationBar(barArr);
}

function refreshNacigationBar(barArr) {
	$("#navigationBar").hide();
	$("#navigationBar").empty();
	for ( var i = 0; i < barArr.length; i++) {
		var url = "<a onclick='barClick("+i+")' style='text-decoration:none;margin-left:10px;width: auto;height:45px;padding-left:5px;padding-right:5px;display: table-cell;text-align:center;vertical-align: middle;color: #a8c4f2;'>"+barArr[i]+"</a>";	
		$("#navigationBar").append(url);
	};
}

function barClick(i) {
	if(i<barArr.length-1){// 当点击最后一个不后退
		var backIndex=i+1-barArr.length;
		backNacigationBar(barArr.length-i);
		window.history.go(backIndex);
	}
}

function backNacigationBar(j){
	for(i=0;i<j;i++){
		barArr.pop();
	}
	refreshNacigationBar(barArr);
}
function clearNacigationBar(){
	barArr.length=0;
	$("#navigationBar").empty();
	$("#navigationBar").hide();
}



/**
 * 访问接口
 */
var request_index;

function getDataByPost(index,url,params){
	getDataByPost(index,url,params,'0');
}

function getDataByPost(index,url,params,dataOnly){	
	/* 统一验证token */
	if(params==null){
		params={};
	}
	params["merchants_id1"]=GetCookie("merchants_id");
	params["merchants_token"]=GetCookie("merchants_token");
	$.post(url,params, function(data) {
				if(dataOnly=='1'){
					doSuccess(index,data);
				}else{
					var result = eval("(" + data + ")");
					if (result.status == "ok") {
						if(dataOnly=='2'){// 需要分页的接口
							request_index=index;
							doSuccess(index,result.data);
							total = result.data.length == 0 ? 1 : Math.ceil(result.total
									/ limit);
							document.getElementById('pageIframe').contentWindow.document
									.getElementById('totalPage').innerText = total;
							document.getElementById('pageIframe').contentWindow.document
							.getElementById("currentPage").innerText = page;
						}else{
							doSuccess(index,result.data);	
						}
					} else if (result.status == "error"){
						showTip(-1, result.error);
					}else{
						if(result.error=="token failed"){
							parent.location.href=homeurl+'/login.html';// token过期
																		// 重新登录
						}
					}
				}
	});
}
function uploadFile(index,url,fileId) {
	var params={};
	params["merchants_id1"]=GetCookie("merchants_id");
	params["merchants_token"]=GetCookie("merchants_token");
	 $.ajaxFileUpload({  
	        url:url,  
	        secureuri:false,  
	        fileElementId:[fileId],// file标签的id
	        dataType: 'content',// 返回数据的类型
	        data:params,// 一同上传的数据
				success: function (data, status) {  
	        	var result = eval("(" + data + ")");
				if (result.status == "ok") {
					doSuccess(index,result.data);
				} else if (result.status == "error"){
					showTip(-1, result.error);
				}else{
					if(result.error=="token failed"){
						parent.location.href=homeurl+'/login.html';// token过期
																	// 重新登录
					}
				}
	        },  
	        error: function (data, status, e) {  
	        	showTip(-1,e);
	        }  
	    });  
}

/**
 * Cookie增删改查
 */
function SetCookie (name, value) 
{   
    var exp = new Date();   
    exp.setTime(exp.getTime() + (30*24*60*60*1000));  
    window.document.cookie = name + "=" + escape (value) + "; expires=" + exp.toGMTString()+";path=/";  
} 

function GetCookie (name)   
{   
    var arg = name + "=";   
    var alen = arg.length;   
    var clen = window.document.cookie.length;   
    var i = 0;   
    while (i < clen)   
    {   
        var j = i + alen;   
        if (window.document.cookie.substring(i, j) == arg) return getCookieVal (j);   
        i = window.document.cookie.indexOf(" ", i) + 1;   
        if (i == 0)  
            break;   
    }   
    return null;  
}  
function getCookieVal (offset)  
{   
    var endstr = window.document.cookie.indexOf (";", offset);   
    if (endstr == -1)  
        endstr = window.document.cookie.length;   
    return unescape(window.document.cookie.substring(offset, endstr));  
} 


function DeleteCookie (name)  
{   
    var exp = new Date();   
    exp.setTime (exp.getTime() - 100);   
    var cval = GetCookie (name);   
    window.document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString()+";path=/";  
}  
/**
 * 处理ie不支持placeholder
 */
function funPlaceholder(id){
	funPlaceholder(id,null);
};
function funPlaceholder(id,showId) { 
	var element=document.getElementById(id);
	var placeholder = '';
    if (element && !("placeholder" in document.createElement("input")) && (placeholder = element.getAttribute("placeholder"))) {
        element.onfocus = function() {
            if (this.value === placeholder) {
                this.value = "";
                if(showId!=null){
                	this.value = "ceshi";
                	$("#"+id).hide();
                	$("#"+showId).show();
                	document.getElementById(showId).focus();// 获得焦点
                }
            }
            this.style.color = '';
        };
        if(showId==null){
	        element.onblur = function() {
	            if (this.value === "") {
	                this.value = placeholder;
	                this.style.color = 'graytext'; 
	            }
	        };
        }else{
        	document.getElementById(showId).onblur = function() {
 	            if (this.value === "") {
 	            	element.value = placeholder;
 	            	element.style.color = 'graytext';
 	                $("#"+id).show();
 	                $("#"+showId).hide(); 	                
 	            }
 	        };
        }
        
        // 样式初始化
        if (element.value === "") {
            element.value = placeholder;
            element.style.color = 'graytext'; 
        	if(showId!=null){
        		$("#"+id).show();
        		$("#"+showId).hide();	
        	}
        }
    }
};
/**
 * 链接参数
 */

function getParameter(index,name){
	var str = window.location.search; // location.search是从当前URL的?号开始的字符串
										// 例如：http://www.51job.com/viewthread.jsp?tid=22720
										// 它的search就是?tid=22720
	str = str.substring(1, str.length);
	var arr = str.split('&');
	
	if (arr[index].indexOf(name) != -1) {
		var pos_start = arr[index].indexOf(name) + name.length + 1;
		var pos_end = arr[index].indexOf("&", pos_start);
		if (pos_end == -1) {
			return arr[index].substring(pos_start);
		} else {
			showTip(-1,"对不起这个" + name + "值不存在！");
		}
	}	
}




/**
 * iframe自适应高度
 */
var browserVersion = window.navigator.userAgent.toUpperCase();
var isOpera = false, isFireFox = false, isChrome = false, isSafari = false, isIE = false;
function reinitIframe(iframeId, minHeight) {
    try {
        var iframe = document.getElementById(iframeId);
        var bHeight = 0;
        if (isChrome == false && isSafari == false)
            bHeight = iframe.contentWindow.document.body.scrollHeight;

        var dHeight = 0;
        if (isFireFox == true)
            dHeight = iframe.contentWindow.document.documentElement.offsetHeight + 2;
        else if (isIE == false && isOpera == false)
            dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
        else if (isIE == true && ! -[1, ] == false) { } // ie9+
        else
            bHeight += 3;

        var height = Math.max(bHeight, dHeight);
        if (height < minHeight) height = minHeight;
        iframe.style.height = height + "px";
        $("#menuList").css("height",height+"px");
        $("#opacityDiv").css("height",height+50+"px");
    } catch (ex) { }
}
function startInit(iframeId, minHeight) {
    isOpera = browserVersion.indexOf("OPERA") > -1 ? true : false;
    isFireFox = browserVersion.indexOf("FIREFOX") > -1 ? true : false;
    isChrome = browserVersion.indexOf("CHROME") > -1 ? true : false;
    isSafari = browserVersion.indexOf("SAFARI") > -1 ? true : false;
    if (!!window.ActiveXObject || "ActiveXObject" in window)
        isIE = true;
    window.setInterval("reinitIframe('" + iframeId + "'," + minHeight + ")", 100);
} 

/**
 * 提示框
 * 
 * @param i
 * @param msg
 */
function showTip(i,msg) {
	$("#tipLabel",parent.document).text(msg);
	$("#opacityDiv",parent.document).show();
	$("#tipDiv",parent.document).show();
	$("#buttonDiv",parent.document).show();
	$("#tipTag",parent.document).text(i);
}

function closeTipDivClick() {
	$("#opacityDiv",parent.document).hide();
	$("#tipDiv",parent.document).hide();
	$("#buttonDiv",parent.document).hide();
}

$("#okButton",parent.document).click(function okTipClick() {
	var index=$("#tipTag",parent.document).text();
	switch (index) {
	case "-1":
		closeTipDivClick();	
		break;
	default:
		okTip(index);
		break;
	}
});

/**
 * 分页点击事件
 */
var page=1;
var total=1;
var limit=10;
window.onload=function load() {
	if(document.getElementById('pageIframe')!=null){
		document.getElementById('pageIframe').contentWindow.document
		.getElementById("previousPage").onclick = function previousClick() {
		if (page == 1) {
			showTip(-1,"已是首页");
		} else {
			page = page - 1;
			updatePageData();
		}
		};

		document.getElementById('pageIframe').contentWindow.document
				.getElementById("nextPage").onclick = function nextClick() {
			if (page == total) {
				showTip(-1,"已是尾页");
			} else {
				page = page + 1;
				updatePageData();
			}
		};
		
		document.getElementById('pageIframe').contentWindow.document
				.getElementById("surePage").onclick = function sureClick() {
			if (document.getElementById('pageIframe').contentWindow.document
					.getElementById("pageEdit").value <= 0) {
				showTip(-1,"超过最低页数了");
			} else if (document.getElementById('pageIframe').contentWindow.document
					.getElementById("pageEdit").value > total) {
				showTip(-1,"超过最大页数了");
			} else {
				page = document.getElementById('pageIframe').contentWindow.document
						.getElementById("pageEdit").value;
				updatePageData();
			}
		};	
	}
};

function updatePageData() {
	startRequest(request_index);
}
