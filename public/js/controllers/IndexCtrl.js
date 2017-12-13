(function () {
    var CFApp = angular.module('CFApp');
    
    CFApp.config(function(toastrConfig) {
        angular.extend(toastrConfig, {
            autoDismiss: false,
            containerId: 'toast-container',
            maxOpened: 1,    
            newestOnTop: true,
            positionClass: 'toast-bottom-full-width',
            preventDuplicates: false,
            preventOpenDuplicates: false,
            target: 'body',
            closeButton: true,
            closeHtml: '<button>&times;</button>',
            progressBar: false,
            timeOut: 5000
        });
    });

    var IndexCtrl = function ($scope) {
        var base = this;

        base.toggleNavMenu = function () {
            var width = document.getElementById("mySidenav").style.width
            if(width == "0" || width == "0px" || width == ""){
                document.getElementById("mySidenav").style.width = "300px";
            }else {
                document.getElementById("mySidenav").style.width = "0";
            }
        }

        base.menuItems = [
            { name: "Manage Party", route: "/cf/managesubscribers" },
            { name: "Group Details", route: "/cf/groupdetails" },
            { name: "Auction Details", route: "/cf/auctiondetails" },
            { name: "Accounts Management", route: "/cf/accountmgmt" },
            { name: "Transactions", route: "/cf/transactions" },
            // { name: "Installment Advance", route: "/cf/installmentadvance" },
            { name: "Installment Receipt", route: "/cf/installmentreceipt" },
            { name: "Payments", route: "/cf/payments" },
        ];

        base.activeMenu = null;

        base.setActive = function(item){
            base.activeMenu = item;
        }
        
        base.clearActive = function(item){
            base.activeMenu = null;
        }
	}

    CFApp.controller('IndexCtrl', ['$scope', IndexCtrl]);
}());