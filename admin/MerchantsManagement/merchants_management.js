var merchantsBeans;

var merchants_account;
var merchants_id=0;
var password;
var merchants_name;
var merchants_img;
var merchants_star1;
var merchants_star2;
var merchants_star3;

var merchants_index;
$(document).ready(function() {
	startRequest(1);
});

function startRequest(index) {
	switch (index) {
	case 1:
		getDataByPost(index,homeurl+"merchantsController.api?getAllMerchants",{page:page,limit:limit
			,merchants_id:(merchants_id==''?0:merchants_id),merchants_account:merchants_account,merchants_name:merchants_name},"2");
		break;
	case 2:
		getDataByPost(index,homeurl+"merchantsController.api?addMerchantsDetail",
				{merchants_account:merchants_account,password:password
		,merchants_name:merchants_name,merchants_star1:merchants_star1,
		merchants_star2:merchants_star2,merchants_star3:merchants_star3
		,merchants_img:merchants_img});
		break;
	case 3:
		uploadFile(index,homeurl+"merchantsController.api?uploadMerchantsImg","mercants_imgFile");
		break;
	case 4:
		getDataByPost(index,homeurl+"merchantsController.api?updateMerchantsDetail",{
			merchants_id:merchants_id,
			merchants_account:merchants_account
			,merchants_name:merchants_name,merchants_star1:merchants_star1,
			merchants_star2:merchants_star2,merchants_star3:merchants_star3
			,merchants_img:merchants_img});
		break;
	case 5:
		getDataByPost(index,homeurl+"merchantsController.api?deleteMerchantsDetail",{
			merchants_id:merchantsBeans[merchants_index].merchants_id});
		break;
	case 6:
		getDataByPost(index,homeurl+"merchantsController.api?updateMerchantsPassword",{
			merchants_id:merchantsBeans[merchants_index].merchants_id,
			merchants_account:merchants_account,password:password});
		break;
	default:
		break;
	}
}

function doSuccess(index,data){
	switch (index) {
	case 1:
		merchantsBeans=data;
		addMerchants();
		break;
	case 2:
		startRequest(1);
		break;
	case 3:
		merchants_img=data;
		$("#merchants_img").attr("src",homeurl+merchants_img);
		break;
	case 4:
		startRequest(1);
		break;
	case 5:
		startRequest(1);
		break;
	case 6:
		startRequest(1);
		break;
	default:
		break;
	}
}
function addMerchants(){
	$("#listAll").empty();
	$.each(merchantsBeans, function(i, item) {
		var url="<div class='listAll'>" +
				"<div class='listHorizontalItem' style='min-hight: 50px;height: auto;'>" +
				"<label class='listLabel' style='width: 5%;'>"+(i+1)+"</label>" +
				"<label class='listLabel' style='width: 5%;'>"+item.merchants_id+"</label>" +
				"<label class='listLabel' style='width: 5%;'>"+item.merchants_account+"</label>" +
				"<label class='listLabel' style='width: 10%;'>"+item.hx_account+"</label>" +
				"<label class='listLabel' style='width: 10%;'>"+item.hx_pass+"</label>" +
				"<label class='listLabel' style='width:20%;'>"+item.merchants_name+"</label>" +
				"<label class='listLabel' style='width: 5%;'>"+item.merchants_star1+"</label>" +
				"<label class='listLabel' style='width: 5%;'>"+item.merchants_star2+"</label>" +
				"<label class='listLabel' style='width: 5%;'>"+item.merchants_star3+"</label>" +
				"<div class='listDiv'>" +
					"<a  href='javascript:void(0);' onclick='deleteMerchantsClick("+i+")' >删除	</a>" +
					"<a  href='javascript:void(0);' onclick='updateMerchantsClick("+i+")' >修改	</a>" +
					"<a  href='javascript:void(0);' onclick='updatePasswordClick("+i+")' >修改密码	</a>" +
					"<a href='goods_class.html?merchants_id="+item.merchants_id+"&parent_id=-1&type=1' >商品详情 	</a>" +
					"<a href='order_management.html?merchants_id="+item.merchants_id+"' >订单列表	</a>" +
					"<a href='merchants_assessment.html?relation_id="+item.merchants_id+"' >评价列表	</a>" +
					"<a href='order_chart.html?merchants_id="+item.merchants_id+"' >订单统计	</a>" +
					"<a href='http://kefu.easemob.com/mo/register' >注册客服</a>" +
				"</div>" +
				"</div>" +
				"</div>";
		$("#listAll").append(url);
	});
};

function searchMerchantsClick() {
	merchants_id=$("#search_id").val();
	merchants_account=$("#search_account").val();
	merchants_name=$("#search_name").val();
	
	if(isNaN(merchants_id)){
		showTip(-1, "ID含有非法数字");
		return;
	}
	
	
	startRequest(1);
}
function updatePasswordClick(i) {
	merchants_index=i;
	$("#opacityDiv").show();
	$("#updatePasswordDiv").show();
	$("#merchants_account_update").val(merchantsBeans[merchants_index].merchants_account);
	$("#merchants_password__update1").val("");
	$("#merchants_password__update2").val("");
}

function updatePassword() {
	merchants_account=$("#merchants_account_update").val();
	password=$("#merchants_password__update1").val();
	var merchants_password=$("#merchants_password__update2").val();
	
	if(merchants_account==''){
		showTip(-1, "账号不可为空");
		return;
	}
	
	if(password==''){
		showTip(-1, "密码不可为空");
		return;
	}
	
	
	if(merchants_password!=password){
		showTip(-1, "2次密码不匹配");
		return;
	}
	
	startRequest(6);
	closeDiv();
}
function deleteMerchantsClick(i) {
	merchants_index=i;
	showTip(1, "确定删除?");
}

function okTip(index) {
	switch (index) {
	case "1":
		startRequest(5);
		break;
	default:
		break;
	}
	
	closeTipDivClick();
}

function closeDiv() {
	$(document.body).css("height",window.screen.height+"px");
	$("#opacityDiv").hide();
	$("#addMerchantsDiv").hide();
	$("#okBtn").hide();
	$("#updatePasswordDiv").hide();
	
	$("#password").val("");
	$("#merchants_account").val("");
	$("#merchants_name").val("");
	$("#merchants_star1").val("");
	$("#merchants_star2").val("");
	$("#merchants_star3").val("");
	merchants_img='';
	$("#merchants_img").attr("src","../../images/icon/add.jpg");
}

function addMerchantsClick() {
	if($("#addMerchantsDiv").height()+50>window.screen.height){
		$(document.body).css("height",$("#addMerchantsDiv").height()+50+"px");	
	}	
	$("#okBtn").show();
	$("#passwordDiv").show();
	$("#opacityDiv").show();
	$("#addMerchantsDiv").show();	
}

function okMerchantsClick() {
	 merchants_account=$("#merchants_account").val();
	 password=$("#password").val();
	 merchants_name=$("#merchants_name").val();
	 merchants_star1=$("#merchants_star1").val();
	 merchants_star2=$("#merchants_star2").val();
	 merchants_star3=$("#merchants_star3").val();
	 if(merchants_account==''){
		 showTip(-1, "账号不能为空");
		 return;
	 } if(password==''){
		 showTip(-1, "密码不能为空");
		 return;
	 } if(merchants_name==''){
		 showTip(-1, "名称不能为空");
		 return;
	 } 
	 if(merchants_star1==''){
		 showTip(-1, "描述相符度不能为空");
		 return;
	 } 
	 if(isNaN(merchants_star1)||merchants_star1>5||merchants_star1<0){
		 showTip(-1, "描述相符度非法数字");
		 return;	
	 }
	 if(merchants_star2==''){
		 showTip(-1, "服务态度不能为空");
		 return;
	 } 
	 if(isNaN(merchants_star2)||merchants_star2>5||merchants_star2<0){
		 showTip(-1, "服务态度非法数字");
		 return;	
	 }
	 if(merchants_star3==''){
		 showTip(-1, "发货速度不能为空");
		 return;
	 } 
	 if(isNaN(merchants_star3)||merchants_star3>5||merchants_star3<0){
		 showTip(-1, "发货速速非法数字");
		 return;	
	 }
	 if(merchants_img==''){
		 showTip(-1, "");
		 return;
	 }
	 
	 startRequest(2);
	 closeDiv();
}

function updateMerchantsClick(index) {
	$("#updateBtn").show();
	$("#opacityDiv").show();
	$("#addMerchantsDiv").show();	
	$("#passwordDiv").hide();
	
	merchants_id=merchantsBeans[index].merchants_id;
	merchants_img=merchantsBeans[index].merchants_img;
	$("#merchants_img").attr("src",homeurl+merchants_img);
	
	$("#merchants_account").val(merchantsBeans[index].merchants_account);
	$("#merchants_name").val(merchantsBeans[index].merchants_name);
	$("#merchants_star1").val(merchantsBeans[index].merchants_star1);
	$("#merchants_star2").val(merchantsBeans[index].merchants_star2);
	$("#merchants_star3").val(merchantsBeans[index].merchants_star3);	
}

function updateClick() {
	 merchants_account=$("#merchants_account").val();
	 merchants_name=$("#merchants_name").val();
	 merchants_star1=$("#merchants_star1").val();
	 merchants_star2=$("#merchants_star2").val();
	 merchants_star3=$("#merchants_star3").val();
	 if(merchants_account==''){
		 showTip(-1, "账号不能为空");
		 return;
	 }
	 if(merchants_name==''){
		 showTip(-1, "名称不能为空");
		 return;
	 } 
	 if(merchants_star1==''){
		 showTip(-1, "描述相符度不能为空");
		 return;
	 } 
	 if(isNaN(merchants_star1)||merchants_star1>5||merchants_star1<0){
		 showTip(-1, "描述相符度非法数字");
		 return;	
	 }
	 if(merchants_star2==''){
		 showTip(-1, "服务态度不能为空");
		 return;
	 } 
	 if(isNaN(merchants_star2)||merchants_star2>5||merchants_star2<0){
		 showTip(-1, "服务态度非法数字");
		 return;	
	 }
	 if(merchants_star3==''){
		 showTip(-1, "发货速度不能为空");
		 return;
	 } 
	 if(isNaN(merchants_star3)||merchants_star3>5||merchants_star3<0){
		 showTip(-1, "发货速速非法数字");
		 return;	
	 }
	 
	 if(merchants_img==''){
		 showTip(-1, "图片不能为空");
		 return;
	 }
	 
	 startRequest(4);
	 closeDiv();
}
function uploadImg() {
	 $('#mercants_imgFile').click();
	 $('#mercants_imgFile').on('change', function() { 
		startRequest(3);	 
	 });  	 
}