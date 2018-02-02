var assessmentBeans;
var relation_id;
var assessment_type='2';
$(document).ready(function() {
	relation_id=getParameter(0,"relation_id");
	startRequest(1);
});

function startRequest(index) {
	switch (index) {
	case 1:
		getDataByPost(index,homeurl+"assessmentController.api?getAssessmentsByAdmin",{relation_id:relation_id,
			assessment_type:assessment_type,page:page,limit:limit},"2");
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
				"<label class='listLabel'>"+item.order_id+"</label>" +
				"<label class='listLabel'>"+item.assessment_star1+"</label>" +
				"<label class='listLabel'>"+item.assessment_star2+"</label>" +
				"<label class='listLabel'>"+item.assessment_star3+"</label>" +
				"</div>" +
				"</div>";
		$("#listAll").append(url);
	});
};
