var parent_id;
var moudleBeans;

var moudle_name;
var moudle_url='';
var moudle_type=2;

var moudle_index;
$(document).ready(function() {
	parent_id=getParameter(0,"parent_id");
	startRequest(1);
});

function startRequest(index) {
	switch (index) {
	case 1:
		getDataByPost(index,homeurl+"systemMoudleController.sp?getAllMoudle",
				{parent_id:parent_id});
		break;
	case 2:
		getDataByPost(index,homeurl+"systemMoudleController.sp?addMoudle",
				{parent_id:parent_id,moudle_name:moudle_name,moudle_url:moudle_url,moudle_type:moudle_type});
		break;
	case 3:
		getDataByPost(index,homeurl+"systemMoudleController.sp?deleteMoudle",
				{moudle_id:moudleBeans[moudle_index].moudle_id});
		break;
	case 4:
		getDataByPost(index,homeurl+"systemMoudleController.sp?updateMoudle",
				{moudle_id:moudleBeans[moudle_index].moudle_id,
			moudle_name:moudle_name,moudle_url:moudle_url});
		break;
	default:
		break;
	}
}

function doSuccess(index,data) {
	switch (index) {
	case 1:
		moudleBeans=data;
		addMoudle();
		break;
	case 2:
		startRequest(1);
		break;
	case 3:
		startRequest(1);
		break;
	case 4:
		showTip(-1, "修改成功");
		break;
	default:
		break;
	}
}

/**
 * 填充类别数据
 */
function addMoudle() {
	$("#listAll").empty();
	$.each(moudleBeans, function(i, item) {
		var url="<div class='listAll'>" +
				"<div class='listHorizontalItem' >" +
				"<label class='listLabel'>"+(i+1)+"</label>" +
				"<label class='listLabel'>"+item.moudle_id+"</label>" +
				"<div class='listDiv' style='width:20%;'>" +
				"<input id='moudle_name"+i+"' type='text' value='"+item.moudle_name+"' style='width:100%;height:50px;padding:0;'></input>" +
				"</div>" +
				"<div class='listDiv' style='width:20%;'>" +
				"<input id='moudle_url"+i+"' type='text' value='"+item.moudle_url+"' style='width:100%;height:50px;padding:0;'></input>" +
				"</div>" +
				"<div class='listDiv'>" +
					"<a href='javascript:void(0);' onclick='deleteMoudleClick("+i+")'>删除	</a>" +
					"<a href='javascript:void(0);' onclick='updateMoudleClick("+i+")'>修改	</a>" +
				"</div>" +
				"</div>" +
				"</div>";
		$("#listAll").append(url);
	});
}


function addMoudleClick() {
	moudle_name=$("#moudle_name").val();
	if(moudle_name==''){
		showTip(-1, "名称不可为空");
		return;
	}
	
	moudle_url=$("#moudle_url").val();
	if(moudle_url==''){
		showTip(-1, "地址不可为空");
		return;
	}
	
	
	
	startRequest(2);
}

function updateMoudleClick(i) {
	moudle_index=i;
	moudle_name=$("#moudle_name"+i).val();
	
	if(moudle_name==''){
		showTip(-1, "名称不可为空");
		return;
	}
	
	
	moudle_url=$("#moudle_url"+i).val();
	if(moudle_url==''){
		showTip(-1, "地址不可为空");
		return;
	}
	startRequest(4);
}

function deleteMoudleClick(i) {
	moudle_index=i;
	showTip(1, "确定删除?");
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