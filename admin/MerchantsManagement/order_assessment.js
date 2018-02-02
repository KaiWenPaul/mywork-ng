var assessmentBeans;
var order_id;
$(document).ready(function() {
	order_id=getParameter(0,"order_id");
	startRequest(1);
});

function startRequest(index) {
	switch (index) {
	case 1:
		getDataByPost(index,homeurl+"assessmentController.api?getAssessmentsByOrderId",{order_id:order_id,page:page,limit:limit},"2");
		break;
	default:
		break;
	}
}

function doSuccess(index,data){
	switch (index) {
	case 1:
		assessmentBeans=data;
		addAssessment();
		break;
	default:
		break;
	}
}
function addAssessment(){
	$("#listAll").empty();
	$.each(assessmentBeans, function(i, item) {
		var url="<div class='listAll'>" +
				"<div class='listHorizontalItem' style='min-hight: 50px;height: auto;'>" +
				"<label class='listLabel'>"+(i+1)+"</label>" +
				"<label class='listLabel'>"+item.assessment_id+"</label>" +
				"<label class='listLabel'>"+item.member_id+"</label>" +
				"<label class='listLabel'>"+item.mobile+"</label>" +
				"<label class='listLabel'>"+item.assessment_star1+"</label>" +
				"<label class='listLabel'>"+item.assessment_star2+"</label>" +
				"<label class='listLabel'>"+item.assessment_star3+"</label>" +
				"<label class='listLabel' style='width:30%'>"+item.assessment_desc+"</label>" +
				"<label class='listLabel'>"+(item.assessment_type=='1'?"评价商品":"评价店家")+"</label>" +
				"</div>" +
				"</div>";
		$("#listAll").append(url);
	});
};
