(function() {
	var access=false;

	var myapp = angular.module("myapp", [ 'ngCookies','ngRoute']).factory(
		

			'XSRFInterceptor', function($cookies, $log) {
				var headerToken ;
				var gettokendata = function($httpProvider) {
					var xhr = new XMLHttpRequest();
					xhr.open('GET', 'http://localhost:8089/spark/authenthicate', false);
		
					xhr.send();
					headerToken =xhr.getResponseHeader('X-CSRF-TOKEN');
					console.log("the header token is ss " ,headerToken);
				};
		
			 
				var XSRFInterceptor = {
						
					request : function(config) {
						gettokendata();
						var token = $cookies.get('XSRF-TOKEN');

						console.log("the token in cookie", token);
						if (token!=null) {
							config.headers['X-CSRF-TOKEN'] = token;

						}
						else{
							config.headers['X-CSRF-TOKEN'] = headerToken;
						}
						config.headers['X-Requested-With'] = "XMLHttpRequest";

						return config;
					},
					response : function(response) {
						


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
	myapp.config(function($sceDelegateProvider) {
		  $sceDelegateProvider.resourceUrlWhitelist([
		    // Allow same origin resource loads.
		    'self',
		    // Allow loading from our assets domain.  Notice the difference between * and **.
		    'http://localhost:8089/spark/**'
		  ]);

		  // The blacklist overrides the whitelist so the open redirect here is blocked.
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
			controller : 'LoginController'
		}).when('/errorlogin', {
			templateUrl : 'error.html'
		}).when('/logout', {
			templateUrl : 'http://localhost:8089/spark/resources/Login.html'
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
