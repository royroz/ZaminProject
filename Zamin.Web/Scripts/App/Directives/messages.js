//function getCookie(c_name) {
//    var i, x, y, ARRcookies = document.cookie.split(";");
//    for (i = 0; i < ARRcookies.length; i++) {
//        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
//        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
//        x = x.replace(/^\s+|\s+$/g, "");
//        if (x == c_name) {
//            return unescape(y);
//        }
//    }
//}

function getCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            y = decodeURIComponent(y);
            y = decodeURIComponent(y);
            var z = y.split('+').join(' ');
            return z;
        }
    }
}

function delCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function getCookieMessages() {
    toastr.options.positionClass = "toast-top-left";
    var successMsg = getCookie("successmsg");
    if (successMsg != null) {
        jaaulde.utils.cookies.del('successmsg');
        toastr.success(successMsg);
    }
    var errorMsg = getCookie("errormsg");
    if (errorMsg != null) {
        jaaulde.utils.cookies.del('errormsg');
        toastr.error(errorMsg);
    }
}

$(function () {
    getCookieMessages();
});
