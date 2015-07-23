(function() {
var test={
		username : "arjun",
		password : "arjun",
		enabled: "false"
		
};
	var myapp = angular.module("myapp", []);

	myapp.controller('LoginController', [ '$scope', '$http',
			function($scope, $http) {
				$scope.user = {
					username : "arjun",
					password : "arjun",
				};

						$scope.login = function() {
					$http({
						method : 'POST',
						url : 'http://localhost:8089/SurveyManagementSystem/reg',
						params : test,
						contentType : 'application/json; charset=utf-8'
					}).success(function(data, status, headers, config) {
						console.log('status', status);
						console.log('the data is data', data);
						console.log('headers', status);
					});
				};

			} ]);

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
