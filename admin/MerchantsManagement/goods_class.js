var merchants_id;
var parent_id;
var type;//1一级分类 2二级分类
var goodsBeans;

var goods_name;
$(document).ready(function() {	
	merchants_id=getParameter(0,"merchants_id");
	parent_id=getParameter(1,"parent_id");
	type=getParameter(2,"type");		
	startRequest(1);
	if(type==1){
		window.parent.addNacigationBar("一级分类");
	}else{
		window.parent.addNacigationBar(">二级分类");
	}
});


function startRequest(index) {
	switch (index) {
	case 1:
		getDataByPost(index,homeurl+"goodsController.api?getGoodsByMerchantId",
				{merchants_id:merchants_id,page:page,limit:limit,parent_id:parent_id},"2");
		break;
	case 2:
		getDataByPost(index,homeurl+"goodsController.api?addGoodsClass",
				{merchants_id:merchants_id,parent_id:parent_id,goods_name:goods_name});
		break;
	case 3:
		getDataByPost(index,homeurl+"goodsController.api?deleteGoodsClass",
				{goods_id:goodsBeans[goods_index].goods_id});
		break;
	case 4:
		getDataByPost(index,homeurl+"goodsController.api?updateGoodsClass",
				{goods_id:goodsBeans[goods_index].goods_id,goods_name:goods_name});
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
		startRequest(1);
		break;
	case 4:
		startRequest(1);
		break;
	default:
		break;
	}
}

function addGoods(){
	$("#listAll").empty();
	$.each(goodsBeans, function(i, item) {
		var url="<div class='listAll'>" +
				"<div class='listHorizontalItem' >" +
				"<label class='listLabel' >"+(i+1)+"</label>" +
				"<label class='listLabel'>"+item.goods_id+"</label>" +
				"<label class='listLabel' style='width:20%'>"+item.goods_name+"</label>" +
				"<div class='listDiv'>";
		
			/*		"<a  href='javascript:void(0);' onclick='deleteGoodsClassClick("+i+")' >删除	</a>" +
					"<a  href='javascript:void(0);' onclick='updateGoodsClassClick("+i+")' >修改	</a>"  ;*/
				
		if(type=='1'){
			console.log(merchants_id);
			url+="<a href='goods_class.html?merchants_id="+merchants_id+"&parent_id="+item.goods_id+"&type=2' >二级分类</a>";
		}else{
			url+="<a href='goods_list.html?merchants_id="+merchants_id+"&parent_id="+item.goods_id+"' >商品列表</a>";
		}
		
		url+="</div>" +
		"</div>" +
		"</div>";
		$("#listAll").append(url);
	});
};

function updatePageData() {
	startRequest(1);
}

function addGoodsClassClick() {
	goods_name=$("#goods_name").val();
	if(goods_name==''){
		showTip(-1, "名称不可为空");
		return;
	}
	
	startRequest(2);
}
function deleteGoodsClassClick(i) {
	goods_index=i;
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

function updateGoodsClassClick(i) {
	goods_index=i;
	if($("#addGoodsDiv").height()+50>window.screen.height){
		$(document.body).css("height",$("#addGoodsDiv").height()+50+"px");	
	}	
	$("#okBtn").show();
	$("#opacityDiv").show();
	$("#addGoodsDiv").show();
	
	$("#update_goods_name").val(goodsBeans[goods_index].goods_name);
}

function closeDiv() {
	$(document.body).css("height",window.screen.height+"px");
	$("#opacityDiv").hide();
	$("#addGoodsDiv").hide();
	$("#okBtn").hide();
	
	$("#update_goods_name").val("");
}

function okGoodsClick() {
	goods_name=$("#update_goods_name").val();
	if(goods_name==''){
		showTip(-1, "名称不可为空");
		return;
	}
	startRequest(4);
	closeDiv();
}