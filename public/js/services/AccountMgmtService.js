angular.module('CFApp').factory('AccountMgmtService', ['$http', '$q',  function($http, $q) {
    
        var getMainClass = function(){              
                return $http({
                        url: '/api/acc_mgmt/mc',
                        method: 'GET',
                });
        }

        var getMainGroup = function(mcid){              
                return $http({
                        url: '/api/acc_mgmt/mg/'+mcid,
                        method: 'GET',
                });
        }
        
        var getSubGroup = function(mgid){              
                return $http({
                        url: '/api/acc_mgmt/sg/'+mgid,
                        method: 'GET',
                });
        }

        var addSubGroup = function(subgroup){
                return $http({
                        url: '/api/acc_mgmt/sg',
                        method: 'POST',
                        data: subgroup
                });
        }

        var updateSubGroup = function(id, subgroup){
                return $http({
                        url: '/api/acc_mgmt/sg/'+id,
                        method: 'PUT',
                        data: subgroup
                });
        }

        var getUserGroup = function(sgid){              
                return $http({
                        url: '/api/acc_mgmt/ug/'+sgid,
                        method: 'GET',
                });
        }

        var addUserGroup = function(usergroup){
                return $http({
                        url: '/api/acc_mgmt/ug',
                        method: 'POST',
                        data: usergroup
                });
        }

        var updateUserGroup = function(id, usergroup){
                return $http({
                        url: '/api/acc_mgmt/ug/'+id,
                        method: 'PUT',
                        data: usergroup
                });
        }
    
        return {
                //Main Class
                getMainClass: getMainClass,
                //Main Group
                getMainGroup: getMainGroup,
                //Sub Group
                getSubGroup: getSubGroup,
                addSubGroup: addSubGroup,
                updateSubGroup: updateSubGroup,
                //User group
                getUserGroup: getUserGroup,
                addUserGroup: addUserGroup,
                updateUserGroup: updateUserGroup
        }
}]);