(function () {
    var CFApp = angular.module('CFApp');

    var InstallmentReceiptCtrl = function ($scope, InstallmentReceiptService, ManageSubscriberService) {
        var ctrl = this;

        var selectedRows = null;
        var receiptData = [];

        ctrl.pgTitle = "Receipts Details";
        ctrl.pgSubtitle = "";

        ctrl.isNewClicked = false;
        ctrl.isEditClicked = false;

        ctrl.dynamicModelValues = {
            formParams: {
                receipt: {}
            }
        };

        ctrl.formParams = {
            receipt: [
                {
                    id: "group_name", label: "Group Name", inputType: "dropdown", placeholder: "Group Name",
                    model: "group_name", src: "au_groupname", options: [], onChange: "onChangeGroup"
                },
                {
                    id: "subscriber", label: "Subscriber", inputType: "dropdown", placeholder: "Subscriber",
                    model: "subscriber", src: "rc_subscriber", options: []
                },
                {
                    id: "Amount", label: "Amount", inputType: "number", placeholder: "Amount",
                    model: "amount"
                }
            ],
        };

        var columnDefs = [
            { headerName: "Sl. No. ", Field: "rowNum", valueGetter: "node.id + 1", width: 70 },
            { headerName: "Group", field: 'groupName', width: 200 },
            { headerName: "Subscriber", field: 'subscriber', width: 200 },
            {
                headerName: "Ticket No.", field: 'ticketNo', width: 150, cellStyle: function (params) {
                    var obj = {
                        "text-align": "right"
                    };
                    return obj;
                }
            },
            {
                headerName: "Amount", field: 'amount', width: 150, cellStyle: function (params) {
                    var obj = {
                        "text-align": "right"
                    };
                    return obj;
                }
            },
            { headerName: "Date", field: 'date', width: 120 },
            { headerName: "id", field: '_id', width: 90, hide: true },
            { headerName: "groupID", field: 'groupID', width: 90, hide: true },
            { headerName: "subscriberID", field: 'subscriberID', width: 90, hide: true }
        ];

        ctrl.gridOptions = {};

        ctrl.init = function () {
            rowData = [];
            ctrl.gridOptions = {
                rowData: [],
                virtualPaging: false,
                rowSelection: 'single',
                rowHeight: 33,
                enableSorting: true,
                enableFilter: true,
                enableColResize: true,
                onGridReady: function (params) {
                    params.api.setColumnDefs(columnDefs);
                }
            };

            getReceiptDetails();
        }

        ctrl.onClickBtn = function (type) {
            switch (type) {
                case 'New': onNewClicked(); break;
                case 'Edit': onEditClicked(); break;
                case 'Delete': break;
                case 'Close': onCloseClicked(); break;
                case 'Save': onSaveClicked(); break;
                case 'Cancel': onCancelClicked(); break;
            }
        }

        /* ----------------------------------------------------------------------------------
                                        Event receivers
           ---------------------------------------------------------------------------------- */
        $scope.$on("getDropDownListData", function (event, identifier) {
            getDropDownListData(identifier);
        });

        $scope.$on("onDropdownChange", function (event, identifier) {
            switch (identifier) {
                case "onChangeGroup":
                    getDropDownListData("rc_subscriber");
                    break;
            }
        });

        var getReceiptDetails = function () {
            InstallmentReceiptService.getReceiptDetails().then(
                function (response) {
                    receiptData = getRowDataFromArray(response);
                    ctrl.gridOptions.api.setRowData(receiptData);
                },
                function (response) {

                }
            );
        }

        var onNewClicked = function () {
            ctrl.isNewClicked = true;
            ctrl.isEditClicked = !ctrl.isNewClicked;

            ctrl.gridOptions.api.deselectAll();
            clearDynamicModelValues();
        }

        var onEditClicked = function () {
            ctrl.isEditClicked = true;
            ctrl.isNewClicked = !ctrl.isEditClicked;

            clearDynamicModelValues();

            var selectedRows = ctrl.gridOptions.api.getSelectedRows();
            if (selectedRows != null && selectedRows.length > 0) {
                var selectedRow = selectedRows[selectedRows.length - 1];
                ctrl.dynamicModelValues.formParams.receipt = {
                    amount: selectedRow["amount"],
                    group_name: { id: selectedRow["groupID"] },
                    subscriber: { id: selectedRow["subscriberID"] }
                }

                getDropDownListData("rc_subscriber");
            }
        }

        var onSaveClicked = function () {
            var obj = {
                amount: (ctrl.dynamicModelValues.formParams.receipt["amount"] != null ||
                    typeof (ctrl.dynamicModelValues.formParams.receipt["amount"]) != "undefined") ?
                    parseFloat(ctrl.dynamicModelValues.formParams.receipt["amount"]).toFixed(2) : 0,
                groupID: ctrl.dynamicModelValues.formParams.receipt["group_name"].id,
                subscriberID: ctrl.dynamicModelValues.formParams.receipt["subscriber"].id
            }

            var selectedRows = ctrl.gridOptions.api.getSelectedRows();
            if (ctrl.isEditClicked && selectedRows != null && selectedRows.length > 0) {
                var selectedRowID = selectedRows[selectedRows.length - 1]["_id"];
                InstallmentReceiptService.updateReceiptDetail(selectedRowID, obj).then(
                    function (response) {
                        if (response != null && response.data != null && response.data.length > 0) {
                            receiptData = getRowDataFromArray(response);
                            ctrl.gridOptions.api.setRowData(receiptData);
                        }
                    },
                    function (response) {

                    }
                )
            } else {
                InstallmentReceiptService.addReceiptDetails(obj).then(
                    function (response) {
                        if (response != null && response.data != null && response.data.length > 0) {
                            receiptData = getRowDataFromArray(response);
                            ctrl.gridOptions.api.setRowData(receiptData);
                        }
                    },
                    function (response) {

                    }
                )
            }

            onCloseClicked();
        }

        var onCancelClicked = function () {
            clearDynamicModelValues();
        }

        var onCloseClicked = function () {
            ctrl.isNewClicked = ctrl.isEditClicked = false;
            ctrl.gridOptions.api.deselectAll();
            clearDynamicModelValues();
        }

        var getDropDownListData = function (identifier) {
            var options = new Array();
            var filterValue = null;
            switch (identifier) {
                case "rc_subscriber":
                    filterValue = (ctrl.dynamicModelValues.formParams.receipt["group_name"] != null &&
                        typeof (ctrl.dynamicModelValues.formParams.receipt["group_name"]) != "undefined") ?
                        ctrl.dynamicModelValues.formParams.receipt["group_name"].id : null;
                    break;
            }

            ManageSubscriberService.getDropDownListData(identifier, filterValue).then(
                function (response) {
                    if (response != null && response.data != null && response.data.length > 0) {
                        switch (identifier) {
                            case "au_groupname":
                                var foundObj = findFieldParamByID("group_name");
                                var options = getOptionsArrayFromResponse(response, "groupName");

                                if (foundObj != null && foundObj.index != -1) {
                                    ctrl.formParams.receipt[foundObj.index].options = options;
                                }
                                break;

                            case "rc_subscriber":
                                var foundObj = findFieldParamByID("subscriber");
                                var result = response.data;
                                var array = new Array();
                                for (var index = 0; index < result.length; index++) {
                                    var obj = {
                                        "_id": result[index].subscriberID,
                                        "subscriber": "Ticket " + result[index].ticketNo +
                                        " - " + result[index].subscriber
                                    }
                                    array.push(obj);
                                }
                                response.data = array;
                                var options = getOptionsArrayFromResponse(response, "subscriber");

                                if (foundObj != null && foundObj.index != -1) {
                                    ctrl.formParams.receipt[foundObj.index].options = options;
                                }
                                break;
                        }
                    }
                },
                function (response) {

                }
            );
        }

        var getRowDataFromArray = function (response) {
            var records = null;
            if (response != null && response.data != null && response.data.length > 0) {
                records = new Array();
                for (var index = 0; index < response.data.length; index++) {
                    var obj = {
                        _id: response.data[index]["_id"],
                        groupName: response.data[index]["groupName"],
                        groupID: response.data[index]["groupID"],
                        ticketNo: response.data[index]["ticketNo"],
                        subscriber: response.data[index]["subscriber"],
                        subscriberID: response.data[index]["subscriberID"],
                        amount: response.data[index]["amount"],
                        date: response.data[index]["date"] != null ?
                            formatDate(response.data[index]["date"]) : ""
                    };
                    records.push(obj);
                }
            }
            return records;
        }

        var findFieldParamByID = function (id) {
            var foundObj = { obj: null, index: -1 }
            var list = ctrl.formParams.receipt;

            for (var index = 0; index < list.length; index++) {
                if (list[index].id == id) {
                    foundObj = { obj: list[index], index: index };
                    break;
                }
            }

            return foundObj;
        }

        var getOptionsArrayFromResponse = function (response, label) {
            var options = new Array();
            for (var index = 0; index < response.data.length; index++) {
                var obj = {
                    id: response.data[index]._id,
                    label: response.data[index][label]
                };
                options.push(obj);
            }

            return options;
        }

        var formatDate = function (date) {
            var resDate = "";
            var datetime = new Array();
            datetime = date.split("T");

            if (datetime.length > 0) {
                resDate = datetime[0];
            }
            return resDate;
        }

        var clearDynamicModelValues = function () {
            ctrl.dynamicModelValues.formParams.receipt = {};
        }
    }

    CFApp.controller('InstallmentReceiptCtrl', ['$scope', 'InstallmentReceiptService', 'ManageSubscriberService', InstallmentReceiptCtrl]);
}());