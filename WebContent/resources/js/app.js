(function(){
	var myapp = angular.module("myapp", []);
	myapp.controller("LoginController", function() {
	            
	})
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
