
$(document).ready(function () {

    // $('#txtCheckInDate').datepicker()
    //$('#txtCheckInDate').daterangepicker({
    //    autoUpdateInput: false
    //});
    // document.getElementById('txtCheckInDate').value = '';
    // document.getElementById('txtCheckOutDate').value = '';
    //  WhyGbshotelsText("en")    
    Gethotles();
    GetLatestNews();
    //WhyGbshotelsText();
    //$('#txtCheckInDate').val("");
    //$('#txtCheckOutDate').val("");
    $('#txtCheckInDate').datepicker('setDate', null);
    $('#txtCheckOutDate').datepicker('setDate', null);
});


function getTextMessage(Cultureid) {
    // alert(Cultureid)
    //    var arrId = new Array("spnHotelSearch", "txtCheckInDate", "txtCheckOutDate", "lblDestination", "lblCheckIn", "lblCheckOut", "lblRoomCount", "lblAdultCount", "lblChildCount", "lblSearch", "txtDestinationSearch",
    //        "lbltopdestinations", "lblwhereYouStay", "lblpopularcity", "lblpopularcity1", "lblpopularcity2", "lblpopularHotels", "lblpopularHotels1", "lblpopularHotels2", "lblRecentlyHotels", "lblRecentlyHotels1", "lblLatestNews", "lblLatestNews1", "lblourpartners", "lblfollowus", "lbldonthavedate", "lblMoreHotels", "lblguest", "lblsocialMessage", "GbsHotelsTextHeader", "WhyGbsHotels", "ddlGuests", "ddlGuests", "ddlGuests",
    //        "lblNotOnlyHotels", "lblapartments1", "lblapartments2", "lblresorts1", "lblresorts2", "lblmotels1", "lblmotels2", "lblresidence1", "lblresidence2",
    //        "lblconventioncenter1", "lblconventioncenter2", "lblusername", "lblemailaddress", "txtsubscription", "lblsignup", "lblsubscribenow", "lblRatesandReviews", "lbladdyourhotels", "nearby", "streetview", "lblmoredestination", "lblTotal", "lblreviewsfrom", "lblhotelsin", "lblNoDestinationFound", "lblcountriesworldwide", "lblverification", "lblverificationsuccess");
    //    var arrMessageCode = new Array("HotelSearch", "DateFieldDescription", "DateFieldDescription", "Destination", "CheckInDate", "CheckOutDate", "RoomCount", "AdultCount", "ChildCount", "Search", "HotelDestination",
    //        "TOPDESTINATIONS", "WHEREYOUWANTTOSTAY", "PopularCities", "PopularCities", "PopularCities", "FeaturedHotels", "FeaturedHotels", "FeaturedHotels", "RecentlyAddedHotels", "RecentlyAddedHotels", "LatestNews", "LatestNews", "OURPARTNERS",
    //"FOLLOWUS", "havespecificdatesyet", "MoreHotels", "Guests", "SocialMessage", "GbshotelsBook", "WhyGbshotelsText", "AdultCount", "ChildCount", "Option",
    //        "NotOnlyHotels", "Apartments", "Apartments", "Resorts", "Resorts", "Motel", "Motel", "Residence", "Residence", "Convention Center", "Convention Center", "UserName", "Email Address", "Subscription", "Signuptoreceive", "SubscribeNow", "RatesandReviews", "AddYourHotels", "Near by", "Street View", "More Destinations", "Total", "reviewsfrom", "hotelsin", "NoDestinationFound", "countriesworldwide", "EmailFieldWarning", "InsertedSuccessFully");


    var arrId = new Array("spnHotelSearch", "lblDestination", "txtDestinationSearch", "lblCheckIn", "lblCheckOut", "lblRoomCount", "lblAdultCount", "lblSearch",
        "lbltopdestinations", "lblmoredestination", "lblFeaturedHotels", "lblRecentlyHotels", "GbsHotelsTextHeader", "lblhotelsin", "lblcountriesworldwide",
        "lbladdyourhotels", "lblLatestNews");
    var arrMessageCode = new Array("HotelSearch", "Destination", "HotelDestination", "CheckInDate", "CheckOutDate", "RoomCount", "AdultCount", "Search",
        "TOPDESTINATIONS", "More Destinations", "FeaturedHotels", "RecentlyAddedHotels", "GbshotelsBook", "hotelsin", "countriesworldwide",
        "AddYourHotels", "LatestNews");

    //   "lblFeaturedHotels", "lblFeaturedHotels1", "FeaturedHotels", "FeaturedHotels",
    var json = { CultureCode: Cultureid, MessageCode: [arrMessageCode], lblId: [arrId] }
    $.ajax({
        type: "get",
        url: "/Home/GetTextMessage",
        traditional: true,
        data: json,
        dataType: "Json",
        success: function (res) {
            if (res != "") {

                var Message = [];
                var count = 0;

                $.each(res, function (key, val) {

                    if (val.LblId.match('lblMoreHotels')) {
                        document.getElementById(val.LblId).innerHTML = val.TextMessage;
                        document.getElementById('lblMoreHotels1').innerHTML = val.TextMessage;
                        document.getElementById('lblMoreHotels2').innerHTML = val.TextMessage;
                        document.getElementById('lblMoreHotels3').innerHTML = val.TextMessage;
                        document.getElementById('lblMoreHotels4').innerHTML = val.TextMessage;
                        // document.getElementById('lblMoreHotels5').innerHTML = val.TextMessage;
                    }
                    else if (val.LblId.match('ddlGuests')) {
                        Message[count] = val.TextMessage;
                        count++
                    }
                        //else if (val.LblId.match('moredestination')) {
                        //    document.getElementById(val.LblId).value = val.TextMessage;
                        //}

                    else if (val.LblId.match('txtsubscription')) {
                        document.getElementById(val.LblId).value = val.TextMessage;
                    }
                    else if (val.LblId.match('nearby')) {
                        document.getElementById(val.LblId).value = val.TextMessage;
                    }
                    else if (val.LblId.match('streetview')) {
                        document.getElementById(val.LblId).value = val.TextMessage;
                    }
                    else if (val.LblId.match('txt')) {
                        document.getElementById(val.LblId).placeholder = val.TextMessage;
                    }
                    else {
                        document.getElementById(val.LblId).innerHTML = val.TextMessage;
                    }
                })

                //$("#ddlGuests").empty();
                //$("#ddlGuests").append(
                //    '<option value="1">2 ' + Message[0] + ',0 ' + Message[1] + '</option>' +
                //    '<option value="2">1 ' + Message[0] + ',0 ' + Message[1] + '</option>' +
                //    '<option value="3">' + Message[2] + '</option>'
                //);

                //$('.slidingDiv').slideUp("slow");
                // $("#culturloder").hide();
            }
        }
    });
}


$(function () {
    //alert('hi')
    $("#txtDestinationSearch").autocomplete({
        source: function (request, response) {
            //var Keyword = document.getElementById('divDestinationSearchvalue').value;
            //alert("hi")
            var json = { Keyword: request.term, CultureCode: Cultureid, CountryID: "" }
            $.ajaxSetup({ cache: false });
            $.ajax({
                type: "Get",
                url: "/Home/GetDestinationSearchResult",
                data: json,
                datatype: "json",
                success: function (data) {

                    document.getElementById('hdnDestinationSearchID').value = '';
                    document.getElementById('hdnDestinationSearchType').value = '';
                    document.getElementById('hdnDestinationName').value = '';
                    document.getElementById('hdnRegionID').value = '';
                    document.getElementById('hdnRegionName').value = '';
                    document.getElementById('hdnHotelID').value = '';
                    document.getElementById('hdnHotelName').value = '';
                    response($.map(data, function (item) {
                        return {
                            label: item.Name + (item.ParentName == '' ? '' : ', ' + item.ParentName) + (item.SecondParentName == '' ? '' : ', ' + item.SecondParentName) + ', ' + item.CountryName,
                            key: item.ID,
                            DestinationSearchType: item.DestinationSearchType,
                            DisplayName: item.DisplayName,
                            CountryName: item.CountryName,
                            Name: item.Name,
                            ParentName: item.ParentName,
                            SecondParentName: item.SecondParentName,
                            RegionID: item.RegionID,
                            RegionName: item.RegionName,
                            HotelID: item.HotelID,
                            HotelName: item.HotelName,
                            DestinationSearchTypeImagePath: item.DestinationSearchTypeImagePath
                        }
                    }))
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    // alert(textStatus);
                }
            });
        },

        open: function () {

            $(this).autocomplete('widget').css('z-index', 9999);
            return false;
        },
        select: function (event, ui) {
            document.getElementById('hdnDestinationSearchID').value = ui.item.key;
            document.getElementById('hdnDestinationSearchType').value = ui.item.DestinationSearchType;
            document.getElementById('hdnDestinationName').value = ui.item.Name;
            document.getElementById('txtDestinationSearch').value = ui.item.label;
            document.getElementById('hdnRegionID').value = ui.item.RegionID;
            document.getElementById('hdnRegionName').value = ui.item.RegionName;
            document.getElementById('hdnHotelID').value = ui.item.HotelID;
            document.getElementById('hdnHotelName').value = ui.item.HotelName;

        },
        minLength: 3,
        html: true,
        autoFocus: false,
        messages: {
            noResults: '',
            results: function () { }
        }
    })
    .data("ui-autocomplete")._renderItem = function (ul, item) {
        return $("<li>")
        .data("ui-autocomplete-item", item)
        .append('<a>' +
        '<table class="SearchAutoComplete" border="0" cellpadding="0" cellspacing="0">' +
        '<tr>' +
        '<td align="left" width="225px" style="font-size:12px">' + '<b>' + item.Name + '</b>' + (item.ParentName == '' ? '' : ', ' + item.ParentName) + (item.SecondParentName == '' ? '' : ', ' + item.SecondParentName) + ', ' + item.CountryName + '</td>' +
        '<td align="right"><div style="color:navy;font-style:italic;float:right;"><div><img style="width:20px" src=\'' + item.DestinationSearchTypeImagePath + '\'></div></td></tr></table></a>')
        .appendTo(ul);
    };
});

function HotelSearch() {
    // alert('hi')

    var DestinationSearchID = document.getElementById('hdnDestinationSearchID').value;
    // alert(DestinationSearchID)
    var DestinationSearchType = document.getElementById('hdnDestinationSearchType').value;
    //  alert(DestinationSearchType)
    var DestinationName = document.getElementById('hdnDestinationName').value;
    //  alert(DestinationName)
    var DestinationSearch = document.getElementById('txtDestinationSearch').value;
    //   alert(DestinationSearch)
    var RegionID = document.getElementById('hdnRegionID').value;
    //alert(RegionID)
    var RegionName = document.getElementById('hdnRegionName').value;
    //  alert(RegionName)
    var HotelID = document.getElementById('hdnHotelID').value;
    //alert(HotelID)
    var HotelName = document.getElementById('hdnHotelName').value;
    //  alert(HotelName)

    //  var CountryID = document.getElementById('hdncountryid').value;
    // alert(CountryID);
    //alert('hi')
    var CheckInDate = $("#txtCheckInDate").data('datepicker').getFormattedDate('dd/mm/yyyy');
    // alert(CheckInDate);
    var CheckOutDate = $("#txtCheckOutDate").data('datepicker').getFormattedDate('dd/mm/yyyy');
    // alert(CheckOutDate)
    //if (CheckInDate != "" || CheckOutDate != "") {
    //    CheckInDate = "19/12/2015"
    //    CheckOutDate = "26/12/2015"
    //}
    if (CheckInDate != "" && CheckOutDate == "") {
        document.getElementById('txtCheckOutDate').style.borderColor = 'red';
        document.getElementById('txtCheckInDate').style.borderColor = '';
    }
    else if (CheckOutDate != "" && CheckInDate == "") {
        document.getElementById('txtCheckInDate').style.borderColor = 'red';
        document.getElementById('txtCheckOutDate').style.borderColor = '';
    }
    else {
        document.getElementById('txtCheckInDate').style.borderColor = '';
        document.getElementById('txtCheckOutDate').style.borderColor = '';
    }

    var RoomCount = $('.RoomOptions:checked').val();
    // alert(RoomCount)
    if (RoomCount == 5) {
        RoomCount = document.getElementById('ddlRoomCount').value;
    }

    var AdultCount = $('.AdultOptions:checked').val();

    if (AdultCount == 5) {
        AdultCount = document.getElementById('ddlAdultCount').value;
    }

    var ChildrenCount = 0;


    //if (HotelID != "") {
    var Json = { HotelID: HotelID, DestinationName: DestinationSearch }
    var CountryCode = "";
    var RoutingName = "";
    $.ajax({
        url: "/Home/GetRoutingDetails",
        type: "get",
        data: Json,
        dataType: "Json",
        success: function (res) {
            if (res != "") {
                $.each(res, function (key, val) {
                    CountryCode = val.Code;
                    RoutingName = val.RoutingName;
                    //alert(CountryCode)
                    //alert(RoutingName)    
                })
                //alert(HotelID);
                //alert(CheckInDate);
                //alert(CheckOutDate);
                if ((HotelID != "" && HotelID != "0" && CheckInDate != "" && CheckOutDate != "") || (RoutingName != null || RoutingName != "")) {
                    if (HotelID != "" && HotelID != "0" && CheckInDate != "" && CheckOutDate != "") {
                        document.getElementById('txtDestinationSearch').style.borderColor = '';
                        window.location.href = "../Hotel_en/" + CountryCode + "/" + RoutingName + "?Rartfbghj=" + HotelID + "&Checkin=" + CheckInDate + "&Checkout=" + CheckOutDate;
                    }
                    else if (RoutingName != null || RoutingName != "") {
                        window.location.href = "../Hotel_en/" + CountryCode + "/" + RoutingName;
                    }
                }
            }
            else {
                if (RegionID != "" && DestinationSearch != "") {
                    if ((CheckInDate != "" && CheckOutDate != "") || (CheckInDate == "" && CheckOutDate == "")) {
                        //alert('datecheck');
                        document.getElementById('txtDestinationSearch').style.borderColor = '';
                        window.location.href = "../Home/SearchResults_en?gregion=" + RegionID + "&Checkin=" + CheckInDate + "&Checkout=" + CheckOutDate + "&RoomCount=" + RoomCount + "&Adultcount=" + AdultCount + "&Childrencount=" + ChildrenCount;
                    }
                }
                else {
                    document.getElementById('txtDestinationSearch').style.borderColor = 'red';
                }
            }
        }
    });

}

function GetLatestNews() {
    var json = {};
    $.ajax({
        type: "Get",
        url: "/Home/GetLatestNews",
        data: json,
        datatype: "Json",
        success: function (res) {
            //alert(res)
            $.each(res, function (key, val) {
                $('#displayLatestNews').append(

                       '<div class="col-sm-4 col-md-4">' +
                        '<div class="article post post-sm">' +
                            '<header class="post-header">' +
                                '<a class="hover-img">' +
                                    '<img src=' + val.PostImage + ' style="width:360px;height:240px;" alt="Image Alternative text" title="196_365" />' +
                                '</a>' +
                           ' </header>' +
                            '<div class="post-inner">' +
                                '<h4 class="post-title"><a class="text-darken" >' + val.Title + '</a></h4>' +
                                '<ul class="post-meta">' +
                                    '<li>' +
                                        '<i class="fa fa-calendar"></i><a >' + val.Createddate + '</a>' +
                                    '</li>' +
                                    '<li>' +
                                        '<i class="fa fa-user"></i><a >' + val.Name + '</a>' +
                                    '</li>' +
                                    '<li>' +
                                        '<i class="fa fa-tags"></i><a>' + val.Travel + '</a>' +
                                    '</li>' +
                                '</ul>' +
                                '<p class="post-desciption">' + val.Description + '...</p>' +
                                //'<a class="btn btn-small btn-primary" href="#">Read More</a>'+
                            '</div>' +
                       ' </div>' +

                    '</div>'
                          )
            })
        }
    })
}

function Gethotles() {
    //alert("hi")
    var json = {};
    $.ajax({
        type: "Get",
        url: "/Home/Gethotles",
        data: json,
        datatype: "Json",
        success: function (res) {
            $.each(res, function (key, val) {
                //alert(val.HotelCount)
                //alert(val.CountryCount)
                document.getElementById("lblHotelCount").innerHTML = val.HotelCount;
                document.getElementById("lblCountryCount").innerHTML = val.CountryCount;
            })
        }
    })
}

//function WhyGbshotelsText(Cultureid) {
//    Cultureid = 'en';

//    var json = { Cultureid: Cultureid }
//    $.ajax({
//        type: "get",
//        url: "/Home/GetWhyGbshotelsText",
//        traditional: true,
//        data: json,
//        dataType: "Json",
//        success: function (res) {

//        }
//    });
//}