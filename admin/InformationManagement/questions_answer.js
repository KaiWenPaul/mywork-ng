var questions_id;
var answerBeans;
var answer_index;
var answer_title;
var is_correct;
$(document).ready(function() {	
	window.parent.addNacigationBar(">答案列表");
	questions_id=getParameter(0,"questions_id");
	startRequest(1);
});

function startRequest(index) {
	switch (index) {
	case 1:
		getDataByPost(index,homeurl + "informationController.api?getQuestionsAnswerById",{questions_id:questions_id});
		break;
	case 2:
		getDataByPost(index,homeurl + "informationController.api?addQuestionsAnswer",{questions_id:questions_id,answer_title:answer_title,is_correct:is_correct});
		break;
	case 3:
		getDataByPost(index,homeurl + "informationController.api?deletaQuestionsAnswer",{answer_id:answerBeans[answer_index].answer_id});
		break;
	case 4:
		getDataByPost(index,homeurl + "informationController.api?updateQuestionsAnswer",{answer_id:answerBeans[answer_index].answer_id,answer_title:answer_title,is_correct:is_correct});
		break;	
	default:
		break;
	}
}

function doSuccess(index,data) {
	switch (index) {
	case 1:
		answerBeans=data;
		addAnswer();
		break;
	case 2:
		startRequest(1);
		break;
	case 3:
		startRequest(1);
		break;
	case 4:
		showTip(-1, "修改成功");
		startRequest(1);
		break;
	default:
		break;
	}
}



function addAnswer() {
	$("#listAll").empty();
	$.each(answerBeans, function(i, item) {
		var url="<div class='listAll'>" +
				"<div class='listHorizontalItem' >" +
				"<label class='listLabel' style='width:5%;'>"+(i+1)+"</label>" +
				"<label class='listLabel' style='width:5%;'>"+item.answer_id+"</label>" +
				"<div class='listDiv' style='width:20%;'>" +
					"<input id='answer_title"+i+"' type='text' value='"+item.answer_title+"' style='width:100%;height:50px;padding:0;'></input>" +
				"</div>" +	
				"<div class='listDiv' style='width:5%;'>" +
					"<select id='selectCorrect"+i+"' style='width: 80%;height:80%; size: 100%;'>"+
					"<option >否</option>"+
					"<option >是</option>"+
					"</select>"+
				"</div>" +
				"<div class='listDiv'>" +
					"<a href='javascript:void(0);' onclick='deleteAnswerClick("+i+")'>删除	</a>" +
					"<a href='javascript:void(0);' onclick='updateAnswerClick("+i+")'>修改	</a>" +
				"</div>" +
				"</div>" +
				"</div>";
		$("#listAll").append(url);
				
		$("#selectCorrect"+i).val(item.is_correct==1?"是":"否");
	});
}

function addAnswerClick() {
	answer_title=$("#answer_title").val();
	is_correct=$("#selectCorrect").val()=='否'?"0":"1";
	if(answer_title==''){
		showTip(-1,"答案不能为空");
		return;
	}
	startRequest(2);
}

function deleteAnswerClick(i) {
	answer_index=i;
	showTip(1, "确定要删除?");
}

function okTip(index) {
	switch (index) {
	case "1":
		startRequest(3);
		break;
	default:
		break;
	}	
	closeTipDivClick();
}

function updateAnswerClick(i){
	answer_index=i;
	answer_title=$("#answer_title"+i).val();
	is_correct=$("#selectCorrect"+i).val()=='否'?"0":"1";
	if(answer_title==''){
		showTip(-1, "答案不可为空");
		return;
	}
	startRequest(4);
}
