(function () {
    var CFApp = angular.module('CFApp');
    var AccountMgmtCtrl = function ($scope, AccountMgmtService) {
        var ctrl = this;
        
        var TYPE_MC = 1;
        var TYPE_MG = 2;
        var TYPE_SG = 3;
        var TYPE_UG = 4;

        ctrl.pgTitle = "Account Management"; 
        ctrl.pgSubtitle = ""

        ctrl.headerMC = "Main Class";
        ctrl.headerMG = "Main Groups";
        ctrl.headerSG = "Sub Groups";
        ctrl.headerUG = "User Group";
        
        ctrl.selectedMC = "";
        ctrl.selectedMG = "";
        ctrl.selectedSG = "";
        ctrl.selectedUG = "";

        ctrl.isSGRecordFixed = false;

        ctrl.isMCSelected = false;
        ctrl.isMGSelected = false;
        ctrl.isSGSelected = false;
        ctrl.isUGSelected = false;

        ctrl.isSGNewClicked = false;
        ctrl.isSGEditClicked = false;
        ctrl.isUGNewClicked = false;
        ctrl.isUGEditClicked = false;

        ctrl.dynamicModelValues = {
            formParams: {
                sub_group: {},
                user_group: {}
            }
        };

        ctrl.formParams = {
            sub_group: [
                {id:"sub_group", label:"Sub group", inputType:"text", placeholder:"Sub Group", 
                    model: "sub_group"},
                {id:"sort_order", label:"Sort Order", inputType:"number", placeholder:"Sort Order", 
                    model: "sort_order"}
            ],
            user_group: [
                {id:"user_group", label:"User group", inputType:"text", placeholder:"User Group", 
                    model: "user_group"},
                {id:"sort_order", label:"Sort Order", inputType:"number", placeholder:"Sort Order", 
                    model: "sort_order"}
            ]
        };

        ctrl.gridOptMC = {}
        ctrl.gridOptMG = {}
        ctrl.gridOptSG = {}
        ctrl.gridOptUG = {}

        var colDefMC = [
            {headerName: "_id", field: '_id', width: 250, hide: true},
            {headerName: "MCID", field: 'MCID', width: 100},
            {headerName: "Main Class", field: 'MainClass', width: 250}
        ];
        var mcRowData = new Array();
        var selectedRowsMC = new Array();

        var colDefMG = [
            {headerName: "_id", field: '_id', width: 250, hide: true},
            {headerName: "MCID", field: 'MCID', width: 100, hide: true},
            {headerName: "MGID", field: 'MGID', width: 100},
            {headerName: "Main Group", field: 'MainGroup', width: 250},
            {headerName: "HasOpBalance", field: 'HasOpBalance', width: 250},
            {headerName: "DefaultBalance", field: 'DefaultBalance', width: 250}
        ];
        var mgRowData = new Array();
        var selectedRowsMG = new Array();

        var colDefSG = [
            {headerName: "_id", field: '_id', width: 250, hide: true},
            {headerName: "MGID", field: 'MGID', width: 100, hide: true},
            {headerName: "SGID", field: 'SGID', width: 100},
            {headerName: "Sub Group", field: 'SubGroup', width: 250},
            {headerName: "Fixed", field: 'Fixed', width: 250},
            {headerName: "Sort Order", field: 'SortOrder', width: 250}
        ];
        var sgRowData = new Array();
        var selectedRowsSG = new Array();

        var colDefUG = [
            {headerName: "_id", field: '_id', width: 250, hide: true},
            {headerName: "SGID", field: 'SGID', width: 100, hide: true},
            {headerName: "UGID", field: 'UGID', width: 100},
            {headerName: "User Group", field: 'UserGroup', width: 250},
            {headerName: "Sort Order", field: 'SortOrder', width: 250}
        ];
        var ugRowData = new Array();
        var selectedRowsUG = new Array();

        ctrl.init = function (){
            rowData = [];
            ctrl.gridOptMC = {
                rowData: [],
                virtualPaging: false,
                rowSelection: 'single',
                rowHeight: 33,
                enableSorting: true,
                enableFilter: true,
                onSelectionChanged: onSelectionChangedMC,
                onGridReady: function(params) {
                    params.api.setColumnDefs(colDefMC);
                }
            };

            ctrl.gridOptMG = {
                rowData: [],
                virtualPaging: false,
                rowSelection: 'single',
                rowHeight: 33,
                enableSorting: true,
                enableFilter: true,
                onSelectionChanged: onSelectionChangedMG,
                onGridReady: function(params) {
                    params.api.setColumnDefs(colDefMG);
                }
            };

            ctrl.gridOptSG = {
                rowData: [],
                virtualPaging: false,
                rowSelection: 'single',
                rowHeight: 33,
                enableSorting: true,
                enableFilter: true,
                onSelectionChanged: onSelectionChangedSG,
                onGridReady: function(params) {
                    params.api.setColumnDefs(colDefSG);
                }
            };

            ctrl.gridOptUG = {
                rowData: [],
                virtualPaging: false,
                rowSelection: 'single',
                rowHeight: 33,
                enableSorting: true,
                enableFilter: true,
                onSelectionChanged: onSelectionChangedUG,
                onGridReady: function(params) {
                    params.api.setColumnDefs(colDefUG);
                }
            };
            
            getMainClassValues();
        }

        ctrl.onClickBtn = function (identifier){
            switch(identifier){
                case 'sg_Close': onClickSGClose(); break;
                case 'sg_Delete': onClickSGDelete(); break;
                case 'sg_Edit': onClickSGEdit(); break;
                case 'sg_New': onClickSGNew(); break;
                case 'sg_Save': onClickSGSave(); break;
                case 'sg_Cancel': onClickSGCancel(); break;

                case 'ug_Close': onClickUGClose(); break;
                case 'ug_Delete': onClickUGDelete(); break;
                case 'ug_Edit': onClickUGEdit(); break;
                case 'ug_New': onClickUGNew(); break;
                case 'ug_Save': onClickUGSave(); break;
                case 'ug_Cancel': onClickUGCancel(); break;
            }
        }

/* ----------------------------------------------------------------------------------
                                Private methods
   ---------------------------------------------------------------------------------- */
        function onSelectionChangedMC(){
            selectedRowsMC = ctrl.gridOptMC.api.getSelectedRows();
            if(selectedRowsMC.length > 0){
                var selectedRow = selectedRowsMC[selectedRowsMC.length - 1];

                var mcid = selectedRow.MCID;
                ctrl.selectedMC = selectedRow.MainClass;
                ctrl.headerMG = "Main Groups under " + ctrl.selectedMC;
                ctrl.isMCSelected = true;

                AccountMgmtService.getMainGroup(mcid).then(
                    function(response){
                        mgRowData = getRowDataFromArray(response, TYPE_MG);
                        ctrl.gridOptMG.api.setRowData(mgRowData);
                    }, 
                    function(response){
                        
                    }
                );
            }else {
                ctrl.selectedMC = null;
                ctrl.headerMG = "Main Groups";
                ctrl.isMCSelected = false;
            }
        }

        function onSelectionChangedMG(){
            selectedRowsMG = ctrl.gridOptMG.api.getSelectedRows();
            if(selectedRowsMG.length > 0){
                var selectedRow = selectedRowsMG[selectedRowsMG.length - 1];

                var mgid = selectedRow.MGID;
                ctrl.selectedMG = selectedRow.MainGroup;
                ctrl.headerSG = "Sub Groups under " + ctrl.selectedMC + " > " + ctrl.selectedMG;
                ctrl.isMGSelected = true;
                AccountMgmtService.getSubGroup(mgid).then(
                    function(response){
                        if(sgRowData == null) sgRowData = new Array();
                        sgRowData = getRowDataFromArray(response, TYPE_SG);
                        ctrl.gridOptSG.api.setRowData(sgRowData);
                    }, 
                    function(response){
                        
                    }
                );
            }else {
                ctrl.selectedMG = null;
                ctrl.headerSG = "Sub Groups";
                ctrl.isMGSelected = false;
            }
        }

        function onSelectionChangedSG(){
            selectedRowsSG = ctrl.gridOptSG.api.getSelectedRows();
            if(selectedRowsSG.length > 0){
                var selectedRow = selectedRowsSG[selectedRowsSG.length - 1];

                var sgid = selectedRow.SGID;
                ctrl.selectedSG = selectedRow.SubGroup;
                ctrl.headerUG = "User Groups under " + ctrl.selectedMC + " > " + ctrl.selectedMG + " > " + ctrl.selectedSG;
                ctrl.isSGSelected = true;
                AccountMgmtService.getUserGroup(sgid).then(
                    function(response){
                        if(ugRowData == null) ugRowData = new Array();
                        ugRowData = getRowDataFromArray(response, TYPE_UG);
                        ctrl.gridOptUG.api.setRowData(ugRowData);
                    }, 
                    function(response){
                        
                    }
                );

                if(selectedRow.Fixed == "Yes"){
                    ctrl.isSGRecordFixed = true;
                }else {
                    ctrl.isSGRecordFixed = false;
                }
            }else {
                ctrl.selectedSG = null;
                ctrl.headerUG = "User Groups";
                ctrl.isSGSelected = false;
                ctrl.isSGRecordFixed = false;
            }
        }

        function onSelectionChangedUG(){
            
        }

        var getMainClassValues = function (){
            AccountMgmtService.getMainClass().then(
                function(response){
                    mcRowData = getRowDataFromArray(response, TYPE_MC);
                    ctrl.gridOptMC.api.setRowData(mcRowData);
                }, 
                function(response){
                    
                }
            );
        }

        var getRowDataFromObject = function(response, type){
            var record = null;
            if(response != null && response.data != null){
                switch(type){
                    case TYPE_SG: 
                        record = {
                            _id: response.data._id,
                            MGID: response.data.MGID,
                            SGID: response.data.SGID,
                            SubGroup: response.data.SubGroup,
                            Fixed: response.data.Fixed == false ? "No" : "Yes",
                            SortOrder: response.data.SortOrder 
                        };
                        break;
                    case TYPE_UG: 
                        record = {
                            _id: response.data._id,
                            SGID: response.data.SGID,
                            UGID: response.data.UGID,
                            UserGroup: response.data.UserGroup,
                            SortOrder: response.data.SortOrder 
                        };
                        break;
                }
            }
            return record;
        }

        var getRowDataFromArray = function(response, type){
            var records = null;
            if(response != null && response.data != null && response.data.length > 0){
                records = new Array();
                switch(type){
                    case TYPE_MC: records = extractMainClassValues(response); break;
                    case TYPE_MG: records = extractMainGroupValues(response); break;
                    case TYPE_SG: records = extractSubGroupValues(response); break;
                    case TYPE_UG: records = extractUserGroupValues(response); break;

                }
            }
            return records;
        }

        var extractMainClassValues = function(response){
            var records = new Array();
            for(var mcIndex = 0; mcIndex < response.data.length; mcIndex++){
                var obj = {
                    _id: response.data[mcIndex]._id,
                    MCID: response.data[mcIndex].MCID,
                    MainClass: response.data[mcIndex].MainClass
                };
                records.push(obj);
            }
            return records;
        }

        var extractMainGroupValues = function(response){
            var records = new Array();
            for(var mgIndex = 0; mgIndex < response.data.length; mgIndex++){
                var obj = {
                    _id: response.data[mgIndex]._id,
                    MCID: response.data[mgIndex].MCID,
                    MGID: response.data[mgIndex].MGID,
                    MainGroup: response.data[mgIndex].MainGroup,
                    HasOpBalance: response.data[mgIndex].HasOpBalance == false ? "No" : "Yes",
                    DefaultBalance: response.data[mgIndex].DefaultBalance == 1 ? "Dr" : 
                        response.data[mgIndex].DefaultBalance == 0 ? "Cr" : "NA",
                };
                records.push(obj);
            }
            return records;
        }

        var extractSubGroupValues = function(response){
            var records = new Array();
            for(var sgIndex = 0; sgIndex < response.data.length; sgIndex++){
                var obj = {
                    _id: response.data[sgIndex]._id,
                    MGID: response.data[sgIndex].MGID,
                    SGID: response.data[sgIndex].SGID,
                    SubGroup: response.data[sgIndex].SubGroup,
                    Fixed: response.data[sgIndex].Fixed == false ? "No" : "Yes",
                    SortOrder: response.data[sgIndex].SortOrder 
                };
                records.push(obj);
            }
            return records;
        }

        var extractUserGroupValues = function(response){
            var records = new Array();
            for(var ugIndex = 0; ugIndex < response.data.length; ugIndex++){
                var obj = {
                    _id: response.data[ugIndex]._id,
                    SGID: response.data[ugIndex].SGID,
                    UGID: response.data[ugIndex].UGID,
                    UserGroup: response.data[ugIndex].UserGroup,
                    SortOrder: response.data[ugIndex].SortOrder 
                };
                records.push(obj);
            }
            return records;
        }

        // Sub group methods
        var onClickSGClose = function(){
            ctrl.isSGEditClicked = false;
            ctrl.isSGNewClicked = false;
        }

        var onClickSGDelete= function(){
            
        }

        var onClickSGEdit = function(){
            var selectedRecords = ctrl.gridOptSG.api.getSelectedRows();
            if(selectedRecords.length > 0){
                ctrl.isSGEditClicked = true;
                ctrl.isSGNewClicked = false;

                ctrl.dynamicModelValues.formParams.sub_group = {
                    sub_group: selectedRecords[selectedRecords.length - 1].SubGroup,
                    sort_order: selectedRecords[selectedRecords.length - 1].SortOrder
                };
            }else {
                //ERROR - select a record
            }
        }

        var onClickSGNew = function(){
            ctrl.gridOptSG.api.deselectAll();
            ctrl.isSGNewClicked = true;
            ctrl.isSGEditClicked = false;
        }

        var onClickSGSave = function(){
            var input = ctrl.dynamicModelValues.formParams.sub_group;
            var mgid = selectedRowsMG[selectedRowsMG.length - 1].MGID;
            if(ctrl.isSGNewClicked){
                //new record to be insert
                var obj = {MGID: mgid, SubGroup: input.sub_group, Fixed: 0, SortOrder: input.sort_order}

                AccountMgmtService.addSubGroup(obj).then(
                    function(response){
                        var sgData = getRowDataFromObject(response, TYPE_SG);
                        if(sgRowData == null) sgRowData = new Array();
                        sgRowData.push(sgData);
                        sortArrayOfObjects("SortOrder", sgRowData);
                        ctrl.gridOptSG.api.setRowData(sgRowData);
                        onClickSGCancel();
                        onClickSGClose();
                    }, 
                    function(response){
                        
                    }
                );

            }else {
                //update existing record.
                selectedRowsSG = ctrl.gridOptSG.api.getSelectedRows();
                var sgid = selectedRowsSG[selectedRowsSG.length - 1].SGID;
                var _id = selectedRowsSG[selectedRowsSG.length - 1]._id;
                var obj = {SGID: sgid, MGID: mgid, SubGroup: input.sub_group, Fixed: 0, SortOrder: input.sort_order}

                AccountMgmtService.updateSubGroup(_id, obj).then(
                    function(response){
                        var sgData = getRowDataFromObject(response, TYPE_SG);
                        var index = findIndexOfObjectInArray("_id", sgData._id, sgRowData)
                        sgRowData[index] = sgData;
                        sortArrayOfObjects("SortOrder", sgRowData);
                        ctrl.gridOptSG.api.setRowData(sgRowData);
                        onClickSGCancel();
                        onClickSGClose();
                    }, 
                    function(response){
                        
                    }
                );
            }
            
        }

        var onClickSGCancel = function(){
            ctrl.dynamicModelValues.formParams.sub_group = {};
        }

        //User group methods
        var onClickUGClose = function(){
            ctrl.isUGEditClicked = false;
            ctrl.isUGNewClicked = false;
        }

        var onClickUGDelete= function(){
            
        }

        var onClickUGEdit = function(){
            var selectedRecords = ctrl.gridOptUG.api.getSelectedRows();
            if(selectedRecords.length > 0){
                ctrl.isUGEditClicked = true;
                ctrl.isUGNewClicked = false;

                ctrl.dynamicModelValues.formParams.user_group = {
                    user_group: selectedRecords[selectedRecords.length - 1].UserGroup,
                    sort_order: selectedRecords[selectedRecords.length - 1].SortOrder
                };
            }else {
                //ERROR - select a record
            }
        }

        var onClickUGNew = function(){
            ctrl.gridOptUG.api.deselectAll();
            ctrl.isUGNewClicked = true;
            ctrl.isUGEditClicked = false;
        }

        var onClickUGSave = function(){
            var input = ctrl.dynamicModelValues.formParams.user_group;
            var sgid = selectedRowsSG[selectedRowsSG.length - 1].SGID;
            if(ctrl.isUGNewClicked){
                //new record to be insert
                var obj = {SGID: sgid, UserGroup: input.user_group, SortOrder: input.sort_order}

                AccountMgmtService.addUserGroup(obj).then(
                    function(response){
                        var ugData = getRowDataFromObject(response, TYPE_UG);
                        if(ugRowData == null) ugRowData = new Array();
                        ugRowData.push(ugData);
                        sortArrayOfObjects("SortOrder", ugRowData);
                        ctrl.gridOptUG.api.setRowData(ugRowData);
                        onClickUGCancel();
                        onClickUGClose();
                    }, 
                    function(response){
                        
                    }
                );

            }else {
                //update existing record.
                selectedRowsUG = ctrl.gridOptUG.api.getSelectedRows();
                var ugid = selectedRowsUG[selectedRowsUG.length - 1].UGID;
                var _id = selectedRowsUG[selectedRowsUG.length - 1]._id;
                var obj = {UGID: ugid, SGID: sgid, UserGroup: input.user_group, SortOrder: input.sort_order}

                AccountMgmtService.updateUserGroup(_id, obj).then(
                    function(response){
                        var ugData = getRowDataFromObject(response, TYPE_UG);
                        var index = findIndexOfObjectInArray("_id", ugData._id, ugRowData)
                        ugRowData[index] = ugData;
                        sortArrayOfObjects("SortOrder", ugRowData);
                        ctrl.gridOptUG.api.setRowData(ugRowData);
                        onClickUGCancel();
                        onClickUGClose();
                    }, 
                    function(response){
                        
                    }
                );
            }
        }

        var onClickUGCancel = function(){
            ctrl.dynamicModelValues.formParams.user_group = {};
        }

        var findIndexOfObjectInArray = function (key, value, data){
            var index = -1;
            if(data != null && data.length > 0){
                for(var i = 0;i < data.length; i++){
                    if(data[i][key] == value){
                        index = i;
                        break;
                    }
                }
            }
            return index;
        }

        var sortArrayOfObjects = function (key, data){
            data.sort(function(d1, d2) {
                if (d1[key] < d2[key]) {
                    return -1;
                }
                if (d1[key] > d2[key]) {
                    return 1;
                }
                return 0;
            });
        }

        var formatDate = function(date){
            var resDate = "";
            var datetime = new Array();
            datetime = date.split("T");

            if(datetime.length > 0){
                resDate = datetime[0];
            }
            return resDate;
        }
        
	}

    CFApp.controller('AccountMgmtCtrl', ['$scope','AccountMgmtService', AccountMgmtCtrl]);
}());