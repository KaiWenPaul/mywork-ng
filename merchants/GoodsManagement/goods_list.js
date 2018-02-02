var merchants_id;
var goodsBeans;
var goods_index;

var goods_id;
var goods_name;
var goods_img;
var goodsImgBeans=[];
var goods_price;
var goods_grade=1;
var goods_state;
var goods_type;
var is_give_integral;
var give_integral_value;
var is_deduct_integral;
var deduct_integral_value;
var deduct_integral_price;
var is_express;
var express_value;
var express_free_price;//大于多少则免运费
var goods_url;
var goods_address;
var hostUrl;
var parent_id;
var is_recommend;
var goods_stock;
var goods_imgs=[];
var img_index;


var percent_value = -1;// 积分抵扣比例
$(document).ready(function() {	
	window.parent.addNacigationBar(">商品列表");
	merchants_id=getParameter(0,"merchants_id");
	parent_id=getParameter(1,"parent_id");
	startRequest(1);	
	startRequest(8);
	$(".tableButton").css("background", "#ffffff");
	$(".tableButton").css("color", "#a8c4f2");
	$("#item1").css("background", "#a8c4f2");
	$("#item1").css("color", "#ffffff");
});

function itemClick(i) {
	goods_grade=i;	
	$(".tableButton").css("background", "#ffffff");
	$(".tableButton").css("color", "#a8c4f2");
	$("#item" + i).css("background", "#a8c4f2");
	$("#item" + i).css("color", "#ffffff");
	startRequest(1);
}

function startRequest(index) {
	switch (index) {
	case 1:
		console.log(merchants_id);
		getDataByPost(index,homeurl+"goodsController.api?getGoodsDetailByMerchantId",
				{merchants_id:merchants_id,page:page,limit:limit,parent_id:parent_id,goods_grade:goods_grade},"2");
		break;
	case 2:
		getDataByPost(index,homeurl+"goodsController.api?addGoodsdetail",
				{merchants_id:merchants_id,
			goods_name:goods_name,
			goods_img:goods_img,
			goods_price:goods_price,
			goods_type:goods_type,
			is_give_integral:is_give_integral,
			give_integral_value:give_integral_value,
			is_deduct_integral:is_deduct_integral,
			deduct_integral_value:deduct_integral_value,
			deduct_integral_price:deduct_integral_price,
			is_express:is_express,
			express_value:express_value,
			express_free_price:express_free_price,
			goods_address:goods_address,
			is_recommend:is_recommend,
			goods_stock:goods_stock
			,parent_id:parent_id,
			goods_grade:goods_grade});
		break;
	case 3:
		uploadFile(index,homeurl+"goodsController.api?uploadGoodsImg",'goods_imgFile');
		break;
	case 4:
		getDataByPost(index,homeurl+"goodsController.api?deleteGoodsdetail",
				{goods_id:goodsBeans[goods_index].goods_id});
		break;
	case 5:
		getDataByPost(index,homeurl+"goodsController.api?updateGoodsdetail",
				{
			goods_id:goodsBeans[goods_index].goods_id,
			merchants_id:merchants_id,
			goods_name:goods_name,
			goods_img:goods_img,
			goods_price:goods_price,
			goods_type:goods_type,
			is_give_integral:is_give_integral,
			give_integral_value:give_integral_value,
			is_deduct_integral:is_deduct_integral,
			deduct_integral_value:deduct_integral_value,
			deduct_integral_price:deduct_integral_price,
			is_express:is_express,
			express_value:express_value,
			express_free_price:express_free_price,
			goods_address:goods_address,
			is_recommend:is_recommend,
			goods_stock:goods_stock
			,parent_id:parent_id});
		break;
	case 6:
		uploadFile(index,homeurl+"goodsController.api?uploadGoodsImg",'goods_imgFile');
		break;
	case 7:
		console.log(goods_imgs.toString());
		getDataByPost(index,homeurl+"goodsController.api?addGoodsImg",
				{goods_id:goodsBeans[goods_index].goods_id,goods_imgs:goods_imgs.toString()});
		break;
	case 8:
		getDataByPost(index, homeurl
				+ "goodsController.api?getGoodsIntegralPercent", {});
		break;
	default:
		break;
	}
}

function doSuccess(index,data) {
	switch (index) {
	case 1:
		goodsBeans=data;
		addGoods();
		break;
	case 2:
		startRequest(1);
		break;
	case 3:
		goods_img=data;
		$("#goods_img").attr("src",homeurl+goods_img);
		break;
	case 4:
		startRequest(1);
		break;
	case 5:
		startRequest(1);
		break;
	case 6:
		if(img_index==-1){
			goods_imgs.push(data);
		}else{
			goods_imgs[img_index]=data;
		}
		addImg();
		break;
	case 7:
		startRequest(1);
		break;
	case 8:
		percent_value = data.percent_value;
		break;
	default:
		break;
	}
}

function addGoods(){
	$("#listAll").empty();
	$.each(goodsBeans, function(i, item) {
		var url="<div class='listAll'>" +
				"<div class='listHorizontalItem'>" +
				"<label class='listLabel' style='width:5%'>"+(i+1)+"</label>" +
				"<label class='listLabel' style='width:5%'>"+item.goods_id+"</label>" +
				"<label class='listLabel' style='width:5%'>"+item.goods_name+"</label>" +
				"<label class='listLabel' style='width:5%'>"+item.goods_price+"</label>" +
				"<label class='listLabel' style='width:5%'>"+(item.is_recommend==0?"否":"是")+"</label>" +
				"<label class='listLabel' style='width:5%'>"+(item.is_give_integral==0?"否":"是")+"</label>" +
				"<label class='listLabel' style='width:5%'>"+item.give_integral_value+"</label>" +
				"<label class='listLabel' style='width:5%'>"+(item.is_deduct_integral==0?"否":"是")+"</label>" +
				"<label class='listLabel' style='width:5%'>"+item.deduct_integral_value+"</label>" +
				"<label class='listLabel' style='width:5%'>"+item.deduct_integral_price+"</label>" +
				"<label class='listLabel' style='width:5%'>"+(item.is_express==0?"否":"是")+"</label>" +
				"<label class='listLabel' style='width:5%'>"+item.express_value+"</label>" +
				"<label class='listLabel' style='width:5%'>"+item.express_free_price+"</label>" +
				"<label class='listLabel' style='width:5%'>"+item.goods_stock+"</label>" +
				"<label class='listLabel' style='width:5%'>"+item.goods_address+"</label>" +
				"<div class='listDiv'>" +
					"<a  href='javascript:void(0);' onclick='deleteGoodsdetailClick("+i+")' >删除		</a>" +
					"<a  href='javascript:void(0);' onclick='updateGoodsdetailClick("+i+")' >修改		</a>" +
					"<a  href='javascript:void(0);' onclick='goodsImgClick("+i+")' >图片列表	</a>" +
					"<a href='goods_detail_editor.html?goods_url="+item.goods_url+"' >详细页编辑	</a>" +
					"<a href='goods_service.html?goods_id="+item.goods_id+"' >服务列表		</a>" +
					"<a href='goods_parameter_class.html?goods_id="+item.goods_id+"' >参数列表	</a>" +
					"<a href='../../admin/MerchantsManagement/goods_assessment.html?relation_id="+item.goods_id+"' >评价列表</a>" +
				"</div>" +
				"</div>" +
				"</div>";
		$("#listAll").append(url);
	});
};

function goodsImgClick(j) {
	goods_index=j;
	goods_imgs.length = 0; 
	
	$.each(goodsBeans[goods_index].goodsImgBeans, function(i, item) {
		goods_imgs.push(item.goods_img);	
	});
	addImg();
}

function addImg() {
	$("#imgList").empty();
	for(i=0;i<goods_imgs.length;i++){
		var url="<div class='listAll' >" +
				"<div class='listHorizontalItem' style='height:150px;'>" +
				"<img src='"+homeurl+goods_imgs[i]+"' style='width:100%;height:150px;' onclick='imgClick("+i+")'></img>" +
				"</div> <div style='text-align:center;' onclick='deleteImg("+i+")'><p1>删除</p1></div>" +
				"</div>";
		$("#imgList").append(url);
	};

	if($("#addGoodsImgDiv").height()+90>window.screen.height){
		$(document.body).css("height",$("#addGoodsImgDiv").height()+90+"px");	
	}	
	$("#opacityDiv").show();
	$("#addGoodsImgDiv").show();
}
function deleteImg(i){
	goods_imgs.splice(i,1);
	addImg();
}
function imgClick(i) {
	img_index=i;
	$('#goods_imgFile').click();
	$('#goods_imgFile').on('change', function() { 
		startRequest(6);	 
	});
}

function okGoodsImgClick() {
	if(goods_imgs.length<=0){
		showTip(-1,"未选择任何照片");
		return;
	}
	
	startRequest(7);
	
	closeDiv();
}
function updateGoodsdetailClick(i) {
	if($("#addGoodsDiv").height()+90>window.screen.height){
		$(document.body).css("height",$("#addGoodsDiv").height()+90+"px");	
	}
	
	$("#opacityDiv").show();
	$("#addGoodsDiv").show();
	$("#updateBtn").show();
	
	goods_index=i;
	$("#goods_name").val(goodsBeans[goods_index].goods_name);
	$("#goods_price").val(goodsBeans[goods_index].goods_price);
	$("#is_give_integral").val(goodsBeans[goods_index].is_give_integral=="1"?"是":"否");
	$("#give_integral_value").val(goodsBeans[goods_index].give_integral_value);
	$("#is_deduct_integral").val(goodsBeans[goods_index].is_deduct_integral=="1"?"是":"否");
	$("#deduct_integral_value").val(goodsBeans[goods_index].deduct_integral_value);
	$("#deduct_integral_price").val(goodsBeans[goods_index].deduct_integral_price);
	$("#is_express").val(goodsBeans[goods_index].is_express=="1"?"是":"否");
	$("#express_value").val(goodsBeans[goods_index].express_value);
	$("#express_free_price").val(goodsBeans[goods_index].express_free_price);//大于多少则免运费
	$("#goods_address").val(goodsBeans[goods_index].goods_address);
	$("#is_recommend").val(goodsBeans[goods_index].is_recommend=="1"?"是":"否");
	$("#goods_stock").val(goodsBeans[goods_index].goods_stock);
	
	goods_img=goodsBeans[goods_index].goods_img;
	$("#goods_img").attr("src",homeurl+goods_img);
}

function updateGoodsClick() {
	 goods_name=$("#goods_name").val();
	 goods_price=$("#goods_price").val();
	 is_give_integral=$("#is_give_integral").val()=='是'?"1":"0";
	 give_integral_value=$("#give_integral_value").val();
	 is_deduct_integral=$("#is_deduct_integral").val()=='是'?"1":"0";
	 deduct_integral_value=$("#deduct_integral_value").val();
	 deduct_integral_price=$("#deduct_integral_price").val();
	 is_express=$("#is_express").val()=='是'?"1":"0";
	 express_value=$("#express_value").val();
	 express_free_price=$("#express_free_price").val();//大于多少则免运费
	 goods_address=$("#goods_address").val();
	 is_recommend=$("#is_recommend").val()=='是'?"1":"0";
	 goods_stock=$("#goods_stock").val();
	
	 if (goods_name == '') {
			showTip(-1, "商品名称不可为空");
			return;
		}
		if (goods_price == '') {
			showTip(-1, "商品价格不可为空");
			return;
		}
		
		if (isNaN(goods_price)||parseFloat(goods_price)<0) {
			showTip(-1, "商品价格含有非法数字");
			return;
		}
		
		if (goods_img == '') {
			showTip(-1, "图片不可为空");
			return;
		}

		if (is_give_integral == '1' && give_integral_value == '') {
			showTip(-1, "赠送积分不可为空");
			return;
		}
		if (is_give_integral == '1' && (isNaN(give_integral_value)||parseFloat(give_integral_value)<0)) {
			showTip(-1, "赠送积分含有非法数字");
			return;
		}

		if (is_deduct_integral == '1' && deduct_integral_value == '') {
			showTip(-1, "抵扣积分不可为空");
			return;
		}

		if (is_deduct_integral == '1' && (isNaN(deduct_integral_value)||parseFloat(deduct_integral_value)<0)) {
			showTip(-1, "抵扣积分含有非法数字");
			return;
		}
		
		if (percent_value == -1) {
			showTip(-1, "积分抵扣值加载中....");
			return;
		}
		
		if(parseFloat(deduct_integral_value)*(percent_value/100)>=goods_price){
			showTip(-1, "抵扣积分已超过商品价格");
			return;
		}
		
//		if (is_deduct_integral == '1' && deduct_integral_price == '') {
//			showTip(-1, "抵扣现金不可为空");
//			return;
//		}
//
//		if (is_deduct_integral == '1' && (isNaN(deduct_integral_price)||parseFloat(deduct_integral_price))<0) {
//			showTip(-1, "抵扣现金含有非法数字");
//			return;
//		}

		if (is_express == '0' && express_value == '') {
			showTip(-1, "运费不可为空");
			return;
		}
		if (is_express == '0' && (isNaN(express_value)||parseFloat(express_value)<0)) {
			showTip(-1, "运费含有非法数字");
			return;
		}
		if (is_express == '0' && express_free_price == '') {
			showTip(-1, "满多少免邮不可为空");
			return;
		}
		if (is_express == '0' && (isNaN(express_free_price)||parseFloat(express_free_price)<0)) {
			showTip(-1, "满多少免邮含有非法数字");
			return;
		}
		if (goods_stock == '') {
			showTip(-1, "库存不可为空");
			return;
		}
		if (isNaN(goods_stock)) {
			showTip(-1, "库存含非法数字");
			return;
		}
		if (goods_address == '') {
			showTip(-1, "所属地不能为空");
			return;
		}
	 startRequest(5);
	 closeDiv();
}
function deleteGoodsdetailClick(i) {
	goods_index=i;
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
function updatePageData() {
	startRequest(1);
}

function closeDiv() {
	$(document.body).css("height",window.screen.height+"px");
	
	$("#opacityDiv").hide();
	$("#addGoodsDiv").hide();
	$("#okBtn").hide();
	$("#updateBtn").hide();
	$("#addGoodsImgDiv").hide();
	
	$("#goods_name").val("");
	$("#goods_price").val("");
	$("#is_give_integral").val("");
	$("#give_integral_value").val("");
	$("#is_deduct_integral").val("");
	$("#deduct_integral_value").val("");
	$("#deduct_integral_price").val("");
	$("#is_express").val("");
	$("#express_value").val("");
	$("#express_free_price").val("");//大于多少则免运费
	$("#goods_address").val("");
	$("#is_recommend").val("");
	$("#goods_stock").val("");
	
	goods_img="";
	$("#goods_img").attr("src","../../images/icon/add.jpg");
}

function okGoodsClick() {
	 goods_name=$("#goods_name").val();
	 goods_price=$("#goods_price").val();
	 is_give_integral=$("#is_give_integral").val()=='是'?"1":"0";
	 give_integral_value=$("#give_integral_value").val();
	 is_deduct_integral=$("#is_deduct_integral").val()=='是'?"1":"0";
	 deduct_integral_value=$("#deduct_integral_value").val();
	 deduct_integral_price=$("#deduct_integral_price").val();
	 is_express=$("#is_express").val()=='是'?"1":"0";
	 express_value=$("#express_value").val();
	 express_free_price=$("#express_free_price").val();//大于多少则免运费
	 goods_address=$("#goods_address").val();
	 is_recommend=$("#is_recommend").val()=='是'?"1":"0";
	 goods_stock=$("#goods_stock").val();
	
	 if (goods_name == '') {
			showTip(-1, "商品名称不可为空");
			return;
		}
		if (goods_price == '') {
			showTip(-1, "商品价格不可为空");
			return;
		}
		
		if (isNaN(goods_price)||parseFloat(goods_price)<0) {
			showTip(-1, "商品价格含有非法数字");
			return;
		}
		
		if (goods_img == '') {
			showTip(-1, "图片不可为空");
			return;
		}

		if (is_give_integral == '1' && give_integral_value == '') {
			showTip(-1, "赠送积分不可为空");
			return;
		}
		if (is_give_integral == '1' && (isNaN(give_integral_value)||parseFloat(give_integral_value)<0)) {
			showTip(-1, "赠送积分含有非法数字");
			return;
		}

		if (is_deduct_integral == '1' && deduct_integral_value == '') {
			showTip(-1, "抵扣积分不可为空");
			return;
		}

		if (is_deduct_integral == '1' && (isNaN(deduct_integral_value)||parseFloat(deduct_integral_value)<0)) {
			showTip(-1, "抵扣积分含有非法数字");
			return;
		}
		
		if (percent_value == -1) {
			showTip(-1, "积分抵扣值加载中....");
			return;
		}
		
		if(parseFloat(deduct_integral_value)*(percent_value/100)>=goods_price){
			showTip(-1, "抵扣积分已超过商品价格");
			return;
		}
		
//		if (is_deduct_integral == '1' && deduct_integral_price == '') {
//			showTip(-1, "抵扣现金不可为空");
//			return;
//		}
//
//		if (is_deduct_integral == '1' && (isNaN(deduct_integral_price)||parseFloat(deduct_integral_price))<0) {
//			showTip(-1, "抵扣现金含有非法数字");
//			return;
//		}

		if (is_express == '0' && express_value == '') {
			showTip(-1, "运费不可为空");
			return;
		}
		if (is_express == '0' && (isNaN(express_value)||parseFloat(express_value)<0)) {
			showTip(-1, "运费含有非法数字");
			return;
		}
		if (is_express == '0' && express_free_price == '') {
			showTip(-1, "满多少免邮不可为空");
			return;
		}
		if (is_express == '0' && (isNaN(express_free_price)||parseFloat(express_free_price)<0)) {
			showTip(-1, "满多少免邮含有非法数字");
			return;
		}
		if (goods_stock == '') {
			showTip(-1, "库存不可为空");
			return;
		}
		if (isNaN(goods_stock)) {
			showTip(-1, "库存含非法数字");
			return;
		}
		if (goods_address == '') {
			showTip(-1, "所属地不能为空");
			return;
		}
	 startRequest(2);
	 closeDiv();
}

function addGoodsDetailClick() {
	if($("#addGoodsDiv").height()+90>window.screen.height){
		$(document.body).css("height",$("#addGoodsDiv").height()+90+"px");	
	}	
	
	$("#opacityDiv").show();
	$("#addGoodsDiv").show();
	$("#okBtn").show();
}

function selectImgClick() {
	 $('#goods_imgFile').click();
	 $('#goods_imgFile').on('change', function() { 
		startRequest(3);	 
	 });  
	
}