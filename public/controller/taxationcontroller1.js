
var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http,$localStorage,$sessionStorage, $window) {
    console.log("Hello World from controller display");

var refresh = function() {
$http.get('/getitemtaxation').success(function(response) {
 	console.log("i get the data i requested");
  	$scope.res = response;
    console.log(response);

  });
};

refresh();
$scope.user = {};

$scope.addnewitem = function() {
 if($scope.user.name == undefined && $scope.user.aliasname== undefined && $scope.user.taxlevel == undefined)
{
  alert("Please Fill All Mandetory Fields");
}


 else if($scope.user.name == undefined ||$scope.user.aliasname== undefined ||$scope.user.taxlevel == undefined){
    //alert("");

    for(let k = 0;k<1;k++){
    console.log($scope.user.name);
    if($scope.user.name == undefined){
      alert("Please enter Tax Name");
      break;
    }
    console.log($scope.user.aliasname);
    if($scope.user.aliasname == undefined){
      alert("Please enter Alias Name");
      break;
    }
    console.log( $scope.user.taxlevel);
    if($scope.user.taxlevel == undefined){
      alert("Please enter Display Order");
      break;
    }
  }//for llop
 }


 else{
    console.log("i am add" + $scope.user.name, $scope.user.aliasname, $scope.user.taxlevel);
    $http.post('/opalpost', $scope.user).success(function(response) {
               console.log(response);
               refresh();
       });
    $scope.user = ""

  }
  

  
};
$scope.findTaxName =function(){

           $http.get('/getname'+$scope.user.name).success(function(response)
              {
                //alert(response.length);
                if (response.length >0) {
                  alert("Duplicates are not allowed in Tax Name");
                  $scope.user.name = "";
                  //user.aliasname="";
                }
              //}
            })
         }
         $scope.findaliasName =function(){

           $http.get('/getaliasname'+$scope.user.aliasname).success(function(response)
              {
                //alert(response.length);
                if (response.length >0) {
                  alert("Duplicates are not allowed in Tax Name");
                  //$scope.user.name = "";
                  $scope.user.aliasname="";
                }
              //}
            })
         }

$scope.remove = function(id) {
  $scope.test = 'display'
  
              var r = confirm("Are you sure you want to delete ");
               if (r == true)
               {
                 $http.delete('/opal/' + id).success(function(response) {
                       refresh();   

                     });
                  $scope.user = ""
               }
               else{
                  
                    $scope.user = ""
                     //refresh();

               }

//refresh();

};

 $scope.test = 'display'
$scope.edit = function(id) {
  console.log("edit call" +id);
  console.log("this is " +id);
   $scope.test = 'update1'
  // var uid=id;
  $http.get('/item1/' + id).success(function(response) {
     $scope.user = response;
//refresh();
  });

};  

$scope.update = function() {
  
  //alert('gg')
  $scope.test = 'display'
   if($scope.user.name == undefined && $scope.user.aliasname== undefined && $scope.user.taxlevel == undefined)
{
  alert("Please Fill All Mandetory Fields");
}


 else if($scope.user.name == undefined ||$scope.user.aliasname== undefined ||$scope.user.taxlevel == undefined){
    //alert("");

    for(let k = 0;k<1;k++){
    console.log($scope.user.name);
    if($scope.user.name == undefined){
      alert("Please enter Tax Name");
      break;
    }
    console.log($scope.user.aliasname);
    if($scope.user.aliasname == undefined){
      alert("Please enter Alias Name");
      break;
    }
    console.log( $scope.user.taxlevel);
    if($scope.user.taxlevel == undefined){
      alert("Please enter Display Order");
      break;
    }
  }//for llop
 }
  else {
    //alert($scope.user._id)

  $http.put('/updatetaxation/' + $scope.user._id, $scope.user).success (function(response) {
          //alert(response)
           refresh();


       });

   $scope.user = ""
 $scope.test = 'display'
  }


  
};

$scope.deselect = function() {
  //alert('kkSS')
   if($scope.user.name == undefined && $scope.user.aliasname== undefined && $scope.user.taxlevel == undefined)
{
  alert("Please Fill All Mandetory Fields");
}
else{
  $scope.user = ""
   //refresh();
   $scope.test="display"
}

}

}]);