var flag = false;
var imgUrl = "";
//进入登录
function enterLogin() {
    var btn_regist = document.getElementById("regist");
    if (btn_regist.style.display = 'block') btn_regist.style.display = 'none';
    $("#user").val("");
    $("#psd").val("");
    var btn_login = document.getElementById("login");
    btn_login.style.display = 'block';
    initCode();
}
//用户登录
function login() {
    var user = $("#user").val();
    var psd = $("#psd").val();
    var inputCode = $(".ipt_vry").val();
    var identity = $("input[name='identity']:checked").val();

    if (user == "" || psd == "") {
        toastr.warning("请填写登录信息！", "警告");
        // }else if (inputCode.length <= 0) {
        //     toastr.warning("请输入验证码","警告");
        // }else if (inputCode.toUpperCase() != code.toUpperCase()) {
        //     toastr.error("验证码输入有误！","错误");
        //     init();
    } else {
        var loginTime = createTime();
        var datajson = {
            name: user,
            identity: identity,
            password: psd,
            loginTime: loginTime
        };
        $.ajax({
            type: "post",
            url: "/api/index/login",
            dataType: "json",
            data: datajson,
            error: function () {
                toastr.error("登陆失败！", "错误");
                initCode();
            },
            success: function (result) {
                document.getElementById("blogLoginStatu").style.display = 'block';
                document.getElementById("login-regist").style.display = 'none';
                if (result.statu == "success") {
                    toastr.success("登陆成功！", "正确");
                    setCookie("token", result.data.token, function () {
                        setCookie("loginStatu", "blog", function () {
                            setCookie("username", result.data.name, function () {
                                setCookie("userava", result.data.ava, function () {
                                    setCookie("identity", identity, function () {
                                        createLoginData(result.data);
                                        closeLogin();
                                        if (parseInt(identity) < 3)
                                            $(".admin").css({
                                                "display": "inline-block"
                                            });
                                    });
                                });
                            });
                        });
                        // sleep(1500,function () {
                        // localUrlIndex();
                        // });
                    });
                } else {
                    toastr.error("登陆失败！", "错误");
                    initCode();
                }
            }
        });
    }
}
//关闭登录
function closeLogin() {
    initCode();
    var btn_login = document.getElementById("login");
    btn_login.style.display = 'none';
}
//进入注册
function enterRegist() {
    initCode();
    var btn_login = document.getElementById("login");
    if (btn_login.style.display = 'block') btn_login.style.display = 'none';

    var btn_regist = document.getElementById("regist");
    btn_regist.style.display = 'block';
}

//注册
function regist() {
    var inputCode = $(".regist5left1 .ipt_vry").val();
    if (inputCode.length <= 0) {
        alert("请输入验证码");
    } else if (inputCode.toUpperCase() != code.toUpperCase()) {
        alert("验证码输入有误！");
        initCode();
    } else {
        var user = document.getElementById("username").value;
        var psd = document.getElementById("password").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
        var emailFormat = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        var emailMate = emailFormat.test(email);
        var phoneFormat = /^1[34578]\d{9}$/;
        var phoneMate = phoneFormat.test(phone);
        var registTime = createTime();
        if (user == "" || psd == "" || email == "" || phone == "") {
            alert("对不起!您的信息不完整。。。");
        } else if (!emailMate) {
            alert("邮箱格式错误。。。");
        } else if (!phoneMate) {
            alert("手机号格式错误。。。");
        } else if (imgUrl === "") {
            alert("请选择您的头像。。。");
        } else {
            datajson = {
                name: user,
                password: psd,
                email: email,
                phone: phone,
                userImg: imgUrl,
                registTime: registTime
            };
            $.ajax({
                type: "post",
                url: "/api/index/regist",
                dataType: "json",
                data: datajson,
                error: function (result) {
                    alert("注册失败。。。");
                    initCode();
                },
                success: function (result) {
                    if (result.statu == "success") {
                        toastr.success("注册成功！请登录。。。", "正确");
                        closeRegist();
                    } else {
                        toastr.error(result.data, "错误");
                        $('.box2').hide();
                    }
                }
            });
        }
    }
}
//关闭注册
function closeRegist() {
    var btn_regist = document.getElementById("regist");
    btn_regist.style.display = 'none';
}


//退出登录状态
function exit() {
    // toastr.error("登陆失败！","错误");
    var token = getCookie('token');
    var loginStatu = getCookie('loginStatu');

    var datajson = {
        token: token
    };
    $.ajax({
        type: "post",
        url: "/api/index/exit",
        dataType: "json",
        data: datajson,
        error: function (result) {
            toastr.error("退出失败。。。", "错误");
        },
        success: function (result) {
            if (result.statu == "success") {
                toastr.success("退出成功！欢迎下次登录。。。", "正确");
                clearCookie('token');
                clearCookie('loginStatu');
                clearCookie('username');
                clearCookie('userava');
                clearCookie('identity');

                localUrlIndex();
            } else {
                toastr.error(result.msg, "错误");
            }
        }
    });



}



//找回密码
function getPassword() {

}

//第三方登录
function otherLogin() {
    //调用QC.Login方法，指定btnId参数将按钮绑定在容器节点中
    QC.Login({
        //btnId：插入按钮的节点id，必选
        btnId: "qqLoginBtn",
        //用户需要确认的scope授权项，可选，默认all
        scope: "all",
        //按钮尺寸，可用值[A_XL| A_L| A_M| A_S|  B_M| B_S| C_S]，可选，默认B_S
        size: "A_XL"
    }, function (reqData, opts) {
        if (getCookie('loginStatu') != "qq" || getCookie('token') == '') {
            //登录成功
            var loginTime = createTime();
            var qqUserInfo = {
                nickname: reqData.nickname,
                userava: reqData.figureurl_qq_2,
                loginAcount: "qq",
                loginTime: loginTime
            };
            $.ajax({
                type: "post",
                url: "/api/index/qqlogin",
                dataType: "json",
                data: qqUserInfo,
                error: function () {
                    toastr.error("登陆失败！", "错误");
                    initCode();
                },
                success: function (result) {
                    if (result.statu == "success") {
                        document.getElementById("login-regist").style.display = 'none';
                        document.getElementById("QQloginStatu").style.display = 'block';
                        document.getElementById("back").style.display = 'none';

                        toastr.success("登陆成功！", "正确");
                        console.log(result.data.token)
                        setCookie("token", result.data.token, function () {
                            setCookie("loginStatu", "qq", function () {
                                setCookie("identity", result.data.type, function () {
                                    var hearImg = reqData.figureurl_qq_2;
                                    //根据返回数据，更换按钮显示状态方法
                                    var dom = document.getElementById('QQloginStatu'),
                                        _logoutTemplate = [
                                            //头像
                                            '<span><img src="' + hearImg + '" class="{size_key}"/></span>',
                                            //昵称
                                            '<span>{nickname}</span>',
                                            //退出
                                            '<span><a href="javascript:QC.Login.signOut();">退出</a></span>'
                                        ].join("");
                                    dom && (dom.innerHTML = QC.String.format(_logoutTemplate, {
                                        nickname: QC.String.escHTML(reqData.nickname), //做xss过滤
                                        figureurl: reqData.figureurl
                                    }));

                                    if (parseInt(result.data.type) < 3)
                                        $("#admin").css({
                                            "display": "inline-block"
                                        });
                                });
                            });
                        });
                    } else {
                        toastr.error("登陆失败！", "错误");
                        initCode();
                    }
                }
            });
        } else {
            var hearImg = reqData.figureurl_qq_2;
            //根据返回数据，更换按钮显示状态方法
            var dom = document.getElementById('QQloginStatu'),
                _logoutTemplate = [
                    //头像
                    '<span><img src="' + hearImg + '" class="{size_key}"/></span>',
                    //昵称
                    '<span>{nickname}</span>',
                    //退出
                    '<span><a href="javascript:QC.Login.signOut();">退出</a></span>'
                ].join("");
            dom && (dom.innerHTML = QC.String.format(_logoutTemplate, {
                nickname: QC.String.escHTML(reqData.nickname), //做xss过滤
                figureurl: reqData.figureurl
            }));
        }
    }, function (opts) { //注销成功
        alert('QQ登录 注销成功');
        clearCookie("loginStatu");
        clearCookie("token");
        localUrlIndex();
    });
}

//上传头像
function previewImage(file) {
    var imghead = $("#imghead");
    if (file.files && file.files[0]) {
        // 判断图片格式
        var img = file.files[0];
        if ((img.type.indexOf('image') == 0 && img.type && /\.(?:jpg|png|gif)$/.test(img.name))) {
            var reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onload = function (evt) {
                imgUrl = evt.target.result;
                imghead.attr("src", imgUrl);
            }
        } else {
            alert('格式不符！图片只能是jpg,gif,png');
        }

    } else {
        alert("你没有选择头像。。。");
    }
}

//显示登录头像
function createLoginData(data) {
    var div_img = $.tag('div', {
        className: "img"
    });
    div_img.append('img', {
        src: data.ava
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