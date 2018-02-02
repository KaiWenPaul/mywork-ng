var orderBeans;
var merchants_id;
var order_index;
var refund_state;

var order_state='-1';
$(document).ready(function() {
	merchants_id=GetCookie("merchants_id");
	startRequest(1);
});

function startRequest(index) {
	switch (index) {
	case 1:
		getDataByPost(index,homeurl+"orderController.api?getRefundList",{merchants_id:merchants_id,page:page,limit:limit
			,order_state:order_state},'2');
		break;
	case 2:
		getDataByPost(index,homeurl+"orderController.api?setRefundState",{refund_id:orderBeans[order_index].refund_id
																,refund_state:refund_state});
		break;
	case 3:
		getDataByPost(index,homeurl+"orderController.api?refundPrice",{refund_id:orderBeans[order_index].refund_id});
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
	case 3:
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
				"<label class='listLabel' style='width:5%;'>"+item.refund_id+"</label>" +
				"<label class='listLabel' style='width:5%;'>"+item.order_id+"</label>" +
				"<label class='listLabel' style='width:5%;'>"+item.nick_name+"</label>" +

				"<label class='listLabel' style='width:5%;'>"+item.goods_name+"</label>" +
				"<label class='listLabel' style='width:5%;'>"+item.refund_count+"</label>" +
				"<label class='listLabel' style='width:5%;'>"+item.refund_price+"</label>" +
				"<label class='listLabel' style='width:5%;'>"+item.refund_desc+"</label>" +
				"<div class='listDiv'>" +
					"<label class='listLabel' style='width:5%;'>"+(item.refund_state=='applying'?"待审核":
					(item.refund_state=='apply_accept'?"审核通过":
					(item.refund_state=='apply_refuse'?"审核拒绝":"已退款")))+"</label>";	
				if(item.refund_state=='applying'){
					url+="<a href='javascript:void(0)' onclick='accept("+i+")'>通过	</a>";
					url+="<a href='javascript:void(0)' onclick='refuse("+i+")'>	拒绝</a>";
				}else if(item.refund_state=='apply_accept'){
					url+="<a href='javascript:void(0)' onclick='refund("+i+")'>退款	</a>";
				}
				url+="</div>" +
				"<label class='listLabel' style='width:5%;'>"+item.create_time+"</label>" +
				"<div class='listDiv'>" +
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

function accept(i) {
	order_index=i;
	refund_state='apply_accept';
	showTip(1, "确定通过?");
}
function refuse(i) {
	order_index=i;
	refund_state='apply_refuse';
	showTip(1, "确定拒绝?");
}

function refund(i){
	order_index=i;
	refund_state='refund';
	showTip(2, "确定退款?");
}

function okTip(index) {
	switch (index) {
	case "1":
		startRequest(2);
		break;
	case "2":
		startRequest(3);
		break;
	default:
		break;
	}
	closeTipDivClick();
}