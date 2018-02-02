var roleBeans;
var role_index=0;
var moudleBeans;
var moudleArr;
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
		getDataByPost(index,homeurl+"roleController.api?getMoudleByRoleId",
				{role_id:roleBeans[role_index].role_id});
		break;
	case 3:
		var arr=[];
		if(moudleArr!=null){
			for (var i = 0; i < moudleArr.length; i++) {
				arr.push(moudleBeans[moudleArr[i]-1].moudle_id);	
			}	
		}
		getDataByPost(index,homeurl+"roleController.api?setRoleMoudle",
				{role_id:roleBeans[role_index].role_id,moudle_ids:arr.toString()});
		break;
	default:
		break;
	}
}

function doSuccess(index,data) {
	switch (index) {
	case 1:
		roleBeans=data;
		if(roleBeans!=null&&roleBeans.length>0){
			role_index=0;
			startRequest(2);	
		}
		addRole();
		break;
	case 2:
		moudleBeans=data;
		addMoudle();
		break;
	case 3:
		showTip(-1, "保存成功");
		break;
	default:
		break;
	}
}

function addRole() {
	$("#roleList").empty();
	$.each(roleBeans, function(i, item) {
		var url="<div class='listAll'>" +
				"<div class='listHorizontalItem' >" +
				"<div class='listDiv'>";
				if(i==0){
					url+="<input name='role_radio' type='radio' value='' onclick='roleClick("+i+")' checked/>";
				}else{
					url+="<input name='role_radio' type='radio' value='' onclick='roleClick("+i+")'/>";
				}
				url+="</div>" +
				"<label class='listLabel'>"+(i+1)+"</label>" +
				"<label class='listLabel'>"+item.role_id+"</label>" +
				"<label class='listLabel' style='width:20%'>"+item.role_name+"</label>" +
				"</div>" +
				"</div>";
		$("#roleList").append(url);
	});
}
function addMoudle() {
	$("#moudleList").empty();
	$.each(moudleBeans, function(i, item) {
		var url="<div class='listAll'>" +
				"<div class='listHorizontalItem' >" +
				"<div class='listDiv'>" ;
				if(item.is_select=='1'){
					url+="<input name='role_checkbox' type='checkbox' value='' checked='checked' onclick=\"checkClickOne('role_checkbox')\"/>";
				}else{
					url+="<input name='role_checkbox' type='checkbox' value='' onclick=\"checkClickOne('role_checkbox')\"/>";
				}
				url+="</div>" +
				"<label class='listLabel'>"+(i+1)+"</label>" +
				"<label class='listLabel'>"+item.moudle_id+"</label>" +
				"<label class='listLabel' style='width:20%'>"+item.moudle_name+"</label>" +
				"<label class='listLabel'>"+item.moudle_remark+"</label>" +
				"</div>" +
				"</div>";
		$("#moudleList").append(url);
	});
	
	checkClickOne('role_checkbox');
}

function roleClick(i) {
	role_index=i;
	startRequest(2);
}

function saveMoudleClick() {
	moudleArr=getAllCheck('role_checkbox');	
	startRequest(3);
}