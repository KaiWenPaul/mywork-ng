var shoppingCarBeans;
var member_id;
$(document).ready(function() {
	member_id=getParameter(0,"member_id");
	startRequest(1);
});

function startRequest(index) {
	switch (index) {
	case 1:
		getDataByPost(index,homeurl+"memberController.api?getMemberShoppingCar",{member_id:member_id,page:page,limit:limit},"2");
		break;
	default:
		break;
	}
}

function doSuccess(index,data){
	switch (index) {
	case 1:
		shoppingCarBeans=data;
		addShoppingCarBean();
		break;
	default:
		break;
	}
}
function addShoppingCarBean(){
	$("#listAll").empty();
	$.each(shoppingCarBeans, function(i, item) {
		var url="<div class='listAll'>" +
				"<div class='listHorizontalItem' style='min-hight: 50px;height: auto;'>" +
				"<label class='listLabel'>"+(i+1)+"</label>" +
				"<label class='listLabel'>"+item.car_id+"</label>" +
				"<label class='listLabel'>"+item.merchants_name+"</label>" +
				"<label class='listLabel'>"+item.goods_name+"</label>" +
				"<label class='listLabel'>"+item.create_time+"</label>" +
				"</div>" +
				"</div>";
		$("#listAll").append(url);
	});
};
