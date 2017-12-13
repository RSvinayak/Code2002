(function () {
    var CFApp = angular.module('CFApp');
    var HomeCtrl = function ($scope, HomeService) {
        var ctrl = this;

        var IMG_TYPE_PROFILE = 1;
        var IMG_TYPE_SIGNATURE = 2;
        var IMG_TYPE_ID_FRONT = 3;
        var IMG_TYPE_ID_BACK = 4;

        ctrl.imgArray = [];

        ctrl.config = {
            delay: 0,
            shots: 1
        };

        ctrl.init = function(){
            HomeService.getApplicationConfigDetails().then(
                function(response){
                    addValuesToLocalStorage(response);
                },
                function(response){
                    console.log("ERROR");
                }
            )
        }

        ctrl.onError = function(err){
            console.log("[webcamjs] web-camera load error");
        }

        ctrl.onCaptureComplete = function(src){
            var imgDetails = getImageDetails(src, IMG_TYPE_PROFILE);
            ctrl.imgArray.push(imgDetails);

            $scope.$broadcast('ngWebcam_off');
            $scope.$broadcast('ngWebcam_on');
        }

        ctrl.capture = function() {
            $scope.$broadcast('ngWebcam_on');
            $scope.$broadcast('ngWebcam_capture'); 
        };

        var getImageDetails = function(src, type){
            var imgDetails = {};
            imgDetails.imgType = type;
            imgDetails.imgTitle = getTitleForImgType(type);
            imgDetails.imgSrc = src[ctrl.config.shots-1];
            imgDetails.imgOptions = [{name: "Save"}, {name: "Clear"}]
            return imgDetails;
        }
        
        var getTitleForImgType = function(type){
            var title = "";
            switch(type){
                case IMG_TYPE_PROFILE: title = "Photo"; break;
                case IMG_TYPE_SIGNATURE: title = "Signature"; break;
                case IMG_TYPE_ID_FRONT: title = "ID Front"; break;
                case IMG_TYPE_ID_BACK: title = "ID Back"; break;
            }
            return title;
        }

        var addValuesToLocalStorage = function(response){
            if(response != null && response.data != null){
                for(var prop in response.data){
                    localStorage.setItem(prop, response.data[prop]);
                }
            }

        }
	}

    CFApp.controller('HomeCtrl', ['$scope', 'HomeService', HomeCtrl]);
}());