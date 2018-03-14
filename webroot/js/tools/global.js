// IE 下 window.location.origin 为 undefined
if (typeof window.location.origin === 'undefined') {
    window.location.origin = window.location.protocol + '//' + window.location.hostname;
}

var global = window.global = {
    domain: window.location.hostname.replace("http://", "").replace("www.", ""),
    host: {
        root:  window.location.origin + "/",
        hacker:  window.location.origin + "/u/",
        team:  window.location.origin + "/team/"
    },
    context: {
        hacker:  (window.location.pathname != "/" ? window.location.pathname.match(/[^\s\/]*[^\/]/ig)[0] : false),
        team:  (window.location.pathname != "/" ? window.location.pathname.match(/[^\s\/]*[^\/]/ig)[0] : false)
    },
    path: {//host之后的一级目录
        hacker: "",
        team: ""
    },
    ajaxhost: {
        root: "",
        hacker: "",
        team: ""
    }
}

// ajax计数器
var ajaxRequestCount = 0;

// ajax设置
var headers = {
    "x-client-id": "user-web"
};
if($.cookie("AUTH")) {
    headers["authorization"] = "Bearer " + $.cookie("AUTH");
}
$.ajaxSetup({
    headers: headers,
    // timeout: 10000,// 超时设置
    dataType: 'json',
    type: 'GET',
    beforeSend: function (xhr) {
        ajaxRequestCount++;
    },
    complete: function (xhr, status) {
        verifyAllRequestComplete();

        if (status === 'timeout') {
            // 超时后进行刷新操作
            tips.show({text: '请求超时，请刷新页面'});
        }
    },
    error: function (xhr) {
        xhr.responseJSON && tips.show({text: xhr.responseJSON.err_msg});
    }
});

// 验证页面所有请求处理完成
function verifyAllRequestComplete() {
    if (ajaxRequestCount > 0) {
        ajaxRequestCount--;
    }
    if (ajaxRequestCount == 0) {
        afterCompleteAjax();
        verifyAllRequestComplete = function () {};
    }
}

/*
 * 请求头必须携带的头部验证算法
 */
function addHeader(request){
    request.setRequestHeader("x-client-id","user-web");
    if($.cookie("AUTH")!=null)
        request.setRequestHeader("authorization","Bearer "+$.cookie("AUTH"));
}