//angular.module('CFApp', ['ngRoute', 'appRoutes', 'MainCtrl', 'NerdCtrl', 'NerdService', 'GeekCtrl', 'GeekService']);
agGrid.initialiseAgGridWithAngular1(angular);
angular.module('CFApp', ['ngRoute', 'appRoutes', 'agGrid', 'ui.bootstrap', 'toastr', 'ng-webcam']);