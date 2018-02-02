var orderBeans;
var merchants_id;

var order_state='-1';
$(document).ready(function() {
	merchants_id=getParameter(0,"merchants_id");
	startRequest(1);
});

function startRequest(index) {
	switch (index) {
	case 1:
		getDataByPost(index,homeurl+"orderController.api?getOrderListByMerchantsID",{merchants_id:merchants_id,page:page,
			limit:limit,order_state:order_state},'2');
		break;
	default:
		break;
	}
}

function doSuccess(index,data) {
	switch (index) {
	case 1:
		orderBeans=data;
		addOrder();
		break;
	default:
		break;
	}
}

function addOrder() {
	$("#listAll").empty();
	$.each(orderBeans, function(i, item) {
		var url="<div class='listAll'>" +
				"<div class='listHorizontalItem'>" +
				"<label class='listLabel' style='width:5%;'>"+(i+1)+"</label>" +
				"<label class='listLabel' style='width:5%;'>"+item.order_id+"</label>" +
				"<label class='listLabel' style='width:10%;'>"+item.order_no+"</label>" +
				"<label class='listLabel' style='width:5%;'>"+item.invoice_rise+"</label>" +
				"<label class='listLabel' style='width:5%;'>"+item.mobile+"</label>" +
				"<label class='listLabel' style='width:5%;'>"+item.name+"</label>" +
				"<label class='listLabel' style='width:5%;'>"+item.province+"</label>" +
				"<label class='listLabel' style='width:5%;'>"+item.city+"</label>" +
				"<label class='listLabel' style='width:5%;'>"+item.country+"</label>" +
				"<label class='listLabel' style='width:5%;'>"+item.detailed_address+"</label>" +
				"<label class='listLabel' style='width:5%;'>"+item.zip_code+"</label>" +
				"<label class='listLabel' style='width:5%;'>"+(item.order_state=='wait_pay'?"待付款":
					(item.order_state=='cancle'?"已取消":
					(item.order_state=='wait_send'?"待发货":
					(item.order_state=='wait_receive'?"待收货":
					(item.order_state=='wait_assessment'?"待评价":"订单结束")))))+"</label>" +
				"<label class='listLabel' style='width:5%;'>"+item.order_total_price+"</label>" +		
				"<label class='listLabel' style='width:5%;'>"+item.create_time+"</label>" +		
				"<div class='listDiv'>" +
					"<a href='order_goods.html?order_id="+item.order_id+"' >订单商品列表	</a>" +
					"<a href='order_assessment.html?order_id="+item.order_id+"' >评价列表</a>" +
				"</div>" +
				"</div>" +
				"</div>";
		$("#listAll").append(url);
	});
}

function searchOrder() {
	order_state=$("#order_state ").find("option:selected").attr("tag");
	startRequest(1);
}