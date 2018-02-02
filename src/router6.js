var app=angular.module('app',['ng', 'ngRoute', 'ngAnimate','ngTouch','ngCookies'])
.config(function($routeProvider){
	$routeProvider
	//首页
	.when("/",{
		templateUrl:"integral/index.html",
		controller:"integrals",
	})
	.when("",{
		templateUrl:"integral/index.html",
		controller:"integrals",
	})
	.when("/index",{
		templateUrl:"integral/index.html",
		controller:"integrals",
	})
	.when("/detail",{
		templateUrl:"integral/detail.html",
		controller:"details",
	})
	.when("/order",{
		templateUrl:"integral/order.html",
		controller:"orders",
	})
	.when("/success",{
		templateUrl:"integral/success.html",
		controller:"success",
	})
	.when("/jflist",{
		templateUrl:"integral/shoplist.html",
		controller:"jflist",
	})
	.otherwise({
	    redirectTo: "/"
	})
})