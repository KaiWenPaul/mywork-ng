var percent_value;
$(document).ready(function() {
	startRequest(1);
});

function startRequest(index) {
	switch (index) {
	case 1:
		getDataByPost(index,homeurl+"goodsController.api?getGoodsIntegralPercent",{});
		break;
	case 2:
		getDataByPost(index,homeurl+"goodsController.api?setGoodsIntegralPercent",{percent_value:percent_value});
		break;
	default:
		break;
	}
}

function doSuccess(index,data) {
	switch (index) {
	case 1:
		$("#percent_value").val(data.percent_value);
		break;
	case 2:
		showTip(-1, "保存成功");
		break;
	default:
		break;
	}
}

function setIntegralPercentClick() {
	percent_value=$("#percent_value").val();
	
	if(isNaN(percent_value)){
		showTip(-1, "百分比数值含有非法数字");
		return;
	}
	
	if(percent_value<1||percent_value>100){
		showTip(-1, "值必须在1到100之间");
		return;
	}
	
	startRequest(2);
}