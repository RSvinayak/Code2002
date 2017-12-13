angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'HomeCtrl as ctrl'
		})

		.when('/cf/managesubscribers', {
			templateUrl: 'views/manage_subscribers.html',
			controller: 'ManageSubscriberCtrl as ctrl'
		})

		.when('/cf/groupdetails', {
			templateUrl: 'views/group_details.html',
			controller: 'GroupDetailsCtrl as ctrl'
		})

	$locationProvider.html5Mode(true);

}]);