var parent_id;
var type;//1一级分类 2二级分类
var goodsBeans;

var goods_name;
var goods_img;
var is_recommend;
$(document).ready(function() {
	parent_id=getParameter(0,"parent_id");
	type=getParameter(1,"type");
	if(type==2){
		window.parent.addNacigationBar("二级分类");
	}
	startRequest(1);
});


function startRequest(index) {
	switch (index) {
	case 1:
		getDataByPost(index,homeurl+"goodsController.api?getGoodsByMerchantId",
				{page:page,limit:limit,parent_id:parent_id},"2");
		break;
	case 2:
		getDataByPost(index,homeurl+"goodsController.api?addGoodsClass",
				{parent_id:parent_id,goods_name:goods_name,goods_img:goods_img,is_recommend:is_recommend});
		break;
	case 3:
		getDataByPost(index,homeurl+"goodsController.api?deleteGoodsClass",
				{goods_id:goodsBeans[goods_index].goods_id});
		break;
	case 4:
		getDataByPost(index,homeurl+"goodsController.api?updateGoodsClass",
				{goods_id:goodsBeans[goods_index].goods_id,goods_name:goods_name,goods_img:goods_img,is_recommend:is_recommend});
		break;
	case 5:
		uploadFile(index,homeurl+"goodsController.api?uploadGoodsImg",'goods_imgFile');
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
	case 5:
		goods_img=data;
		$("#goods_img").attr("src",homeurl+goods_img);
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
				"<div class='listDiv'>" +
					"<img src='"+(homeurl+item.goods_img)+"' style='height:100px;'/>" +
				"</div>"+
				"<label class='listLabel'>"+(item.is_recommend==1?"是":"否")+"</label>" +
				"<div class='listDiv'>" +
					"<a  href='javascript:void(0);' onclick='deleteGoodsClassClick("+i+")' >删除	</a>" +
					"<a  href='javascript:void(0);' onclick='updateGoodsClassClick("+i+")' >修改	</a>"  ;
				
		if(type=='1'){
			url+="<a href='goods_class.html?parent_id="+item.goods_id+"&type=2' >二级分类</a>";
		}
		
		url+="</div>" +
		"</div>" +
		"</div>";
		$("#listAll").append(url);
	});
};

function addGoodsClassClick() {	
	if($("#addGoodsDiv").height()+50>window.screen.height){
		$(document.body).css("height",$("#addGoodsDiv").height()+50+"px");	
	}	
	$("#okBtn").show();
	$("#opacityDiv").show();
	$("#addGoodsDiv").show();
	
	if(type=='2'){
		$("#recommend_div").hide();
		$("#img_div").hide();
	}
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
	$("#updateBtn").show();
	$("#opacityDiv").show();
	$("#addGoodsDiv").show();
	
	if(type=='2'){
		$("#recommend_div").hide();
		$("#img_div").hide();
	}
	
	$("#update_goods_name").val(goodsBeans[goods_index].goods_name);
	goods_img=goodsBeans[goods_index].goods_img;
	$("#goods_img").attr("src",homeurl+goods_img);
	console.log(goodsBeans[goods_index].is_recommend+"");
	setSelectTag("is_recommend","tag",goodsBeans[goods_index].is_recommend);
}

function closeDiv() {
	$(document.body).css("height",window.screen.height+"px");
	$("#opacityDiv").hide();
	$("#addGoodsDiv").hide();
	$("#okBtn").hide();
	$("#updateBtn").hide();
	$("#update_goods_name").val("");
	goods_img='';
	$("#goods_img").attr("src",homeurl+"images/icon/add.jpg");
}
function okGoodsClick() {
	goods_name=$("#update_goods_name").val();
	if(goods_name==''){
		showTip(-1, "名称不可为空");
		return;
	}
	
	if(type=='1'){
		if(goods_img==''){
			showTip(-1, "图像不可为空");
			return;
		}
	}
	
	is_recommend=getSelectTag("is_recommend","tag");
	startRequest(2);
	closeDiv();
}
function updateGoodsClick() {
	goods_name=$("#update_goods_name").val();
	if(goods_name==''){
		showTip(-1, "名称不可为空");
		return;
	}
	
	if(type=='1'){
		if(goods_img==''){
			showTip(-1, "图像不可为空");
			return;
		}
	}
	
	is_recommend=getSelectTag("is_recommend","tag");
	startRequest(4);
	closeDiv();
}

function selectImgClick() {
	 $('#goods_imgFile').click();
	 $('#goods_imgFile').on('change', function() { 
		startRequest(5);	 
	 });  
	
}