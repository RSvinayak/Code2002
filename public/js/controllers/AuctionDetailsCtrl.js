(function () {
    var CFApp = angular.module('CFApp');
    var AuctionDetailsCtrl = function ($scope, AuctionDetailsService, ManageSubscriberService) {
        var ctrl = this;
        var auctionGroupData = [];
        var groupAuctionData = [];
        var selectedRows = null;

        ctrl.pgTitle = "Auction Entry";
        ctrl.pgSubtitle = "Create/ Update/ Delete Auction Details";
        ctrl.titleGroupActionHistory = "Group auction history";

        ctrl.isNewClicked = false;
        ctrl.isEditClicked = false;

        ctrl.dynamicModelValues = {
            searchFieldParams: {},
            formParams: {
                auction_entry: {}
            }
        };

        ctrl.searchFieldParams = [
            { id: "sfp_search", label: "Search", inputType: "text", placeholder: "Search grid", model: "search_filter" }
        ];

        ctrl.formParams = {
            auction_entry: [
                {
                    id: "group_name", label: "Group Name", inputType: "dropdown", placeholder: "Group Name", model: "group_name",
                    src: "au_groupname", options: []
                },
                { id: "auction_date", label: "Auction Date", inputType: "date", placeholder: "Auction Date", model: "auction_date" },
                { id: "auction_time", label: "Auction Time", inputType: "date", placeholder: "Auction Time", model: "auction_time" },
                {
                    id: "auction_number", label: "Auction Number", inputType: "number", placeholder: "Auction Number",
                    model: "auction_number", disable: true
                },
                {
                    id: "chit_value", label: "Chit Value", inputType: "number", placeholder: "Chit Value", model: "chit_value",
                    disable: true
                },
                {
                    id: "no_of_subscribers", label: "No. of Subscribers", inputType: "number", placeholder: "No. of Subscribers",
                    model: "no_of_subscribers", disable: true
                },
                {
                    id: "prized_subscriber", label: "Prized Subscriber", inputType: "dropdown", placeholder: "Prized Subscriber",
                    model: "prized_subscriber", src: "au_prizedsubscriber", options: []
                },
                {
                    id: "company_comm", label: "Company Comm", inputType: "number", placeholder: "Company Comm",
                    model: "company_comm", disable: true
                },
                {
                    id: "discount_type", label: "Discount Type", inputType: "dropdown", placeholder: "Discount Type", model: "discount_type",
                    options: [
                        { id: "1", label: "% age" },
                        { id: "2", label: "Amount" }
                    ], onChange: "onChangeDiscountType"

                },
                {
                    id: "discount_value", label: "Discount Value", inputType: "number", placeholder: "Discount Value",
                    model: "discount_value", disable: true, onChange: "onChangeDiscountValue"
                },
                {
                    id: "discount_amount", label: "Discount Amount", inputType: "number", placeholder: "Discount Amount",
                    model: "discount_amount", disable: true, onChange: "onChangeDiscountAmount"
                },
                {
                    id: "prize_amount", label: "Prize Amount", inputType: "number", placeholder: "Prize Amount",
                    model: "prize_amount", disable: true
                },
                {
                    id: "dividend_amount", label: "Dividend Amount", inputType: "number", placeholder: "Dividend Amount",
                    model: "dividend_amount", disable: true
                },
            ],
        };

        var columnDefs_groupGridOptions = [
            { headerName: "Sl. No. ", Field: "rowNum", valueGetter: "node.id + 1", width: 70 },
            { headerName: "ID", field: '_id', width: 250, hide: true },
            { headerName: "Group Name", field: 'group_name', width: 250 },
            { headerName: "Chit Value", field: 'chit_value', width: 250 },
            { headerName: "Subscribers Count", field: 'subscribers', width: 250 },
            { headerName: "First Auction", field: 'first_auction', width: 250 },
        ];

        var columnDefs_groupAutionHistoryGridOptions = [
            { headerName: "ID", field: '_id', width: 250, hide: true },
            { headerName: "Auction #", field: "auction_number", width: 100 },
            { headerName: "Disc", field: 'disc', width: 250 },
            { headerName: "Winner", field: 'winner', width: 250 },
            { headerName: "Installment", field: 'installment', width: 250 },
            { headerName: "Prize Amount", field: 'prize_amount', width: 250 }
        ];

        ctrl.groupGridOptions = {}
        ctrl.groupAutionHistoryGridOptions = {};

        ctrl.init = function () {
            rowData = [];
            ctrl.groupGridOptions = {
                rowData: [],
                virtualPaging: false,
                rowSelection: 'single',
                rowHeight: 33,
                enableSorting: true,
                enableFilter: true,
                onSelectionChanged: onSelectionChangedGroup,
                onGridReady: function (params) {
                    params.api.setColumnDefs(columnDefs_groupGridOptions);
                }
            };

            ctrl.groupAutionHistoryGridOptions = {
                rowData: [],
                virtualPaging: false,
                rowSelection: 'single',
                rowHeight: 33,
                enableSorting: true,
                enableFilter: true,
                //onSelectionChanged: onSelectionChanged,
                onGridReady: function (params) {
                    params.api.setColumnDefs(columnDefs_groupAutionHistoryGridOptions);
                }
            };

            getGroupForAuction();
        }

        ctrl.onClickBtn = function (type) {
            switch (type) {
                case 'New': onNewClicked(); break;
                case 'Delete': break;
                case 'Close': break;
                case 'Save': onSaveClicked(); break;
                case 'Cancel': break;
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
                case "onChangeDiscountType":
                    var foundObjDiscountType = findFieldParamByID("discount_type");
                    var foundObjDiscountValue = findFieldParamByID("discount_value");
                    var foundObjDiscountAmount = findFieldParamByID("discount_amount");

                    var selectedValue = getLabelFromOptionsListBasedOnID(
                        ctrl.dynamicModelValues.formParams.auction_entry["discount_type"],
                        foundObjDiscountType.obj.options);
                    if (selectedValue == "Amount") {
                        foundObjDiscountValue.obj.disable = true;
                        foundObjDiscountAmount.obj.disable = false;
                    } else {
                        foundObjDiscountValue.obj.disable = false;
                        foundObjDiscountAmount.obj.disable = true;
                    }
                    break;
            }
        });

        $scope.$on("onInputChange", function (event, identifier) {
            switch (identifier) {
                case "onChangeDiscountValue":
                    var chitValue = selectedRows[selectedRows.length - 1]["chit_value"];
                    var companyComm = computePercentage(selectedRows[selectedRows.length - 1].data.configuration["c_company_commission"], chitValue);
                    var percentage = ctrl.dynamicModelValues.formParams.auction_entry["discount_value"];
                    var amount = computeAmountBasedOnPercentage(percentage, chitValue)
                    ctrl.dynamicModelValues.formParams.auction_entry["discount_amount"] = amount;

                    var prizeAmount = computePrizeAmount(chitValue, amount);
                    ctrl.dynamicModelValues.formParams.auction_entry["prize_amount"] = prizeAmount;

                    var dividendAmount = computeDividendAmount(chitValue, prizeAmount, companyComm)
                    ctrl.dynamicModelValues.formParams.auction_entry["dividend_amount"] = dividendAmount;
                    break;
                case "onChangeDiscountAmount":
                    var chitValue = selectedRows[selectedRows.length - 1]["chit_value"];
                    var companyComm = computePercentage(selectedRows[selectedRows.length - 1].data.configuration["c_company_commission"], chitValue);
                    var amount = ctrl.dynamicModelValues.formParams.auction_entry["discount_amount"];
                    var percentage = computePercentageBasedOnAmount(amount, chitValue)
                    ctrl.dynamicModelValues.formParams.auction_entry["discount_value"] = percentage;

                    var prizeAmount = computePrizeAmount(chitValue, amount);
                    ctrl.dynamicModelValues.formParams.auction_entry["prize_amount"] = prizeAmount;

                    var dividendAmount = computeDividendAmount(chitValue, prizeAmount, companyComm)
                    ctrl.dynamicModelValues.formParams.auction_entry["dividend_amount"] = dividendAmount;

                    break;
            }
        });

        /* ----------------------------------------------------------------------------------
                                        Private methods
           ---------------------------------------------------------------------------------- */
        var onSelectionChangedGroup = function () {
            selectedRows = ctrl.groupGridOptions.api.getSelectedRows();
            if (selectedRows != null && selectedRows.length > 0) {
                getDropDownListData("au_prizedsubscriber");
                ctrl.titleGroupActionHistory = "Group auction history - " + selectedRows[selectedRows.length - 1]["group_name"];
                getAuctionDetailsForGroup(selectedRows[selectedRows.length - 1]);
            } else {
                ctrl.titleGroupActionHistory = "Group auction history";
            }

        }

        var getGroupForAuction = function () {
            AuctionDetailsService.getGroupsForAuction().then(
                function (response) {
                    auctionGroupData = getRowDataFromArray(response);
                    ctrl.groupGridOptions.api.setRowData(auctionGroupData);
                },
                function (response) {

                }
            );
        }

        var getAuctionDetailsForGroup = function (groupdata) {
            var groupid = selectedRows[selectedRows.length - 1]["_id"];
            AuctionDetailsService.getAuctionDetailsForGroup(groupid).then(
                function (response) {
                    if (response != null) {
                        if (response.data != null && response.data.length > 0) {
                            groupAuctionData = getAuctionDetailsForGroupFromResponse(response);
                        } else {
                            groupAuctionData = [];

                        }
                        ctrl.groupAutionHistoryGridOptions.api.setRowData(groupAuctionData);
                    } else {

                    }
                },
                function (response) {

                }
            );
        }

        var onNewClicked = function () {
            if (selectedRows != null && selectedRows.length > 0) {
                ctrl.isNewClicked = true;
                var obj = createFirstAuctionData(selectedRows[selectedRows.length - 1],
                    (groupAuctionData != null && groupAuctionData.length > 0) ? false : true);
                ctrl.dynamicModelValues.formParams.auction_entry = obj;
            } else {
                console.log("Select a Group first!");

            }
        }

        var onDeleteClicked = function () {

        }

        var onCloseClicked = function () {

        }

        var onSaveClicked = function () {
            var auctionDetailsObject = createAuctionDataObject();
            AuctionDetailsService.addAuctionDetailsForGroup(auctionDetailsObject).then(
                function (response) {
                    if (response != null && response.data != null && response.data.data != null) {
                        var record = getAuctionDetailsForGroupFromResponseObj(response);
                        groupAuctionData.push(record);
                        ctrl.groupAutionHistoryGridOptions.api.setRowData(groupAuctionData);
                        ctrl.isNewClicked = false;
                    }
                },
                function (response) {

                }
            )
        }

        var createAuctionDataObject = function () {
            var object = {
                groupID: selectedRows[selectedRows.length - 1]["_id"],
                auctionNo: ctrl.dynamicModelValues.formParams.auction_entry["auction_number"],
                data: ctrl.dynamicModelValues.formParams.auction_entry
            }
            return object;
        }

        var createFirstAuctionData = function (groupdata, isFirst) {
            var foundObj = findFieldParamByID("group_name");
            var obj = {
                "group_name": { id: getIDFromOptionsListBasedOnLabel(groupdata["group_name"], foundObj.obj.options) },
                "auction_date": new Date(),
                "auction_time": new Date(),
                "auction_number": isFirst ? 1 : computeNextAuctionNumber(groupAuctionData),
                "chit_value": groupdata["chit_value"],
                "no_of_subscribers": groupdata["subscribers"],
                "prized_subscriber": "",
                "company_comm": computePercentage(groupdata.data.configuration["c_company_commission"], groupdata["chit_value"]),
                "discount_type": "",
                "discount_value": 0,
                "discount_amount": 0,
                "prize_amount": 0,
                "dividend_amount": 0
            };

            return obj;
        }

        var getDropDownListData = function (identifier) {
            var options = new Array();
            var filterValue = null;
            switch (identifier) {
                case "au_prizedsubscriber":
                    if (selectedRows != null && selectedRows.length > 0) {
                        filterValue = selectedRows[selectedRows.length - 1]["_id"];
                    }
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
                                    ctrl.formParams.auction_entry[foundObj.index].options = options;
                                }
                                break;
                            case "au_prizedsubscriber":
                                var foundObj = findFieldParamByID("prized_subscriber");
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
                                    ctrl.formParams.auction_entry[foundObj.index].options = options;
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
                        group_name: response.data[index]["groupName"],
                        subscribers: response.data[index]["subscriberCount"],
                        chit_value: response.data[index].data.prior_permission["chit_value"],
                        first_auction: response.data[index].data.configuration != null ?
                            formatDate(response.data[index].data.configuration["first_auction"]) : "",
                        data: response.data[index].data
                    };
                    records.push(obj);
                }
            }
            return records;
        }

        var getAuctionDetailsForGroupFromResponse = function (response) {
            var records = null;
            if (response != null && response.data != null && response.data.length > 0) {
                records = new Array();
                for (var index = 0; index < response.data.length; index++) {
                    var obj = {
                        _id: response.data[index]["_id"],
                        auction_number: response.data[index].data["auction_number"],
                        disc: response.data[index].data["discount_value"] + " %",
                        winner: getPrizeWinner(response.data[index].data["prized_subscriber"]),
                        installment: getInstallmentAmount(response.data[index].data),
                        prize_amount: response.data[index].data["prize_amount"],
                        data: response.data[index].data
                    };
                    records.push(obj);
                }
            }
            return records;
        }

        var getAuctionDetailsForGroupFromResponseObj = function (response) {
            var record = null;
            if (response != null && response.data != null && response.data.data != null) {
                record = {
                    _id: response.data["_id"],
                    auction_number: response.data.data["auction_number"],
                    disc: response.data.data["discount_value"] + " %",
                    winner: getPrizeWinner(response.data.data["prized_subscriber"]),
                    installment: getInstallmentAmount(response.data.data),
                    prize_amount: response.data.data["prize_amount"],
                    data: response.data.data
                };
            }
            return record;
        }

        var getPrizeWinner = function (id) {
            var foundObj = findFieldParamByID("prized_subscriber");
            return getLabelFromOptionsListBasedOnID(id, foundObj.obj.options);
        }

        var getInstallmentAmount = function (data) {
            var installmentAmount = 0;
            var chitvalue = data.chit_value;
            var noOfSubscribers = data.no_of_subscribers;

            if (chitvalue != null && noOfSubscribers != null) {
                installmentAmount = parseFloat(chitvalue / noOfSubscribers).toFixed(2);
            }

            return installmentAmount;
        }

        var getSelectedOptionFromLabel = function (label, list) {
            var foundObj = { index: -1, value: {} };
            for (var index = 0; index < list.length; index++) {
                if (list[index]["label"] == label) {
                    foundObj.index = index;
                    foundObj.value = list[index];
                    break;
                }
            }
            return foundObj;
        }

        var findFieldParamByID = function (id) {
            var foundObj = { obj: null, index: -1 }
            var list = ctrl.formParams.auction_entry;

            for (var index = 0; index < list.length; index++) {
                if (list[index].id == id) {
                    foundObj = { obj: list[index], index: index };
                    break;
                }
            }

            return foundObj;
        }

        var getLabelFromOptionsListBasedOnID = function (value, list) {
            var label = null;
            if (list != null && list.length > 0) {
                for (var index = 0; index < list.length; index++) {
                    if (list[index].id == value.id) {
                        label = list[index].label;
                        break;
                    }
                }
            }

            return label;
        }

        var getIDFromOptionsListBasedOnLabel = function (value, list) {
            var id = null;
            if (list != null && list.length > 0) {
                for (var index = 0; index < list.length; index++) {
                    if (list[index].label == value) {
                        id = list[index].id;
                        break;
                    }
                }
            }

            return id;
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

        var computePercentage = function (percentage, amount) {
            return (amount * percentage) / 100;
        }

        var computePercentageBasedOnAmount = function (amount, totalValue) {
            return parseFloat(((amount * 100) / totalValue).toFixed(2));
        }

        var computeAmountBasedOnPercentage = function (percentage, totalValue) {
            return parseFloat(((percentage * totalValue) / 100).toFixed(2));
        }

        var computePrizeAmount = function (totalValue, amount) {
            return parseFloat((totalValue - amount).toFixed(2));
        }

        var computeDividendAmount = function (totalValue, amount, commission) {
            return parseFloat((totalValue - amount - commission).toFixed(2));
        }

        var computeNextAuctionNumber = function (list) {
            var next = Number.NEGATIVE_INFINITY;
            var tmp;
            for (var index = list.length - 1; index >= 0; index--) {
                tmp = list[index].auction_number;
                if (tmp > next)
                    next = tmp;
            }
            return next + 1;
        }

    }

    CFApp.controller('AuctionDetailsCtrl', ['$scope', 'AuctionDetailsService', 'ManageSubscriberService', AuctionDetailsCtrl]);
}());