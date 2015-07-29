(function() {
    
    var tokentest="dasdasdsss";
    var myapp = angular.module('myapp', ['ngCookies']);
    myapp.config(function($httpProvider) {
        var getTokenData = function(config) {
            var defaultCsrfTokenHeader = 'X-CSRF-TOKEN';
            var csrfTokenHeaderName = 'X-CSRF-HEADER';
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://localhost:8089/Cart/test', false);
            xhr.send();
            var csrfTokenHeader = xhr.getResponseHeader('X-CSRF-TOKEN');
            csrfTokenHeader = csrfTokenHeader ? csrfTokenHeader : defaultCsrfTokenHeader;
            return { headerName: "X-CSRF-TOKEN", token: "test" };
        };

        $httpProvider.defaults.withCredentials = true;
       $httpProvider.interceptors.push(function($q) {
            return {
                request: function(config,$cookies) {
                    var csrfTokenData = getTokenData();
                   console.log("The token is", csrfTokenData.headerName,":",csrfTokenData.token)
                    config.headers["X-CSRF-TOKEN"] = csrfTokenData.token;
                    return config ;
                },
            response: function(response) {
            	tokentest=response.headers('X-CSRF-TOKEN');
            	console.log("token in response",tokentest);
			     
			      return response;
			    },
            };
        });
    });
    myapp.controller('LoginController', function($scope, $http) {
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

    	                          			} );

    	                          	myapp.controller('TabController', function() {
    	                          		this.tab = 1;
    	                          		this.selectTab = function(setTab) {
    	                          			this.tab = setTab;
    	                          		};
    	                          		this.isSelected = function(checkTab) {
    	                          			return this.tab === checkTab;
    	                          		};
    	                          	});
	
}());