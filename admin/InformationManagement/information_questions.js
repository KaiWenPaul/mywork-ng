var information_id;
var answer_num;
var questions_type=1;
var questions_title;
var questions_id;
var questions_desc;
var questionsBeans;
$(document).ready(function() {
	window.parent.addNacigationBar(">问题列表");
	information_id=getParameter(0,"information_id");
	answer_num=getParameter(1,"answer_num");
	
	$("#itemList").empty();
	for ( var i = 0; i < answer_num; i++) {
		var url = "";
		url += " <div class='tableDiv' style='height: 40px;'> " +
					"<input class='tableButton' id='item" + i + "' style='height:40px' type='button' value='第" + (i+1)+"次问题'  onclick='itemClick("+ i + ")' />" +
				"</div>";
		$("#itemList").append(url);
	}
	
	$(".tableButton").css("background", "#ffffff");
	$(".tableButton").css("color", "#a8c4f2");
	$("#item" + 0).css("background", "#a8c4f2");
	$("#item" + 0).css("color", "#ffffff");
	
	startRequest(1);
});



function itemClick(i) {
	questions_type=i+1;
	$(".tableButton").css("background", "#ffffff");
	$(".tableButton").css("color", "#a8c4f2");
	$("#item" + i).css("background", "#a8c4f2");
	$("#item" + i).css("color", "#ffffff");
	startRequest(1);
};

function startRequest(index) {
	switch (index) {
	case 1:
		getDataByPost(index,homeurl + "informationController.api?getQuestionsByIdAndType",{information_id:information_id,questions_type:questions_type});	
		break;
	case 2:
		getDataByPost(index,homeurl + "informationController.api?deleteInformationQuestion",{questions_id:questionsBeans[question_index].questions_id});
		break;
	case 3:
		getDataByPost(index,homeurl + "informationController.api?addInformationQuestion",{information_id:information_id,questions_type:questions_type
			,questions_title:questions_title,questions_desc:questions_desc});
		break;
	case 4:
		getDataByPost(index,homeurl + "informationController.api?updateInformationQuestion",{questions_id:questions_id
			,questions_title:questions_title});
		break;
	default:
		break;
	}
}

function doSuccess(index,data) {
	switch (index) {
	case 1:
		questionsBeans=data;
		addQuestions();	
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



function addQuestions() {
	$("#listAll").empty();
	$.each(questionsBeans, function(i, item) {
		var url="<div class='listAll'>" +
				"<div class='listHorizontalItem' >" +
				"<label class='listLabel' style='width:5%;'>"+(i+1)+"</label>" +
				"<label class='listLabel' style='width:5%;'>"+item.questions_id+"</label>" +
				"<div class='listDiv' style='width:20%;'>" +
					"<input id='questions_title"+i+"' type='text' value='"+item.questions_title+"' style='width:100%;height:50px;padding:0;'></input>" +
				"</div>" +		
				"<div class='listDiv'>" +
					"<a href='javascript:void(0);' onclick='deleteQuestionsClick("+i+")'>删除	</a>" +
					"<a href='javascript:void(0);' onclick='updateQuestionsClick("+i+")'>修改	</a>" +
					"<a href='questions_answer.html?questions_id="+item.questions_id+"'>答案列表</a>" +
				"</div>" +
				"</div>" +
				"</div>";
		$("#listAll").append(url);
	});
};

function addQuestionClick() {
	questions_title=$("#questions_title").val();
	questions_desc='';
	startRequest(3);
}


function deleteQuestionsClick(i) {
	question_index=i;
	showTip(1,"确定删除?");
}

function okTip(index) {
	switch (index) {
	case "1":
		startRequest(2);
		break;
	default:
		break;
	}	
	closeTipDivClick();
}

function updateQuestionsClick(i) {
	question_index=i;
	questions_title=$("#questions_title" + i).val();
	questions_id=questionsBeans[i].questions_id;
	startRequest(4);
}