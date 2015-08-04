
(function() {
	
var testapp=angular.module('testapp', ['ngRoute']);

testapp
.controller(
		'errorController',function(){});
testapp
.controller(
		'loginController',function(){});
testapp
.controller(
		'homeController',function(){});
testapp
.controller(
		'indexController',function(){});

testapp.config([ '$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
	$routeProvider.when('/', {
		templateUrl : 'test.html',
		controller : 'indexController'
	}).when('/login', {
		templateUrl : 'login.html',
		controller : 'loginController'
	}).when('/home', {
		templateUrl : 'home.html',
			controller : 'homeController'
	}).when('/errorlogin', {
		templateUrl : 'error.html',
		controller : 'errorController'
	}).when('/test', {
		templateUrl : 'login.html',
		controller : 'loginController'
	}).otherwise({
		redirectTo : '/'
	});

} ]);

                          })();
