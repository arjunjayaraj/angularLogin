(function() {
	var access=false;

	var myapp = angular.module("myapp", [ 'ngCookies','ngRoute']).factory(
			'XSRFInterceptor', function($cookies, $log) {
				var gettokendata = function($httpProvider) {
					var xhr = new XMLHttpRequest();
					xhr.open('HEAD', 'http://localhost:8089/spark/authenthicate', false);
					xhr.send();

				};
				var headerToken ;
				var XSRFInterceptor = {
						
					request : function(config) {
						gettokendata();
						var token = $cookies.get('XSRF-TOKEN');

						console.log("the token in cookie", token);
						if (token) {
							config.headers['X-CSRF-TOKEN'] = token;

						}
						else{
							config.headers['X-CSRF-TOKEN'] = headerToken;
						}
						config.headers['X-Requested-With'] = "XMLHttpRequest";

						return config;
					},
					response : function(response) {
						
						  headerToken = response.headers('X-CSRF-TOKEN');
						console.log(headerToken);
						var tokentest1 = response.headers('X-CSRF-HEADER');
						 var tokentest2 = response.headers('X-CSRF-PARAM');
						 var tokentest3 = response.headers('X-CSRF-TOKEN');
						 console.log("the response token1 is", tokentest1);
						 console.log("the response token2 is", tokentest2);
						 console.log("the response token3 is", tokentest3);
					

						return response;
					},
				};

				return XSRFInterceptor;

			});
	myapp.run(['$rootScope',
		      '$location',
		      function ($rootScope, $location) {
		          $rootScope.$on('$routeChangeStart', function (event, next) {
		        	  if(next.access==true&&access == false){
		        			$location.path('/login').replace();

		        			}

		          });
		      }]);

	myapp.config([ '$httpProvider', function($httpProvider) {

		$httpProvider.defaults.withCredentials = true;
		$httpProvider.interceptors.push('XSRFInterceptor');

	} ]);
	myapp.config([ '$routeProvider', function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl : 'login.html',
			controller : 'LoginController'
		}).when('/login', {
			templateUrl : 'login.html',
			controller : 'LoginController'
		}).when('/home', {
			templateUrl : 'home.html',
			controller : 'LoginController',
			access:'true'
		}).when('/errorlogin', {
			templateUrl : 'error.html'
		}).when('/logout', {
			templateUrl : 'login.html'
		}).otherwise({
			redirectTo : '/'
		});
	} ]);

	myapp
			.controller(
					'LoginController',
					[
							'$scope',
							'$http','$location',
							function($scope, $http,$location) {
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
										username : $scope.user.j_username,
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
												$location.path("/login");

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
												if(status==200){
												$location.path("/home");
												access=true;
												}
												else{
													$location.path("/errorlogin");
												}

											}).error(
											function(data, status, headers,
													config) {
												console.log("error header",
														headers);
												console.log("error config",
														config);
												$location.path("/errorlogin");
												

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
												$location.path("/login");
												access=false;
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
