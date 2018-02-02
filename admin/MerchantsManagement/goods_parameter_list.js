var goods_id;
var parameterBeans;
var parent_id;
var parameter_name;
var parameter_price;
var parameter_id;

var parameter_index;
$(document).ready(function() {	
	goods_id=getParameter(0,'goods_id');
	parent_id=getParameter(1,'parent_id');
	startRequest(1);
});

function startRequest(index) {
	switch (index) {
	case 1:
		getDataByPost(index,homeurl+"parameterController.api?getParameterByGoodsId",{goods_id:goods_id,parent_id:parent_id,page:page,limit:limit},'2');
		break;
	case 2:
		getDataByPost(index,homeurl+"parameterController.api?addParameter",{goods_id:goods_id,parameter_name:parameter_name,parent_id:parent_id
			,parameter_type:2,parameter_price:parameter_price});
		break;
	case 3:
		getDataByPost(index,homeurl+"parameterController.api?updateParameter",{parameter_id:parameterBeans[parameter_index].parameter_id,
			parameter_name:parameter_name,
			parameter_price:parameter_price});
		break;
	case 4:
		getDataByPost(index,homeurl+"parameterController.api?deleteParameter",{parameter_id:parameterBeans[paramteter_index].parameter_id});
		break;
	default:
		break;
	}
}

function doSuccess(index,data) {
	switch (index) {
	case 1:
		parameterBeans=data;
		addParameter();
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

function addParameter() {
	$("#listAll").empty();
	$.each(parameterBeans, function(i, item) {
		var url="<div class='listAll'>" +
				"<div class='listHorizontalItem'>" +
				"<label class='listLabel'>"+(i+1)+"</label>" +
				"<label class='listLabel'>"+item.parameter_id+"</label>" +
				"<label class='listLabel' style='width:20%'>"+item.parameter_name+"</label>" +
				"<label class='listLabel'>"+item.parameter_price+"</label>" +
				"<div class='listDiv'>" +
					"<a  href='javascript:void(0);' onclick='deleteGoodsParameterClick("+i+")' >删除		</a>" +
					"<a  href='javascript:void(0);' onclick='updateGoodsParameterClick("+i+")' >修改		</a>" +
				"</div>" +
				"</div>" +
				"</div>";
		$("#listAll").append(url);
	});
}

function deleteGoodsParameterClick(i) {
	paramteter_index=i;
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

function updateGoodsParameterClick(i) {
	parameter_index=i;
	$("#opacityDiv").show();
	$("#addGoodsDiv").show();
	$("#updateBtn").show();
	
	$("#parameter_name").val(parameterBeans[parameter_index].parameter_name);
	$("#parameter_price").val(parameterBeans[parameter_index].parameter_price);
}

function updateGoodsClick() {
	parameter_name=$("#parameter_name").val();
	parameter_price=$("#parameter_price").val();
	
	if(parameter_name==''){
		showTip(-1, "名称不可为空");
		return;
	}
	
	if(isNaN(parameter_price)){
		showTip(-1, "价格含有非法数字");
		return;
	}
	startRequest(3);
	closeDiv();
}


function addGoodsServiceClick() {
	$("#opacityDiv").show();
	$("#addGoodsDiv").show();
	$("#okBtn").show();
	
	$("#parameter_name").val("");
	$("#parameter_price").val("");
}

function okGoodsClick() {
	parameter_name=$("#parameter_name").val();
	parameter_price=$("#parameter_price").val();
	if(parameter_name==''){
		showTip(-1, "名称不可为空");
		return;
	}
	
	if(isNaN(parameter_price)){
		showTip(-1, "价格含有非法数字");
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

