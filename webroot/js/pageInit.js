
//  主页面初始化
function indexInit() {
    statuFlush();

}
//  关于我页面初始化
function aboutInit() {
    statuFlush();
}
//  慢生活页面初始化
function lifeInit() {
    statuFlush();
}
//  留言板页面初始化
function messageInit() {
    statuFlush();
    initData();
}
//  在分享页面初始化
function shareInit() {
    statuFlush();
}


//  用户登陆状态检测
function statuFlush(){
    var userStatu=getCookie('loginStatu');
    if(userStatu) {
        if(userStatu=="qq"){
            document.getElementById("blogLoginStatu").style.display = 'none';
        }
        document.getElementById("login-regist").style.display = 'none';
        $("#login-regist").hide();
        var token= getCookie('token');
        $.ajax({
            type: "post",
            url: "/api/index/checkLogin",
            dataType: "json",
            data: {token:token},
            error: function () {
                toastr.error("账号状态出错！请重新登录。。。", "错误");
            },
            success: function (result) {
                if(result.statu=="err"){
                    toastr.error("账号状态出错！请重新登录。。。", "错误");
                    clearCookie('loginStatu');
                    clearCookie('token');
                }else{
                    if(userStatu=="blog"){
                        var userdata= {name:getCookie("username"),ava: getCookie("userava")};
                        createLoginData(userdata);
                    }
                }
            }
        });

        // document.getElementById("login-regist").style.display = 'none';
    }else{
        document.getElementById("login-regist").style.display = 'block';
        document.getElementById("QQloginStatu").style.display = 'none';
        document.getElementById("blogLoginStatu").style.display = 'none';
    }
}

//  留言板页面数据初始化
function initData() {
    $.ajax({
        type: "post",
        url: "/api/message/initdata",
        dataType: "json",
        data:{page:1},
        error: function () {
            toastr.err("留言数据获取失败！","错误");
        },
        success: function (result) {
            if(result.statu=="success"){
                if(result.data.length>0){
                    $("#nodatalog").css({"display":"none"});
                    $("#pagenum").css({"display":"block"});
                    showMessage(1,result.data);
                }else{
                    $("#nodatalog").css({"display":"block"});
                    $("#pagenum").css({"display":"none"});
                }
            }else{
                toastr.err(result.msg,"错误");
            }

        }
    });
}