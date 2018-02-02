var startTime;
var endTime;

var merchants_id;
var orderBeans;
window.onload = function() {
	merchants_id = getParameter(0,"merchants_id");
	startRequest(1);
};

function startRequest(index) {
	switch (index) {
	case 1:
		getDataByPost(index, homeurl + "orderController.api?getOrderChart", {
			merchants_id : merchants_id,startTime:startTime,endTime:endTime
		});

		break;
	default:
		break;
	}
}

function doSuccess(index, data) {
	switch (index) {
	case 1:
		orderBeans = data;
		fullData();
		break;
	default:
		break;
	}
}

function fullData() {
	var barChartData = {};
	var labels = [];
	var datasets = [];

	var datasets_wait_pay = {};
	datasets_wait_pay["label"] = "待付款订单";
	datasets_wait_pay["backgroundColor"] = "rgba(201,223,228,0.3)";
	var data_wait_pay = [];

	var datasets_end = {};
	datasets_end["label"] = "已结束订单";
	datasets_end["backgroundColor"] = "rgba(255,117,112,0.3)";
	var data_end = [];

	$.each(orderBeans, function(i, item) {
		labels[i] = item.month;
		data_wait_pay[i] = item.wait_pay_count;
		data_end[i] = item.end_count;
	});
	barChartData["labels"] = labels;

	datasets_wait_pay["data"] = data_wait_pay;
	datasets[0] = datasets_wait_pay;

	datasets_end["data"] = data_end;
	datasets[1] = datasets_end;

	barChartData["datasets"] = datasets;
	
	var canves=document.getElementById("canvas");
	var ctx = document.getElementById("canvas").getContext("2d");
	if(window.myBar){
		window.myBar.destroy();
	}
	window.myBar = new Chart(ctx, {
		type : 'bar',
		data : barChartData,
		options : {
			// Elements options apply to all of the options unless overridden in
			// a dataset
			// In this case, we are setting the border of each bar to be 2px
			// wide and green
			elements : {
				rectangle : {
					borderWidth : 2,
					borderColor : 'rgb(0, 255, 0)',
					borderSkipped : 'bottom'
				}
			},
			responsive : true,
			legend : {
				position : 'top',
			},
			title : {
				display : false,
				text : 'Chart.js Bar Chart'
			}
		}
	});
}

function searchOrder() {
	startTime = $("#startTime").val();
	endTime = $("#endTime").val();
	startRequest(1);
}