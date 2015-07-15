(function(){

	var myapp = angular.module("myapp", []);

	myapp.controller('LoginController', ['$scope','$http',function($scope,$http) {
		 console.log("The username is ",$scope.username);
		 console.log("The username is ",$scope.password);
	   $scope.login=function(){ $http({
            method :'GET',
            url:'http://localhost:8089/spark/',
//            data: { username :  $scope.username , password: $scope.password},
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            console.log('status',status);
            console.log('data',status);
            console.log('headers',status);
        });};
                
	}])

	myapp.controller('TabController', function (){
		this.tab = 1;
		this.selectTab = function (setTab){
		this.tab = setTab;
		};
		this.isSelected = function(checkTab) {
		return this.tab === checkTab;
		};
		});


})();
