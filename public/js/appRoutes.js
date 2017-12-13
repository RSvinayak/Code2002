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

		.when('/cf/auctiondetails', {
			templateUrl: 'views/auction_details.html',
			controller: 'AuctionDetailsCtrl as ctrl'
		})

		.when('/cf/accountmgmt', {
			templateUrl: 'views/account_management.html',
			controller: 'AccountMgmtCtrl as ctrl'
		})

		.when('/cf/transactions', {
			templateUrl: 'views/transaction_details.html',
			controller: 'TransactionCtrl as ctrl'
		})

		.when('/cf/payments', {
			templateUrl: 'views/payment.html',
			controller: 'PaymentCtrl as ctrl'
		})

		.when('/cf/installmentadvance', {
			templateUrl: 'views/installment_advance.html',
			controller: 'InstallmentAdvanceCtrl as ctrl'
		})

		.when('/cf/installmentreceipt', {
			templateUrl: 'views/installment_receipt.html',
			controller: 'InstallmentReceiptCtrl as ctrl'
		})

	$locationProvider.html5Mode(true);

}]);