var photokichoapp = angular.module('photokichoapp',['ngRoute','ui.bootstrap']);

photokichoapp.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
	$routeProvider
	.when("/",
	{
		templateUrl: "html/home.html"
	})
	.when("/features",
	{
		
		templateUrl : "html/features.html"
	})
	.when("/gallery",
	{
		
		templateUrl : "html/gallery.html"
	})
	.when('/packages',
	{
		
		templateUrl : "html/packages.html"
	})
	.when('/map',
		{
			
			templateUrl : "html/map.html"
		})
	.when('/myphotos',
		{
			
			templateUrl : "html/myphotos.html"
		})
	.when('/contactus',
	{
		controller  : 'contactController',
		templateUrl : "html/contact.html"
	})
	.otherwise({
		redirectTo: "/"
	});

	
}]);

photokichoapp.controller('contactController',function($scope,$http){
	$scope.	submitForm = function(){
		var formdata = {
			emailid : $scope.emailid , 
			message : $scope.message
		};
		console.log("Sending form data to server");
	$http.post('/contactus',formdata)
	.success(function(response){
		console.log("Form data sent successfully to the server");
		alert(response);
	});
	};
});

photokichoapp.controller('loginController',function($scope,$http){
	$scope.login = function(user){
		$http.post('/login',user)
		.success(function(res){
			if(!res) {
				console.log("No user found");
			}
			else console.log(res);
		});
	};
});


photokichoapp.controller('galleryController',function($scope)
	{
		$scope.myInterval = 3000;
  		$scope.slides = [
    {
      image: 'assets/img/portfolio/1.png',
      text: '@Photokicho Launch July 2015'
    },
    {
      image: 'assets/img/portfolio/2.png',
      text: '@Photokicho Launch July 2015'
    },
    {
     image: 'assets/img/portfolio/3.png',
      text: '@Photokicho Launch July 2015'
    },
    {
      image: 'assets/img/portfolio/4.png',
      text: '@Photokicho Launch July 2015'
    },
    {
     image: 'assets/img/portfolio/5.png',
      text: '@Photokicho Launch July 2015'
    },
    {
     image: 'assets/img/portfolio/6.png',
      text: '@Photokicho Launch July 2015'
    },
    {
     image: 'assets/img/portfolio/7.png',
      text: '@Photokicho Launch July 2015'
    },
    {
     image: 'assets/img/portfolio/8.png',
      text: '@Photokicho Launch July 2015'
    },
    {
     image: 'assets/img/portfolio/9.png',
      text: '@Photokicho Launch July 2015'
    },
    {
     image: 'assets/img/portfolio/10.png',
      text: '@Photokicho Launch July 2015'
    },
    {
     image: 'assets/img/portfolio/11.png',
      text: '@Photokicho Launch July 2015'
    }
  ];
	});
