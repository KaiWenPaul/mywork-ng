	var itemBeans;
	var menuBeans;
	var merchants_id;
	$(document).ready(function() {	
		console.log("222");
		$("#merchants_name").text(GetCookie("merchants_name"));
		$("#merchants_img").attr("src",homeurl+GetCookie("merchants_img"));	
		merchants_id=getParameter(0,"merchants_id");
		startInit('mainFrame',window.screen.height);				
		getDataByPost(1,homeurl + "systemMoudleController.sp?getMenuBeansById",{merchants_id:merchants_id});
	});

	function doSuccess(index,data) {
		addItem(data);
	}
	
	function addItem(itemBeans) {
		this.itemBeans = itemBeans;
		$("#itemList").empty();
		$.each(itemBeans, function(i, item) {
			var url = "";
			url += "<div class='tableDiv'> " +
						"<input class='tableButton' id='item" + i + "' type='button' value='" + item.moudle_name+ "' onclick='itemClick("+ i + ")' />" +
					"</div>";
			$("#itemList").append(url);
		});
		addMenu(itemBeans[0].menuBeans);
		$(".tableButton").css("background", "#034172");
		$(".tableButton").css("color", "#ffffff");
		$("#item" + 0).css("background", "#ffffff");
		$("#item" + 0).css("color", "#034172");
	}
	
	function addMenu(menuBeans) {
		clearNacigationBar();
		this.menuBeans=menuBeans;
		$("#menuList").empty();
		$.each(menuBeans,function(i, item) {
							var url = "";
							url += "<div style='height:50px';width:100%'>";
							url += "<input class='menu' id='menu" + i
									+ "' type='button' ";
							url += "value='"+ item.moudle_name+ "' style='height:100%;width:100%;border:none' onclick='menuClick("
									+ i + ")'";
							url += "/>";
							url += "</div>";
							$("#menuList").append(url);
						});
		$(".menu").css("background", "#f2f2f2");
		$(".menu").css("color", "#000000");
		$("#menu" + 0).css("background", "#ffffff");
		$("#menu" + 0).css("color", "#000000");
		console.log(menuBeans[0].moudle_name);

		if(menuBeans[0].moudle_name=='新消息'){
			window.open(menuBeans[0].moudle_url);	
		}else{
			document.getElementById("mainFrame").src = homeurl+menuBeans[0].moudle_url;			
		}
	}

	function itemClick(i) {
		addMenu(itemBeans[i].menuBeans);
		$(".tableButton").css("background", "#034172");
		$(".tableButton").css("color", "#ffffff");
		$("#item" + i).css("background", "#ffffff");
		$("#item" + i).css("color", "#034172");
	};

	function menuClick(i) {
		$(".menu").css("background", "#f2f2f2");
		$(".menu").css("color", "#000000");
		$("#menu" + i).css("background", "#ffffff");
		$("#menu" + i).css("color", "#000000");
		console.log(menuBeans[i].moudle_name);
		if(menuBeans[i].moudle_name=='新消息'){
			console.log("456");

			window.open(menuBeans[i].moudle_url);	
		}else{
			document.getElementById("mainFrame").src = homeurl+menuBeans[i].moudle_url;			
		}
		//document.getElementById("mainFrame").src = homeurl+menuBeans[i].moudle_url;
		clearNacigationBar();
	};
	
	function headClick() {
		document.getElementById("mainFrame").src = homeurl+'merchants_detail.html';
	}