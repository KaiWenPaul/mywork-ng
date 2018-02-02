var merchants_name;
var merchants_img;
var merchants_id;
var merchants_account;
var password;
var merchants_desc_img;
$(document).ready(function() {	
	$("#merchants_name").val(GetCookie("merchants_name"));
	merchants_img=GetCookie("merchants_img");
	$("#merchants_img").attr("src",homeurl+merchants_img);
	merchants_desc_img=GetCookie("merchants_desc_img");
	$("#merchants_desc_img").attr("src",homeurl+merchants_desc_img);
	
	merchants_id=GetCookie("merchants_id");
	merchants_account=GetCookie("merchants_account");
});

function outLogin() {
	SetCookie("merchants_id","");
	SetCookie("merchants_account","");
	SetCookie("password","");
	SetCookie("merchants_token","");
	SetCookie("merchants_name","");
	SetCookie("merchants_img","");
	
	parent.location.href='login.html';
}

function startRequest(index) {
	switch (index) {
	case 1:
		uploadFile(index,homeurl+"merchantsController.api?uploadMerchantsImg","merchants_imgFile");
		break;
	case 2:
		console.log(merchants_img);
		getDataByPost(index,homeurl+"merchantsController.api?updateMerchantsAccount",{
			merchants_id:merchants_id
			,merchants_name:merchants_name
			,merchants_img:merchants_img
			,merchants_desc_img:merchants_desc_img});
		break;
	case 3:
		getDataByPost(index,homeurl+"merchantsController.api?updateMerchantsPassword",{
			merchants_id:merchants_id,
			merchants_account:merchants_account,
			password:password});
		break;
	case 4:
		uploadFile(index,homeurl+"merchantsController.api?uploadMerchantsImg","merchants_desc_imgFile");
		break;
	default:
		break;
	}
}

function doSuccess(index,data) {
	switch (index) {
	case 1:
		merchants_img=data;
		$("#merchants_img").attr("src",homeurl+merchants_img);
		break;
	case 2:
		SetCookie("merchants_img",merchants_img);
		SetCookie("merchants_name",merchants_name);
		SetCookie("merchants_desc_img",merchants_desc_img);
		$("#merchants_name",parent.document).text(GetCookie("merchants_name"));
		$("#merchants_img",parent.document).attr("src",homeurl+GetCookie("merchants_img"));	
		showTip(-1, "修改成功");
		break;
	case 3:
		SetCookie("merchants_id","");
		SetCookie("merchants_account","");
		SetCookie("password","");
		SetCookie("merchants_token","");
		SetCookie("merchants_name","");
		SetCookie("merchants_img","");
		parent.location.href='login.html';
		break;
	case 4:
		merchants_desc_img=data;
		$("#merchants_desc_img").attr("src",homeurl+merchants_desc_img);
		break;
	default:
		break;
	}
}

function headClick() {
	 $('#merchants_imgFile').click();
	 $('#merchants_imgFile').on('change', function() { 
		startRequest(1);	 
	 });
}

function descImgClick() {
	 $('#merchants_desc_imgFile').click();
	 $('#merchants_desc_imgFile').on('change', function() { 
		startRequest(4);	 
	 });
}

function saveInformation() {
	if(merchants_img==''){
		showTip(-1, "头像不可为空");
		return;
	}
	
	if(merchants_desc_img==''){
		showTip(-1, "背景图不可为空");
		return;
	}
	merchants_name=$("#merchants_name").val();
	
	if(merchants_name==''){
		showTip(-1, "名称不可为空");
		return;
	}
	
	startRequest(2);
}

function passwordClick() {
	$("#opacityDiv").show();
	$("#updatePasswordDiv").show();
	$("#merchants_password__update1").val("");
	$("#merchants_password__update2").val("");

}
function updatePassword() {
	password=$("#merchants_password__update1").val();
	var merchants_password=$("#merchants_password__update2").val();
	
	if(password==''){
		showTip(-1, "密码不可为空");
		return;
	}
	
	
	if(merchants_password!=password){
		showTip(-1, "2次密码不匹配");
		return;
	}
	
	startRequest(3);
	closeDiv();
}


function closeDiv() {
	$("#opacityDiv").hide();
	$("#updatePasswordDiv").hide();
}