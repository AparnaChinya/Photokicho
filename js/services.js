var services = angular.module('services',[]);

services.factory('mailService',function($scope,$http){
	return sendEMail = function(mail){
		$http.post('/contactus',mail)
		.success(function(response){
			console.log(response);
		});
	}
});