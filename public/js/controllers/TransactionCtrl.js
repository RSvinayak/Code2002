(function () {
    var CFApp = angular.module('CFApp');

    var TransactionCtrl = function ($scope, TransactionService) {
        var ctrl = this;

        ctrl.pgTitle = "Transaction Details";
        ctrl.pgSubtitle = "";

        var transactionData = [];

        var columnDefs = [
            { headerName: "Sl. No. ", Field: "rowNum", valueGetter: "node.id + 1", width: 70 },
            { headerName: "Voucher No.", field: 'VoucherNo', width: 100 },
            { headerName: "Voucher Type", field: 'VoucherType', width: 120 },
            { headerName: "Date", field: 'VoucherDate', width: 100 },
            { headerName: "Particulars", field: 'Particulars', width: 250 },
            { headerName: "Debit", field: 'Debit', width: 90 },
            { headerName: "Credit", field: 'Credit', width: 90 },
            { headerName: "Narration", field: 'Narration', width: 250 },
            { headerName: "Remarks", field: 'Remarks', width: 120 },
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

            getTransactionDetails();
        }

        var getTransactionDetails = function () {
            TransactionService.getTransactionDetails().then(
                function (response) {
                    transactionData = getRowDataFromArray(response);
                    ctrl.gridOptions.api.setRowData(transactionData);
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
                        "VoucherType": response.data[index]["VoucherType"],
                        "VoucherNo": response.data[index]["VoucherNo"],
                        "VoucherDate": formatDate(response.data[index]["VoucherDate"]),
                        "Particulars": response.data[index].ledger != null && response.data[index].ledger.length > 0 ?
                            response.data[index].ledger[response.data[index].ledger.length - 1]["accountName"] : "",
                        "Debit": getDebitCreditAmount(response.data[index], true),
                        "Credit": getDebitCreditAmount(response.data[index], false),
                        "Narration": response.data[index]["Narration"],
                        "Remarks": response.data[index]["Remarks"],
                    };
                    records.push(obj);
                }
            }
            return records;
        }

        var getDebitCreditAmount = function (data, isDebit) {
            var amount = null;
            var transactionType = data["TransType"];

            if (isDebit && transactionType) {
                amount = data["Amount"];
            } else if (!isDebit && !transactionType) {
                amount = data["Amount"];
            } else {
                amount = null;
            }

            return amount;
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

    CFApp.controller('TransactionCtrl', ['$scope', 'TransactionService', TransactionCtrl]);
}());