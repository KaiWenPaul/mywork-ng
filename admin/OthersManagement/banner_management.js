var bannerBeans;
var banner_index;

var img="";
var title;
var remark;
var type;
$(document).ready(function() {
	startRequest(1);
});

function startRequest(index) {
	switch (index) {
	case 1:
		getDataByPost(index,homeurl+"bannerController.api?getBannersAdmin",{});
		break;
	case 2:
		getDataByPost(index,homeurl+"bannerController.api?addBanner",{img:img,title:title,remark:remark,type:type});
		break;
	case 3:
		getDataByPost(index,homeurl+"bannerController.api?updateBanner",{banner_id:bannerBeans[banner_index].banner_id,img:img,title:title,remark:remark,type:type});
		break;
	case 4:
		getDataByPost(index,homeurl+"bannerController.api?deleteBanner",{banner_id:bannerBeans[banner_index].banner_id});
		break;
	case 5:
		uploadFile(index,homeurl+"bannerController.api?uploadBannerImg","bannerFile");
		//uploadFile(index,"http://test.xungou360.com//index.php/Wap/api/upload_img_path","bannerFile");
		//uploadFile(index,"http://wl.tstmobile.com/ShoppingMall/bannerController.api?uploadBannerImg","bannerFile");
		break;
	default:
		break;
	}
}

function doSuccess(index,data) {
	switch (index) {
	case 1:
		bannerBeans=data;
		addBanner();
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
		img=data;
		$("#img").attr("src",homeurl+img);
		break;
	default:
		break;
	}
}

function addBanner() {
	$("#listAll").empty();
	$.each(bannerBeans, function(i, item) {
		var url="<div class='listAll'>" +
				"<div class='listHorizontalItem'>" +
				"<label class='listLabel'>"+(i+1)+"</label>" +
				"<label class='listLabel'>"+item.banner_id+"</label>" +
				"<label class='listLabel'>"+item.title+"</label>" +
				"<div class='listDiv'  style='width:20%'>" +
					"<img src='"+(homeurl+item.img)+"' style='max-width:200px;height:100px;'/>"+
				"</div>" +
				"<label class='listLabel'>"+item.remark+"</label>" +
				"<label class='listLabel'>"+(item.type==1?"普通广告":"")+"</label>" +
				"<div class='listDiv'>" +
					"<a  href='javascript:void(0);' onclick='deleteBannerClick("+i+")' >删除		</a>" +
					"<a  href='javascript:void(0);' onclick='updateBannerClick("+i+")' >修改		</a>" +
					"<a  href='banner_editor.html?url="+item.url+"' >详情页编辑		</a>" +
				"</div>" +
				"</div>" +
				"</div>";
		$("#listAll").append(url);
	});
}

function deleteBannerClick(i) {
	banner_index=i;
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
	banner_index=i;
	$("#opacityDiv").show();
	$("#bannerDiv").show();
	$("#updateButton").show();
	
	$("#title").val(bannerBeans[banner_index].title);
	$("#remark").val(bannerBeans[banner_index].remark);
	$("#type option[tag="+bannerBeans[banner_index].type+"]").attr("selected", true);
	img=bannerBeans[banner_index].img;
	$("#img").attr("src",homeurl+img);
}

function updateBanner() {
	title=$("#title").val();
	remark=$("#remark").val();
	type=$("#type").find("option:selected").attr("tag");
	
	startRequest(3);
	closeDiv();
}



function uploadBanner() {
	 $('#bannerFile').click();
	 $('#bannerFile').on('change', function() { 
		startRequest(5);	 
	 }); 
}

function addBannerClick() {
	$("#opacityDiv").show();
	$("#bannerDiv").show();
	$("#okButton").show();
}

function okBannerClick() {
	title=$("#title").val();
	remark=$("#remark").val();
	type=$("#type").find("option:selected").attr("tag");
	
	if(img==""){
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

