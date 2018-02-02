var member_id;
var member_type;
var invitation_code;
var integralBeans;
$(document).ready(function() {
	member_id=getParameter(0,"member_id");
	member_type=getParameter(1,"member_type");
	invitation_code=getParameter(2,"invitation_code");
	startRequest(1);
});

function startRequest(index) {
	switch (index) {
	case 1:
		getDataByPost(index,homeurl+"memberController.api?getMemberAllIntegral",
				{member_id:member_id,page:page,limit:limit,member_type:member_type,invitation_code:invitation_code},'2');
		break;
	default:
		break;
	}
}

function doSuccess(index,data) {
	switch (index) {
	case 1:
		integralBeans=data;
		addIntegral();
		break;
	default:
		break;
	}
}


function addIntegral() {
	$("#listAll").empty();
	$.each(integralBeans, function(i, item) {
		var url="<div class='listAll'>" +
				"<div class='listHorizontalItem'>" +
				"<label class='listLabel'>"+(i+1)+"</label>" +
				"<label class='listLabel' >"+item.integral+"</label>" +
				"<label class='listLabel'  style='width:20%;'>"+item.type+"</label>" +
				"<label class='listLabel'>"+(item.purpose==1?"增加":(item.purpose==2?"减少":"奖励参考"))+"</label>" +
				"<label class='listLabel' >"+item.create_time+"</label>" +
				"<div class='listDiv'>" +
				"</div>" +
				"</div>" +
				"</div>";
		$("#listAll").append(url);
	});
}