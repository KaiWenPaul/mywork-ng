var addressBeans;
var member_id;
$(document).ready(function() {
	member_id=getParameter(0,"member_id");
	startRequest(1);
});

function startRequest(index) {
	switch (index) {
	case 1:
		getDataByPost(index,homeurl+"addressController.api?getOwnerAddress",{member_id:member_id,page:page,limit:limit},'2');
		break;
	default:
		break;
	}
}

function doSuccess(index,data) {
	switch (index) {
	case 1:
		addressBeans=data;
		addAddress();
		break;
	default:
		break;
	}
}

function addAddress() {
	$("#listAll").empty();
	$.each(addressBeans, function(i, item) {
		var url="<div class='listAll'>" +
				"<div class='listHorizontalItem'>" +
				"<label class='listLabel' style='width:5%;'>"+(i+1)+"</label>" +
				"<label class='listLabel' style='width:5%;'>"+item.address_id+"</label>" +
				"<label class='listLabel' style='width:10%;'>"+item.mobile+"</label>" +
				"<label class='listLabel' style='width:5%;'>"+item.name+"</label>" +	
				"<label class='listLabel' style='width:5%;'>"+item.province+"</label>" +
				"<label class='listLabel' style='width:5%;'>"+item.city+"</label>" +
				"<label class='listLabel' style='width:5%;'>"+item.country+"</label>" +
				"<label class='listLabel' style='width:20%;'>"+item.detailed_address+"</label>" +
				"<label class='listLabel' style='width:5%;'>"+(item.is_default==1?"是":"否")+"</label>" +
				"<label class='listLabel' style='width:5%;'>"+item.zip_code+"</label>" +
				"</div>" +
				"</div>";
		$("#listAll").append(url);
	});
}
