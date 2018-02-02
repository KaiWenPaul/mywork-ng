var noticeBeans;
var notice_index;

var notice_img="";
var notice_title;
var notice_desc;
var type;
var is_recommend=0;
$(document).ready(function() {
	startRequest(1);
});

function startRequest(index) {
	switch (index) {
	case 1:
		getDataByPost(index,homeurl+"noticeController.api?getNoticeAdmin",{},'2');
		break;
	case 2:
		getDataByPost(index,homeurl+"noticeController.api?addNotice",{notice_img:notice_img,notice_title:notice_title
			,notice_desc:notice_desc,type:type,is_recommend:is_recommend});
		break;
	case 3:
		getDataByPost(index,homeurl+"noticeController.api?updateNotice",{notice_id:noticeBeans[notice_index].notice_id,
			notice_img:notice_img,notice_title:notice_title
			,notice_desc:notice_desc,type:type,is_recommend:is_recommend});
		break;
	case 4:
		getDataByPost(index,homeurl+"noticeController.api?deleteNotice",{notice_id:noticeBeans[notice_index].notice_id});
		break;
	case 5:
		uploadFile(index,homeurl+"noticeController.api?uploadNoticeImg","noticeFile");
		break;
	default:
		break;
	}
}

function doSuccess(index,data) {
	switch (index) {
	case 1:
		noticeBeans=data;
		addNotice();
		break;
	case 2:
		startRequest(1);
		break;
	case 3:
		startRequest(1);
		break;
	case 4:
		startRequest(1);
		break;
	case 5:
		notice_img=data;
		$("#notice_img").attr("src",homeurl+notice_img);
		break;
		break;
	default:
		break;
	}
}

function addNotice() {
	$("#listAll").empty();
	$.each(noticeBeans, function(i, item) {				
		var url="<div class='listAll'>" +
				"<div class='listHorizontalItem'>" +
				"<label class='listLabel'>"+(i+1)+"</label>" +
				"<label class='listLabel'>"+item.notice_id+"</label>" +
				"<label class='listLabel'>"+item.notice_title+"</label>" +
				"<div class='listDiv'  style='width:20%'>" +
					"<img src='"+(homeurl+item.notice_img)+"' style='height:100px;'/>"+
				"</div>" +
				"<label class='listLabel'>"+item.notice_desc+"</label>" +
				"<label class='listLabel'>"+(item.is_recommend=='0'?"否":"是")+"</label>" +
				"<div class='listDiv'>" +
					"<a  href='javascript:void(0);' onclick='deleteBannerClick("+i+")' >删除		</a>" +
					"<a  href='javascript:void(0);' onclick='updateBannerClick("+i+")' >修改		</a>" +
				"</div>" +
				"</div>" +
				"</div>";
		$("#listAll").append(url);
	});
}

function deleteBannerClick(i) {
	notice_index=i;
	showTip(1, "确定删除?");
}

function okTip(index) {
	switch (index) {
	case "1":
		startRequest(4);
		break;
	default:
		break;
	}
	closeTipDivClick();
}

function updateBannerClick(i) {
	notice_index=i;
	$("#opacityDiv").show();
	$("#bannerDiv").show();
	$("#updateButton").show();	
	$("#notice_title").val(noticeBeans[notice_index].notice_title);
	$("#notice_desc").val(noticeBeans[notice_index].notice_desc);
	notice_img=noticeBeans[notice_index].notice_img;
	$("#notice_img").attr("src",homeurl+notice_img);
	setSelectTag("is_recommend","tag",noticeBeans[notice_index].is_recommend);
}

function updateBanner() {
	notice_title=$("#notice_title").val();
	notice_desc=$("#notice_desc").val();
	is_recommend=getSelectTag("is_recommend","tag");
	if(notice_img==""){
		showTip(-1, "请先选择图片");
		return;
	}
	startRequest(3);
	closeDiv();
}

function uploadBanner() {
	 $('#noticeFile').click();
	 $('#noticeFile').on('change', function() { 
		startRequest(5);	 
	 }); 
}

function addBannerClick() {
	$("#opacityDiv").show();
	$("#bannerDiv").show();
	$("#okButton").show();
}

function okBannerClick() {
	notice_title=$("#notice_title").val();
	notice_desc=$("#notice_desc").val();
	is_recommend=getSelectTag("is_recommend","tag");
	if(notice_img==""){
		showTip(-1, "请先选择图片");
		return;
	}
	
	startRequest(2);
	closeDiv();
}

function closeDiv() {
	$(document.body).css("height",window.screen.height+"px");
	
	$("#opacityDiv").hide();
	$("#bannerDiv").hide();
	$("#okButton").hide();
	$("#updateButton").hide();
}

