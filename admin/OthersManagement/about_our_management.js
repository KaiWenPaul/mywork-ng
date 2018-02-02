var companyBean;

var comapny_mobile;
var company_qq;
var company_wx;
var company_email;
var company_address;
$(document).ready(function() {
	startRequest(1);
});

function startRequest(index) {
	switch (index) {
	case 1:
		getDataByPost(index,homeurl+"OthersController.sp?getAbountOurInformationAdmin",{});
		break;
	case 2:
		getDataByPost(index,homeurl+"OthersController.sp?updateAbourtOurInformation",{company_id:companyBean.company_id,
			company_mobile:company_mobile,company_qq:company_qq,
			company_wx:company_wx,company_email:company_email,company_address:company_address});
		break;
	default:
		break;
	}
}

function doSuccess(index,data) {
	switch (index) {
	case 1:
		companyBean=data;
		fullCompany();
		break;
	case 2:
		showTip(-1, "保存成功");
		break;
	default:
		break;
	}
}

function fullCompany() {
	$("#company_mobile").val(companyBean.company_mobile);
	$("#company_qq").val(companyBean.company_qq);
	$("#company_wx").val(companyBean.company_wx);
	$("#company_email").val(companyBean.company_email);
	$("#company_address").val(companyBean.company_address);
}

function updateCompany() {
	company_mobile=$("#company_mobile").val();
	company_qq=$("#company_qq").val();
	company_wx=$("#company_wx").val();
	company_email=$("#company_email").val();
	company_address=$("#company_address").val();
	
	startRequest(2);
}