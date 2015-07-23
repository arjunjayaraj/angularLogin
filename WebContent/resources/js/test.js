var user ={
			"username" :  "ashwin" ,
			"password": "password"			
	};
var username ="arjun";
var password = "arjun";
angular.module('testApp.services',['ngResource']).factory('Entry', function($resource) {
  return $resource('http://localhost:8089/spark/logintest'); // Note the full endpoint address
});


angular.module('testApp.controllers',['testApp.services']).controller('ResourceController',function($scope, Entry) {
  var entry ;
  var post = $resource('http://localhost:8089/spark/logintest',{
		   charge: {method:'post', params:{charge:true}}
		  });
  post.save(user);
  this.login=function(){
  $scope.entry = new Entry(); //You can instantiate resource class
 
  $scope.entry.data = { "username" :username,
  		"password" :password,
  };
 
  Entry.save($scope.entry, function() {
    //data saved. do something here.
  });} //saves an entry. Assuming $scope.entry is the Entry object  
});