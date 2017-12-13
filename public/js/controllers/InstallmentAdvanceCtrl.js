(function () {
    var CFApp = angular.module('CFApp');

    var InstallmentAdvanceCtrl = function ($scope, InstallmentAdvanceService) {
        var ctrl = this;

        ctrl.pgTitle = "Installment Advance";
        ctrl.pgSubtitle = "Record all subscriber installments";

        var installmentData = [];

        var columnDefs = [
            {headerName: "Sl. No. ", Field: "rowNum", valueGetter: "node.id + 1", width: 70},
            {headerName: "Group", field: 'Group', width: 100},
            {headerName: "Ticket No.", field: 'VoucherType', width: 120},
            {headerName: "Subscriber", field: 'VoucherDate', width: 100},
            {headerName: "Date", field: 'Particulars', width: 250},
            {headerName: "Advance Amount", field: 'Debit', width: 90},
            {headerName: "Debit", field: 'Credit', width: 90},
            {headerName: "Credit", field: 'Narration', width: 250}
        ];

        ctrl.gridOptions = {};
        
        ctrl.init = function (){
            rowData = [];
            ctrl.gridOptions = {
                rowData: [],
                virtualPaging: false,
                rowSelection: 'single',
                rowHeight: 33,
                enableSorting: true,
                enableFilter: true,
                enableColResize: true,
                onGridReady: function(params) {
                    params.api.setColumnDefs(columnDefs);
                }
            };

            getTransactionDetails();
        }

        var getTransactionDetails = function (){
            InstallmentAdvanceService.getTransactionDetails().then(
                function(response){
                    transactionData = getRowDataFromArray(response);
                    ctrl.gridOptions.api.setRowData(transactionData);
                }, 
                function(response){
                    
                }
            );
        }

        var getRowDataFromArray = function(response){
            var records = null;
            if(response != null && response.data != null && response.data.length > 0){
                records = new Array();
                for(var index = 0;index < response.data.length; index++){
                    var obj = {
                        "VoucherType": response.data[index]["VoucherType"],
                        "VoucherNo": response.data[index]["VoucherNo"], 
                        "VoucherDate": formatDate(response.data[index]["VoucherDate"]),
                        "Particulars": response.data[index].ledger != null && response.data[index].ledger.length > 0  ? 
                            response.data[index].ledger[response.data[index].ledger.length - 1]["AccountName"] : "",
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

        var getDebitCreditAmount = function(data, isDebit){
            var amount = null;
            var transactionType = data["TransType"];

            if(isDebit && transactionType){
                amount = data["Amount"];
            }else if(!isDebit && !transactionType){
                amount = data["Amount"];
            }else {
                amount = null;
            }
            
            return amount;
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

    CFApp.controller('InstallmentAdvanceCtrl', ['$scope', 'InstallmentAdvanceService', InstallmentAdvanceCtrl]);
}());