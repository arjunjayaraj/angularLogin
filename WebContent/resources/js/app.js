(function() {
	var usertest = {
		email : "testangular2@gmail.com",
		fName : "fname",
		lName : "lname",
		password : "password"
	};
 
	var myapp = angular.module("myapp", [ 'ngCookies'])
	.factory(
			'XSRFInterceptor', function($cookies, $log) {
				var gettokendata = function($httpProvider) {
					var xhr = new XMLHttpRequest();
					xhr.open('GET', 'http://localhost:8089/spark/test', false);
					xhr.send();

				};

				var XSRFInterceptor = {

					request : function(config) {
						gettokendata();
						var token = $cookies.get('XSRF-TOKEN');
						

						console.log("the token in cookie", token);
						if (token) {
							config.headers['X-CSRF-TOKEN'] = token;

						}
						config.headers['X-Requested-With'] = "XMLHttpRequest";

						return config;
					},
					response : function(response) {
//						var tokentest1 = response.headers('X-CSRF-HEADER');
//						var tokentest2 = response.headers('X-CSRF-PARAM');
//						var tokentest3 = response.headers('X-CSRF-TOKEN');
//						console.log("the response token1 is", tokentest1);
//						console.log("the response token2 is", tokentest2);
//						console.log("the response token3 is", tokentest3);
						
						return response;
					},
				};
				
				return XSRFInterceptor;
				
			});

	myapp.config([ '$httpProvider', function($httpProvider) {

		$httpProvider.defaults.withCredentials = true;
		$httpProvider.interceptors.push('XSRFInterceptor');


	}]);
	console.log("in ajax function");
	myapp
			.controller(
					'LoginController',
					[
							'$scope',
							'$http',
							function($scope, $http) {
								$scope.user = {
									j_username : "user",
									j_password : "user"
								};

								console.log("The username is ",
										$scope.user.username);
								console.log("The username is ",
										$scope.user.password);
								//						
								$scope.register = function() {

									var regUser = {
											username : 	$scope.user.j_username,
											password : $scope.user.j_password
										};
									$http(
											{
												method : 'POST',

												url : 'http://localhost:8089/spark/adduser',
												params : regUser,

												contentType : 'application/json'
											}).success(
											function(data, status, headers,
													config) {

											});

								};
								$scope.test = function() {

									$http(
											{
												method : 'GET',
												url : 'http://localhost:8089/spark/test',
												contentType : 'application/json'
											}).success(
											function(data, status, headers,
													config) {

											});

								};

								$scope.login = function() {
									
									$http(
											{
												method : 'POST',
												url : 'http://localhost:8089/spark/j_spring_security_check',
												params : $scope.user,
												contentType : 'application/json'
											}).success(
											function(data, status, headers,
													config) {

											}).error(
											function(data, status, headers,
													config) {
												console.log("error header",
														headers);
												console.log("error config",
														config);

											});

								};
								$scope.logout = function() {
									console.log("inside logout");
									
									$http(
											{
												method : 'POST',
												url : 'http://localhost:8089/spark/j_spring_security_logout',
												contentType : 'application/json'
											}).success(
											function(data, status, headers,
													config) {
											}).error(
											function(data, status, headers,
													config) {
												
												

											});

								};

							} ])

	myapp.controller('TabController', function() {
		this.tab = 1;
		this.selectTab = function(setTab) {
			this.tab = setTab;
		};
		this.isSelected = function(checkTab) {
			return this.tab === checkTab;
		};
	});

})();
