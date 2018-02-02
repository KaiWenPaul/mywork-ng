var goods_id;
var serviceBeans;

var service_name;
var service_price;
var service_type;
var service_id;

var service_index;
$(document).ready(function() {	
	window.parent.addNacigationBar(">服务列表");
	goods_id=getParameter(0,'goods_id');
	startRequest(1);
});

function startRequest(index) {
	switch (index) {
	case 1:
		getDataByPost(index,homeurl+"serviceController.api?getGoodsServiceByGoodsId",{goods_id:goods_id,page:page,limit:limit},'2');
		break;
	case 2:
		getDataByPost(index,homeurl+"serviceController.api?addGoodsService",{goods_id:goods_id,service_name:service_name,
			service_price:service_price,service_type:service_type});
		break;
	case 3:
		getDataByPost(index,homeurl+"serviceController.api?updateGoodsService",{service_id:serviceBeans[service_index].service_id,service_name:service_name,
			service_price:service_price,service_type:service_type});
		break;
	case 4:
		getDataByPost(index,homeurl+"serviceController.api?deleteGoodsService",{service_id:serviceBeans[service_index].service_id});
		break;
	default:
		break;
	}
}

function doSuccess(index,data) {
	switch (index) {
	case 1:
		serviceBeans=data;
		addService();
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
	default:
		break;
	}
}

function addService() {
	$("#listAll").empty();
	$.each(serviceBeans, function(i, item) {
		var url="<div class='listAll'>" +
				"<div class='listHorizontalItem'>" +
				"<label class='listLabel'>"+(i+1)+"</label>" +
				"<label class='listLabel'>"+item.service_id+"</label>" +
				"<label class='listLabel' style='width:20%'>"+item.service_name+"</label>" +
				"<label class='listLabel'>"+item.service_price+"</label>" +
				"<label class='listLabel'>"+(item.service_type==1?"标配服务":"可选服务")+"</label>" +
				"<div class='listDiv'>" +
					"<a  href='javascript:void(0);' onclick='deleteGoodsServiceClick("+i+")' >删除		</a>" +
					"<a  href='javascript:void(0);' onclick='updateGoodsServiceClick("+i+")' >修改		</a>" +
				"</div>" +
				"</div>" +
				"</div>";
		$("#listAll").append(url);
	});
}

function deleteGoodsServiceClick(i) {
	service_index=i;
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

function updateGoodsServiceClick(i) {
	service_index=i;
	$("#opacityDiv").show();
	$("#addGoodsDiv").show();
	$("#updateBtn").show();
	
	$("#service_name").val(serviceBeans[service_index].service_name);
	$("#service_price").val(serviceBeans[service_index].service_price);
	$("#service_type").val(serviceBeans[service_index].service_type==1?"标配服务":"可选服务");
}

function updateGoodsClick() {
	service_name=$("#service_name").val();
	service_price=$("#service_price").val();
	service_type=$("#service_type").val()=="标配服务"?"1":"2";
	if(service_name==''){
		showTip(-1, "名称不可为空");
		return;
	}
	if(isNaN(service_price)){
		showTip(-1, "价格含有非法字符");
		return;
	}
	startRequest(3);
	closeDiv();
}


function addGoodsServiceClick() {
	$("#opacityDiv").show();
	$("#addGoodsDiv").show();
	$("#okBtn").show();
	
	$("#service_name").val("");
	$("#service_price").val("");
	$("#service_type").val("");
}

function okGoodsClick() {
	service_name=$("#service_name").val();
	service_price=$("#service_price").val();
	service_type=$("#service_type").val()=="标配服务"?"1":"2";
	if(service_name==''){
		showTip(-1, "名称不可为空");
		return;
	}
	if(isNaN(service_price)){
		showTip(-1, "价格含有非法字符");
		return;
	}
	startRequest(2);
	closeDiv();
}

function closeDiv() {
	$(document.body).css("height",window.screen.height+"px");
	
	$("#opacityDiv").hide();
	$("#addGoodsDiv").hide();
	$("#okBtn").hide();
	$("#updateBtn").hide();
}

