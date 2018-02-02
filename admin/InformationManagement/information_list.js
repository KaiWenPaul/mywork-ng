var parent_id;
var informationBeans;
var information_index;
var information_img="";
var information_title;
var information_desc;
var information_url;
var information_integral;
var information_type;
var is_recommend;
var answer_num;
$(document).ready(function() {	
	window.parent.addNacigationBar("咨询详情列表");
	parent_id=getParameter(0,"parent_id");
	startRequest(1);
});

function startRequest(index) {
	switch (index) {
	case 1:
		getDataByPost(index,homeurl + "informationController.api?getInformationById",{parent_id:parent_id,page:page,limit:limit},'2');
		break;
	case 2:
		getDataByPost(index,homeurl + "informationController.api?deleteInformationDetail",{information_id:informationBeans[information_index].information_id});
		break;
	case 3:
		getDataByPost(index,homeurl + "informationController.api?updateInformationDetail",{information_id:information_id,
			information_title:information_title,
			information_desc:information_desc,
			information_img:information_img,
			information_url:information_url,
			information_integral:information_integral,
			information_type:information_type,
			is_recommend:is_recommend,
			answer_num:answer_num,
			parent_id:parent_id});
		break;
	case 4:
		getDataByPost(index,homeurl + "informationController.api?addInformationDetail",{information_title:information_title,
			information_desc:information_desc,
			information_img:information_img,
			information_url:information_url,
			information_integral:information_integral,
			information_type:information_type,
			is_recommend:is_recommend,
			answer_num:answer_num,
			parent_id:parent_id});
		break;
	default:
		break;
	}
};

function doSuccess(index,data){
	switch (index) {
	case 1:
		informationBeans=data;
		fullInformation();
		break;
	case 2:
		startRequest(1);
		break;
	case 3:
		showTip(-1, "修改成功");
		startRequest(1);
		break;
	case 4:
		startRequest(1);
		break;
	default:
		break;
	}
};
function updatePageData() {
	startRequest(1);
};


/**
 * 填充类别数据
 */
function fullInformation() {
	$("#listAll").empty();
	$.each(informationBeans, function(i, item) {
		var url="<div class='listAll'>" +
				"<div class='listHorizontalItem'>" +
				"<label class='listLabel' style='width:5%;'>"+(i+1)+"</label>" +
				"<label class='listLabel' style='width:5%;'>"+item.information_id+"</label>" +
				"<label class='listLabel' style='width:20%;'>"+item.information_title+"</label>" +
				"<label class='listLabel' style='width:5%;'>"+item.information_integral+"</label>" +
				"<label class='listLabel' style='width:5%;'>"+item.answer_num+"</label>" +
				"<label class='listLabel' style='width:5%;'>"+(item.is_recommend==0?"否":"是")+"</label>" +
				
				"<div class='listDiv'>" +
					"<a href='javascript:void(0);' onclick='deleteInformationClick("+i+")'>删除	</a>" +
					"<a href='javascript:void(0);' onclick='updateInformationClick("+i+")'>修改	</a>" +
					"<a href='information_questions.html?information_id="+item.information_id+"&answer_num="+item.answer_num+"'>问题列表	</a>" +
					//"<a href='information_editor.html?url="+item.information_url+"'>详情页编辑</a>" +
				"</div>" +
				"</div>" +
				"</div>";
		$("#listAll").append(url);
	});
}


function updateInformationClick(i) {
	information_index=i;
	$("#opacityDiv").show();
	$("#addInformationDiv").show();
	information_img=informationBeans[i].information_img;
	$("#information_img").attr("src",homeurl+information_img);
	$("#information_title").val(informationBeans[i].information_title);
	$("#information_desc").val(informationBeans[i].information_desc);
	$("#information_integral").val(informationBeans[i].information_integral);
	$("#is_recommend").val(informationBeans[i].is_recommend=="1"?"是":"否");
	$("#answer_num").val(informationBeans[i].answer_num);
	
	$("#okBtn").hide();
	$("#updateBtn").show();
}

function deleteInformationClick(i) {
	information_index=i;
	showTip(1,"确定删除?");
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
}

function addInformationDetailClick() {
	$("#opacityDiv").show();
	$("#addInformationDiv").show();	
	$("#okBtn").show();
	$("#updateBtn").hide();
}
function updateInformationClickInterface() {	
	information_id=informationBeans[information_index].information_id;
	 information_title=$("#information_title").val();
	 information_desc=$("#information_desc").val();
	 information_url='';
	 information_integral=$("#information_integral").val();
	 information_type='1';
	 is_recommend=$("#is_recommend").val()=="是"?1:0;
	 answer_num=$("#answer_num").val();
	
	if(information_title==''){
		showTip(-1,"标题不能为空");
		return;
	}
	
	if(information_desc==''){
		showTip(-1,"详情不能为空");
		return;
	}	

	if(information_img == ''){
		showTip(-1,"请先选择图片");
		return;
	}
	
	if(isNaN(information_integral)){
		showTip(-1,"奖励积分有非法数字");
		return;
	}
	if(isNaN(answer_num)){
		showTip(-1,"回答次数有非法数字");
		return;
	}
	
	startRequest(3);

	closeUpdateDiv();
}
function closeUpdateDiv() {
	$("#opacityDiv").hide();
	$("#addInformationDiv").hide();
}

function addInformationClick() {
	information_title=$("#information_title").val();
	information_desc=$("#information_desc").val();
	information_url='';
	information_integral=$("#information_integral").val();
	information_type='1';
	is_recommend=$("#is_recommend").val()=="是"?1:0;
	answer_num=$("#answer_num").val();
	
	if(information_title==''){
		showTip(-1,"标题不能为空");
		return;
	}
	
	if(information_desc==''){
		showTip(-1,"详情不能为空");
		return;
	}	

	if(information_img == ''){
		showTip(-1,"请先选择图片");
		return;
	}
	
	if(isNaN(information_integral)){
		showTip(-1,"奖励积分有非法数字");
		return;
	}
	if(isNaN(answer_num)){
		showTip(-1,"回答次数有非法数字");
		return;
	}
	
	startRequest(4);
	closeUpdateDiv();
}

function selectImgClick() {
	 $('#information_imgFile').click();
	 $('#information_imgFile').on('change', function() { 
		 $.ajaxFileUpload({  
		        url:homeurl+'imageInterface.api?uploadInformationImg',  
		        secureuri:false,  
		        fileElementId:['information_imgFile'],//file标签的id  
		        dataType: 'content',//返回数据的类型  
		        data:{},//一同上传的数据  
					success: function (data, status) {  
		        	var result = eval("(" + data + ")");
					if (result.status == "ok") {
						information_img=result.data;
						$("#information_img").attr("src",homeurl+information_img);
					} else {
						showTip(-1,result.error);
					}
		        },  
		        error: function (data, status, e) {  
		        	showTip(-1,e);
		        }  
		    });  
			 
	 });  	 
}