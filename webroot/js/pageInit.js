
//  主页面初始化
function indexInit() {
    statuFlush(function (type) { 
        initIndexData();
        newArticle();
        hotArticle();
    });
}
//  关于我页面初始化
function aboutInit() {
    statuFlush(function (type) { 
        
    });
    
}
//  慢生活页面初始化
function lifeInit() {
    statuFlush(function (type) { 
        recentVisitors();
        initLifeData();
        clickRank();
        hotRank();
    });

}
//  留言板页面初始化
function messageInit() {
    statuFlush(function (type) { 
        initMessageData();
        recentVisitors();
    });
   
}
//  在分享页面初始化
function shareInit() {
    statuFlush(function (type) { 
        recentVisitors();
     });
   
}
// 管理员页面初始化
function manageInit(){
     statuFlush( function (type) {
        if(type > 2)  localUrlIndex();
    });
    
}

//  用户登陆状态检测
function statuFlush(callback){
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
                    clearCookie('userava');
                    clearCookie('username');
                    clearCookie('identity');
                }else{
                    if(userStatu=="blog"){
                        var userdata= {name:getCookie("username"),ava: getCookie("userava")};
                        createLoginData(userdata);
                        var identity =  parseInt(getCookie("identity"));
                        if(identity < 3){
                            $(".admin").css({"display":"inline-block"});
                        }
                        setCookie("identity",identity,function () {
                              callback(identity);
                        });
                        
                    }else if(userStatu=="qq"){
                            var identity =  parseInt(getCookie("identity"));
                            if(identity < 3){
                                $(".admin").css({"display":"inline-block"});
                            }
                            setCookie("identity",identity,function () {
                                 callback(identity);
                            });
                    }
                }
            }
        });

        // document.getElementById("login-regist").style.display = 'none';
    }else{
        document.getElementById("login-regist").style.display = 'block';
        document.getElementById("QQloginStatu").style.display = 'none';
        document.getElementById("blogLoginStatu").style.display = 'none';
        callback(5);
    }
}
// 主页


//  最近访客
function recentVisitors() {
    $.ajax({
        type: "get",
        url: "/api/message/recentVisitors",
        dataType: "json",
        // data:{page:1},
        error: function () {
            toastr.err("最近访客数据获取失败！","错误");
        },
        success: function (result) {
            if(result.statu=="success"){
                var visitors = document.getElementById("recentvisitorslist");
                for(var i in result.data){
                    visitors.innerHTML+="<img src='"+result.data[i].ava+"' alt='"+result.data[i].name+"'>";

                }
            }else{
                toastr.err(result.msg,"错误");
            }
        }
    });
}