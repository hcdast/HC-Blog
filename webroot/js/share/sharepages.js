var shareType = ["那本书", "那个人", "那场电影", "那段记忆"];
var shareid;




function itemClick() {
    var id = window.location.pathname.slice(12, 26);
    $.ajax({
        type: "get",
        url: "/api/share/itemclick",
        dataType: "json",
        data: {
            id: id
        },
        error: function () {
            toastr.err("点击量更新失败！", "错误");
        },
        success: function (result) {}
    });
}
//  获取当前页面数据
function itemData() {
    var id = window.location.pathname.slice(12, 26);
    lifeid = id;
    $.ajax({
        type: "get",
        url: "/api/share/itemdata",
        dataType: "json",
        data: {
            id: id
        },
        error: function () {
            toastr.err("点击量更新失败！", "错误");
        },
        success: function (result) {
            if (result.statu == "success") {
                var data = result.data.data;
                var predata = result.data.predata;
                var netdata = result.data.netdata;
                $(".about_h").append("<a href='../" + data.pageurl + "' id='current'>" + data.title + "</a>");
                $(".title span").append(data.title);
                $(".info .name").append(data.author);
                $(".info .type").append("【" + shareType[parseInt(data.type)] + "】");
                $(".info .time").append(data.time);
                $(".info .clicknum").append("(" + data.clicknum + ")");
                $(".info .praise").append("(" + data.praise + ")");
                $(".info .comments").append("(" + data.comments.length + ")");


                $(".jb").append(data.report);
                $(".k").append(data.pit);
                $(".z").append(data.praise);

                var prelife = $(".prelife");
                var netlife = $(".netlife");
                prelife.attr('href', "../"+predata.pageurl);
                prelife.attr('title', predata.title);
                prelife.append(predata.title);
                netlife.attr('href', "../"+netdata.pageurl);
                netlife.attr('title', netdata.title);
                netlife.append(netdata.title);

                if (data.comments.length == 0) {
                    $("#nodatalog").css('display', 'block');
                } else {
                    $("#nodatalog").css("display","none");
                    var userlist = $("#user-list");
                    userlist.html("");
                    var comm = data.comments;
 
                        for (var i in comm) {
                            userlist.prepend(" <dl>" +
                                "<dt class='img'>" +
                                "<img src='../" + comm[i].userava + "'>" +
                                "</dt>" +
                                "<dd class='user'>" +
                                "<a href=''>" + comm[i].username + "</a>" +
                                "</dd>" +
                                "<dd class='time'>" +
                                "<p>" + comm[i].time + "</p>" +
                                "</dd>" +
                                "<dd class='review'>" +
                                "<p>" + comm[i].message + "</p>" +
                                "</dd>" +
                                "</dl>");
                        }                    
                }
            } else {
                toastr.error("数据加载失败", "错误");
            }
        }
    });
}

// 点击排行
function clickRank() {
    $.ajax({
        type: "get",
        url: "/api/share/clickRank",
        dataType: "json",
        error: function () {
            toastr.err("最新数据获取失败！", "错误");
        },
        success: function (result) {
            if (result.statu == "success") {
                if (result.data.length > 0) {
                    var data = result.data;
                    var clickrank = $(".ph_news .ph_n");
                    clickrank.html("");
                    for (var i in data) {
                        if (i == 0)
                            clickrank.append("<li><span class='num1'>" + parseInt(parseInt(i)+1) + "</span><a href='" + data[i].pageurl + "'>" + data[i].title + "</a></li>");
                        if (i == 1)
                            clickrank.append("<li><span class='num1'>" + parseInt(parseInt(i) + 1) + "</span><a href='" + data[i].pageurl + "'>" + data[i].title + "</a></li>");
                        if (i == 2)
                            clickrank.append("<li><span class='num1'>" +parseInt(parseInt(i) + 1)+ "</span><a href='" + data[i].pageurl + "'>" + data[i].title + "</a></li>");
                        if (i > 2)
                            clickrank.append("<li><span>" + parseInt(parseInt(i) + 1) + "</span><a href='" + data[i].pageurl + "'>" + data[i].title + "</a></li>");
                    }
                }
            } else {
                toastr.err(result.msg, "错误");
            }

        }
    });
}
// 栏目推荐
function hotRank() {
    $.ajax({
        type: "get",
        url: "/api/share/hotRank",
        dataType: "json",
        error: function () {
            toastr.err("推荐数据获取失败！", "错误");
        },
        success: function (result) {
            if (result.statu == "success") {
                if (result.data.length > 0) {
                    var data = result.data;
                    var hotrank = $(".ph_news .tj_n");
                    hotrank.html("");
                    for (var i in data) {
                        hotrank.append("<li><a href='" + data[i].pageurl + "'>" + data[i].title + "</a></li>");
                    }
                }
            } else {
                toastr.err(result.msg, "错误");
            }

        }
    });
}
// 最新评论
function newComments() {
    var id = window.location.pathname.slice(12, 26);
    $.ajax({
        type: "get",
        url: "/api/share/newcomments",
        dataType: "json",
        data: {id : id},
        error: function () {
            toastr.err("留言数据获取失败！", "错误");
        },
        success: function (result) {
            if (result.statu == "success") {
                if (result.data.length > 0) {
                    var data = result.data;
                    var newpl = $(".ph_news .pl_n");
                    newpl.html("");
                    //  当前时间
                    var nowtime = time();
                    var t = '';
                    for (var i in data) {
                        var y = parseInt(nowtime.slice(0, 4)) - parseInt(data[i].id.slice(0, 4));
                        var m = parseInt(nowtime.slice(4, 6)) - parseInt(data[i].id.slice(4, 6));
                        var d = parseInt(nowtime.slice(6, 8)) - parseInt(data[i].id.slice(6, 8));
                        var h = parseInt(nowtime.slice(8, 10)) - parseInt(data[i].id.slice(8, 10));
                        var f = parseInt(nowtime.slice(10, 12)) - parseInt(data[i].id.slice(10, 12));
                        if (( y > 1 )||( y==1 && m>0 ) ) {
                            t = y + "年前";
                        } else if (( m > 1 ) || ( m==1 && d>0 ) ) {
                            t = m + "月前";
                        } else if (( d > 1 ) || ( d==1 && h>0 ) ) {
                            t = d + "天前";
                        } else if (( h>1)||(h==1&&f>0)) {
                            t = h + "小时前";
                        } else if (f > 0) {
                            t = f + "分钟前";
                        }

                        newpl.append("<dl>" +
                            "<dt><img src='../" + data[i].userava + "'></dt>" +
                            "<dt> </dt>" +
                            "<dd>" + data[i].username +
                            "<time>" + t + "</time>" +
                            "</dd>" +
                            "<dd><a href='" + data[i].pageurl + "'>" + data[i].message + "</a></dd>" +
                            "</dl>");
                    }
                }
            } else {
                toastr.err(result.msg, "错误");
            }

        }
    });
}

// 用户操作 act
function userAct(obj) {
    var act = $(obj).attr("id");
    $.ajax({
        type: "post",
        url: "/api/share/useract",
        dataType: "json",
        data:{
            id:lifeid,
            act:act
        },
        error: function () {
            toastr.err("操作失败！", "错误");
        },
        success: function (result) {
            if (result.statu == "success") {
                 $(obj).parent().css("color","#e41635");
                 if(act=="report"){
                    var num = parseInt($("#report  span").html())+1;
                    $("#report  span").html("");
                    $("#report  span").append(num);
                 }
                 if(act=="pit"){
                    var num = parseInt($("#pit  span").html())+1;
                    $("#pit  span").html("");
                    $("#pit  span").append(num);
                 }
                if(act=="praise"){
                    var num = parseInt($("#praise  span").html())+1;
                    $("#praise  span").html("");
                    $("#praise  span").append(num);
                }
            } else {
                toastr.err(result.msg, "错误");
            }

        }
    });

}


// 发表评论
function publish() {
    var id = window.location.pathname.slice(12, 26);

    var loginStatu = getCookie("loginStatu");
    var token = getCookie("token");
    if ((loginStatu == "qq" || loginStatu == "blog") && token != "") {
        var message = $("#comCon").val();
        var time = createTime();
        var datajson = {
            token: token,
            id: id,
            userava:getCookie("userava"),
            username:getCookie("username"), 
            message: message,
            time: time
        };
        $.ajax({
            type: "post",
            url: "/api/share/submitcomment",
            dataType: "json",
            data: datajson,
            error: function () {
                toastr.error("评论失败！", "错误");
            },
            success: function (result) {
                $('#comCon').val("");
                if (result.statu == "success") {
                    var userlist = $("#user-list");
                    userlist.prepend(" <dl>" +
                            "<dt class='img'>" +
                            "<img src='../" + datajson.userava + "'>" +
                            "</dt>" +
                            "<dd class='user'>" +
                            "<a href=''>" + datajson.username + "</a>" +
                            "</dd>" +
                            "<dd class='time'>" +
                            "<p>" + datajson.time + "</p>" +
                            "</dd>" +
                            "<dd class='review'>" +
                            "<p>" + datajson.message + "</p>" +
                            "</dd>" +
                            "</dl>");

                    $("#nodatalog").css("display","none");

                } else {
                    toastr.error("评论失败！", "错误");
                }
            }
        });
    } else {
        alert("您还未登录！请先登录。。。");
    }
}

// 获取更多评论数据
function getMore(obj) {
    var id = lifeid;
    $.ajax({
        type: "post",
        url: "/api/message/initdata",
        dataType: "json",
        data: {
            page: page + 1
        },
        error: function () {
            toastr.error("获取数据失败！", "错误");
        },
        success: function (result) {
            if (result.statu == "success") {
                if (result.data.length > 0) {
                    
                } else {
                    toastr.success(result.msg, "正确");
                }
            } else {
                toastr.error(result.msg, "错误");
            }
        }
    });
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
                    clearCookie('userava');
                    clearCookie('username');
                    clearCookie('identity');
                }else{
                    if(userStatu=="blog"){
                        var userdata= {name:getCookie("username"),ava: getCookie("userava")};
                        createLoginData(userdata);
                        var identity =  getCookie("identity");
                        if(parseInt(identity) < 3){
                            $(".admin").css({"display":"inline-block"});
                        }
                        setCookie("identity",identity,function () {
                            return parseInt(identity);
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
    }
}

//显示登录头像
function createLoginData(data) {
    var div_img = $.tag('div', {
        className: "img"
    });
    div_img.append('img', {
        src: "../"+data.ava
    });
    var div_name = $.tag('div', {
        className: 'name'
    });
    div_name.append('span', {
        innerHTML: data.name
    });
    var div_exit = $.tag('div', {
        className: 'exit',
        onclick: function () {
            exit();
            return false;
        }
    });
    div_exit.append('span', {
        innerHTML: "退出"

    });
    $('#blogLoginStatu').append(div_img);
    $('#blogLoginStatu').append(div_name);
    $('#blogLoginStatu').append(div_exit);
}

// 当前时间 
function time() {
    var date = new Date();
    var year =date.getFullYear();
    var month = date.getMonth() + 1;
    month= month>9?month:"0"+month;
    var strDate = date.getDate();
    strDate= strDate>9?strDate:"0"+strDate;
    var hour = date.getHours();
    hour= hour>9?hour:"0"+hour;
    var minutes = date.getMinutes();
    minutes= minutes>9?minutes:"0"+minutes;
    var seconds = date.getSeconds();
    seconds= seconds>9?seconds:"0"+seconds;

    var currentdate = year + "" + month + "" + strDate + "" + hour + "" + minutes + "" + seconds+"";
    return currentdate;
}

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
                    if (result.data[i].loginAcount == "blog")
                    visitors.innerHTML += "<img src='../" + result.data[i].ava + "' alt='" + result
                    .data[i].name + "'>";
                  else
                    visitors.innerHTML += "<img src='" + result.data[i].ava + "' alt='" + result.data[
                      i].name + "'>";                }
            }else{
                toastr.err(result.msg,"错误");
            }
        }
    });
}

