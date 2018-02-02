var goodsBeans;
var order_id;
$(document).ready(function() {
	window.parent.addNacigationBar(">订单商品");
	order_id=getParameter(0,"order_id");
	startRequest(1);
});

function startRequest(index) {
	switch (index) {
	case 1:
		getDataByPost(index,homeurl+"orderController.api?getGoodsByOrderId",{order_id:order_id,page:page,limit:limit},'2');
		break;
	default:
		break;
	}
}

function doSuccess(index,data) {
	switch (index) {
	case 1:
		goodsBeans=data;
		addGoods();
		break;
	default:
		break;
	}
}

function addGoods() {
	$("#listAll").empty();
	$.each(goodsBeans, function(i, item) {
		var url="<div class='listAll'>" +
		"<div class='listHorizontalItem'>" +
		"<label class='listLabel' style='width:5%'>"+(i+1)+"</label>" +
		"<label class='listLabel' style='width:5%'>"+item.goods_id+"</label>" +
		"<label class='listLabel' style='width:5%'>"+item.goods_name+"</label>" +
		"<label class='listLabel' style='width:5%'>"+item.goods_price+"</label>" +
		"<label class='listLabel' style='width:5%'>"+(item.is_give_integral==0?"否":"是")+"</label>" +
		"<label class='listLabel' style='width:5%'>"+item.give_integral_value+"</label>" +
		"<label class='listLabel' style='width:5%'>"+(item.is_deduct_integral==0?"否":"是")+"</label>" +
		"<label class='listLabel' style='width:5%'>"+item.deduct_integral_value+"</label>" +
		"<label class='listLabel' style='width:5%'>"+item.deduct_integral_price+"</label>" +
		"<label class='listLabel' style='width:5%'>"+(item.is_express==0?"否":"是")+"</label>" +
		"<label class='listLabel' style='width:5%'>"+item.express_value+"</label>" +
		"<label class='listLabel' style='width:5%'>"+item.express_free_price+"</label>" +
		"<label class='listLabel' style='width:5%'>"+item.goods_address+"</label>" +
		"<div class='listDiv'>" +
			"<a href='order_goods_others.html?order_id="+order_id+"&goods_id="+item.goods_id+"' >其他参数	</a>" +
		"</div>" +
		"</div>" +
		"</div>";
		$("#listAll").append(url);
	});
}