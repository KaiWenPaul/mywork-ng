var assessmentBeans;
var member_id;
var assessment_type='2';
$(document).ready(function() {
	member_id=getParameter(0,"member_id");
	startRequest(1);
});

function startRequest(index) {
	switch (index) {
	case 1:
		getDataByPost(index,homeurl+"assessmentController.api?getAssessmentsByMemberID",{member_id:member_id,
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
				"<label class='listLabel'>"+item.relation_id+"</label>" +
				"<label class='listLabel'>"+item.name+"</label>" +
				"<label class='listLabel'>"+item.order_id+"</label>" +
				"<label class='listLabel'>"+item.assessment_desc+"</label>" +
				"<label class='listLabel'>"+item.assessment_star1+"</label>" +
				"<label class='listLabel'>"+item.assessment_star2+"</label>" +
				"<label class='listLabel'>"+item.assessment_star3+"</label>" +
				"<label class='listLabel'>"+(item.assessment_type==1?"评价商品":"评价商家")+"</label>" +
				"</div>" +
				"</div>";
		$("#listAll").append(url);
	});
};
