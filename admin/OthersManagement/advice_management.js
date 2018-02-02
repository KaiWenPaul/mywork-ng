var adviceBeans;

$(document).ready(function() {
	startRequest(1);
});

function startRequest(index) {
	switch (index) {
	case 1:
		getDataByPost(index,homeurl+"OthersController.sp?getAdvicesAdmin",{page:page},'2');
		break;
	default:
		break;
	}
}

function doSuccess(index,data) {
	switch (index) {
	case 1:
		adviceBeans=data;
		addAdvice();
		break;
	default:
		break;
	}
}

function addAdvice() {
	$("#listAll").empty();
	$.each(adviceBeans, function(i, item) {
		var url="<div class='listAll'>" +
				"<div class='listHorizontalItem'>" +
				"<label class='listLabel'>"+(i+1)+"</label>" +
				"<label class='listLabel'>"+item.advice_id+"</label>" +
				"<label class='listLabel'>"+item.member_id+"</label>" +
				"<label class='listLabel'>"+item.nick_name+"</label>" +	
				"<label class='listLabel'>"+item.mobile+"</label>" +	
				"<label class='listLabel' style='width:30%'>"+item.advice_desc+"</label>" +	
				"</div>" +
				"</div>";
		$("#listAll").append(url);
	});
}





