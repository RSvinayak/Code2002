(function () {
    var CFApp = angular.module('CFApp');

    var PaymentCtrl = function ($scope, PaymentService) {
        var ctrl = this;

        ctrl.pgTitle = "Payment Details";
        ctrl.pgSubtitle = "";

        var paymentData = [];
        var installmentData = [];

        var totalInstallmentAmount = 0;
        var installmentAmount = 0;

        var TRANS_TYPE_PRIZEWINNER = 1;
        var TRANS_TYPE_RECEIPT = 2;

        ctrl.isNewClicked = true;
        ctrl.isEditClicked = true;

        ctrl.dynamicModelValues = {
            formParams: {
                installment: {
                    installmentAmountDue: 0,
                    installmentAmount: 900,
                    incentive: 0,
                    penalty: 0
                }
            }
        };

        ctrl.formParams = {
            installment: [
                {
                    id: "installmentAmountDue", label: "Total Amount Due", inputType: "number", placeholder: "Total Amount Due",
                    model: "installmentAmountDue", disable: true
                },
                {
                    id: "installmentAmount", label: "Amount", inputType: "number", placeholder: "Amount",
                    model: "installmentAmount", disable: true
                },
                {
                    id: "incentive", label: "Incentive", inputType: "number", placeholder: "Incentive",
                    model: "incentive", onChange: "onChangeIncentive"
                },
                {
                    id: "penalty", label: "Penalty", inputType: "number", placeholder: "Penalty",
                    model: "penalty", onChange: "onChangePenalty"
                }
            ],
        };

        var columnDefs = [
            { headerName: "Sl. No. ", Field: "rowNum", valueGetter: "node.id + 1", width: 70 },
            { headerName: "_id", field: '_id', hide: true },
            { headerName: "groupID", field: 'groupID', hide: true },
            { headerName: "subscriberID", field: 'subscriberID', hide: true },
            { headerName: "Group", field: 'groupName', width: 150 },
            { headerName: "Subscriber", field: 'subscriber', width: 150 },
            {
                headerName: "Ticket No.", field: 'ticketNo', width: 100, cellStyle: function (params) {
                    var obj = {
                        "text-align": "right"
                    };
                    return obj;
                }
            },
            {
                headerName: "Auction No.", field: 'auctionNo', width: 100, cellStyle: function (params) {
                    var obj = {
                        "text-align": "right"
                    };
                    return obj;
                }
            },
            {
                headerName: "Installment Amount", field: 'auctionInstallmentAmount', width: 150, cellStyle: function (params) {
                    var obj = {
                        "text-align": "right"
                    };
                    return obj;
                }
            },
            {
                headerName: "Dividend Amount", field: 'auctionDividendAmount', width: 150, cellStyle: function (params) {
                    var obj = {
                        "text-align": "right"
                    };
                    return obj;
                }
            },
            {
                headerName: "Amount Due", field: 'installmentAmountDue', width: 100, cellStyle: function (params) {
                    var obj = {
                        "text-align": "right"
                    };
                    return obj;
                }
            },
            { headerName: "Due Date", field: 'dueDate', width: 120 }
        ];

        var columnDefs_installment = [
            { headerName: "Select", colId: "select", width: 70, checkboxSelection: true, headerCheckboxSelection: true, headerCheckboxSelectionFilteredOnly: false, checkboxSelection: true },
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
        ctrl.gridOptions_installment = {};

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
                onSelectionChanged: onSelectionChanged,
                onGridReady: function (params) {
                    params.api.setColumnDefs(columnDefs);
                }
            };

            ctrl.gridOptions_installment = {
                rowData: [],
                virtualPaging: false,
                rowSelection: 'multiple',
                rowHeight: 33,
                enableSorting: true,
                enableFilter: true,
                enableColResize: true,
                onSelectionChanged: onSelectionChangedInstallment,
                onGridReady: function (params) {
                    params.api.setColumnDefs(columnDefs_installment);
                }
            };

            getPaymentDetails();
        }

        /* ----------------------------------------------------------------------------------
                                        Event receivers
           ---------------------------------------------------------------------------------- */
        $scope.$on("onInputChange", function (event, identifier) {
            switch (identifier) {
                case "onChangeIncentive":
                    var incentive = ctrl.dynamicModelValues.formParams.installment["incentive"];
                    ctrl.dynamicModelValues.formParams.installment["installmentAmountDue"] =
                        computeTotalInstallmentAmount(totalInstallmentAmount, incentive, true)
                    break;
                case "onChangePenalty":
                    var penalty = ctrl.dynamicModelValues.formParams.installment["penalty"];
                    ctrl.dynamicModelValues.formParams.installment["installmentAmountDue"] =
                        computeTotalInstallmentAmount(totalInstallmentAmount, penalty, false)
                    break;
            }
        });

        var getPaymentDetails = function () {
            PaymentService.getPaymentDetails().then(
                function (response) {
                    paymentData = getRowDataFromArray(response);
                    ctrl.gridOptions.api.setRowData(paymentData);
                },
                function (response) {

                }
            );
        }

        var onSelectionChanged = function () {
            var selectedRows = ctrl.gridOptions.api.getSelectedRows();
            if (selectedRows != null && selectedRows.length > 0) {
                var selectedRow = selectedRows[selectedRows.length - 1];
                totalInstallmentAmount = parseFloat(selectedRow["installmentAmountDue"]);
                installmentAmount = 0;
                ctrl.dynamicModelValues.formParams.installment = {
                    installmentAmountDue: totalInstallmentAmount,
                    installmentAmount: installmentAmount
                };

                PaymentService.getInstallmentDetails(selectedRow.groupID, selectedRow.subscriberID).then(
                    function (response) {
                        installmentData = getRowDataFromArrayInstallment(response);
                        ctrl.gridOptions_installment.api.setRowData(installmentData);
                    },
                    function (response) {

                    }
                );
            }
        }

        var onSelectionChangedInstallment = function () {
            console.log(ctrl.dynamicModelValues.formParams.installment);
            installmentAmount = 0;

            var selectedRows = ctrl.gridOptions_installment.api.getSelectedRows();
            if (selectedRows != null && selectedRows.length > 0) {
                for (var index = 0; index < selectedRows.length; index++) {
                    installmentAmount = installmentAmount + parseFloat(selectedRows[index]["amount"]);
                }
            } else {
                installmentAmount = 0;
            }
 
            ctrl.dynamicModelValues.formParams.installment = {
                installmentAmountDue: totalInstallmentAmount,
                installmentAmount: installmentAmount
            };

            //alert(ctrl.dynamicModelValues.formParams.installment.installmentAmount);
            console.log(ctrl.dynamicModelValues.formParams.installment);
        }

        var getRowDataFromArray = function (response) {
            var records = null;
            if (response != null && response.data != null && response.data.length > 0) {
                records = new Array();
                for (var index = 0; index < response.data.length; index++) {
                    var obj = {
                        _id: response.data[index]["_id"],
                        groupID: response.data[index]["groupID"],
                        subscriberID: response.data[index]["subscriberID"],
                        groupName: response.data[index]["groupName"],
                        subscriber: response.data[index]["subscriber"],
                        ticketNo: response.data[index]["ticketNo"],
                        auctionNo: response.data[index]["auctionNo"],
                        auctionInstallmentAmount: response.data[index]["auctionInstallmentAmount"],
                        auctionDividendAmount: response.data[index]["auctionDividendAmount"],
                        installmentAmountDue: response.data[index]["installmentAmountDue"],
                        dueDate: formatDate(response.data[index]["dueDate"])
                    };
                    records.push(obj);
                }
            }
            return records;
        }

        var getRowDataFromArrayInstallment = function (response) {
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

        var computeTotalInstallmentAmount = function (installmentAmount, additional, isIncentive) {
            var result = 0;

            if (isIncentive) {
                result = installmentAmount - additional;
            } else {
                result = installmentAmount + additional;
            }

            return result;
        }

        var formatDate = function (date) {
            var resDate = "";
            if (date != null && typeof (date) != "undefined") {
                var datetime = new Array();
                datetime = date.split("T");

                if (datetime.length > 0) {
                    resDate = datetime[0];
                }
            }
            return resDate;
        }
    }

    CFApp.controller('PaymentCtrl', ['$scope', 'PaymentService', PaymentCtrl]);
}());