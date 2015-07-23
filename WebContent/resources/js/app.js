(function() {
	var usertest = {
		email : "testangular2@gmail.com",
		fName : "fname",
		lName : "lname",
		password : "password"
	};

	var myapp = angular.module("myapp", [ 'ngCookies' ]).factory(
			'XSRFInterceptor', function($cookies, $log) {

				var XSRFInterceptor = {

					request : function(config) {

						var token = $cookies.get('XSRF-TOKEN');
						

						if (token) {
							config.headers['X-CSRF-TOKEN'] = token;
						}

						return config;
					}
				};
				return XSRFInterceptor;
			});
	myapp.config([ '$httpProvider', function($httpProvider) {

		$httpProvider.defaults.withCredentials = true;
		$httpProvider.interceptors.push('XSRFInterceptor');

	} ]);
	console.log("in ajax function");
	myapp.controller('LoginController', [ '$scope', '$http',
			function($scope, $http) {
				$scope.user = {
						email : "",
					fName : "fname",
					lName : "lname",
					password : ""
				};

				console.log("The username is ", $scope.user.username);
				console.log("The username is ", $scope.user.password);
				$scope.register = function() {

					$http({
						method : 'POST',
						url : 'http://localhost:8089/Cart/registernew',
						params : $scope.user,
						contentType : 'application/json'
					}).success(function(data, status, headers, config) {
						
					});

				};
				$scope.login = function() {

					$http({
						method : 'POST',
						url : 'http://localhost:8089/Cart/j_spring_security_check',
						params : $scope.user,
						contentType : 'application/json'
					}).success(function(data, status, headers, config) {
						
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
