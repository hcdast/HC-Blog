// 类型数组
var articleList = ["文章列表", "添加文章"];
var lifeList = ["生活列表", "添加生活"];
var shareList = ["分享列表", "添加分享"];
var messageList = ["留言列表"];
var userList = ["用户列表", "添加用户"];
var bloggerList = ["博主编者"];

var alldata = 0; //总数据
var pagedata = 10; //一页数据
var allpage = 0; //总页
var nowpage = 1; //当前页

var model = 'article'; //默认模块
var type = 'articlelist'; //默认类型
var list = articleList;

var init = ["articlelist", "addarticle", "articleinfo"];

var match = {
    "articlelist": articleList[0],
    "addarticle": articleList[1],
    "lifelist": lifeList[0],
    "addlife": lifeList[1],
    "sharelist": shareList[0],
    "addshare": shareList[1],
    "messagelist": messageList[0],
    "addmessage": messageList[1],
    "userslist": userList[0],
    "addusers": userList[1],
    "bloggerlist": bloggerList[0],
    "addblogger": bloggerList[1]
};

var imgurl = "";

var userType = ["超级管理员", "管理员", "博主", "测试用户", "普通用户"];
var articleType = ["政治知事", "国防军事", "经济论坛", "文化先锋", "科学探索", "体育中心"];
var lifeType = ["爱情导语", "技术学习", "心灵鸡汤", "百味人生", "娱乐吐槽"];
var shareType = ["那本书", "那个人", "那场电影", "那段记忆"];

$(function () {

    // 鼠标事件
    $("p").on({
        mouseover: function (obj) {
            $(this).css({
                "font-size": "20px"
            });
        },
        mouseout: function (obj) {
            $(this).css({
                "font-size": "16px"
            });

        }
    });
    titleList(articleList);
    $("#" + type).css({
        "display": "block"
    });

    // 标题
    var on = $("#itemlist").find("li:first-child").css({
        "color": "#fff",
        "background": "rgb(15, 156, 124)"
    });
});
// 输入框监听事件
// 文章
$('#111').bind('#article #addarticle .atitle .log', function () {
    var title = $(this).val();
    // alert(title)
    if (title == '' || title == null || title == undefined) {
        $('#addarticle .atitle .log').html('标题不能为空').removeClass('successlog').addClass('errorlog');
    } else if (title.length > 100) {
        $('#addarticle .atitle .log').html('标题长度不能超过100').removeClass('successlog').addClass('errorlog');
    } else {
        $('#addarticle .atitle .log').html('标题格式正确').removeClass('errorlog').addClass('successlog');
    }
});

// 选择模块
function selectModel(obj) {
    model = $(obj).attr("name");
    switch (model) {
        case "article":
            list = articleList;
            break;
        case "life":
            list = lifeList;
            break;
        case "share":
            list = shareList;
            break;
        case "message":
            list = messageList;
            break;
        case "users":
            list = userList;
            break;
        case "blogger":
            list = bloggerList;
            break;
        default:
            break;
    }
    init[0] = model + "list";
    init[1] = "add" + model;
    init[2] = model + "info";
    //侧边栏 
    $(".item h2").css({
        "color": "#FFF"
    });
    $(".item h2 p").css({
        "background": "#0f9c7c"
    });
    $("." + model + " h2").css({
        "color": "#0f9c7c"
    });
    $("." + model + " h2 p").css({
        "background": "#000"
    });

    $(".body div").css("display", "none");
    $("#" + model).css("display", "block");

    $("#" + model + " div").css("display", "none");
    $("#" + type).css("display", "block");
    $("#" + model + "list").css("display", "block");
    $("#" + model + "list div").css("display", "block");

    titleList(list);
}

// 类型列表
function titleList(list) {
    var typeList = document.getElementById("itemlist");
    typeList.innerHTML = "";
    for (var i in list) {
        typeList.innerHTML += "<li class='item' name= '" + init[i] + "' onclick='seletTypeItem(this)'>" + list[i] + "</li>";
    }
    // title
    $(".ibody .title ul li").on({
        mouseover: function (obj) {
            $(this).css({
                "font-size": "20px"
            });
        },
        mouseout: function (obj) {
            $(this).css({
                "font-size": "16px"
            });
        }
    });
    var on = $("#itemlist").find("li:first-child").css({
        "color": "#fff",
        "background": "rgb(15, 156, 124)"
    });

    loadtTypeData(model + "list", list[0]);
}
// 选择类型
function seletTypeItem(obj) {
    var item = $(obj).attr("name");
    $(".ibody .title ul li").css({
        "color": "rgb(15, 156, 124)"
    });
    $(".ibody .title ul li").css({
        "background": "#FFF"
    });
    $(obj).css({
        "color": "#fff",
        "background": "rgb(15, 156, 124)"
    });

    $("#" + model + " div").css({
        "display": "none"
    });
    $("#" + item).css({
        "display": "block"
    });
    $("#" + item + " div").css({
        "display": "block"
    });

    var islist = item.slice(item.length - 4);
    if (islist != "list") $(".foot").css({
        "display": "none"
    });
    else $(".foot").css({
        "display": "block"
    });

    loadtTypeData(item, match[item]);
}

// 加载类型数据
function loadtTypeData(type, value) {
    $("#typetitle").html(value);
    var data = {
        page: nowpage
    }
    if (type == "articlelist") {
        getArticle(data);
        loadEditUsers();
    }
    if (type == "sharelist") {
        getShare(data);
        loadEditUsers();
    }
    if (type == "lifelist") {
        getLife(data);
        loadEditUsers();
    }
    if (type == "messagelist") getMessage(data);
    if (type == "userslist") {
        getUser(data);
        var identity = getCookie("identity");
        var adduserstype = $("#adduserstype");
        var usertype = ['普通用户', '测试用户'];
        if (identity === '4' || identity == '3') {
            toastr.warning("您没有添加权限", "警告");
            return;
        }
        if (identity === '2') usertype = usertype;
        if (identity === '1') usertype.push('博主用户');
        if (identity === '0') usertype.push('管理员', '超级管理员');
        for (var i in usertype) {
            if (i == 0)
                adduserstype.append("<option value='" + i + "' selected='selected' >" + usertype[i] + "</option>");
            else
                adduserstype.append("<option value='" + i + "' >" + usertype[i] + "</option>");
        }
    }
    if (type == "bloggerlist") getBlogger(data);

}

// 文章
// 添加文章
function addArticle() {
    var title = $("#addarticletitle").val();
    if (title == "") {
        toastr.warning("请填写文章标题！", "警告");
        return;
    }
    var type = $("#addarticletype").val();
    if (type == "") {
        toastr.warning("请选择文章类型！", "警告");
        return;
    }
    var author = $("#addarticleauthor").val();
    if (author == "") {
        toastr.warning("请选择编辑作者！", "警告");
        return;
    }
    var content = $("#addarticlecontent").val();
    if (content == "") {
        toastr.warning("请填写文章简介！", "警告");
        return;
    }
    if (imgurl == "") {
        toastr.warning("请插入文章简介配图！", "警告");
        return;
    }
    var time = $("#addarticletime").val();
    if (time == "") {
        toastr.warning("请插入文章编辑时间！", "警告");
        return;
    }
    var data = {
        title: title,
        type: type,
        author: author,
        content: content,
        imgurl: imgurl,
        time: time,
        token: getCookie("token"),
        identity: getCookie("identity")
    }
    sendRequst("post", "article", "addarticle", data, function (result) {
        if (result.statu == "success") {
            toastr.success(result.msg, "正确");
            imgurl = "";
            $("#addarticletitle").val("");
            $("#addarticlecontent").val("");
            $("#addarticletime").attr("value", "");;
        } else {
            toastr.error(result.msg, "错误");
        }
    });
}
// 更新文章
function updateArticle() {
    sendRequst("post", "article", "updatearticle", data);
}
// 文章列表
function getArticle(data) {
    sendRequst("get", "article", "getarticle", data, function (result) {
        var articlelist = $("#articlelist .article-list");
        articlelist.html("");
        // 加载页码
        pageInfo(result.page);

        result = result.data;
        for (var i in result) {

            articlelist.append("<ul class='item'>" +
                "<li style='width:32px'>" + parseInt((nowpage - 1) * pagedata) + parseInt(parseInt(i) + 1) + "</li>" +
                "<li style='width:95px'>" + result[i].title + "</li>" +
                "<li style='width:80px'>" + articleType[parseInt(result[i].type)] + "</li>" +
                "<li style='width:32px'>" + result[i].author + "</li>" +
                "<li style='width:100px'>" + result[i].time + "</li>" +
                "<li style='width:100px'>" + result[i].pageurl + "</li>" +
                "<li style='width:80px'> <a onclick='itemInfo(this)' name='article' id='" + result[i]._id + "'>详情</a>" +
                "<a onclick='remove(this)' name='article' id='" + result[i]._id + "'>删除</a></li>" +
                "</ul>"
            );
        }
    });
}

// 生活
// 添加生活
function addLife() {
    var title = $("#addlifetitle").val();
    if (title == "") {
        toastr.warning("请填写生活标题！", "警告");
        return;
    }
    var type = $("#addlifetype").val();
    if (type == "") {
        toastr.warning("请选择生活类型！", "警告");
        return;
    }
    var author = $("#addlifeauthor").val();
    if (author == "") {
        toastr.warning("请选择编辑作者！", "警告");
        return;
    }
    var content = $("#addlifecontent").val();
    if (content == "") {
        toastr.warning("请填写生活简介！", "警告");
        return;
    }
    if (imgurl == "") {
        toastr.warning("请插入生活简介配图！", "警告");
        return;
    }
    var time = $("#addlifetime").val();
    if (time == "") {
        toastr.warning("请插入生活编辑时间！", "警告");
        return;
    }
    var data = {
        title: title,
        type: type,
        author: author,
        content: content,
        imgurl: imgurl,
        time: time,
        token: getCookie("token"),
        identity: getCookie("identity")
    }
    sendRequst("post", "life", "addlife", data, function (result) {
        if (result.statu == "success") {
            toastr.success(result.msg, "正确");
            imgurl = "";
            $("#addarticletitle").val("");
            $("#addarticlecontent").val("");
            $("#addarticletime").val("");
        } else {
            toastr.error(result.msg, "错误");
        }
    });
}
// 生活列表
function getLife(data) {
    sendRequst("get", "life", "getlife", data, function (result) {
        var lifelist = $("#lifelist .life-list");
        lifelist.html("");
        // 加载页码
        pageInfo(result.page);

        result = result.data;
        for (var i in result) {
            lifelist.append("<ul class='item'>" +
                "<li style='width:32px'>" + parseInt((nowpage - 1) * pagedata) + parseInt(parseInt(i) + 1) + "</li>" +
                "<li style='width:95px'>" + result[i].title + "</li>" +
                "<li style='width:80px'>" + result[i].type + "</li>" +
                "<li style='width:32px'>" + result[i].author + "</li>" +
                "<li style='width:100px'>" + result[i].time + "</li>" +
                "<li style='width:100px'>" + result[i].pageurl + "</li>" +
                "<li style='width:80px'> <a onclick='itemInfo(this)' name='life' id='" + result[i]._id + "'>详情</a>" +
                "<a onclick='remove(this)' name='life' id='" + result[i]._id + "'>删除</a> </li>" +
                "</ul>"
            );
        }
    });
}
// 更新生活
function updateLife() {
    sendRequst("post", "life", "updatelife", data);
}

// 分享
// 添加分享
function addShare() {
    var title = $("#addsharetitle").val();
    if (title == "") {
        toastr.warning("请填写分享标题！", "警告");
        return;
    }
    var type = $("#addsharetype").val();
    if (type == "") {
        toastr.warning("请选择分享类型！", "警告");
        return;
    }
    var author = $("#addshareauthor").val();
    if (author == "") {
        toastr.warning("请选择分享者！", "警告");
        return;
    }
    var content = $("#addsharecontent").val();
    if (content == "") {
        toastr.warning("请填写分享简介！", "警告");
        return;
    }
    if (imgurl == "") {
        toastr.warning("请插入分享简介配图！", "警告");
        return;
    }
    var time = $("#addsharetime").val();
    if (time == "") {
        toastr.warning("请插入分享时间！", "警告");
        return;
    }
    var data = {
        title: title,
        type: type,
        author: author,
        content: content,
        imgurl: imgurl,
        time: time,
        token: getCookie("token"),
        identity: getCookie("identity")
    }
    sendRequst("post", "share", "addshare", data, function (result) {
        if (result.statu == "success") {
            toastr.success(result.msg, "正确");
            imgurl = "";
            $("#addsharetitle").val("");
            $("#addsharecontent").val("");
            $("#addsharetime").val("");
        } else {
            toastr.error(result.msg, "错误");
        }
    });
}
// 更新分享
function updateShare() {
    var title = $("#addsharetitle").val();
    if (title == "") {
        toastr.warning("请填写分享标题！", "警告");
        return;
    }
    var type = $("#addsharetype").val();
    if (type == "") {
        toastr.warning("请选择分享类型！", "警告");
        return;
    }
    var author = $("#addshareauthor").val();
    if (author == "") {
        toastr.warning("请选择分享者！", "警告");
        return;
    }
    var content = $("#addsharecontent").val();
    if (content == "") {
        toastr.warning("请填写分享简介！", "警告");
        return;
    }
    var img = $("#addshareimgurl").val();
    if (img == "") {
        toastr.warning("请插入分享简介配图！", "警告");
        return;
    }
    var time = $("#addsharetime").val();
    if (time == "") {
        toastr.warning("请插入分享时间！", "警告");
        return;
    }
    var data = {
        title: title,
        type: type,
        author: author,
        content: content,
        img: img,
        time: time
    }
    sendRequst("post", "share", "updateshare", data);
}
// 分享列表
function getShare(data) {
    sendRequst("get", "share", "getshare", data, function (result) {
        var sharelist = $("#sharelist .share-list");
        sharelist.html("");
        // 加载页码
        pageInfo(result.page);

        result = result.data;

        for (var i in result) {
            sharelist.append("<ul class='item'>" +
                "<li style='width:32px'>" + parseInt((nowpage - 1) * pagedata) + parseInt(parseInt(i) + 1) + "</li>" +
                "<li style='width:95px'>" + result[i].title + "</li>" +
                "<li style='width:80px'>" + shareType[parseInt(result[i].type)] + "</li>" +
                "<li style='width:32px'>" + result[i].author + "</li>" +
                "<li style='width:100px'>" + result[i].time + "</li>" +
                "<li style='width:100px'>" + result[i].pageurl + "</li>" +
                "<li style='width:80px'> " +
                "<a onclick='itemInfo(this)' name='share' id='" + result[i]._id + "'>详情</a>" +
                "<a onclick='remove(this)' name='share' id='" + result[i]._id + "'>删除</a></li>" +
                "</ul>"
            );
        }
    });
}
// 用户
// 添加用户
function addUser() {
    var name = $("#addusersname").val();
    if (name == "") {
        toastr.warning("请填写用户名称！", "警告");
        return;
    }
    var phone = $("#addusersphone").val();
    if (phone == "") {
        toastr.warning("请输入注册手机！", "警告");
        return;
    } else {
        if (!(/^1[3|5|7|8][0-9]\d{4,8}$/.test(phone))) {
            toastr.warning("请输入正确手机号格式！", "警告");
        }
    }
    var email = $("#addusersemail").val();
    if (email == "") {
        toastr.warning("请输入注册邮箱！", "警告");
        return;
    } else {
        var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
        if (!re.test(email))
            toastr.warning("请输入正确邮箱格式！", "警告");
    }
    var password = $("#adduserspassword").val();
    if (password == "") {
        toastr.warning("请设置登录密码！", "警告");
        return;
    }
    var type = $("#adduserstype").val();
    if (type == "") {
        toastr.warning("请选择用户类型！", "警告");
        return;
    }
    if (imgurl == "") {
        toastr.warning("请插入用户头像！", "警告");
        return;
    }
    var time = $("#adduserstime").val();
    if (time == "") {
        toastr.warning("请插入创建时间！", "警告");
        return;
    }
    var data = {
        name: name,
        phone: phone,
        email: email,
        password: password,
        type: type,
        userImg: imgurl,
        registTime: time,
        lastLoginTime: time,
        token: getCookie("token"),
        identity: getCookie("identity")
    }
    sendRequst("post", "user", "adduser", data, function (result) {
        if (result.statu == "success") {
            toastr.success(result.msg, "正确");
            imgurl = "";
            $("#addusersname").val("");
            $("#addusersphone").val("");
            $("#addusersemail").val("");
            $("#adduserspassword").val("");
        } else {
            toastr.error(result.msg, "错误");
        }
    });
}
// 更新用户
function updateUser() {
    sendRequst("post", "user", "updateUser", data);
}
// 用户列表
function getUser(data) {
    sendRequst("get", "user", "getusers", data, function (result) {
        var userslist = $("#userslist .users-list");
        userslist.html("");
        // 加载页码
        pageInfo(result.page);
        result = result.data;
        for (var i in result) {
            userslist.append("<ul class='item'>" +
                "<li style='width:32px'>" + parseInt((nowpage - 1) * pagedata) + parseInt(parseInt(i) + 1) + "</li>" +
                "<li style='width:80px'>" + result[i].name + "</li>" +
                "<li style='width:80px'>" + result[i].phone + "</li>" +
                "<li style='width:85px'>" + result[i].email + "</li>" +
                "<li style='width:65px'>" + result[i].loginAcount + "</li>" +
                "<li style='width:95px'>" + result[i].registTime + "</li>" +
                "<li style='width:80px'> " +
                "<a onclick='itemInfo(this)' name='users' id='" + result[i]._id + "'>详情</a>" +
                "<a onclick='remove(this)' name='user' id='" + result[i]._id + "'>删除</a> </li>" +
                "</ul>"
            );
        }
    });
}
// 留言
// 留言列表
function getMessage(data) {
    sendRequst("get", "message", "getmessage", data, function (result) {
        var messagelist = $("#messagelist .message-list");
        messagelist.html("");
        // 加载页码
        pageInfo(result.page);
        result = result.data;
        for (var i in result) {
            messagelist.append("<ul class='item'><li style='width:32px'>" + parseInt((nowpage - 1) * pagedata) + parseInt(parseInt(i) + 1) + "</li>" +
                "<li style='width:95px'>" + result[i].username + "</li>" +
                "<li style='width:160px'>" + result[i].message + "</li>" +
                "<li style='width:120px'>" + result[i].time + "</li>" +
                "<li style='width:45px'>" + result[i].reply.length + "</li>" +
                "<li style='width:85px'> " +
                "<a onclick='itemInfo(this)' name='message' id='" + result[i]._id + "'>详情</a>" +
                "<a onclick='remove(this)' name='message' id='" + result[i]._id + "'>删除</a></li> </ul>"
            );
        }
    });
}
// 博主
// 博主列表
function getBlogger(data) {
    sendRequst("get", "user", "getblogger", data, function (result) {
        var bloggerlist = $("#bloggerlist .blogger-list");
        bloggerlist.html("");
        // 加载页码
        pageInfo(result.page);

        result = result.data;
        for (var i in result) {
            bloggerlist.append("<ul class='item'>" +
                "<li style='width:32px'>" + parseInt((nowpage - 1) * pagedata) + parseInt(parseInt(i) + 1) + "</li>" +
                "<li style='width:90px'>" + result[i].name + "</li>" +
                "<li style='width:150px'>" + result[i].email + "</li>" +
                "<li style='width:32px'>" + result[i].article + "</li>" +
                "<li style='width:32px'>" + result[i].life + "</li>" +
                "<li style='width:32px'>" + result[i].share + "</li>" +
                "<li style='width:150px'>" + result[i].registTime + "</li>" +
                "</ul>"
            );
        }
    });
}

// 加载编辑权限用户列表
function loadEditUsers() {
    var userlist = $("#add" + model + "author");
    userlist.html("");
    sendRequst("get", model, "geteditusers", "", function (result) {
        result = result.data;
        if (result.length > 0) {
            for (var i in result) {
                if (i == 1)
                    userlist.append("<option value='" + result[i].name + "' selected='selected'>" + result[i].name + "</option>")
                else
                    userlist.append("<option value='" + result[i].name + "' >" + result[i].name + "</option>")
            }
        } else {
            userList.append("<option value='' selected='selected'>暂无编辑人员</option>");
        }
    });
}
// 详情
function itemInfo(obj) {
    $(".foot").css("display", "none");
    var type = $(obj).attr("name");
    var id = $(obj).attr("id");
    $("#typetitle").html(id);
    $("." + type + "list").css("display", "none");
    $("." + type + "info").css("display", "block");
    $("." + type + "info div").css("display", "block");
    sendRequst("get", type, type + "info", {
        _id: id
    }, function (result) {
        var data = result.data.data;
        if (result.statu == "success") {
            if (type == "life" || type == "article" || type == "share") {
                $("#" + type + "titleinfo").val(data.title);
                $("#" + type + "typeinfo").val(data.type);
                $("#" + type + "authorinfo").val(data.author);
                $("#" + type + "contentinfo").val(data.content);
            } else if (type == "users") {
                $("#" + type + "nameinfo").val(data.name);
                $("#" + type + "phoneinfo").val(data.phone);
                $("#" + type + "emailinfo").val(data.email);
                $("#" + type + "passwordinfo").val(data.password);
                $("#" + type + "typeinfo").val(data.type);
            }else if(type == "message") {
                $("#" + type + "username").val(data.username);
                $("#" + type + "timeinfo").val(data.time);
                var replylist = $("#reply-list");
                replylist.html("");
                var list = data.reply;
                for(var i in list){
                    replylist.prepend("<ul>" +
                        "<li style='width: 20%'>"+list[i].username+"</li>" +
                        "<li style='width: 40%'>"+list[i].message+"</li>" +
                        "<li style='width: 25%'>"+list[i].time+"</li>" +
                        "<li style='width: 15%' name='"+data._id+"' id='"+list[i]._id+"' onclick='removeReply(this)'><span> 删除</span></li>" +
                        "</ul>");
                }
            }
        } else {
            toastr.error("数据获取失败！", "错误");
        }
    });

}
// 修改
function update(obj) {
    var type = $(obj).attr("name");
    var id = $("#typetitle").html();
    if (type == "life" || type == "article" || type == "share") {
        var title = $("#" + type + "titleinfo").val() ;
        if (title == "") {
            toastr.warning("标题不能为空", "警告");
            return;
        }
        var ty = $("#" + type + "typeinfo").val() ;
        if (ty == "") {
            toastr.warning("类型不能为空", "警告");
            return;
        }
        var author = $("#" + type + "authorinfo").val();
        if (author == "") {
            toastr.warning("作者不能为空", "警告");
            return;
        }
        var content = $("#" + type + "contentinfo").val() ;
        if (content == "") {
            toastr.warning("简介不能为空", "警告");
            return;
        }
        var data = {
            title: title,
            type: ty,
            author: author,
            content: content,
            _id: id
        };
        sendRequst("post", type, "update", data, function (result) {
            if (result.statu == "success") {
                toastr.success("修改成功！", "成功");
            } else {
                toastr.error("修改失败！", "错误");
            }
        });
    }
    else if (type == "user") {
        var name=$("#" + type + "snameinfo").val() ;
        if (name == "") {
            toastr.warning("用户名不能为空", "警告");
            return;
        }
        var phone=$("#" + type + "sphoneinfo").val() ;
        if (phone == "") {
            toastr.warning("注册手机号不能为空", "警告");
            return;
        }
        var email=$("#" + type + "semailinfo").val() ;
        if (email == "") {
            toastr.warning("请填写注册邮箱", "警告");
            return;
        }
        var password=$("#" + type + "spasswordinfo").val() ;
        if (password == "") {
            toastr.warning("请设置登录密码", "警告");
            return;
        }
        var ty=$("#" + type + "stypeinfo").val() ;
        if (ty == "") {
            toastr.warning("请选择用户类型", "警告");
            return;
        }
        var data = {
            name: name,
            type: ty,
            phone: phone,
            email:email,
            password:password,
            _id: id
        };
        sendRequst("post", type, "update", data, function (result) {
            if (result.statu == "success") {
                toastr.success("修改成功！", "成功");
            } else {
                toastr.error("修改失败！", "错误");
            }
        });
    }
    

}
// 删除
function remove(obj) {
    var type = $(obj).attr("name");
    var id = $(obj).attr("id");
    sendRequst("get", type, "remove", {
        _id: id
    }, function (result) {
        if (result.statu == "success") {
            toastr.success("删除成功！", "成功");
            flushList();
        } else {
            toastr.error("删除失败！", "错误");
        }
    });
}
// 删除 回复
function removeReply(obj) {
    var mid = $(obj).attr("name");
    var rid = $(obj).attr("id");
    sendRequst("get", "message", "removereply", {
        mid: mid, rid:rid
    }, function (result) {
        if (result.statu == "success") {
            toastr.success("删除成功！", "成功");

        } else {
            toastr.error("删除失败！", "错误");
        }
    });

}

// 后端请求
/**
 * 
 * @param {
 *  type    请求类型
 *  model   数据模块
 *  modetype 数据模块操作方式  list   add
 *  data     数据      
 * } params 
 */
function sendRequst(type, model, modeltype, data, callback) {
    var type = type;
    var url = "/api/" + model + "/" + modeltype;
    var data = data;
    $.ajax({
        type: type,
        url: url,
        dataType: "json",
        data: data,
        error: function () {
            toastr.error("请求失败！", "错误");
        },
        success: function (result) {
            if (result.statu == "success") {
                callback(result);
            } else {
                toastr.error("数据获取失败！", "错误");
            }
        }
    });
}


// 添加时间
function addTime(obj) {
    var type = $(obj).attr("name");
    if (type == "article") {
        $("#addarticletime").attr("value", "");
        var time = createTime();
        $("#addarticletime").attr("value", time);
    }
    if (type == "share") {
        $("#addsharetime").attr("value", "");
        var time = createTime();
        $("#addsharetime").val(time);
    }
    if (type == "life") {
        $("#addlifetime").attr("value", "");
        var time = createTime();
        $("#addlifetime").attr("value", time);
    }
    if (type == "users") {
        $("#adduserstime").attr("value", "");
        var time = createTime();
        $("#adduserstime").val("value", time);
    }

}
//上传图片
function uploadImage(file) {
    if (file.files && file.files[0]) {
        // 判断图片格式
        var img = file.files[0];
        if ((img.type.indexOf('image') == 0 && img.type && /\.(?:jpg|png|gif)$/.test(img.name))) {
            var reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onload = function (evt) {
                imgurl = evt.target.result;
            }
        } else {
            return "";
            alert('格式不符！图片只能是jpg,gif,png');
        }

    } else {
        return "";
        alert("你没有选择头像。。。");
    }
}


// 刷新列表
function flushList() {
    var data = {
        page: nowpage
    };
    switch (model + 'list') {
        case "articlelist":
            getArticle(data);
            break;
        case "lifelist":
            getLife(data);
            break;
        case "sharelist":
            getLife(data);
            break;
        case "userslist":
            getUser(data);
            break;
        case "messagelist":
            getMessage(data);
            break;
        case "bloggerlist":
            getBlogger(data);
            break;
        default:
            break;
    }
}