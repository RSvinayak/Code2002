(function (angular) {
    var cfapp = angular.module('CFApp');
    cfapp.directive('cfelementSingle', ['ManageSubscriberService', function (ManageSubscriberService) {
        
        var directive = {};

        directive.restrict = 'E';
        directive.transclude = true;

        directive.scope = {
            params: "=params",
            values: "=values"
        };

        directive.templateUrl = function (element, attributes) {
            return "views/templates/master_element_template_single.html";
        };

        directive.controller = ['$scope', '$filter', function($scope, $filter){
            $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[0];
            $scope.altInputFormats = ['M!/d!/yyyy'];
            $scope.dateOptions = {
                formatYear: 'yy',
                maxDate: null,
                minDate: null,
                startingDay: 1
            };
            $scope.datepopup = {};

            $scope.showDatePopupInit = function(item){
                $scope.datepopup[item.id] = {};
                $scope.datepopup[item.id].opened = false;
            }

            $scope.showDatePopup = function(identifier){
                $scope.datepopup[identifier].opened = true;
            }

            $scope.applyFilter = function (model) {
                $scope.gridOptions.api.setQuickFilter(ctrl.dynamicModelValues.searchFieldParams[model]);
                $scope.gridOptions.api.refreshView();
            }

            $scope.getOptionsList = function(item){
                if (item.src != null && typeof (item.src) != "undefined") {
                    $scope.$emit("getDropDownListData", item.src);
                }
            }

            $scope.onDropdownChange = function(identifier){
                $scope.$emit("onDropdownChange", identifier);
            }

            $scope.onInputChange = function(identifier){
                $scope.$emit("onInputChange", identifier);
            }

        }];

        return directive;
    }]);
})(angular);
