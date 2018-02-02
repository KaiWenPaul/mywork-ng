var collectionBeans;
var member_id;
$(document).ready(function() {
	member_id=getParameter(0,"member_id");
	startRequest(1);
});

function startRequest(index) {
	switch (index) {
	case 1:
		getDataByPost(index,homeurl+"collectionController.api?getCollectionAdmin",{member_id:member_id,page:page,limit:limit},"2");
		break;
	default:
		break;
	}
}

function doSuccess(index,data){
	switch (index) {
	case 1:
		collectionBeans=data;
		addCollectionBean();
		break;
	default:
		break;
	}
}
function addCollectionBean(){
	$("#listAll").empty();
	$.each(collectionBeans, function(i, item) {
		var url="<div class='listAll'>" +
				"<div class='listHorizontalItem' style='min-hight: 50px;height: auto;'>" +
				"<label class='listLabel'>"+(i+1)+"</label>" +
				"<label class='listLabel'>"+item.collection_id+"</label>" +
				"<label class='listLabel'>"+(item.collection_type==2?item.goodsBean.goods_name:item.merchantsBean.merchants_name)+"</label>" +
				"<label class='listLabel'>"+(item.collection_type==2?"商品":"商家")+"</label>" +
				"<label class='listLabel'>"+item.create_time+"</label>" +
				"</div>" +
				"</div>";
		$("#listAll").append(url);
	});
};
