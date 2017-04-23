(function () {
    "user strict";
    function manageReservationListController($stateParams, reservationResolveData, manageReservationService, $cookies, $scope, hotelService) {
        var vm = this;
        if (reservationResolveData) {
            vm.reservationResolveData = reservationResolveData;
            vm.email = reservationResolveData[0].Email;
        }
         vm.showDetail = showDetail;
          vm.hideDetail = hideDetail;
        vm.showReview = showReview;
        vm.hideReview = hideReview;
        vm.send = updateDetails;
        vm.printDiv = printDiv;
        vm.tableData = {};
        vm.isHideDetais = true;
        vm.isHidereview = true;
        vm.setReview = setReview;
        vm.saveReview = saveReview;
        vm.updatereservations = updatereservations;
        vm.CancelSelectedroomReservations = CancelSelectedroomReservations;
        vm.cancelupdate = cancelupdate;
        vm.reviewdata = {
            Cleaning: 0,
            Location: 0,
            Comfort: 0,
            PersonnelService: 0,
            Facilities: 0,
            Valuemoney: 0,
            checkin: 0,
            isNameDisplay: false,
        }

        activate();
        function InitShowUserReservation() {
            hotelService.showReservation($stateParams.rid, $stateParams.pc, $stateParams.cid).then(function (response) {
                hotelService.getReservationData(response).then(function (response1) {
                    vm.reservationResolveData = response1;
                    vm.email = vm.reservationResolveData[0].Email;
                    vm.tableData = vm.reservationResolveData;
                    vm.reviewdata.ReservationId = vm.tableData.ReservationId;
                }).catch(function (error) {
                    toastr.error(error.Message);
                });
            }).catch(function (error) {
                toastr.error(error.Message);
            });
        }
        function ResetView() {
            vm.updateReservation = false;
            vm.IsPreview = true;
            vm.isHideDetais = false;
            vm.isupdating = false;
        }
        function activate() {
            //reset array
            vm.chkhotelroomids = [];
            ResetView();
            if ($stateParams.rid && $stateParams.pc && $stateParams.cid)
            {
                InitShowUserReservation();
            }
            else if ($stateParams.reservationData === null || $stateParams.reservationData === undefined) {
                toastr.warning("Somthing going wrong, please try again!");
            }
            else {
                vm.tableData = $stateParams.reservationData;
                vm.reviewdata.ReservationId = vm.tableData.ReservationId;
            }
            var culture = $cookies.get("lang");
            var arrId = "lblpositive,lblnegative,btnback1,btnsave1,lblopertaions,lblreservationstatusds,lblreservationidsds,lblpincodesds,lblreservationdateds," +
            "lblpropertynameds,lblcheckindatesds,lblcheckoutdatesds,lblpayamountds,lblreservationidsm0,lblpincodesmo,lblreservationdatemo,lblpropertynamemo," +
            "lblcheckindatesmo,lblcheckoutdatesmo,lblpayamountmo,lblreservationstatusmo,lblopertaionds," +
            "lblReservationIDCaption,lblPinCodeCaption,lblFullNameCaption,lblReservationDateCaption,lblReservationStatusCaption,lblEmailCaption," +
            "lblCreditCardHdr,lblCreditCardNo,lblCVC,lblCreditCardHolder,lblExpirationDate,btnSave,lblRequiredFieldListWarning,btnShowBack," +
            "lblreservationidreview,lblreservationinfo,lbltrveltype,lblreview,lblsuccessreview,btnCancelSelected,btnCancel,lblnocomments,lblselectscore,lblselectroom,lblfailreview," +
            "btnupdate,btncancel,lblsuccsess,btnback,lblmynamedisplay";

            var arrMessageCode = "Positive,Negative,back,Save,Operation,Status,ReservationID,PinCode,ReservationDate," +
                "Property,CheckInDate,CheckOutDate,PayableAmount,ReservationID,PinCode,ReservationDate,Property,CheckInDate,CheckOutDate," +
            "PayableAmount,Status,Operation," +
              "ReservationID,PinCode,Reserver,ReservationDate,ReservationStatus,Email," +
          "CCType,CCNo,CCCVC,CCFullName,CCExpiration,Save,RequiredFieldListWarning,Back," +
                "ReservationID,ReservationInfo,TravellerType,Review,InsertedSuccessFully,CancelSelectedRoomReservations,CancelReservation,NoComments,Pleaseselectscores, RoomSelectionWarning,Yourreview," +
                "Update,Cancel,OperationSuccess,Back,AnonymousReview";
            getTypeReview(culture);
            writereView(culture);

            var arrIdInit =  "lblpropertyname21,lblreservationids21,lblpincodes21,lblreservationowner21,lblreservationstatus21,lblroomcounts21,lblcheckindates21,lblcheckoutdates21,lblnumberofnights21,lblemails21,lblpeoplecount21,lblModifyReservation";
            var arrMessageCodeInit = "Hotel,ReservationID,PinCode,Reserver,ReservationStatus,RoomCount,CheckInDate,CheckOutDate,NightCount,Email,PeopleCount,ModifyReservation";


            getHomeResTextMessage(culture, arrMessageCodeInit, arrIdInit);
            getManageReservationTextMessage(culture, arrMessageCode, arrId);

             
        }
        function printDiv(divName) {

            var printContents = document.getElementById(divName).innerHTML;
            var popupWin = window.open('', '_blank', 'left=0,top=0,toolbar=0,sta­tus=0');
            popupWin.document.open();
            popupWin.document.write(printContents);
            popupWin.document.close();
            popupWin.focus();
            popupWin.print();
        }
        function getTypeReview(culture) {
            manageReservationService.getTypeReview(culture).then(function (response) {
                vm.listTypeReview = response;
            }).catch(function (error) {

            })
        }
        function writereView(culture) {
            manageReservationService.writereView(culture).then(function (response) {
                vm.listWriteReview = response;
            }).catch(function (error) {

            })
        }
        function showDetail() {
            vm.IsPreview = true;
            //vm.isHideDetais = false;
            vm.isHidereview = true
            vm.updateReservation = false;
        }
        function hideDetail() {
            //vm.isHideDetais = true;
            vm.IsPreview = false;
        }
        function showReview() {
            setTimeout(function () {
                $('.stats-list-select > li > .booking-item-rating-stars > li').each(function () {
                    var list = $(this).parent(),
                        listItems = list.children(),
                        itemIndex = $(this).index();

                    $(this).hover(function () {
                        for (var i = 0; i < listItems.length; i++) {
                            if (i <= itemIndex) {
                                $(listItems[i]).addClass('hovered');
                            } else {
                                break;
                            }
                        };
                        $(this).click(function () {
                            for (var i = 0; i < listItems.length; i++) {
                                if (i <= itemIndex) {
                                    $(listItems[i]).addClass('selected');
                                } else {
                                    $(listItems[i]).removeClass('selected');
                                }
                            };
                        });
                    }, function () {
                        listItems.removeClass('hovered');
                    });
                });



                $('.booking-item-container').children('.booking-item').click(function (event) {
                    if ($(this).hasClass('active')) {
                        $(this).removeClass('active');
                        $(this).parent().removeClass('active');
                    } else {
                        $(this).addClass('active');
                        $(this).parent().addClass('active');
                        $(this).delay(1500).queue(function () {
                            $(this).addClass('viewed')
                        });
                    }
                });
            }, 2000);
            vm.isHidereview = false;
            vm.isHideDetais = true;
        }
        function hideReview() {
            vm.isHidereview = true;
        }
        function getManageReservationTextMessage(culture, messageCode, labelId) {
            manageReservationService.getManageReservationTextMessage(culture, messageCode, labelId).then(function (response) {
                vm.manageReservationlabel = response;
            }).catch(function (error) {

            })
        }
        function getHomeResTextMessage(culture, messageCode, labelId) {
            manageReservationService.getManageReservationTextMessage(culture, messageCode, labelId).then(function (response) {
                vm.HomeManageReservationlabel = response;
            }).catch(function (error) {

            })
        }

        //update the hotel room details or cancellation view
        function updateDetails(revId)
        {
            vm.updateReservation = true;
            vm.IsPreview = false;
            vm.isHideDetais = true;
        }
        // call for update details
        function updatereservations(objRes)
        {
                // var reservationid = document.getElementById('lblreservationid').innerHTML;
            var Culturecode = $cookies.get("lang");
            var reservationid = objRes.ID;
            var chkroomid = [];
            var reservationEmail = objRes.Email;
                var guestname = [];
                var bedselectionno = [];
                var araivaltime = [];
                var travelertype = [];
                debugger;
                 
                $(".roomchek:checked").each(function () {
                    chkroomid.push($(this).val());
                });

                for (var i = 0; i < chkroomid.length; i++) {
                    guestname.push(vm.lblGuestName[i]);
                    //  alert(guestname)
                    //bedselectionno.push(document.getElementById('drpbed' + chkroomid[i]).value);
                    bedselectionno.push(vm.drpbed[i]);
                    //araivaltime.push(document.getElementById('drparaivaltime' + chkroomid[i]).value);
                    araivaltime.push(vm.drparaivaltime[i]);
                    //travelertype.push(document.getElementById('drptravellerinfo' + chkroomid[i]).value);
                    travelertype.push(vm.drptravellerinfo[i]);

                }
                if (chkroomid == "" || chkroomid == null) {
                    document.getElementById('lblselectroom').style.display = '';
                }
                else {
                    document.getElementById('lblselectroom').style.display = 'none';
                }
                var json = { Culturecode: Culturecode, reservationid: reservationid, guestname: [guestname], bedselectionno: [bedselectionno], travelertype: [travelertype], drptime: [araivaltime], RoomID: [chkroomid], reservationEmail: reservationEmail }
                // if (guestname != "" && (bedselectionno != "0" || bedselectionno != "") && araivaltime != "00.00" && (travelertype != "0" || travelertype != "") && chkroomid != "")
                if (guestname != "" && (chkroomid != "" || chkroomid != null)) {
                    //$("#divLoading").show();
                    manageReservationService.updatereservationdetails(json).then(function (response) {
                        vm.updateSuccess = response;
                        //toastr.success("Record has been updated successfully!");
                        $('#lblsuccsess').show();

                    }).catch(function (error) {
                        toastr.warning(error);
                    });
                }
                else {
                    alert("please check all the deatils, may be something are not left.")
                }
        }
        function CancelSelectedroomReservations(Operation,val)
            {
                // alert(Operation)
                var OperationSelected = Operation;
                // alert(OperationSelected)
                //alert('hi')
                var CultureCode = $cookies.get("lang");
                //alert(Culturecode)
                var CurrencySymbol = val.CurrencySymbol;
                // alert(currencysymbol)
                var HotelID = val.HotelID;
                // alert(Hotelid)
                var ReservationID = val.ID;
                //  alert(ReservationID)
                var CheckInDate = val.CheckInDate;
                // alert(CheckInDate)
                var CheckOutDate =val.CheckOutDate;
                // alert(CheckOutDate)
                var UserID = $cookies.get("userId");
                //  alert(UserID)
                var ReservationAmount = val.ReservationAmount;
                //alert(ReservationAmount)
                var FullName = val.FullName;

                var HotelRoomID = [];
                //  var RoomTypeName = [];
                var HotelReservationID = [];
                var amount = [];
                var active = [];
                var HotelRoomIDChecked = [];
               
                $(".roomchek").each(function () {
                    HotelRoomID.push($(this).val());
                });

                $(".roomchek:checked").each(function () {
                    HotelRoomIDChecked.push($(this).val());
                });
                //if (vm.chkhotelroomids != undefined) {
                //    if (vm.chkhotelroomids.length > 0) {
                //        HotelRoomID.push(vm.chkhotelroomids[i].value);
                //    }
                //}
                //if (vm.chkhotelroomids != undefined) {
                //    if (vm.chkhotelroomids.length > 0) {
                //        if (vm.chkhotelroomids[i] == true) {
                //            HotelRoomID.push(vm.chkhotelroomids[i].value);
                //        }
                //    }
                //}

                for (var i = 0; i < HotelRoomID.length; i++) {
                    HotelReservationID.push(vm.HotelReservationID[i]); 
                    amount.push(vm.HotelReservationPayableAmount[i]);
                    active.push(vm.HotelResActive[i]);
                }

                if (OperationSelected == 'CancelSelected') {
                    if (HotelRoomIDChecked != "") {

                        if ((HotelRoomID != "" && HotelRoomID != null) && (HotelRoomIDChecked != "" && HotelRoomIDChecked != null)) {
                            var jsonCancelSelected = {
                                CultureCode: CultureCode, UserID: UserID, FullName: FullName, HotelID: HotelID, ReservationID: ReservationID, CurrencySymbol: CurrencySymbol, CheckInDate: CheckInDate, CheckOutDate: CheckOutDate,
                                HotelRoomID: [HotelRoomID], HotelReservationID: [HotelReservationID],
                                ActiveStatus: [active], amountvalue: [amount], ReservationAmount: ReservationAmount, HotelRoomIDChecked: [HotelRoomIDChecked]
                            }
                            vm.isupdating = true;
                            manageReservationService.cancelSelectedItems(jsonCancelSelected).then(function (response) {
                                vm.isupdating = false;
                                vm.updateSuccess = response;
                                //toastr.success("Record has been cancelled successfully!");
                                $('#lblsuccsess').show();
                            }).catch(function (error) {
                                toastr.warning(error);
                            });
                        }

                    }
                    else if (HotelRoomIDChecked == "") {
                        alert('Select atleast one record')
                    }
                }
                else if (OperationSelected == 'CancelAll') {

                    var Delete = confirm("Would you like to continue the operation");

                    if (Delete) {

                        if (HotelRoomID != "" && HotelRoomID != null) {

                            var jsonCancelAll = {
                                CultureCode: CultureCode, UserID: UserID, FullName: FullName, HotelID: HotelID, ReservationID: ReservationID, CurrencySymbol: CurrencySymbol, CheckInDate: CheckInDate, CheckOutDate: CheckOutDate,
                                HotelRoomID: [HotelRoomID], HotelReservationID: [HotelReservationID],
                                ActiveStatus: [active], amountvalue: [amount], ReservationAmount: ReservationAmount, HotelRoomIDChecked: [HotelRoomID]
                            }
                            vm.isupdating = true;
                            manageReservationService.cancelSelectedItems(jsonCancelAll).then(function (response) {
                                vm.updateSuccess = response; 
                                vm.isupdating = false;
                                $('#lblsuccsess').show();
                                InitShowUserReservation();
                            }).catch(function (error) {
                                toastr.warning(error);
                            });
                        }
                    }
                }
            }
        function cancelupdate()
        {
            ResetView();
        }
        function setReview(value, ID) {
            if (ID == "1") {
                vm.reviewdata.Cleaning = value;
            }
            else if (ID == "2") {
                vm.reviewdata.Location = value;
            }
            else if (ID == "3") {
                vm.reviewdata.Comfort = value;
            }
            else if (ID == "4") {
                vm.reviewdata.PersonnelService = value;
            }
            else if (ID == "5") {
                vm.reviewdata.Facilities = value;
            }
            else if (ID == "6") {
                vm.reviewdata.Valuemoney = value;
            }
            else if (ID == "7") {
                vm.reviewdata.checkin = value;
            }
        }

        function saveReview() {
            if (vm.reviewdata.checkin === 0 ||
                vm.reviewdata.Cleaning === 0 ||
                 vm.reviewdata.Location === 0 ||
                vm.reviewdata.Comfort === 0 ||
                 vm.reviewdata.PersonnelService === 0 ||
                vm.reviewdata.Facilities === 0 ||
                vm.reviewdata.Valuemoney === 0) {
                toastr.error("Please Fill All Rating");
            }
            else if (vm.travelerType === null || vm.travelerType === undefined || vm.travelerType === "") {
                toastr.error("Please Select Traveler Profile");
            }
            else {
                var object = {
                    "ReservationId": reservationResolveData[0].ID,
                    "UserId": $cookies.get("userId"),
                    "traveltype": vm.travelerType,
                    "travelerdate": vm.reservationResolveData[0].CheckInDate,
                    "positive": vm.positive,
                    "negative": vm.negative,
                    "name": $cookies.get("username"),
                    "Cleaning": vm.reviewdata.Cleaning,
                    "Comfort": vm.reviewdata.Comfort,
                    "Facilities": vm.reviewdata.Facilities,
                    "Valueofmoney": vm.reviewdata.Valuemoney,
                    "Checkin": vm.reviewdata.checkin,
                    "Service": vm.reviewdata.PersonnelService,
                    "Mynamedisplay": vm.reviewdata.isNameDisplay,
                    "Averagepoint": (vm.reviewdata.Cleaning + vm.reviewdata.Comfort + vm.reviewdata.Facilities + vm.reviewdata.Location + vm.reviewdata.Valuemoney + vm.reviewdata.checkin + vm.reviewdata.PersonnelService) / 7,
                    "email": vm.email,
                    "Location1": vm.reviewdata.Location,
                }
                var data = object;
                manageReservationService.saveReview(data).then(function (response) {
                    toastr.success("Review Registred Success");
                    vm.isHidereview = true;
                    vm.travelerType = null;
                    vm.positive = null;
                    vm.negative = null;
                    vm.reviewdata.isNameDisplay = false;
                }).catch(function (error) {
                });
            }
        }
    }
    angular
    .module("manageReservation")
    .controller("manageReservationListController", manageReservationListController);
    manageReservationListController.$inject = ["$stateParams", "reservationResolveData", "manageReservationService", "$cookies", "$scope", "hotelService"];
})();