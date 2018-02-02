var cityBeans;
var city_index;
var parent_id;

var level=1;//等级目录

var name;
$(document).ready(function() {
	parent_id=getParameter(0,"parent_id");
	level=getParameter(1,"level");
	startRequest(1);
});

function startRequest(index) {
	switch (index) {
	case 1:
		getDataByPost(index,homeurl+"cityController.api?getCity",{parent_id:parent_id});
		break;
	case 2:
		getDataByPost(index,homeurl+"cityController.api?addCity",{parent_id:parent_id,name:name});
		break;
	case 3:
		getDataByPost(index,homeurl+"cityController.api?updateCity",{id:cityBeans[city_index].id,name:name});
		break;
	case 4:
		getDataByPost(index,homeurl+"cityController.api?deleteCity",{id:cityBeans[city_index].id});
		break;
	default:
		break;
	}
}

function doSuccess(index,data) {
	switch (index) {
	case 1:
		cityBeans=data;
		addCity();
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

function addCity() {
	$("#listAll").empty();
	$.each(cityBeans, function(i, item) {
		var url="<div class='listAll'>" +
				"<div class='listHorizontalItem'>" +
				"<label class='listLabel'>"+(i+1)+"</label>" +
				"<label class='listLabel'>"+item.id+"</label>" +
				"<label class='listLabel'>"+item.name+"</label>" +
				"<div class='listDiv'>" +
					"<a  href='javascript:void(0);' onclick='deleteCityClick("+i+")' >删除		</a>" +
					"<a  href='javascript:void(0);' onclick='updateCityClick("+i+")' >修改		</a>";
				if(level<3){
					url+="<a href='address_management.html?parent_id="+item.id+"&level="+(parseInt(level)+1)+"' >下一级目录		</a>";
				}
				url+="</div>" +
				"</div>" +
				"</div>";
		$("#listAll").append(url);
	});
}

function deleteCityClick(i) {
	city_index=i;
	showTip(1, "确定删除?");
}

function okTip(index) {
	switch (index) {
	case "1":
		startRequest(4);
		break;
	default:
		break;
	}
	closeTipDivClick();
}

function updateCityClick(i) {
	city_index=i;
	$("#opacityDiv").show();
	$("#cityDiv").show();
	
	$("#name_update").val(cityBeans[city_index].name);
}

function updateCity() {
	name=$("#name_update").val();
	
	if(name==""){
		showTip(-1, "名称不可为空");
		return;
	}
	startRequest(3);
	closeDiv();
}


function addCityClick() {
	name=$("#name").val();
	
	if(name==""){
		showTip(-1, "名称不可为空");
		return;
	}	
	startRequest(2);
	closeDiv();
}

function closeDiv() {
	$(document.body).css("height",window.screen.height+"px");
	$("#opacityDiv").hide();
	$("#cityDiv").hide();
}

