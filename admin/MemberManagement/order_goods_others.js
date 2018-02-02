var commonBeans;
var order_id;
var goods_id;
$(document).ready(function() {
	window.parent.addNacigationBar(">商品其他属性");
	order_id=getParameter(0,"order_id");
	goods_id=getParameter(1,"goods_id");
	startRequest(1);
});

function startRequest(index) {
	switch (index) {
	case 1:
		getDataByPost(index,homeurl+"orderController.api?getGoodsOthersByOrderId",{order_id:order_id,goods_id:goods_id});
		break;
	default:
		break;
	}
}

function doSuccess(index,data) {
	switch (index) {
	case 1:
		commonBeans=data;
		addGoods();
		break;
	default:
		break;
	}
}

function addGoods() {
	$("#listAll").empty();
	$.each(commonBeans, function(i, item) {
		var url="<div class='listAll'>" +
		"<div class='listHorizontalItem'>" +
		"<label class='listLabel' style='width:5%'>"+(i+1)+"</label>" +
		"<label class='listLabel' style='width:5%'>"+item.id+"</label>" +
		"<label class='listLabel' style='width:5%'>"+item.name+"</label>" +
		"<label class='listLabel' style='width:5%'>"+item.price+"</label>" +
		"<label class='listLabel' style='width:5%'>"+(item.type==1?"参数":"服务")+"</label>" +
		"</div>" +
		"</div>";
		$("#listAll").append(url);
	});
}