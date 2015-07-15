(function(){
	var user ={
			username :  "arjun" ,
			password: "arjun"			
	}

	var myapp = angular.module("myapp", []);

	myapp.controller('LoginController', ['$scope','$http',function($scope,$http) {
		 console.log("The username is ",$scope.username);
		 console.log("The username is ",$scope.password);
	   $scope.login=function(){ $http({
            method :'POST',
            url:'http://localhost:8089/spark/logintest',
            data:{username :  "arjun" ,
    			password: "arjun" },
            contentType: 'application/json; charset=utf-8'
        }).success(function (data, status, headers, config) {
            console.log('status',status);
            console.log('the data is data',status);
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
