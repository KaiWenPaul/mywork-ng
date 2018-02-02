/*
* @Author: cool
* @Date:   2017-01-02 10:51:15
* @Last Modified by:   cool
* @Last Modified time: 2017-04-01 10:49:16
*/
var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;//手机正则
var ybreg = /^[0-9]{6}$/;//邮编
var yxreg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;//邮箱
var phreg = /^([0-9]{3,4}-)?[0-9]{7,8}$/;//固定电话
var testPhone = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$|(^(13[0-9]|15[0|3|6|7|8|9]|18[8|9])\d{8}$)/;//手机和固定电话
app.controller('home', function ($scope, $rootScope, $location, $timeout, $http, $cookies, $cookieStore) {
    $scope.url='http://www.valubio.com';
    // $scope.url = 'http://192.168.2.200:8080/sw/';
    //  $scope.url = 'http://192.168.1.177/';

    //获取网站基础信息123
    $http.post($scope.url + "/othersInterfaces.api?getHost", $.param({

    }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } }
    ).success(function (data) {
        if (data["status"] == "ok") {
            $scope.sw_p = data['data'];
        } else {
        }
    })
    //右上角名称是否显示
    $scope.membershow = 0;
    $cookieStore.put("member_id", $.cookie('member_id') == null ? "0" : $.cookie('member_id').replace(/\"/g, ""));
    $cookieStore.put("member_token", $.cookie('member_token') == null ? "0" : $.cookie('member_token').replace(/\"/g, ""));
    $scope.grxx_center = function () {
        $http.post($scope.url + "/memberInterfaces.api?getMemberDetail", $.param({
            member_id: $cookieStore.get('member_id'),
            member_token: $cookieStore.get('member_token'),
        }),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } }
        ).success(function (data) {

            if (data["status"] == "ok") {
                $scope.membershow = 1;
                $scope.grxx_centers = data['data']
            } else {
                $scope.membershow = 0;
                $scope.grxx_centers = ''
            }
        })
    }
    //   接入训鸟，前期用户未登录链接训鸟客服IM，登陆链接环信客服IM
    $scope.btn = function () {
        if ($scope.membershow == '1') {
            location.href = "http://kefu.easemob.com/webim/im.html?tenantId=45997";
        } else {
            Infobird.openWebChatWin('bj74560136,56,http://weixin.infobird.com,http://qitongbao-alui.infobird.com')
        }
    }

    //点击搜索按钮
    $scope.goshoplist = function (arr) {
        var name;
        if (arr == '' || arr == undefined) {
            name = ''
        } else {
            name = arr
        }
        var actsortval = $('.logo-inp-box-select span').attr('val');
        var actsortgid = $('.logo-inp-box-select span').attr('gid');
        if (actsortval == 1 && actsortgid == 1) {//搜索商家
            window.location.href = "index.html#/sssj?merchantname=" + name;
        } else {
            // $location.path("index.html#/shoplist").search({goodsname:name,uuid:actsortval,gid:actsortgid})
            window.location.href = "index.html#/shoplist?sortname=" + name + "&uuid=" + actsortval + "&gid=" + actsortgid;
        }
    }

    $scope.sorts = function (arr, brr) {
        $http.post($scope.url + "/goodsInterfaces.api?getDecoratedGoodsClassLevel", $.param({
            goods_id: arr,
            level: brr,
        }),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } }
        ).success(function (data) {
            if (data["status"] == "ok") {
                if (brr == 1) {
                    $scope.sortlist = data["data"];
                    $scope.sorts(-1, 3)
                } else {
                    $scope.sortlist = data["data"];
                }
            } else {
                $scope.alerttxt(data['error'])
            }
        })
    }
    $scope.sorts(-1, 1)
    //   获取购物车里的数量
    $scope.gwc_num = function () {
        $http.post($scope.url + "/shoppingCarInterfaces.api?getMemberShoppingCarCount", $.param({
            member_id: $cookieStore.get("member_id"),
            member_token: $cookieStore.get("member_token"),
        }),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } }
        ).success(function (data) {
            if (data["status"] == "ok") {
                $scope.gwc_nums = data["data"];
            } else {
                $scope.gwc_nums = 0
            }
        }).error(function () {
            $scope.gwc_nums = 0
        })
    }
    $scope.gwc_num();
    //热搜词条
    $http.post($scope.url + "/goodsInterfaces.api?getHotSearchs", $.param({
        search_type: 'goods',
        page: 1,
        limit: 5,
    }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } }
    ).success(function (data) {
        if (data["status"] == "ok") {
            $scope.hotentry = data['data']
        } else {
            $scope.alerttxt(data['error'])
        }
    })




    $scope.grxx_center();
    //登录
    $scope.tcksign = 0;//初始化登录弹出窗
    $scope.tckshow = function (arr) {
        $scope.tcksign = 1;
    }
    $scope.tckhide = function () {
        $scope.tcksign = 0;
    }

    //  点击头部购物车红点消失
    $scope.goin = function () {
        //   location.reload();
        $http.post($scope.url + "/memberInterfaces.api?seenShareIn", $.param({
            member_id: $cookieStore.get('member_id')
        }),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } }
        ).success(function (data) {
            if (data["status"] == "ok") {

            } else {
                $scope.alerttxt(data['error'])
            }
        })
    }
    //   请求购物in里面有无新订单状态
    $scope.shareIn = function () {
        $http.post($scope.url + "/memberInterfaces.api?getSeenIn", $.param({
            member_id: $cookieStore.get("member_id"),
            member_token: $cookieStore.get("member_token"),
        }),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } }
        ).success(function (data) {
            if (data["status"] == "ok") {
                $scope.seen_shareIn = data['data']['seen_shareIn'];
            } else {
                $scope.alerttxt(data['error'])
            }
        })
    }

    $scope.shareIn();
    // 键盘事件回车登陆
    $scope.myKeyuplogin = function (e, arr, brr) {
        var keycode = window.event ? e.keyCode : e.which;
        if (keycode == 13) {
            $scope.signbtn(arr, brr);
        }
    }
    // 键盘事件回车注册
    $scope.myKeyupregin = function (e, arr, brr, crr, drr) {
        var keycode = window.event ? e.keyCode : e.which;
        if (keycode == 13) {
            $scope.regbtn(arr, brr, crr, drr)
        }
    }
    $scope.signbtn = function (arr, brr) {//登录

        if (arr == undefined || arr == '') {
            $scope.alerttxt('请填写手机号');
            return false;
        }
        if (brr == undefined || brr == '') {
            $scope.alerttxt('请填写密码');
            return false;
        }

        $http.post($scope.url + "/memberInterfaces.api?memberLogin", $.param({
            member_account: arr,
            password: brr,
        }),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } }
        ).success(function (data) {

            if (data["status"] == "ok") {
                $cookieStore.put("member_id", data['data']['member_id']);
                $cookieStore.put("member_token", data['data']['member_token']);
                $scope.tcksign = 0;
                window.location.reload();
            } else {
                $scope.alerttxt(data['error'])
            }
        })
    }
    //注册
    $scope.regbtn = function (arr, brr, crr, drr, err) {//注册
        $('.tck .sign-box ul.reg-ul li p').html('');
        var testreg1 = /^(?=[\d.]{1,15})[1-9]\d{0,14}(\.\d\d)?$/;
        if (!myreg.test(arr)) {
            $("#regphone").text('请输入规范的手机号');
            return false;
        }
        if (crr == undefined || crr.length < 6) {
            $("#regpwd").text('密码不规范');
            return false;
        }
        if (crr != drr) {
            $("#regpwd2").text('2次密码不一致');
            return false;
        }
        if (err) {
            if (!testreg1.test(err)) {
                $("#referralcode").text('请填写不超过15位的数字');
                return false;
            }
        }
        $http.post($scope.url + "/memberInterfaces.api?memberRegister", $.param({
            member_account: arr,
            password: crr,
            code: brr,
            member_role: 'member',
            referral_code: err //推荐码 最大15位 

        }),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } }
        ).success(function (data) {
            if (data["status"] == "ok") {
                $scope.alerttxt('注册成功')
                $scope.signbtn(arr, crr)
            } else {
                $scope.alerttxt(data['error'])
            }
        })
    }
    //获取验证码
    var InterValObj; //timer变量，控制时间
    var count = 60; //间隔函数，1秒执行
    var curCount;//当前剩余秒数

    $scope.sendMessage = function (arr) {
        if ($("#btnSendCode").attr("val") == 1) {
            return false;
        }
        $("#btnSendCode").attr("val", "1");
        setTimeout('$("#btnSendCode").attr("val", "2")', 2000);
        if (!myreg.test(arr)) {
            $scope.alerttxt("请输入有效的手机号码！");
        } else {
            $http.post($scope.url + "/othersInterfaces.api?sendCode", $.param({
                mobile: arr,
                code_type: "member_register",
            }),
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } }
            ).success(function (data) {
                if (data["status"] == "ok") {
                    curCount = count;
                    //设置button效果，开始计时
                    $("#btnSendCode").attr("disabled", "true");
                    $("#btnSendCode").val(curCount + "s");
                    InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
                } else if (data["status"] == "pending" && data["error"] == "token failed") {
                    $scope.relogin()
                } else {
                    $scope.alerttxt(data['error'])
                }
            })
        }
    }
    //timer处理函数
    function SetRemainTime() {
        if (curCount == 0) {
            window.clearInterval(InterValObj);//停止计时器
            $("#btnSendCode").removeAttr("disabled");//启用按钮
            $("#btnSendCode").val("重新发送");
        }
        else {
            curCount--;
            $("#btnSendCode").val(curCount + "s");
        }
    }
    /****获取验证码end***/

    //退出登录
    $scope.delmomber = function () {
        $cookieStore.put("member_id", 0);
        $cookieStore.put("member_token", 0);
        window.location.reload();
    }


     //点击搜索按钮
    $scope.goshoplist = function (arr) {
        var name;
        if (arr == '' || arr == undefined) {
            name = ''
        } else {
            name = arr
        }
       console.log(arr)
      window.location.href = "integral.html#/jflist?name=" + name;
    }




    //伪造登录
    // $cookieStore.put("member_id",'5');
    // $cookieStore.put("member_token",'123456');
    //失去登录状态
    $scope.relogin = function () {
        $scope.tcksign = 1;
    }
    $scope.gwcjdshows = function (arr) {
        $scope.gwcjdshow = arr;
    }
    $scope.gwcjdshows(1);

    $scope.Post = function(url,params){
        var tempForm = document.createElement("form");        
        tempForm.action = url;        
        tempForm.method = "post";        
        tempForm.style.display = "none";        
        for (var x in params) {        
            var opt = document.createElement("textarea");        
            opt.name = x;        
            opt.value = params[x];        
            // alert(opt.name)        
            tempForm.appendChild(opt);        
        }        
        document.body.appendChild(tempForm);        
        tempForm.submit();        
        document.body.removeChild(tempForm);
    }

    
    //回到顶部或者某个位置
    $scope.scrolltop = function (arr) {
        $("html,body").stop().animate({ scrollTop: arr }, 300);
    }

    //alert 优化
    $scope.alertshow = 0;
    $scope.alerttxt = function (arr, brr) {
        if (brr == 1) {
            $scope.alerttxts = arr;
            $scope.alertshow = 0;
        } else {
            $scope.alerttxts = arr;
            $scope.alertshow = 1;
        }
    }
    //footer
    $http.post($scope.url + "/othersInterfaces.api?getHtmls", $.param({
        level: 2,
    }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } }
    ).success(function (data) {
        if (data["status"] == "ok") {
            $scope.footer = data['data'];
        } else {
        }
    })
})

    // 活动详情页面
    .controller('integrals', function ($scope, $rootScope, $location, $timeout, $http, $cookies, $cookieStore) {
        $scope.scrolltop(0);
        //轮播
        $http.post($scope.url + "/integralInterfaces.api?getIntegralBannerList", $.param({
        }),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } }
        ).success(function (data) {
            if (data["status"] == "ok") {
                $scope.banner = data["data"];
                console.log($scope.banner);
            } else {
                $scope.alerttxt(data['error'])
            }
        })
        // 控制轮播图的跳转
        $scope.href = function (arr) {
            if (arr != '') {
                window.location.href = arr;
            }
        }
        $scope.flexslider = function () {
            $(".flexslider").flexslider({
                slideshowSpeed: 5000, //展示时间间隔ms
                animationSpeed: 300, //滚动时间ms
                pauseOnAction: false,
                touch: true //是否支持触屏滑动(比如可用在手机触屏焦点图)
            });
        };
        // $scope.flexslider();
        $scope.integralList = function(arr,brr,crr,drr,err,frr,grr,irr){
            $http.post($scope.url + "/integralInterfaces.api?getIntegralGoodsList", $.param({
                class_id:arr,
                brand_id:brr,
                goods_name:crr,
                goods_src:drr,
                is_new:err,
                is_recommend:frr,
                is_worthy_buy:grr,
                page:1,
                limit:irr
            }),
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } }
            ).success(function (data) {
                if (data["status"] == "ok") {
                    if(err=='1'){
                      $scope.newsDatas= data["data"];
                    }
                    if(frr=='1'){
                      $scope.recommendDatas = data["data"];
                    }
                    if(grr=='1'){
                      $scope.da = data["data"][0]
                      $scope.worthyDatas = data["data"];
                      $scope.worthyDatas.shift();
                      console.log($scope.worthyDatas)
                    }
                } else {
                    $scope.alerttxt(data['error'])
                }
            })
        }
        $scope.integralList('','','','','1','','','5');
        $scope.integralList('','','','','','1','','20');
        $scope.integralList('','','','','','','1','5');
    })
      // 活动详情页面
    .controller('details', function ($scope, $rootScope, $location, $timeout, $http, $cookies, $cookieStore) {
        $scope.scrolltop(0);
        var json={};
        var jsonParams ={};
         if (!$location.search()['goodsid']) {
            $scope.alerttxt('错误的商品，为你跳转至积分商城首页');
            setTimeout("location.href='integral.html#/'", 1000);
            return false;
        }
        $scope.goods_id = $location.search()['goodsid'] ? $location.search()['goodsid'] : '';

        $scope.rightSideGoodsList = function(){
            $http.post($scope.url + "/integralInterfaces.api?getRightSideGoodsList", $.param({
            goods_id: $location.search()['goodsid'],
            page:1,
            limit:5
        }),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } }
        ).success(function (data) {
            if (data["status"] == "ok") {
                $scope.rightLists = data["data"];
                console.log($scope.rightLists);
            } else {
                $scope.alerttxt(data['error'])
            }
        }).error(function () {
        })
    }

    $scope.rightSideGoodsList();
        //商品详情
        $http.post($scope.url + "/integralInterfaces.api?getIntegralGoods", $.param({
            goods_id: $location.search()['goodsid'],
        }),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } }
        ).success(function (data) {
            if (data["status"] == "ok") {
                $scope.count = 1;//初始化数量
                $scope.shopdetails = data["data"];
                $scope.imgBeans = data['data']['imgBeans'];
                json.skuIds = data["data"]["skuBeans"]
                jsonParams.goods_name = data["data"]['goods_name'];
                jsonParams.img =  data["data"]['goods_img'];
                if(data["data"]["skuBeans"]==''){
                    console.log(123)
                    jsonParams.goods_id = data["data"]['goods_id'];
                    jsonParams.sku_id = '';
                    jsonParams.integral_num = data["data"]['integral_num'];
                    jsonParams.a = 1;
                }else{
                    $scope.imglist = data["data"]["skuBeans"][0].imgList;
                }
                // $scope.xqhtml = $sce.trustAsHtml(data['data']['goods_url_content']);
                //$('.shop-details .s-d-xq').html('').append(data['data']['goods_url_content'])
                console.log($scope.shopdetails);
            } else {
                $scope.alerttxt(data['error'])
            }
        }).error(function () {
            $scope.alerttxt('错误的商品，为你跳转至积分商城首页');
            setTimeout("location.href='integral.html#/'", 1000);
        })
      $scope.params = {};
      var jon = {};
    // 获取组合的skuid
      $scope.selgg = function($event,arr, brr){
         $scope.params[arr] = brr;
        //  .replace(",",";").replace("{","").replace("}","").replace(",",";")
         var skuid = JSON.stringify($scope.params).replace(/\"/g, "").replace(",",";").replace("{","").replace("}","").replace(",",";");

         console.log(skuid)
         for(var i=0;i<json.skuIds.length;i++){
             if(json.skuIds[i].paramkvs==skuid){
                $scope.imglist = json.skuIds[i].imgList;
                $(".spxq-text .detaile .ull .s-d-2of4").find("span").text(json.skuIds[i].integral_num);
                $(".spxq-text .tit").text(json.skuIds[i].goods_alias);
                jsonParams.goods_id =json.skuIds[i]['goods_id'];
                jsonParams.sku_id = json.skuIds[i]['sku_id'];
                jsonParams.integral_num =  json.skuIds[i]['integral_num'];
                jsonParams.a =2;
             }
         }
      }
    // 立即兑换
      $scope.exchange = function(arr){
         jsonParams.goods_num = arr;
         if(jsonParams.a=="1"){
             location.href = "integral.html#/order?listBeans="+JSON.stringify(jsonParams);
         }else{
             if(jsonParams.sku_id){
                location.href = "integral.html#/order?listBeans="+JSON.stringify(jsonParams);  
             }else{
                $scope.alerttxt('请您选择商品的规格');
             }
         }
      }

      $scope.owlCarousel = function () {
            $('#spxqimg').owlCarousel({
                items: 4,
                navigation: true,
                navigationText: ["", ""],
                scrollPerPage: true
            });
        }
    })
    // 活动详情页面
    .controller('orders', function ($scope, $rootScope, $location, $timeout, $http, $cookies, $cookieStore) {
        $scope.scrolltop(0);
         //初始化编辑操作的addid
        $scope.editaddid = 0;
        $scope.morenadds = '省市区';
        $scope.addlength;
        $scope.listBeans =JSON.parse($location.search()['listBeans']);
        console.log($scope.listBeans);
        var json ={};
        json.goods_id = $scope.listBeans.goods_id;
        json.goods_num = $scope.listBeans.goods_num;
        if($scope.listBeans.sku_id){
            json.sku_id = $scope.listBeans.sku_id
        }
        json.remark ="";
        json.member_id = $cookieStore.get("member_id");
        json.member_token =$cookieStore.get("member_token");
        //获取用户积分
        $http.post($scope.url + "/memberInterfaces.api?getMemberDetail", $.param({
                member_id: $cookieStore.get('member_id'),
                member_token: $cookieStore.get('member_token'),
            }),
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } }
            ).success(function (data) {

                if (data["status"] == "ok") {
                   $scope.integral = data['data']['integral']
                } else {
                    $scope.grzl_centers = ''
                }
            })
        // 提交订单
        $scope.tjdd = function(){ 
          if(Number($(".num0").text())-Number($(".num1").text())>=0){
              $http.post($scope.url + "/integralInterfaces.api?payOrder", $.param(json),
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } }
                ).success(function (data) {
                    if (data["status"] == "ok") {
                        $scope.alerttxt('兑换成功，为你跳转至我的积分');
                        setTimeout("location.href='core.html#/wdjf'", 1000);
                    } else {
                        $scope.alerttxt(data['error'])
                    }
                })
          }else{
               $scope.alerttxt('对不起，您的积分不足');
          }
     
        }
        //地址列表
        $scope.addlist = function () {
            $http.post($scope.url + "/addressInterfaces.api?getOwnerAddress", $.param({
                member_id: $cookieStore.get("member_id"),
                member_token: $cookieStore.get("member_token"),
            }),
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } }
            ).success(function (data) {

                if (data["status"] == "ok") {
                    $scope.addlists = data['data'];
                    $scope.addlength = data['data'].length;
                    console.log($scope.addlists);
                    if ($scope.addlength > 0) {
                        json.province = data['data'][0]['province'];
                        json.city =  data['data'][0]['city'];
                        json.country = data['data'][0]['country'];
                        json.zip_code = data['data'][0]['zip_code'];
                        json.mobile = data['data'][0]['mobile'];
                        json.detailed_address = data['data'][0]['detailed_address'];
                        json.person_name = data['data'][0]['name'];
                        $scope.morenadds = data['data'][0]['province'] + data['data'][0]['city'] + data['data'][0]['country']
                    } else {
                        json.address_id = '';
                    }
                } else if (data["status"] == "pending" && data["error"] == "token failed") {
                    $scope.relogin()
                } else {
                    $scope.alerttxt(data['error'])
                }
            })
        }
        $scope.addlist();

        //省市区3级信息
        $scope.seladd = function (arr, brr, crr, drr) {//省市区123 当前  省级的下标  id:为区的时候用
            if (arr == 1) {
                $scope.selCity = arr;
                $scope.seladds = $scope.ssq_adds;
            } else if (arr == 2) {
                $scope.selCity = arr;
                $scope.selAdd_p = brr;//-->省的下标
                $scope.addtext_p = $scope.ssq_adds[$scope.selAdd_p].name;//省
                $scope.addtext_c = '';//市
                $scope.addtext_a = '';//区
                $scope.seladds = $scope.ssq_adds[brr].cityBeans;
            } else if (arr == 3) {
                $scope.selCity = arr;
                $scope.selAdd_c = brr;//-->市的下标
                $scope.addtext_p = $scope.ssq_adds[$scope.selAdd_p].name;//省
                $scope.addtext_c = $scope.ssq_adds[$scope.selAdd_p].cityBeans[$scope.selAdd_c].name;//市
                $scope.addtext_a = '';//区
                $scope.seladds = $scope.ssq_adds[crr].cityBeans[brr].cityBeans;
            } else if (arr == 4) {
                $scope.addtext_p = $scope.ssq_adds[$scope.selAdd_p].name;//省
                $scope.addtext_c = $scope.ssq_adds[$scope.selAdd_p].cityBeans[$scope.selAdd_c].name;//市
                $scope.addtext_a = $scope.ssq_adds[$scope.selAdd_p].cityBeans[$scope.selAdd_c].cityBeans[brr].name;//区
                $scope.morenadds = $scope.ssq_adds[$scope.selAdd_p].name + "" + $scope.ssq_adds[$scope.selAdd_p].cityBeans[$scope.selAdd_c].name + "" + $scope.ssq_adds[$scope.selAdd_p].cityBeans[$scope.selAdd_c].cityBeans[brr].name
                $scope.country_id = drr;
                $scope.ztlist(drr);
            } else {

            }

        }
        //省市区3级信息
        $http.post($scope.url + "/addressInterfaces.api?getCitys", $.param({

        }),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } }
        ).success(function (data) {

            if (data["status"] == "ok") {
                $scope.ssq_adds = data['data'];
                $scope.seladd(1);
                $scope.selAdd_p = 0;//初始化省
                $scope.selAdd_c = 0;//初始化市
            } else if (data["status"] == "pending" && data["error"] == "token failed") {
                $scope.relogin()
            } else {
                $scope.alerttxt(data['error'])
            }
        })
         //添加地址  修改地址
        $scope.editadd = function (arr) {
            if ($("#name").val() == "") {
                $scope.alerttxt("请输入收货人！");
                return false;
            }
            if ($scope.addtext_p == '' || $scope.addtext_c == '' || $scope.addtext_a == '') {
                $scope.alerttxt("请选择省市区！");
                return false;
            }
            if ($("#add").val() == "") {
                $scope.alerttxt("请输入收货地址！");
                return false;
            }
            if (!myreg.test($("#mobile").val())) {
                $scope.alerttxt("请输入有效的手机号码！");
                return false;
            }
            if (!ybreg.test($("#zip_code").val())) {
                $scope.alerttxt("请输入有效的邮编！");
                return false;
            }
            $http.post($scope.url + "/addressInterfaces.api?insertAddress", $.param({
                member_id: $cookieStore.get("member_id"),
                member_token: $cookieStore.get("member_token"),
                mobile: $("#mobile").val(),
                name: $("#name").val(),
                province: $scope.addtext_p,
                city: $scope.addtext_c,
                country: $scope.addtext_a,
                detailed_address: $("#add").val(),
                zip_code: $("#zip_code").val(),
                address_id: arr,//  传0添加 其他修改
                country_id: $scope.country_id,
            }),
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } }
            ).success(function (data) {
                if (data["status"] == "ok") {
                    if (arr == 0) {
                        $scope.alerttxt('添加成功');
                    } else {
                        $scope.alerttxt('修改成功');
                    }
                    $(".tck.addhide").hide();
                    $(".address-box").hide();
                    $scope.addlist();
                } else if (data["status"] == "pending" && data["error"] == "token failed") {
                    $scope.relogin()
                } else {
                    $scope.alerttxt(data['error'])
                }
            })
        }
        $scope.editshow = function (arr) {
            $scope.editaddid = arr;
            if (arr == 0) {
                if ($scope.addlength >= 6) {
                    $scope.alerttxt('地址最多6个哦');
                    return false;
                } else {
                    $scope.bjadd = '';
                    $scope.addtext_p = '';//初始化省
                    $scope.addtext_c = '';//初始化市
                    $scope.addtext_a = '';//初始化区
                    $scope.morenadds = "省市区";
                    $scope.seladd(1);
                    //$(".address-box .center input[type='text'], .address-box .center input[type='number']").text('');
                    //new PCAS('location_p', 'location_c', 'location_a', '北京', '市辖区', '东城区');
                }
            } else {
                $http.post($scope.url + "/addressInterfaces.api?getOwnerAddress", $.param({
                    member_id: $cookieStore.get("member_id"),
                    member_token: $cookieStore.get("member_token"),
                }),
                    { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } }
                ).success(function (data) {
                    if (data["status"] == "ok") {
                        var len = data['data'].length;
                        for (var i = 0; i < len; i++) {
                            if (arr == data['data'][i]['address_id']) {
                                $scope.bjadd = data['data'][i];
                                $scope.addtext_p = data['data'][i]['province'];//省
                                $scope.addtext_c = data['data'][i]['city'];//市
                                $scope.addtext_a = data['data'][i]['country'];//区
                                $scope.morenadds = data['data'][i]['province'] + data['data'][i]['city'] + data['data'][i]['country']
                                $scope.country_id = data['data'][i]['country_id']
                                $scope.seladd(1);
                                //new PCAS('location_p', 'location_c', 'location_a', data['data'][i]['province'], data['data'][i]['city'], data['data'][i]['country']);
                            }
                        }
                    } else if (data["status"] == "pending" && data["error"] == "token failed") {
                        $scope.relogin()
                    } else {
                        $scope.alerttxt(data['error'])
                    }
                })

            }
            $(".tck.addhide").show();
            $(".address-box").show();

        }
        //设置默认
        $scope.morenadd = function (arr) {
            $http.post($scope.url + "/addressInterfaces.api?setDefaultAddress", $.param({
                member_id: $cookieStore.get("member_id"),
                member_token: $cookieStore.get("member_token"),
                address_id: arr,
            }),
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } }
            ).success(function (data) {
                if (data["status"] == "ok") {
                    $scope.freight = 0;
                    $scope.addlist();
                } else if (data["status"] == "pending" && data["error"] == "token failed") {
                    $scope.relogin()
                } else {
                    $scope.alerttxt(data['error'])
                }
            })
        }
        //删除
        $scope.deladd = function (arr) {
            $http.post($scope.url + "/addressInterfaces.api?deleteAddress", $.param({
                member_id: $cookieStore.get("member_id"),
                member_token: $cookieStore.get("member_token"),
                address_id: arr,
            }),
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } }
            ).success(function (data) {
                if (data["status"] == "ok") {
                    //alert("删除成功");
                    $scope.addlist();
                } else if (data["status"] == "pending" && data["error"] == "token failed") {
                    $scope.relogin()
                } else {
                    $scope.alerttxt(data['error'])
                }
            })
        }
        
    })
    // 积分支付成功
    .controller('success', function ($scope, $rootScope, $location, $timeout, $http, $cookies, $cookieStore) {
        $scope.scrolltop(0);
        
    })
    // 搜索分类
    .controller('jflist', function ($scope, $rootScope, $location, $timeout, $http, $cookies, $cookieStore) {
        $scope.scrolltop(0);


        // $http.post($scope.url + "/goodsInterfaces.api?getFilterByClass", $.param({
        //         goods_uuid: 2,
        //     }),
        //         { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } }
        //     ).success(function (data) {
        //         if (data["status"] == "ok") {
        //             $scope.datas = data['data'];
        //         } else if (data["status"] == "pending" && data["error"] == "token failed") {
        //             $scope.relogin()
        //         } else {
        //             $scope.alerttxt(data['error'])
        //         }
        //     })
       $scope.search_name = $location.search()['name'];
       //搜索积分商品

        $scope.integralList = function(arr,brr,crr,drr,err,frr,grr,irr){
            $http.post($scope.url + "/integralInterfaces.api?getIntegralGoodsList", $.param({
                class_id:arr,
                brand_id:brr,
                goods_name:crr,
                goods_src:drr,
                is_new:err,
                is_recommend:frr,
                is_worthy_buy:grr,
                page:1,
                limit:irr
            }),
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } }
            ).success(function (data) {
                if (data["status"] == "ok") {
                    $scope.datalist =data['data'];
                    console.log($scope.datalist)
                } else {
                    $scope.alerttxt(data['error'])
                }
            })
        }
        $scope.integralList('','',$location.search()['name'],'','','','',1,20);

        $(".select-list").find("#select1 dd").click(function () {
            $(this).addClass("selected").siblings().removeClass("selected");
            if ($(this).hasClass("select-all")) {
                $("#selectA").remove();
            } else {
                var copyThisA = $(this).clone();
                if ($("#selectA").length > 0) {
                    $("#selectA a").html($(this).text());
                } else {
                    $(".select-result dl").append(copyThisA.attr("id", "selectA"));
                }
            }
        });
        $scope.test = function(){
          console.log(123)
        }
        
    })
  
  
   
  .directive('repeatFinish2', function () {
        return {
            link: function (scope, element, attr) {
                if (scope.$last == true) {
                    scope.owlCarousel(attr.repeatFinish);
                }
            }
        }
    })
 //判断循环是否结束
    .directive('repeatFinish', function () {
        return {
            link: function (scope, element, attr) {
                if (scope.$last == true) {
                    scope.flexslider(attr.repeatFinish);
                }
            }
        }
    })
    .directive("moreadd", [function () {  //
        return {
            link: function (scope, element, attributes) {
                element.click(function () {
                    if (element.find('span').hasClass('act')) {
                        element.find('span').removeClass('act');
                        element.siblings('ul').removeClass('act');
                    } else {
                        element.find('span').addClass('act');
                        element.siblings('ul').addClass('act');
                    }

                });
            }
        }
    }])
    //gwcin 更多
    .directive("sharegd", [function () {  //
        return {
            link: function (scope, element, attributes) {
                element.click(function () {
                    if (element.find('i').hasClass('act')) {
                        element.find('i').removeClass('act');
                        element.parents('.gwc-share-tit').siblings('.gwc-dp-box').show();
                    } else {
                        element.find('i').addClass('act');
                        element.parents('.gwc-share-tit').siblings('.gwc-dp-box').hide()
                    }

                });
            }
        }
    }])
    //促销优惠
    .directive("selCx", [function () {  //
        return {
            link: function (scope, element, attributes) {
                element.mouseover(function () {
                    element.find('>span').addClass("act");
                    element.find('>ul').show()
                });
                element.mouseleave(function () {
                    element.find('>span').removeClass("act");
                    element.find('>ul').hide()

                });
            }
        }
    }])
   
   
    .directive("payshow", [function () {  //
        return {
            link: function (scope, element, attributes) {
                element.click(function () {
                    $('.select-pay .tab-tit li').removeClass('act');
                    $('.banklist-box .banksel').removeClass('act')
                    element.addClass('act');
                    element.parents('.paylist-box').find('.tab-center-box>div').hide();
                    element.parents('.paylist-box').find('.' + element.attr('val')).show();

                });
            }
        }
    }])
    .directive("tips", function ($timeout) {  //
        return {
            link: function (scope, element, attributes) {
                element.mouseover(function () {
                    element.parents('.tab-tit').find('.pay-tips').html(element.attr('tip')).attr('val', 1).css('left', (-10 + element.parents('li').position().left + element.position().left)).show();
                });
                element.mouseleave(function () {
                    $timeout(function () {
                        if (element.parents('.tab-tit').find('.pay-tips').attr('val') == 1) {
                            element.parents('.tab-tit').find('.pay-tips').hide();
                        }
                    }, 200)
                });
            }
        }
    })
    .directive("tipshover", [function () {  //
        return {
            link: function (scope, element, attributes) {
                element.mouseover(function () {
                    element.attr('val', 2)
                    element.show();
                });
                element.mouseleave(function () {
                    element.hide();
                });
            }
        }
    }])
    .directive("tab", [function () {  //
        return {
            link: function (scope, element, attributes) {
                element.click(function () {
                    element.addClass("act");
                    element.siblings().removeClass("act")
                });
            }
        }
    }])
    .directive("tabbox", [function () {  //
        return {
            link: function (scope, element, attributes) {
                element.click(function () {
                    if (element.hasClass('act')) {
                        element.removeClass("act")
                    } else {
                        element.addClass("act");
                    }
                    // element.siblings().removeClass("act")
                });
            }
        }
    }])
    .directive("banktab", [function () {  //
        return {
            link: function (scope, element, attributes) {
                element.click(function () {
                    element.addClass("act");
                    element.siblings().removeClass("act");
                    element.parent('p').siblings('ul').hide();
                    element.parent('p').siblings('ul').eq(element.index()).show();
                });
            }
        }
    }])
    .directive("ztclick", [function () {  //
        return {
            link: function (scope, element, attributes) {
                element.click(function () {
                    $('.zt-addbox .zt-span').removeClass('act')
                    element.addClass('act');

                });
            }
        }
    }])
    .directive("dbclick", [function () {  //
        return {
            link: function (scope, element, attributes) {
                element.click(function () {
                    if (element.hasClass('act')) {
                        element.removeClass('act')
                    } else {
                        element.addClass('act')
                    }
                });
            }
        }
    }])
    .directive("signtab", [function () {  //
        return {
            link: function (scope, element, attributes) {
                element.click(function () {
                    element.addClass("act");
                    element.siblings().removeClass("act");
                    if (element.index() == 0) {
                        $('.reg-ul').hide();
                        $('.sign-ul').show();
                        element.parents(".sign-box").removeClass("reg-box")
                    } else if (element.index() == 1) {
                        $('.reg-ul').show();
                        $('.sign-ul').hide();
                        element.parents(".sign-box").addClass("reg-box")
                    } else {

                    }
                });
            }
        }
    }])
    .directive("selectbank", [function () {  //
        return {
            link: function (scope, element, attributes) {
                element.click(function () {
                    if (element.attr("val") == 1) {
                        element.attr("val", 2);
                        element.siblings("ul").slideUp()
                    } else {
                        element.attr("val", 1);
                        element.siblings("ul").slideDown()
                    }
                });
            }
        }
    }])
    //搜索框的下拉
    .directive("selSort", [function () {  //
        return {
            link: function (scope, element, attributes) {
                element.click(function () {
                    $(".logo-inp-box-select").addClass("act");
                    $(".logo-inp-box-select>span").attr("val", element.attr('val')).attr("gid", element.attr('gid')).text(element.text())

                });
            }
        }
    }])
    /*头部网址导航*/
    .directive("siteNav", function ($timeout) {  //
        return {
            link: function (scope, element, attributes) {
                element.mouseover(function () {
                    $('.site-nav-box').attr('val', 1).fadeIn();

                });
                element.mouseleave(function () {

                    $timeout(function () {
                        if ($('.site-nav-box').attr('val') != 1) {
                            return false;
                        }
                        $('.site-nav-box').hide();
                    }, 100)
                });
            }
        }
    })
    .directive("siteNavshow", function ($timeout) {  //
        return {
            link: function (scope, element, attributes) {
                element.mouseover(function () {
                    element.attr('val', 2).show();
                });
                element.mouseleave(function () {
                    $('.site-nav-box').hide();
                });
            }
        }
    })
 .directive("shopimg", [function () {
        return {
            link: function (scope, element, attributes) {
                element.click(function () {
                    element.parent('.owl-item').siblings().find('li').removeClass("act");
                    element.addClass("act");
                    $(".spxq-img-big img").attr("src", element.find("img").attr("src"))
                });
            }
        }
    }])
    .directive("ewmtips", [function () {  //
        return {
            link: function (scope, element, attributes) {
                element.mouseover(function () {
                    $('.site-nav-box .ewm').css('top', (element.offset().top + element.height() + 10)).css('left', (element.offset().left - 50 + element.width() / 2)).fadeIn();
                });
                element.mouseleave(function () {
                    $('.site-nav-box .ewm').hide();
                });
            }
        }
    }])


