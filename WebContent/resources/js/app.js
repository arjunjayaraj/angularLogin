(function() {
	var access = false;
	

	
	var myapp = angular.module("myapp", [ 'ngCookies', 'ngRoute' ]).factory(

	'XSRFInterceptor', function($cookies, $log,$location) {

			
		var XSRFInterceptor = {

			request : function(config) {
				var token = $cookies.get('XSRF-TOKEN');
				if (token != null) {
					config.headers['X-CSRF-TOKEN'] = token;

				}
				config.headers['X-Requested-With'] = "XMLHttpRequest";

				return config;
			},
			response : function(response) {

				return response;
			},
			responseError: function(response,$http) {
				console.log("inside response error",response.status);
					if(response.status == 403||response.status == 401){
				
						
						
						}

				return response;
			}
		};

		return XSRFInterceptor;

	});


	myapp.run([ '$rootScope', '$location', function($rootScope, $location) {
		$rootScope.$on('$routeChangeStart', function(event, next) {
			if (next.access == true && access == false) {
				$location.path('/login').replace();

			}

		});
	} ]);

	myapp.config([ '$httpProvider', function($httpProvider) {

		$httpProvider.defaults.withCredentials = true;
		$httpProvider.interceptors.push('XSRFInterceptor');

	} ]);
	myapp.config(function($sceDelegateProvider) {
		$sceDelegateProvider.resourceUrlWhitelist([
		// Allow same origin resource loads.
		'self',
		// Allow loading from our assets domain. Notice the difference between *
		// and **.
		'http://localhost:8089/spark/**' ]);

		// The blacklist overrides the whitelist so the open redirect here is
		// blocked.
		$sceDelegateProvider.resourceUrlBlacklist([

		]);
	});
	myapp.config([ '$routeProvider', function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl : 'http://localhost:8089/spark/resources/Login.html',
			controller : 'LoginController'
		}).when('/login', {
			templateUrl : 'http://localhost:8089/spark/resources/Login.html',
			controller : 'LoginController'
		}).when('/home', {
			templateUrl : 'http://localhost:8089/spark/resources/home.html',
			controller : 'LoginController',
			access:true
		}).when('/errorlogin', {
			templateUrl : 'http://localhost:8089/spark/resources/error.html',
			controller : 'LoginController'
		}).when('/navigate', {
			templateUrl : 'http://localhost:8089/spark/resources/navigate.html',
			controller : 'LoginController'
		}).when('/logout', {
			templateUrl : 'http://localhost:8089/spark/resources/Login.html',
			controller : 'LoginController'
		}).otherwise({
			redirectTo : '/'
		});
	} ]);

	myapp
			.controller(
					'LoginController',
					[
							'$scope',
							'$http',
							'$location','$cookies',
							function($scope, $http, $location,$cookies) {
								$scope.user = {
									j_username : "",
									j_password : ""
								};

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

								$scope.login = function() {
									
									$http(
											{
												method : 'POST',
												url : 'http://localhost:8089/spark/j_spring_security_check',
												params : $scope.user,
												
												contentType : 'application/json'
											})
											.success(
													function(data, status,
															headers, config) {
											
														if (status == 200) {
															access = true;
															$location
																	.path("/home");
															
													
														} else {
															$location
																	.path("/errorlogin");
														}

													})
											.error(
													function(data, status,
															headers, config) {
														test();
														console.log(
																"error header",
																headers);
														console.log(
																"error config",
																config);
														$location
																.path("/errorlogin");

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
												$location.path("/login").replace();
												access = false;
												
											}).error(
											function(data, status, headers,
													config) {


											});

								};
								$scope.test = function() {
									console.log("inside logout");

									$http(
											{
												method : 'GET',
												url : 'http://localhost:8089/spark/resources/Login.html',
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
