function resetScroll() {
    setTimeout(function () {

        $("#scroller").simplyScroll();
        //$('#txtCheckInDate').datepicker('setDate', null);
        //$('#txtCheckOutDate').datepicker('setDate', null);
    }, 2000);
}
$(document).ready(function () {
    resetScroll();
});
//to get querystring from URL
function getUrlParameter(param, dummyPath) {
    var sPageURL = dummyPath || window.location.search.substring(1) || window.location.hash.substring(1),
        sURLVariables = sPageURL.split(/[&||?]/),
        res;
    for (var i = 0; i < sURLVariables.length; i += 1) {
        var paramName = sURLVariables[i],
            sParameterName = (paramName || '').split('=');

        if (sParameterName[0] === param) {
            res = sParameterName[1];
        }
    }
    return res;
}

