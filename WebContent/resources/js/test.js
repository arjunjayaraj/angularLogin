var myapp = angular.module('myapp', ['ngCookies']);

//.run(['$http', '$cookies', function($http, $cookies) {
//  $http.defaults.headers.post['X-CSRF-TOKEN'] = $cookies.XSRF-TOKEN;
//}]);


myapp.provider('myCSRF',[function(){
  var headerName = 'X-CSRF-TOKEN';
  var cookieName = 'XSRF-TOKEN';
  var allowedMethods = ['GET','POST'];

  this.setHeaderName = function(n) {
    headerName = n;
  }
  this.setCookieName = function(n) {
    cookieName = n;
  }
  this.setAllowedMethods = function(n) {
    allowedMethods = n;
  }
  this.$get = ['$cookies', function($cookies){
    return {
      'request': function(config) {
        if(allowedMethods.indexOf(config.method) === -1) {
          // do something on success
          config.headers[headerName] = $cookies[cookieName];
        }
        return config;
      }
    }
  }];
}]).config(function($httpProvider) {
  $httpProvider.interceptors.push('myCSRF');
});
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
					token = config.headers['X-CSRF-TOKEN'];
					console.log(token); 
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