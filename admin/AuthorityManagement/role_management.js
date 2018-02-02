var roleBeans;
var role_name;
var role_index;

$(document).ready(function() {
	startRequest(1);
});

function startRequest(index) {
	switch (index) {
	case 1:
		getDataByPost(index,homeurl+"roleController.api?getAllRole",
				{});
		break;
	case 2:
		getDataByPost(index,homeurl+"roleController.api?addRole",
				{role_name:role_name});
		break;
	case 3:
		getDataByPost(index,homeurl+"roleController.api?deleteRole",
				{role_id:roleBeans[role_index].role_id});
		break;
	case 4:
		getDataByPost(index,homeurl+"roleController.api?updateRole",
				{role_id:roleBeans[role_index].role_id,role_name:role_name});
		break;
	default:
		break;
	}
}

function doSuccess(index,data) {
	switch (index) {
	case 1:
		roleBeans=data;
		addRole();
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
function addRole() {
	$("#listAll").empty();
	$.each(roleBeans, function(i, item) {
		var url="<div class='listAll'>" +
				"<div class='listHorizontalItem' >" +
				"<label class='listLabel'>"+(i+1)+"</label>" +
				"<label class='listLabel'>"+item.role_id+"</label>" +
				"<div class='listDiv' style='width:20%;'>" +
				"<input id='role_name"+i+"' type='text' value='"+item.role_name+"' style='width:100%;height:50px;padding:0;'></input>" +
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


function addRoleClick() {
	role_name=$("#role_name").val();
	if(role_name==''){
		showTip(-1, "角色不可为空");
		return;
	}
	
	startRequest(2);
}

function updateMoudleClick(i) {
	role_index=i;
	role_name=$("#role_name"+i).val();
	
	if(role_name==''){
		showTip(-1, "名称不可为空");
		return;
	}

	startRequest(4);
}

function deleteMoudleClick(i) {
	role_index=i;
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