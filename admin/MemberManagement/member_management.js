var memberBeans;
var mobile;
var password;
var member_type;
var nick_name;
var age;
var sex;
var phone;
var job_unit;
var position;
var hobby;
var head_path;
var invitation_code;
var fill_invitation_code;
var member_index;
var member_id;

$(document).ready(function() {
	startRequest(1);
});

function startRequest(index) {
	switch (index) {
	case 1:
		getDataByPost(index,homeurl+"memberController.api?getAllMember",{page:page,limit:limit,member_id:(member_id==''?0:member_id)
			,mobile:mobile,nick_name:nick_name},'2');
		break;
	case 2:
		getDataByPost(index,homeurl+"memberController.api?memberRegister",
				{mobile:mobile,password:password,member_type:member_type});
		break;
	case 3:
		getDataByPost(index,homeurl+"memberController.api?memberUpdatePassword",
				{member_id:memberBeans[member_index].member_id,password:password});
		break;
	case 4:
		getDataByPost(index,homeurl+"memberController.api?updateMemberDetailByAdmin",
				{member_id:memberBeans[member_index].member_id,nick_name:nick_name,
			age:age,sex:sex,phone:phone,job_unit:job_unit,position:position,hobby:hobby,
			member_type:member_type,head_path:head_path,
			invitation_code:invitation_code,
			fill_invitation_code:fill_invitation_code});
		break;
	case 5:
		uploadFile(index,homeurl+"memberController.api?uploadMemberImg","head_pathFile");
		break;
	case 6:
		getDataByPost(index,homeurl+"memberController.api?deleteMemberDetailByAdmin",
				{member_id:memberBeans[member_index].member_id});
		break;
	default:
		break;
	}
}

function doSuccess(index,data) {
	switch (index) {
	case 1:
		memberBeans=data;
		addMember();
		break;
	case 2:
		startRequest(1);
		break;
	case 3:
		showTip(-1, "修改成功")
		break;
	case 4:
		startRequest(1);
		break;
	case 5:
		head_path=data;
		$("#head_path").attr("src",homeurl+head_path);
		break;
	case 6:
		startRequest(1);
		break;
	default:
		break;
	}
}

function addMember() {
	$("#listAll").empty();
	$.each(memberBeans, function(i, item) {
		var url="<div class='listAll'>" +
				"<div class='listHorizontalItem'>" +
				"<label class='listLabel' style='width:5%;'>"+(i+1)+"</label>" +
				"<label class='listLabel' style='width:5%;'>"+item.member_id+"</label>" +
				"<label class='listLabel' style='width:10%;'>"+item.mobile+"</label>" +
				"<label class='listLabel' style='width:5%;'>"+item.nick_name+"</label>" +
				"<label class='listLabel' style='width:5%;'>"+item.age+"</label>" +
				"<label class='listLabel' style='width:5%;'>"+(item.sex==1?"男":"女")+"</label>" +
				"<label class='listLabel' style='width:5%;'>"+item.phone+"</label>" +
				"<label class='listLabel' style='width:5%;'>"+item.job_unit+"</label>" +
				"<label class='listLabel' style='width:5%;'>"+item.position+"</label>" +
				"<label class='listLabel' style='width:5%;'>"+item.hobby+"</label>" +
				"<label class='listLabel' style='width:5%;'>"+(item.member_type==1?"普通用户":(item.member_type==2?"学员":"老师"))+"</label>" +
				"<div class='listDiv'>" +
					"<label class='listLabel' style='width:10%;'>"+item.integral+"</label>" +
					"<a  href='integral_management.html?member_id="+item.member_id+"&member_type="+item.member_type+"&invitation_code="+item.invitation_code+"'>来源	</a>" +
				"</div>" +
				"<label class='listLabel' style='width:5%;'>"+item.balance+"</label>" +
				"<label class='listLabel' style='width:5%;'>"+item.invitation_code+"</label>" +
				"<label class='listLabel' style='width:5%;'>"+item.fill_invitation_code+"</label>" +
				"<div class='listDiv'>" +
					"<a  href='javascript:void(0);' onclick='deleteMemberDetail("+i+")' >删除	</a>" +
					"<a  href='javascript:void(0);' onclick='updateMemberDetail("+i+")' >修改	</a>" +
					"<a  href='javascript:void(0);' onclick='memberUpdatePassword("+i+")' >修改密码	</a>" +
					"<a href='order_list.html?member_id="+item.member_id+"'>订单列表	</a>" +
					"<a href='member_address.html?member_id="+item.member_id+"'>地址列表	</a>" +
					"<a href='member_assessment.html?member_id="+item.member_id+"'>评价列表	</a>" +
					"<a href='member_collection.html?member_id="+item.member_id+"'>收藏列表	</a>" +
					"<a href='member_shopping_car.html?member_id="+item.member_id+"'>购物车</a>" +
				"</div>" +
				"</div>" +
				"</div>";
		$("#listAll").append(url);
	});
}

function searchMemberClick() {
	member_id=$("#search_id").val();
	mobile=$("#search_mobile").val();
	nick_name=$("#search_nick_name").val();
	if(isNaN(member_id)){
		showTip(-1, "ID含有非法数字");
		return;
	}
	
	startRequest(1);
}

function deleteMemberDetail(i) {
	member_index=i;
	showTip(1, "确定删除?");
}

function okTip(index) {
	switch (index) {
	case "1":
		startRequest(6);
		break;
	default:
		break;
	}
	closeTipDivClick();
}
function uploadImg() {
	 $('#head_pathFile').click();
	 $('#head_pathFile').on('change', function() { 
		startRequest(5);	 
	 });  	 
}

function updateMemberDetail(i) {
	member_index=i;
	$("#opacityDiv").show();
	$("#updateMemberDiv").show();
	
	head_path=memberBeans[member_index].head_path;
	$("#head_path").attr("src",homeurl+head_path);
	$("#nick_name").val(memberBeans[member_index].nick_name);
	$("#age").val(memberBeans[member_index].age);
	$("#sex option[tag="+memberBeans[member_index].sex+"]").attr("selected", true);
	$("#phone").val(memberBeans[member_index].phone);
	$("#job_unit").val(memberBeans[member_index].job_unit);
	$("#position").val(memberBeans[member_index].position);
	$("#hobby").val(memberBeans[member_index].hobby);
	$("#invitation_code").val(memberBeans[member_index].invitation_code);
	$("#fill_invitation_code").val(memberBeans[member_index].fill_invitation_code);
	
	$("#member_type1 option[tag="+memberBeans[member_index].member_type+"]").attr("selected", true);
	
}

function updateMemberDetailClick() {
	nick_name=$("#nick_name").val();
	age=$("#age").val();
	sex=$("#sex").find("option:selected").attr("tag");
	phone=$("#phone").val();
	job_unit=$("#job_unit").val();
	position=$("#position").val();
	hobby=$("#hobby").val();
	member_type=$("#member_type1").find("option:selected").attr("tag");
	invitation_code=$("#invitation_code").val();
	fill_invitation_code=$("#fill_invitation_code").val();
	startRequest(4);
	closeDiv();
}

function memberUpdatePassword(i) {
	member_index=i;
	$("#opacityDiv").show();
	$("#addMemberDiv").show();
	$("#updateButton").show();
	
	$("#member_mobile").val('');
	$("#member_password1").val('');
	$("#member_password2").val('');
}

function updateAddAccount() {
	password=$("#member_password1").val();
	var member_password=$("#member_password2").val();
	if(password==''){
		showTip(-1, "密码不可为空");
		return;
	}
	
	if(password!=member_password){
		showTip(-1, "2次密码不匹配");
		return;
	}
	
	startRequest(3);
	closeDiv();
}

function addMemberClick() {
	$("#opacityDiv").show();
	$("#addMemberDiv").show();
	$("#accountDiv").show();
	$("#roleDiv").show();
	$("#okButton").show();
	
	$("#member_mobile").val('');
	$("#member_password1").val('');
	$("#member_password2").val('');
	//$("#member_type option[tag='2']").attr("selected", true);
}

function okAddAccount() {
	mobile=$("#member_mobile").val();
	password=$("#member_password1").val();
	var member_password=$("#member_password2").val();
	member_type=$("#member_type").find("option:selected").attr("tag");
	
	if(!mobile.match(/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|(17[0-9]{1}))+\d{8})$/)){
		showTip(-1, "手机账号格式不正确");
		return;
	}
	
	if(password==''){
		showTip(-1, "密码不可为空");
		return;
	}
	
	if(password!=member_password){
		showTip(-1, "2次密码不匹配");
		return;
	}
	
	startRequest(2);
	closeDiv();
}

function closeDiv() {
	$("#opacityDiv").hide();
	$("#addMemberDiv").hide();
	$("#accountDiv").hide();
	$("#roleDiv").hide();
	$("#okButton").hide();
	$("#updateButton").hide();
	$("#updateMemberDiv").hide();
}