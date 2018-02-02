var orderBeans;
var merchants_id;
var order_index;

var order_state='-1';
$(document).ready(function() {
	merchants_id=GetCookie("merchants_id");
	startRequest(1);
});

function startRequest(index) {
	switch (index) {
	case 1:
		getDataByPost(index,homeurl+"orderController.api?getOrderListByMerchantsID",{merchants_id:merchants_id,page:page,limit:limit
			,order_state:order_state},'2');
		break;
	case 2:
		getDataByPost(index,homeurl+"orderController.api?confirmSendOrder",{order_id:orderBeans[order_index].order_id});
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
	case 2:
		startRequest(1);
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
				"<div class='listDiv'>" +
					"<label class='listLabel' style='width:5%;'>"+(item.order_state=='wait_pay'?"待付款":
					(item.order_state=='cancle'?"已取消":
					(item.order_state=='wait_send'?"待发货":
					(item.order_state=='wait_receive'?"待收货":
					(item.order_state=='wait_assessment'?"待评价":"订单结束")))))+"</label>";
		
				if(item.order_state=='wait_send'){
					url+="<a href='javascript:void(0)' onclick='confirmReceiptOrder("+i+")'>确认发货</a>";
				}
				url+="</div>" +
				"<label class='listLabel' style='width:5%;'>"+item.order_total_price+"</label>" +
				"<label class='listLabel' style='width:5%;'>"+item.create_time+"</label>" +		
				"<div class='listDiv'>" +
					"<a href='order_goods.html?order_id="+item.order_id+"' >订单商品列表			</a>" +
					"<a href='../../admin/MerchantsManagement/order_assessment.html?order_id="+item.order_id+"' >评价列表		</a>" +
					"<a href='../../customerservice/chat_list.html?member_hx_account="+item.hx_account+"&head_path="+item.head_path+"&nick_name="+encodeURIComponent(item.nick_name)+"' >聊天</a>" +
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

function confirmReceiptOrder(i) {
	order_index=i;
	showTip(1, "确定发货?");
}

function okTip(index) {
	switch (index) {
	case "1":
		startRequest(2);
		break;
	default:
		break;
	}
	closeTipDivClick();
}