(function () {
    var CFApp = angular.module('CFApp');
    var ManageSubscriberCtrl = function ($scope, $uibModal, toastr, ManageSubscriberService,$location) {
        var ctrl = this;

        var IMG_TYPE_PHOTO = 1;
        var IMG_TYPE_SIGNATURE = 2;
        var IMG_TYPE_ID_FRONT = 3;
        var IMG_TYPE_ID_BACK = 4;

        ctrl.config = {
            delay: 0,
            shots: 1
        };

        var selectedPicture = null;
        var selectedID = null;

        ctrl.isIDShown = false;
        ctrl.Picture = {options: [{id:"1", label: "Photo"}, 
            {id:"2", label: "Signature"}, {id:"3", label: "ID-Front"}, {id:"4", label: "ID-Back"}]}
        ctrl.pictureModel = {};
        
        ctrl.ID = {options: [{id:"1", label: "Aadhaar Card"}, 
            {id:"2", label: "PAN"}, {id:"3", label: "Driver License"}, {id:"4", label: "Passport"}]}
        ctrl.idModel = {};

        ctrl.pgTitle = "Manage Party";
        ctrl.pgSubtitle = "Create / update party details";

        ctrl.isPhotoSectionEnabled = false;
        ctrl.isNewClicked = false;
        ctrl.isEditClicked = false;
        ctrl.showKYCBtn = false;
        
        ctrl.dynamicModelValues = {
            searchFieldParams: {},
            formParams: {}
        };

        ctrl.searchFieldParams = [
            {id:"sfp_search", label:"Search", inputType:"text", placeholder:"Search grid", model: "search_filter"}
        ];

        ctrl.formParams = {
            subscriber: [
                {id:"fps_title", label:"Title", inputType:"dropdown", placeholder:"Title", model: "title",
                    options: [
                        {id:"1", label:"Mr."}, {id:"2", label:"Mrs."}, {id:"3", label:"Ms."}, 
                        {id:"4", label:"Miss."}, {id:"5", label:"Sir."}, {id:"6", label:"Dr."}
                    ]
                },
                {id:"fps_name", label:"Name", inputType:"text", placeholder:"Name", model: "name"},
                {id:"fps_email", label:"Email", inputType:"email", placeholder:"Email", model: "email"},
                {id:"fps_mobile", label:"Mobile", inputType:"number", placeholder:"Mobile", model: "mobile"},
                {id:"fps_residence", label:"Residence No.", inputType:"number", placeholder:"Residence No", model: "residence"},
                {id:"fps_office", label:"Office No.", inputType:"number", placeholder:"Office No", model: "office"},
                {id:"fps_fax", label:"Fax No.", inputType:"number", placeholder:"Fax No", model: "fax"},
                {id:"fps_partytype", label:"Party Type", inputType:"dropdown", placeholder:"Party Type", model: "party_type",
                    options: [
                        {id:"1", label:"Cash party"}, {id:"2", label:"Subscriber"}, {id:"3", label:"Customer"},
                        {id:"4", label:"Supplier"} 
                    ]
                },
            ],
            address1: [
                {id:"fpa1_address", label:"Address", inputType:"text", placeholder:"Address", model: "address1"},
                {id:"fpa1_street", label:"Street", inputType:"text", placeholder:"Street", model: "stree1"},
                {id:"fpa1_city", label:"City", inputType:"dropdown", placeholder:"City", model: "city1",
                    options: [
                        {id:"1", label:"Bengaluru"}, {id:"2", label:"Mysore"}, {id:"3", label:"Mangalore"}, 
                        {id:"4", label:"Belgaum"}, {id:"5", label:"Gulbarga"}, {id:"6", label:"Davanagere"}, 
                        {id:"7", label:"Bellary"}, {id:"8", label:"Bijapur"}, {id:"9", label:"Shimoga"}, {id:"10", label:"Tumkur"}
                    ]
                },
                {id:"fpa1_zone", label:"Zone", inputType:"text", placeholder:"Zone", model: "zone1"},
                {id:"fpa1_pincode", label:"Pincode", inputType:"text", placeholder:"Pincode", model: "pincode1"}
            ],
            address2: [
                {id:"fpa2_address", label:"Address", inputType:"text", placeholder:"Address", model: "address2"},
                {id:"fpa2_street", label:"Street", inputType:"text", placeholder:"Street", model: "stree2"},
                {id:"fpa2_city", label:"City", inputType:"dropdown", placeholder:"City", model: "city2",
                    options: [
                        {id:"1", label:"Bengaluru"}, {id:"2", label:"Mysore"}, {id:"3", label:"Mangalore"}, 
                        {id:"4", label:"Belgaum"}, {id:"5", label:"Gulbarga"}, {id:"6", label:"Davanagere"}, 
                        {id:"7", label:"Bellary"}, {id:"8", label:"Bijapur"}, {id:"9", label:"Shimoga"}, {id:"10", label:"Tumkur"}
                    ]
                },
                {id:"fpa2_zone", label:"Zone", inputType:"text", placeholder:"Zone", model: "zone2"},
                {id:"fpa2_pincode", label:"Pincode", inputType:"text", placeholder:"Pincode", model: "pincode2"}
            ]
        };

        var columnDefs1 = [
            {headerName: "Sl. No. ", Field: "rowNum", valueGetter: "node.id + 1", width: 70},
            {headerName: "ID", field: '_id', width: 250, hide: true},
            {headerName: "Name", field: 'name', width: 250},
            {headerName: "City", field: 'city', width: 250},
            {headerName: "Mobile No", field: 'mobile', width: 250},
        ];

        var rowData = [];
        ctrl.gridOptions = {}

        ctrl.init = function (){
            rowData = [];
            ctrl.gridOptions = {
                rowData: [],
                virtualPaging: false,
                rowSelection: 'single',
                rowHeight: 33,
                enableSorting: true,
                enableFilter: true,
                onSelectionChanged: onSelectionChanged,
                onGridReady: function(params) {
                    params.api.setColumnDefs(columnDefs1);
                }
            };

            ManageSubscriberService.getSubscribers().then(
                function(response){
                    rowData = getRowDataFromArray(response);
                    ctrl.gridOptions.api.setRowData(rowData);
                }, 
                function(response){
                    
                }
            );

            ctrl.isPhotoSectionEnabled = (localStorage.getItem("isPhotoEnabled") == null) ? 
                false : (localStorage.getItem("isPhotoEnabled") == "true") ? 
                    true : false;
        }

        ctrl.onClickBtn = function(identifier){
            if(identifier == "New"){
                onNewClicked();
            } else if(identifier == "Edit"){
                onEditClicked();
            } else if(identifier == "Close"){
                onClickClose();
                //onCloseClicked();
            } else if(identifier == "Print"){
                //DTOService.showToastMessage(DTOService.MessageType.INFO, DTOService.Messages.UnsupportedOp);
            } else if(identifier == "Clear"){
                onClearClicked();
            } else if(identifier == "Save"){
                ManageSubscriberService.countLedgerAccount()
                     .then(function(count){
                        console.log(count)
                        //alert(" count is  "+count)
                     })
                onClickSave();
            } else if(identifier == "KYC"){
                onClickKYC();
            } else if(identifier == "Back"){
                onClickBack();
            }else {

            }
        }

        ctrl.applyFilter = function (model) {
            ctrl.gridOptions.api.setQuickFilter(model);
            ctrl.gridOptions.api.refreshView();
        }

        ctrl.onError = function(err){
            console.log("[webcamjs] web-camera load error");
        }

        ctrl.resolveImage = function(imageURL){
            if(imageURL != null && typeof(imageURL) != "undefined"){
                var parts = imageURL.split("/");
                ManageSubscriberService.getSubscriberImages(parts[0], parts[1]).then(function(response){
                    console.log(response);
                    return imageURL;
                }, 
                function(response){
                    console.log(response);
                });
            }
        }

        ctrl.onCaptureComplete = function(src){
            var imgDetails = getImageDetails(src);
            if(ctrl.dynamicModelValues.formParams.image_data == null || 
                typeof(ctrl.dynamicModelValues.formParams.image_data) == "undefined"){
                ctrl.dynamicModelValues.formParams.image_data = new Array();
            }
            var foundObject = checkForDuplicates(imgDetails, ctrl.dynamicModelValues.formParams.image_data);
            if(foundObject.index == -1){
                ctrl.dynamicModelValues.formParams.image_data.push(imgDetails);
            }else {
                ctrl.dynamicModelValues.formParams.image_data.splice(foundObject.index, 1);
                ctrl.dynamicModelValues.formParams.image_data.push(imgDetails);
            }

            $scope.$broadcast('ngWebcam_off');
            $scope.$broadcast('ngWebcam_on');
        }

        ctrl.capture = function() {
            if(selectedPicture == null){
                alert("selectedPicture - not selected")//show error message
            }else {
                if(selectedPicture.label == "Photo" || selectedPicture.label == "Signature"){
                    $scope.$broadcast('ngWebcam_on');
                    $scope.$broadcast('ngWebcam_capture');
                }else {
                    if(selectedID == null){
                        alert("selectedID - not selected")//show error message
                    }else{
                        $scope.$broadcast('ngWebcam_on');
                        $scope.$broadcast('ngWebcam_capture');
                    }
                }
            }            
        };

        ctrl.onChangePicture = function(){
            selectedPicture = ctrl.pictureModel;
            if(ctrl.pictureModel.label == "ID-Front" || ctrl.pictureModel.label == "ID-Back"){
                ctrl.isIDShown = true;
            }else {
                ctrl.isIDShown = false;
            }
        }

        ctrl.onChangeID = function(){
            selectedID = ctrl.idModel;
        }

        ctrl.onPhotoDelete = function(item){
            var foundObject = checkForDuplicates(item, ctrl.dynamicModelValues.formParams.image_data);
            if(foundObject.index != -1){
                ctrl.dynamicModelValues.formParams.image_data.splice(foundObject.index, 1);
            }
        }

        function onSelectionChanged(){
            var selectedRows = ctrl.gridOptions.api.getSelectedRows();
            if(selectedRows != null && selectedRows.length > 0){
                ctrl.showKYCBtn = true;
            }else {
                ctrl.showKYCBtn = false;
            }
        }
        console.log(" manage active ");
        /*
        PRIVATE METHODS
         */
        var nameDetails = null;
        var onClickSave = function (){
            var subscriberData = angular.copy(ctrl.dynamicModelValues.formParams);
            subscriberData.image_data = [];
            subscriberData.image_data = angular.copy(ctrl.dynamicModelValues.formParams.image_data);

            var subscriber = {
                subscriber: ctrl.dynamicModelValues.formParams.name, 
                data: subscriberData
            };

            subscriber = JSON.stringify(subscriber);
            nameDetails = ctrl.dynamicModelValues.formParams.name;
            
            
            if(ctrl.isNewClicked){
                ManageSubscriberService.addSubscriber(subscriber)
                .then(function(response){
                    console.log(response);
                    console.log(response.data);
                    console.log(response.data.length);

                    console.log(response.data[response.data.length - 1]);
                    console.log(response.data[response.data.length - 1]._id);
                    //ManageSubscriberService.updateSubscriber(response.data[response.data.length - 1]._id)

               
                    //alert(" got data ")
                    rowData = getRowDataFromArray(response);
                    ctrl.gridOptions.api.setRowData(rowData);
                    toastr.success('Party details save successfully', 'Success');
                }, 
                function(response){
                    toastr.error('Error while saving party details.', 'Error');
                });
            }else {
                var id = subscriberData["id"];
                ManageSubscriberService.updateSubscriber(id, subscriber)
                .then(function(response){
                    rowData = getRowDataFromArray(response);
                    ctrl.gridOptions.api.setRowData(rowData);
                    toastr.success('Party details save successfully', 'Success');
                }, 
                function(response){
                    toastr.error('Error while saving party details.', 'Error'); 
                });
            }

            onCloseClicked();
        }

        var onClickKYC = function(){
            var kycData = null;
            var selectedRows = ctrl.gridOptions.api.getSelectedRows();
            if(selectedRows != null && selectedRows.length > 0){
                ctrl.dynamicModelValues.formParams["id"] = selectedRows[selectedRows.length - 1]["_id"];
                kycData = selectedRows[selectedRows.length - 1].kyc;
            }
            var ngModalInstance = $uibModal.open({
                animation: true,
                templateUrl: './views/kyc_details.html',
                controller: 'KYCCtrl',
                backdrop: 'static',
                size: 'lg',
                resolve: {
                    data: function () {
                        return kycData;
                    }
                }
            });

            ngModalInstance.result.then(function (data) {   
                console.log(data);
                var partyID = ctrl.dynamicModelValues.formParams["id"];
                ManageSubscriberService.updatePartyKYCDetails(partyID, data.formParams)
                    .then(function(response){
                        rowData = getRowDataFromArray(response);
                        ctrl.gridOptions.api.setRowData(rowData);
                    }, 
                    function(response){
                        
                    }
                );                    
            });
        }

        var onNewClicked = function(){
            ctrl.isNewClicked = true;
            ctrl.isEditClicked = false;
            ctrl.gridOptions.api.deselectAll();
            ctrl.dynamicModelValues.formParams = {};
        }

        var onClickBack = function(){
             // alert("subscribe name back "+nameDetails);
            
             window.location = "Transaction.html";
             window.sessionStorage.setItem("name",nameDetails);
        }
           var onClickClose = function(){
             // alert("subscribe name back "+nameDetails);
            
             window.location = "Transaction.html";
             //window.sessionStorage.setItem("name",nameDetails);
        }

        var onEditClicked = function (){
            ctrl.isNewClicked = false;
            ctrl.isEditClicked = true;
            ctrl.dynamicModelValues.formParams = {};

            var selectedRows = ctrl.gridOptions.api.getSelectedRows();
            if(selectedRows != null && selectedRows.length > 0){
                ctrl.dynamicModelValues.formParams["id"] = selectedRows[selectedRows.length - 1]["_id"];
                var data = selectedRows[selectedRows.length - 1].data;
                for(var prop in data){
                    ctrl.dynamicModelValues.formParams[prop] = data[prop];
                }
            }
        }

        var onCloseClicked = function(){
            ctrl.gridOptions.api.deselectAll();
            ctrl.dynamicModelValues.formParams = {};
            ctrl.isNewClicked = false;
            ctrl.isEditClicked = false;
        }

        var onClearClicked = function(){
            ctrl.dynamicModelValues.formParams = {};
        }

        var onSaveSuccess = function(response){
            var insertedRowData = getRowDataFromObject(response);
            if(insertedRowData != null){
                if(rowData == null){
                    rowData = insertedRowData;
                    ctrl.gridOptions.api.setRowData(insertedRowData);
                }else {
                    for(var index = 0; index < insertedRowData.length; index++){
                        if(ctrl.isEditClicked){
                            var listIndex = findIndexOfObjectInList(insertedRowData[index]["_id"], rowData);
                            if (listIndex > -1) {
                                rowData.splice(listIndex, 1);
                            }
                        }
                        rowData.push(insertedRowData[index]);
                    }
                    ctrl.gridOptions.api.setRowData(rowData);
                }
            }
            onCloseClicked();
        }

        var onSaveError = function(response){
            
        }

        var getRowDataFromArray = function(response){
            var records = null;
            if(response != null && response.data != null && response.data.length > 0){
                records = new Array();
                for(var index = 0;index < response.data.length; index++){
                    var obj = {
                        _id: response.data[index]._id,
                        name: response.data[index].subscriber,
                        city: getCityWithID(response.data[index].data["city1"].id),
                        mobile: response.data[index].data["mobile"],
                        data: response.data[index].data,
                        kyc: response.data[index].kyc
                    };
                    records.push(obj);
                }
            }
            return records;
        }

        var getCityWithID = function(id){
            var array = [{id:"1", label:"Bengaluru"}, {id:"2", label:"Mysore"}, {id:"3", label:"Mangalore"}, 
                {id:"4", label:"Belgaum"}, {id:"5", label:"Gulbarga"}, {id:"6", label:"Davanagere"}, 
                {id:"7", label:"Bellary"}, {id:"8", label:"Bijapur"}, {id:"9", label:"Shimoga"}, {id:"10", label:"Tumkur"}];
            
            var label = "";
            for(var i = 0; i < array.length; i++){
                if(array[i].id == id){
                    label = array[i].label;
                }
            }

            return label;
        }

        var getRowDataFromObject = function(response){
            var records = null;
            if(response != null && response.data != null){
                records = new Array();
                var obj = {
                    _id: response.data._id,
                    name: response.data.subscriber,
                    city: getCityWithID(response.data.data["city1"].id),
                    mobile: response.data.data["mobile"],
                    data: response.data.data
                };              

                records.push(obj);
            }
            return records;
        }

        var findIndexOfObjectInList = function(id, list){
             var foundIndex = -1;
             for(var index = 0; index < list.length; index++){
                 if(list[index]["_id"] == id){
                     foundIndex = index;
                     break;
                 }
             }
             return foundIndex;
        }

        var getImageDetails = function(src){
            var imgDetails = {};
            var imgType = getTypeForImg(selectedPicture);
            if(imgType != null){
                imgDetails.imgType = imgType;
                imgDetails.imgTitle = getTitleForImgType(imgType, selectedID);
                imgDetails.imgSrc = src[ctrl.config.shots-1];
                imgDetails.imgURL = null;
                return imgDetails;
            }
        }
        
        var getTypeForImg = function(selPicture){
            var type = "";
            switch(selPicture.label){
                case "Photo": type = IMG_TYPE_PHOTO; break;
                case "Signature": type = IMG_TYPE_SIGNATURE; break;
                case "ID-Front": type = IMG_TYPE_ID_FRONT; break;
                case "ID-Back": type = IMG_TYPE_ID_BACK; break;
            }
            return type;
        }

        var getTitleForImgType = function(type, selID){
            var title = "";
            switch(type){
                case IMG_TYPE_PHOTO: title = "Photo"; break;
                case IMG_TYPE_SIGNATURE: title = "Signature"; break;
                case IMG_TYPE_ID_FRONT: title = "ID Front - "+selID.label; break;
                case IMG_TYPE_ID_BACK: title = "ID Back - "+selID.label; break;
            }
            return title;
        }

        var checkForDuplicates = function (item, array){
            var foundObject = {index: -1, object: null};
            if(array != null && typeof(array) != "undefined"){
                for(var index = 0; index < array.length; index++){
                    if(item.imgType == array[index].imgType){
                        foundObject = {index: index, object: array[index]};
                        break;
                    }
                }
            }

            return foundObject;
        }
	}

    CFApp.controller('ManageSubscriberCtrl', ['$scope', '$uibModal', 'toastr', 'ManageSubscriberService', ManageSubscriberCtrl]);

    var KYCCtrl = function ($scope, $uibModalInstance, data) {
        
        var formatDate = function(date){
            var resDate = "";
            var datetime = new Array();
            datetime = date.split("T");

            if(datetime.length > 0){
                resDate = datetime[0];
            }
            return resDate;
        }

        $scope.dynamicModelValues = {
            formParams: {}
        };
        if(data != null){
            for(var prop in data){
                if(prop == "dob"){
                    $scope.dynamicModelValues.formParams[prop] = new Date(formatDate(data[prop]));
                }else {
                    $scope.dynamicModelValues.formParams[prop] = data[prop];
                }
            }
        }

        $scope.formParams = {
            kyc: [
                {id:"dob", label:"DOB/Inception of Corporate or firm", inputType:"date", model: "dob"},
                {id:"relation", label:"Relation", inputType:"dropdown", placeholder:"Relation", model: "relation",
                    options: [
                        {id:"1", label:"Son Of"}, 
                        {id:"2", label:"Wife Of"}, 
                        {id:"3", label:"Daughter Of"}, 
                        {id:"4", label:"Husband Of"}
                    ]
                },
                {id:"relation_name", label:"Relation Name", inputType:"text", placeholder:"Relation Name", model: "relation_name"},
                {id:"occupation", label:"Occupation", inputType:"text", placeholder:"Occupation", model: "occupation"},
                {id:"party_type", label:"Type of Party", inputType:"dropdown", placeholder:"Type of Party", model: "party_type",
                    options: [
                        {id:"1", label:"Individual"}, 
                        {id:"2", label:"Business"},
                        {id:"3", label:"Corporate"}
                    ]
                },
                {id:"contact_person", label:"Contact Person", inputType:"text", placeholder:"Contact Person", model: "contact_person"},
                {id:"authorised_signatory", label:"Authorised Signatory", inputType:"text", placeholder:"Authorised Signatory", model: "authorised_signatory"}
            ],
            bank: [
                {id:"bank", label:"Bank", inputType:"text", model: "bank"},
                {id:"Branch", label:"Branch", inputType:"text", model: "branch"},
                {id:"city", label:"City", inputType:"text", model: "city"},
                {id:"account_no", label:"Account No", inputType:"text", model: "account_no"},
                {id:"account_type", label:"Type of Account", inputType:"dropdown", model: "account_type",
                    options: [
                        {id:"1", label:"Savings"}, 
                        {id:"2", label:"Current"}
                    ]
                },
                {id:"ifsc", label:"IFCS", inputType:"text", model: "ifsc"},
            ],
            others: [
                {id:"pan", label:"PAN", inputType:"text", model: "pan"},
                {id:"aadhaar", label:"Aadhaar", inputType:"text", model: "aadhaar"},
                {id:"other_id", label:"Other ID", inputType:"dropdown", model: "other_id",
                    options: [
                        {id:"1", label:"Driving License"}, 
                        {id:"2", label:"Passport"}
                    ]
                },
                {id:"id_no", label:"ID No", inputType:"text", model: "id_no"},
            ]
        };

        $scope.save = function () {
            $uibModalInstance.close($scope.dynamicModelValues);
        }

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    };

    CFApp.controller('KYCCtrl', ['$scope', '$uibModalInstance', 'data', KYCCtrl]);
}());