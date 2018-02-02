var informationClassBeans;
var information_name;
var class_index;//记录选择的第几个数据
$(document).ready(function() {
	startRequest(1);
});



function startRequest(index) {
	switch (index) {
	case 1:
		getDataByPost(index,homeurl + "informationController.api?getAllInformationClass",null);
		break;
	case 2:
		getDataByPost(index,homeurl + "informationController.api?deleteInformationClass",{information_class_id:informationClassBeans[class_index].information_class_id});
		break;
	case 3:
		getDataByPost(index,homeurl + "informationController.api?addInformationName",{information_name:information_name});
		break;
	case 4:
		getDataByPost(index,homeurl + "informationController.api?updateInformationName",{information_class_id:informationClassBeans[class_index].information_class_id
				,information_name:information_name});
		break;
	default:
		break;
	}
}

function doSuccess(index,data) {
	switch (index) {
	case 1:
		informationClassBeans=data;
		fullInformationClass(informationClassBeans);	
		break;
	case 2:
		startRequest(1);
		break;
	case 3:
		startRequest(1);
		break;
	case 4:
		startRequest(1);
		break;
	default:
		break;
	}
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
};


/**
 * 填充类别数据
 */
function fullInformationClass(informationClassBeans) {
	$("#listAll").empty();
	$.each(informationClassBeans, function(i, item) {
		var url="<div class='listAll'>" +
				"<div class='listHorizontalItem' >" +
				"<label class='listLabel'>"+(i+1)+"</label>" +
				"<label class='listLabel'>"+item.information_class_id+"</label>" +
				"<label class='listLabel' style='width:20%;'>"+item.information_name+"</label>" +
				"<div class='listDiv'>" +
					"<a href='javascript:void(0);' onclick='deleteInformationClassClick("+i+")'>删除	</a>" +
					"<a href='javascript:void(0);' onclick='updateInformationClassClick("+i+")'>修改	</a>" +
					"<a href='information_list.html?parent_id="+item.information_class_id+"'>资讯列表</a>" +
				"</div>" +
				"</div>" +
				"</div>";
		$("#listAll").append(url);
	});
}


/**
 * 添加类别
 */
function addInformatioClassClick() {
	information_name=$("#information_name").val();
	if(information_name==''){
		showTip(-1, "名称不可为空");
	}else{
		startRequest(3);
	}
}


function updateInformationClassClick(i) {	
	class_index=i;
	$("#opacityDiv").show();
	$("#updateClass").show();
	$("#update_information_name").val(informationClassBeans[i].information_name);
}

function updateInformatioClassClick() {
	information_name=$("#update_information_name").val();
	if(information_name==''){
		showTip(-1,"类别不能为空");
	}else{
		startRequest(4);
		closeUpdateDiv();
	}
}

function closeUpdateDiv(){
	$("#opacityDiv").hide();
	$("#updateClass").hide();
}
function deleteInformationClassClick(i) {
	class_index=i;
	showTip(1,"确定删除?");
}