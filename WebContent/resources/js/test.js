
(function() {
	var usertest = {
			email : "testangular2@gmail.com",
			fName : "fname",
			lName : "lname",
			password : "password"
		};
var myapp=angular.module('myapp', ['ngCookies'])

.run(['$http', '$cookies', function($http, $cookies) {
  $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
}])

.provider('myCSRF',[function(){
  var headerName = 'X-CSRF-TOKEN';
  var cookieName = 'XSRF-TOKEN';
  var allowedMethods = ['GET'];

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
myapp.controller('LoginController', [ '$scope', '$http',
                          			function($scope, $http) {
                          				$scope.user = {
                          						email : "admin@gmail.com",
                          					fName : "fname",
                          					lName : "lname",
                          					password : "123456"
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
                          				$scope.test = function() {

                          					$http({
                          						method : 'GET',
                          						url : 'http://localhost:8089/Cart/test',
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
                          						
                          					}).error(function(data, status, headers, config) {
                          						console.log("error header",headers);
                          						console.log("error config",config);
//                          						$scope.test();
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
