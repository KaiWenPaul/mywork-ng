var chatBeans = [];
var merchants_id;
var hx_account;
var hx_pass;
var merchants_name;
var merchants_img;
var chat_index = -1;
var conn = null;

var picshim;

var member_hx_account;
var head_path;
var nick_name;
$(document).ready(function() {
	member_hx_account=getParameter(0,"member_hx_account");
	head_path=getParameter(1,"head_path");
	nick_name=decodeURI(getParameter(2,"nick_name"));
	
	conn = new Easemob.im.Connection({
		multiResources : Easemob.im.config.multiResources,
		https : Easemob.im.config.https,
		url : Easemob.im.config.xmppURL
	});
	conn.listen({
		// 预留空现实
		onOpened : function() {// 登录成功
			if ( !Easemob.im.Helper.isCanUploadFileAsync && typeof uploadShim === 'function' ) {
				picshim = uploadShim('sendPicInput', 'pic');
			}
			if(member_hx_account!=null&&member_hx_account!=''){
				var chatBean = {};
				chatBean["to"] = member_hx_account;
				var messageBeans = [];
				chatBean["messageBeans"] = messageBeans;
				chatBean["no_reading_count"] = 0;//
				chatBean["nick_name"]=nick_name;
				chatBean["head_path"]=head_path;
				chatBeans.splice(0, 0, chatBean);
				addChatList();// 有新的会话对象
			}
			conn.setPresence();
		},
		onTextMessage : function(message) {// 接受消息处理方式
			handleText(message);
		},
		// 收到表情消息时的回调方法
		onEmotionMessage : function(message) {
			handleEmotion(message);
		},
		//收到图片消息时的回调方法
		onPictureMessage : function(message) {
			handlePicture(message);
		},
		onReceivedMessage : function(message) {// 发送成功回调

		},
		onClosed : function() {// 关闭连接
			conn.clear();
			conn.onClosed();
		},
		onError : function(e) {// 异常
			// 异常处理
			showTip(-1, "环信异常:" + e.msg);
		}
	});
	merchants_id = GetCookie("merchants_id");
	hx_account = GetCookie("hx_account");
	hx_pass = GetCookie("hx_pass");
	merchants_name=GetCookie("merchants_name");
	merchants_img=GetCookie("merchants_img");
	
	$("#merchants_img").attr("src",homeurl+merchants_img);
	conn.open({
		user : hx_account,
		pwd : hx_pass,
		appKey : hxAppKey
	});
});

function appendMsg(message,msg_type) {
	var msg;
	if(msg_type=='pic'){
		var filename = message.filename;//文件名称，带文件扩展名
		msg=[ {
			type : 'pic',
			filename : filename || '',
			data : message.url
		} ]
	}else{
		 msg=message.data;	
	}
	var isExist = false;// 判断列表里 是否已经有
	$.each(chatBeans,function(i, item) {
						if (item.to == message.from) {
							isExist = true;
							var messageBean = {};
							messageBean["data"] = msg;
							var myDate = new Date();
							var time = myDate.getHours() + ":"
									+ myDate.getMinutes() + ":"
									+ myDate.getSeconds();
							chatBeans[i]["new_time"] = time;
							messageBean["send_time"] = time;
							messageBean["type"] = '2';// 1自己 2:好友
							chatBeans[i].messageBeans.push(messageBean);

							if (i == chat_index) {// 正在对话列表
								chatBeans[i]["no_reading_count"] == 0
								$("#no_reading_count" + i).hide();

								fullMessage(messageBean);
							} else {
								chatBeans[i]["no_reading_count"] = chatBeans[i]["no_reading_count"] + 1;// 未读数
								$("#no_reading_count_label" + i).text(
										chatBeans[i]["no_reading_count"]);
								$("#no_reading_count" + i).show();
							}

							return false;
						}
					});
	if (!isExist) {
		var chatBean = {};
		chatBean["to"] = message.from;
		var messageBeans = [];
		var messageBean = {};
		messageBean["data"] = msg;
		var myDate = new Date();
		var time = myDate.getHours() + ":" + myDate.getMinutes() + ":"
				+ myDate.getSeconds();
		chatBean["new_time"] = time;
		messageBean["send_time"] = time;
		messageBean["type"] = '2';// 1自己发的 2:好友发的
		chatBean["nick_name"] = '';
		chatBean["head_path"] = '';
		messageBeans.push(messageBean);
		chatBean["messageBeans"] = messageBeans;
		chatBean["no_reading_count"] = 1;//
		chatBeans.splice(0, 0, chatBean);
		
		startRequest(1,message.from);
		addChatList();// 有新的会话对象
	}
}

function startRequest(index,member_hx_account) {
	switch (index) {
	case 1:
		getDataByPost(index,homeurl+"memberController.api?getMemberByHxAccount",{hx_account:member_hx_account});
		break;
	default:
		break;
	}
}

function doSuccess(index,data) {
	switch (index) {
	case 1:
		$.each(chatBeans,function(i,item){
			if(item.to==data.hx_account){
				item["nick_name"]=data.nick_name;
				item["head_path"]=data.head_path;
				
				$("#nick_name"+i).text(data.nick_name);
				$("#head_path"+i).attr("src",homeurl+data.head_path);
				addMessageList();
				return false;
			}
		});		
		break;
	default:
		break;
	}
}

function handlePicture(message) {
	appendMsg(message,'pic');
}

function handleEmotion(message) {
	appendMsg(message,'emotion');
}
function handleText(message) {
	appendMsg(message,'txt');
}



function addChatList() {
	chat_index += 1;// 有新对话列表 则正在对话的index加1
	$("#menuList").empty();
	$.each(chatBeans,function(i, item) {
						var url = "<div  id='menu"
								+ i
								+ "' class='chatHorizontalItem' onclick='menuClick("
								+ i + ")'>" + "<div class='divLeftCellDiV'>"
								+ "<img id='head_path"+i+"'  src='" + (homeurl + item.head_path)
								+ "'class='chatHeadImg'/>" + "</div>"
								+ "<div class='divRightCellDiV' >" + "<label id='nick_name"+i+"' >"
								+ item.nick_name + "</label>" + "</div>";
						if (item.no_reading_count == 0) {
							url += "<div id='no_reading_count"
									+ i
									+ "' style='height: 50px;float: left;line-height: 50px;width:20%;text-align: center;display:none;'>"
									+ "<div style='background:url(../images/icon/weidushu.png) no-repeat;background-position: center;background-size: 15px 15px;'>"
									+ "<label id='no_reading_count_label"
									+ i
									+ "' style='color:#ffffff;font-size:5px;'>0</label>"
									+ "</div>" + "</div>";
						} else {
							url += "<div id='no_reading_count"
									+ i
									+ "' style='height: 50px;float: left;line-height: 50px;width:20%;text-align: center;'>"
									+ "<div style='background:url(../images/icon/weidushu.png) no-repeat;background-position: center;background-size: 15px 15px;'>"
									+ "<label id='no_reading_count_label" + i
									+ "' style='color:#ffffff;font-size:5px;'>"
									+ item.no_reading_count + "</label>"
									+ "</div>" + "</div>";
						}
						url += "</div>";

						$("#menuList").append(url);
					});

	$(".chatHorizontalItem").css("background", "#003E6F");
	$(".chatHorizontalItem").css("color", "#ffffff");
	$("#menu" + chat_index).css("background", "#ffffff");
	$("#menu" + chat_index).css("color", "#000000");

	if (chat_index == 0) {
		addMessageList();
	}
}

function addMessageList() {
	chatBeans[chat_index]["no_reading_count"] = 0;
	$("#no_reading_count" + chat_index).hide();// 未读书未0
	$("#chatName").text(chatBeans[chat_index].nick_name);
	$("#chatList").empty();
	$.each(chatBeans[chat_index]["messageBeans"], function(i, item) {
		fullMessage(item);
	});
}

function fullMessage(messageBean) {
	var msg;
	if (typeof (messageBean.data) == 'string') {
		msg = Easemob.im.Helper.parseTextMessage(messageBean.data);
		msg = msg.body;
	} else {
		msg = messageBean.data;
	}
	
	var messageContent = msg;
	var url = "";

	if (messageBean.type == '1') {
		url = "<div style='text-align: right;margin-right:10px;'>" +
				"<label>"+  messageBean.send_time+"	"+merchants_name + "</label>"+
				"<img src='"+(homeurl+merchants_img)+"' style='width:30px;height:30px;border-radius:30px;'/>"
				+ "<div style='min-heigh: 30px;margin-top:10px;'>";
	} else {
		url = "<div style='margin-left:10px;'>" + 
				"<img src='"+(homeurl+chatBeans[chat_index].head_path)+"' style='width:30px;height:30px;border-radius:30px;'/>"+
				"<label>" + chatBeans[chat_index].nick_name + "	"+ messageBean.send_time + "</label>"
				+"<div style='min-heigh: 30px;margin-top:10px;'>";
	}

	for (var i = 0; i < messageContent.length; i++) {
		var msg = messageContent[i];
		var type = msg.type;
		var data = msg.data;

		if (type == "emotion") {
			url += "<p3><img src='" + data + "'/></p3>";
		} else if (type == "pic" || type == 'audio' || type == 'video') {
			url += "<p3><img src='" + data + "' style='width:200px;'/></p3>";
		} else {
			url += "<label>" + data + "</label>";
		}
	}

	url += "</div></div>";

	$("#chatList").append(url);
	$('#chatList').scrollTop( $('#chatList')[0].scrollHeight );
}

function menuClick(i) {
	chat_index = i;
	$(".chatHorizontalItem").css("background", "#003E6F");
	$(".chatHorizontalItem").css("color", "#ffffff");
	$("#menu" + i).css("background", "#ffffff");
	$("#menu" + i).css("color", "#000000");
	addMessageList();
}

var txt_msg = '';
function sendTxtMsg() {
	var chatBean = chatBeans[chat_index];
	if (chat_index == -1) {
		showTip(-1, "未选择发送对象");
		return;
	}
	txt_msg = $("#txtMsg").val();
	if (txt_msg == '') {
		showTip(-1, "不可发送空消息");
		return;
	}

	var options = {
		to : chatBean.to,
		msg : txt_msg,
		type : "chat"
	};

	// 发送文本消息接口
	conn.sendTextMessage(options);
	var messageBeans = chatBean["messageBeans"];
	var messageBean = {};
	messageBean["data"]= Easemob.im.Utils.parseLink(Easemob.im.Utils.parseEmotions(encode(txt_msg)));;
	var myDate = new Date();
	var time = myDate.getHours() + ":" + myDate.getMinutes() + ":"
			+ myDate.getSeconds();
	chatBean["new_time"] = time;
	messageBean["send_time"] = time;
	messageBean["type"] = '1';// 1自己 2:好友
	chatBean["messageBeans"].push(messageBean);
	chatBeans[chat_index] = chatBean;

	fullMessage(messageBean);
	$("#txtMsg").val("");
}

var encode = function ( str ) {
	if ( !str || str.length === 0 ) return "";
	var s = '';
	s = str.replace(/&amp;/g, "&");
	s = s.replace(/<(?=[^o][^)])/g, "&lt;");
	s = s.replace(/>/g, "&gt;");
	//s = s.replace(/\'/g, "&#39;");
	s = s.replace(/\"/g, "&quot;");
	s = s.replace(/\n/g, "<br>");
	return s;
};


var emotionFlag = false;
var isEmotionLoad = false;// 判断表情是否已经加载过了
var showEmotionDialog = function() {
	if (!isEmotionLoad) {
		isEmotionLoad = true;
		emotionFlag = true;
		// Easemob.im.Helper.EmotionPicData设置表情的json数组
		var sjson = Easemob.im.EMOTIONS, data = sjson.map, path = sjson.path;
		for ( var key in data) {
			var url = "<div style='float:left;border-right:1px solid #efefef;border-bottom:1px solid #efefef;'>"
					+ "<img id='"
					+ key
					+ "' src='"
					+ path
					+ data[key]
					+ "' onclick='selectEmotionImg(this)'/><div/>";
			$("#emotionUL").append(url);
		}
		$("#wl_faces_box").show();
	} else {
		if (emotionFlag) {
			$("#wl_faces_box").hide();
			emotionFlag = false;
		} else {
			$("#wl_faces_box").show();
			emotionFlag = true;
		}
	}
};
// //表情选择div的关闭方法
// var turnoffFaces_box = function() {
// emotionFlag=false;
// $("#wl_faces_box").hide();
// };

var selectEmotionImg = function(selImg) {
	msg_type = 'emotion';
	var txt = document.getElementById("txtMsg");
	txt.value = txt.value + selImg.id;
	txt.focus();
	emotionFlag = false;
	$("#wl_faces_box").hide();
};

var pictype = {
		"jpg" : true,
		"gif" : true,
		"png" : true,
		"bmp" : true
};

var flashFilename = '';
function sendImg() {
	var file = $("#fileInput") 
	file.after(file.clone().val("")); 
	file.remove(); //清空file的办法 并兼容火狐
	
	$('#fileInput').click();
	$('#fileInput').on('change', function() { 
		var chatBean = chatBeans[chat_index];
		if (chat_index == -1) {
			showTip(-1, "未选择发送对象");
			return;
		}
		
		 var fileObj = Easemob.im.Helper.getFileUrl('fileInput');
			if (Easemob.im.Helper.isCanUploadFileAsync && (fileObj.url == null || fileObj.url == '')) {
				alert("请先选择图片");
				return;
			}
			var filetype = fileObj.filetype;
			var filename = fileObj.filename;
			if (!Easemob.im.Helper.isCanUploadFileAsync || filetype in pictype) {
				var opt = {
					type : 'chat',
					fileInputId : 'fileInput',
					filename :flashFilename||filename,
					to : chatBeans[chat_index].to,
					apiUrl: Easemob.im.config.apiURL,
					onFileUploadError : function(error) {
						//var messageContent = (error.msg || '') + ",发送图片文件失败:" + (filename || flashFilename);
						//appendMsg(curUserId, to, messageContent);
						showTip(-1, "发送失败:"+error.msg);
					},
					onFileUploadComplete : function(data) {
						var file = document.getElementById('fileInput');
						var img_url;
						if ( Easemob.im.Helper.isCanUploadFileAsync && file && file.files) {
							var objUrl = getObjectURL(file.files[0]);
							if (objUrl) {
								img_url=objUrl;
							}
						} else {
							
						}
						var messageBeans = chatBean["messageBeans"];
						var messageBean = {};
						messageBean["data"]= [ {
							type : 'pic',
							filename : filename,
							data :  img_url
						} ];
						var myDate = new Date();
						var time = myDate.getHours() + ":" + myDate.getMinutes() + ":"
								+ myDate.getSeconds();
						chatBean["new_time"] = time;
						messageBean["send_time"] = time;
						messageBean["type"] = '1';// 1自己 2:好友
						chatBean["messageBeans"].push(messageBean);
						chatBeans[chat_index] = chatBean;
						fullMessage(messageBean);
					},
					flashUpload: flashPicUpload
				};
				
				conn.sendPicture(opt);
				return;
			}
			showTip(-1,"不支持此图片类型" + filetype); 
	 });
	
}


var flashPicUpload = function ( url, options ) {
	flashUpload(picshim, url, options);
};

//提供上传接口
var flashUpload = function ( swfObj, url, options ) {
	swfObj.setUploadURL(url);
	swfObj.uploadOptions = options;
	swfObj.startUpload();
};

var uploadShim = function ( fileInputId, type ) {
	var pageTitle = document.title;
	if ( typeof SWFUpload === 'undefined' ) {
		return;
	}
	return new SWFUpload({ 
		file_post_name: 'file'
		, flash_url: "../js/huanxin/swfupload/swfupload.swf"
		, button_placeholder_id: fileInputId
		, button_width: 24
		, button_height: 24
		, button_cursor: SWFUpload.CURSOR.HAND
		, button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT
		, file_size_limit: 10485760
		, file_upload_limit: 0
		, file_queued_handler: function ( file ) {
			if ( this.getStats().files_queued > 1 ) {
				this.cancelUpload();
			}

			var checkType = window[type + 'type'];

			if ( !checkType[file.type.slice(1)] ) {
				conn.onError({
					type : EASEMOB_IM_UPLOADFILE_ERROR,
					msg : '不支持此文件类型' + file.type
				});
				this.cancelUpload();
			} else if ( 10485760 < file.size ) {
				conn.onError({
					type : EASEMOB_IM_UPLOADFILE_ERROR,
					msg : '文件大小超过限制！请上传大小不超过10M的文件'
				});
				this.cancelUpload();
			} else {
				flashFilename = file.name;
				switch (type) {
					case 'pic':
						sendImg();
						break;
				}
			}
		}
		, file_dialog_start_handler: function () {
			if ( Easemob.im.Helper.getIEVersion && Easemob.im.Helper.getIEVersion < 10 ) {
				document.title = pageTitle;
			}
		}
		, upload_error_handler: function ( file, code, msg ) {
			if ( code != SWFUpload.UPLOAD_ERROR.FILE_CANCELLED 
			&& code != SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED 
			&& code != SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED ) {
				this.uploadOptions.onFileUploadError && this.uploadOptions.onFileUploadError({ type: EASEMOB_IM_UPLOADFILE_ERROR, msg: msg });
			}
		}
		, upload_complete_handler: function () {
			//this.setButtonText('点击上传');
		}
		, upload_success_handler: function ( file, response ) {
			//处理上传成功的回调
			try{
				var res = Easemob.im.Helper.parseUploadResponse(response);
				
				res = $.parseJSON(res);
				res.filename = file.name;
				this.uploadOptions.onFileUploadComplete && this.uploadOptions.onFileUploadComplete(res);
			} catch ( e ) {
				conn.onError({
					type : EASEMOB_IM_UPLOADFILE_ERROR,
					msg : '上传图片发生错误'
				});
			}
		}
	});
}

function closeChat() {
	chatBeans.splice(chat_index, 1);
	if(chatBeans!=null&&chatBeans.length>0){
		chat_index=-1;	
	}else{
		chat_index=-2;
	}
	addChatList();
}

function enterClick() {
	sendTxtMsg();
}
