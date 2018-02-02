var chatBeans;
var merchants_id;
var hx_account;
var hx_pass;
var conn = null;

var member_hx_account;
var head_path;
var nick_name;
$(document).ready(function() {
	member_hx_account=getParameter(0,"member_hx_account");
	head_path=getParameter(1,"head_path");
	nick_name=decodeURI(getParameter(2,"nick_name"));
	$("#head_path").attr("src",homeurl+head_path);
	$("#nick_name").text(nick_name);
	
	conn = new Easemob.im.Connection();
	conn.init({
		// 预留空现实
		onOpened : function() {//登录成功
			conn.setPresence();
		},
		onTextMessage : function(message){//接受消息处理方式
			var myDate = new Date();
			var url = "<div'>" +
			"<label>"+message.to+"	"+myDate.getHours()+":"+myDate.getMinutes()+":"+myDate.getSeconds()+"</label><div style='min-heigh: 30px;'><label>"+message.data+"</label></div></div>";
			$("#chatList").append(url);
		},
		onReceivedMessage:function(message){//发送成功回调
			
		} ,
		onClosed : function() {//关闭连接
			conn.clear();
			conn.onClosed();
		}, onError : function(e) {//异常
	        //异常处理
			showTip(-1,e.msg);
	    }
	});
	merchants_id=GetCookie("merchants_id");
	hx_account=GetCookie("hx_account");
	hx_pass=GetCookie("hx_pass");
	conn.open({
		user : hx_account,
		pwd : hx_pass,
		appKey : hxAppKey
	});
});

function enterClick() {
	sendTxtMsg();
}

var txt_msg='';
function sendTxtMsg() {
	if(member_hx_account==null||member_hx_account==''){
		showTip(-1,"未选择发送对象");
		return;	
	}
	txt_msg=$("#txtMsg").val();
	if(txt_msg==''){
		showTip(-1,"不可发送空消息");
		return;
	}
	
	var options = {
		to :member_hx_account,
		msg : txt_msg,
		type : "chat"
	};
	
	//发送文本消息接口
	conn.sendTextMessage(options);
	var myDate = new Date();
	var url = "<div style='text-align: right;margin-right:10px;'>" +
	"<label>"+hx_account+"	"+myDate.getHours()+":"+myDate.getMinutes()+":"+myDate.getSeconds()+"</label><div style='min-heigh: 30px;'><label>"+txt_msg+"</label>" +
	"</div></div>";
	$("#chatList").append(url);
	$("#txtMsg").val("");
}