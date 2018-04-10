var user = require('./../models/index').User;
var article = require('./../models/index').Article;
var life = require('./../models/index').Life;
var share = require('./../models/index').Share;

var async = require('async'),
    md5 = require('MD5'),
    querystring = require('querystring'),
    redisClient = require('../models/redis'),
    fs = require('fs'),
    url = require('url'),
    time = require("../tools/createTime");


//用户注册
function regist(req, res, next) {
    res.setHeader('content-type', 'application/json;charset=utf-8');
    var postdata = '';
    req.setEncoding("utf8");
    req.addListener("data", function (postDataChunk) {
        postdata += postDataChunk;
    });
    req.addListener("end", function () {
        var userdata = querystring.parse(postdata);
         var data = {
            $or: [{
                name: userdata.name
            }, {
                email: userdata.email
            }]
        };
        user.getUser(data, function (result) {
            if (result.statu == "success") {
                if (result.userInfo.length > 0) {
                    res.setHeader('content-type', 'application/json;charset=utf-8');
                    res.end(JSON.stringify({
                        statu: "err",
                        data: "您已注册！请登录。。。"
                    }));
                } else {
                    userdata._id = time.createTime();
                    var path = "../webroot/images/user/" + userdata._id + ".png";
                    var base64 = (userdata.userImg).replace(/^data:image\/\w+;base64,/, "");
                    var dataBuffer = new Buffer(base64, 'base64');
                    fs.writeFile(path, dataBuffer, function (err) { //用fs写入文件
                        if (err) {
                            console.log("图片保存失败！：" + err);
                            res.end(JSON.stringify({
                                statu: "err",
                                data: "图片保存失败"
                            }));
                        } else {
                            console.log('写入成功！');

                            userdata.userImg = "images/user/" + userdata._id + ".png";
                            user.userRegist(userdata, function (result) {
                                if (result.statu == "success") {
                                    res.setHeader('content-type', 'application/json;charset=utf-8');
                                    res.end(JSON.stringify({
                                        statu: "success",
                                        data: result.msg
                                    }));
                                } else {
                                    res.setHeader('content-type', 'application/json;charset=utf-8');
                                    res.end(JSON.stringify({
                                        statu: "err",
                                        data: result
                                    }));
                                }
                            });
                        }
                    })
                }
            } else {
                res.setHeader('content-type', 'application/json;charset=utf-8');
                res.end(JSON.stringify({
                    statu: "err",
                    data: "注册失败！请重试。。。"
                }));
            }
        });
    });
}
//用户登录
function login(req, res, next) {
    res.setHeader('content-type', 'application/json;charset=utf-8');
    var postdata = '';
    req.setEncoding("utf8");
    req.addListener("data", function (postDataChunk) {
        postdata += postDataChunk;
    });
    req.addListener("end", function () {
        var userData = querystring.parse(postdata);
        var type = userData.identity;
        var logindata = {
            name: userData.name,
            password: userData.password,
            type: type
        };
        console.log(logindata)
        user.userLogin(logindata, function (result) {
            if (result.statu == "err") {
                res.end(JSON.stringify(result));
            } else {
                var data = {
                    name: result.userInfo.name,
                    ava: result.userInfo.ava,
                    type: result.userInfo.type
                };
                var token = md5(result.userInfo._id);
                redisClient.setRedis(token, result.userInfo._id, function (reply) {
                    if (reply.statu == "success") {
                        var userInfo = {
                            _id: result.userInfo._id,
                            lastLoginTime: userData.loginTime
                        };
                        user.lastLoginTime(userInfo, function (result) {
                            if (result.statu == "err") {
                                console.log(result.msg);
                                res.end(JSON.stringify({
                                    statu: "err",
                                    data: result
                                }));
                            } else {
                                console.log(result.msg);
                                data.token = token;
                                res.end(JSON.stringify({
                                    statu: "success",
                                    data: data
                                }));
                            }
                        });
                    }
                });
            }
        });
    });
}
//检测登录
function checkLogin(req, res, next) {
    res.setHeader('content-type', 'application/json;charset=utf-8');
    var postdata = '';
    req.setEncoding("utf8");
    req.addListener("data", function (postDataChunk) {
        postdata += postDataChunk;
    });
    req.addListener("end", function () {
        var userData = querystring.parse(postdata);
        redisClient.getRedis(userData.token, function (result) {
            if (result.statu == "success") {
                res.end(JSON.stringify({
                    statu: "success"
                }));
            } else {
                res.end(JSON.stringify({
                    statu: "err"
                }));
            }
        });

    });
}

//qq登录
function qqlogin(req, res, next) {
    res.setHeader('content-type', 'application/json;charset=utf-8');

    var postdata = '';
    req.setEncoding("utf8");
    req.addListener("data", function (postDataChunk) {
        postdata += postDataChunk;
    });
    req.addListener("end", function () {
        var userData = querystring.parse(postdata);
         user.qqlogin(userData, function (result) {
            if (result.statu == "err") {
                res.end(JSON.stringify(result));
            } else {
                var userInfo = {
                    _id: result.userInfo._id,
                    lastLoginTime: userData.loginTime
                };
                var type = result.userInfo.type;
                var token = md5(userInfo._id);
                 redisClient.setRedis(token, userInfo._id, function (result) {
                    console.log(result.msg)
                    if (result.statu == "err") {
                         res.end(JSON.stringify({
                            statu: "err",
                            data: result
                        }));
                    } else {
                        user.lastLoginTime(userInfo, function (result) {
                            if (result.statu == "err") {
                                 res.end(JSON.stringify({
                                    statu: "err",
                                    data: result
                                }));
                            } else {
                                res.end(JSON.stringify({
                                    statu: "success",
                                    data: {
                                        token: token,
                                        type: type
                                    }
                                }));
                            }
                        });
                    }
                });
            }
        });
    });
}

//退出登录
function exit(req, res, next) {
    res.setHeader('content-type', 'application/json;charset=utf-8');

    var postdata = '';
    req.setEncoding("utf8");
    req.addListener("data", function (postDataChunk) {
        postdata += postDataChunk;
    });
    req.addListener("end", function () {
        var userData = querystring.parse(postdata);
        redisClient.getRedis(userData.token, function (result) {
            if (result.statu == "success") {
                redisClient.setRedis(userData.token, "", function (result) {
                    if (result.statu == "success") {
                        res.end(JSON.stringify({
                            statu: "success",
                            msg: "退出成功！"
                        }));
                    } else {
                        res.end(JSON.stringify({
                            statu: "err",
                            msg: "退出失败！redis重置失败"
                        }));
                    }
                })
            } else {
                res.end(JSON.stringify({
                    statu: "err",
                    msg: "退出失败！redis查询失败"
                }));
            }
        })

    });
}

//最近访客
function recentVisitors(req, res, next) {
    res.setHeader('content-type', 'application/json;charset=utf-8');
    user.recentVisitors(function (result) {
        if (result.statu == "success") {
            res.end(JSON.stringify({
                statu: "success",
                data: result.data
            }));
        } else {
            res.end(JSON.stringify({
                statu: "err",
                msg: result.msg
            }));
        }
    })
}
//获取用户列表
function getUsers(req, res, next) {
    res.setHeader('content-type', 'application/json;charset=utf-8');
    req.setEncoding("utf8");

    var arg = url.parse(req.url, true).query;
    var page = arg.page;
    var limit = 10;
    var data = {
        page: page,
        limit: limit
    }
    user.getData(data, function (result) {
        if (result.statu == "success") {
            if (result.data.length > 0) {
                var data = result.data;
                var pagedata = {
                    nowpage: parseInt(page),
                    allpage: parseInt(data.length / 10) + 1,
                    alldata: data.length
                };
                res.end(JSON.stringify({
                    statu: "success",
                    msg: result.msg,
                    page: pagedata,
                    data: result.data
                }));
            } else {
                res.end(JSON.stringify({
                    statu: "success",
                    msg: result.msg,
                    data: result.data
                }));
            }
        } else {
            res.end(JSON.stringify({
                statu: "err",
                msg: result.msg
            }));
        }
    });
}
// 添加用户
function addUser(req, res, next) {
    regist(req, res, next);
}
// 获取博主用户
function getBlogger(req, res, next) {
    res.setHeader('content-type', 'application/json;charset=utf-8');
    req.setEncoding("utf8");

    var arg = url.parse(req.url, true).query;
    var page = arg.page;
    var limit = 10;
    var data = {
        page: page,
        limit: limit
    }
    var option = {
        type: {
            "$in": ['0', '1', '2']
        }
    };
    user.getBlogger(option, data, function (result) {
        if (result.statu == "success") {
            var resultdata = [];
            var data = result.data;
            var pagedata = {
                nowpage : parseInt(page),
                allpage : parseInt(data.length/10)+1,
                alldata : data.length
            };
            if (data.length > 0) {
                //  异步循环
                var i = 0;
                async.whilst(
                    function () {
                        return i < data.length;
                    },
                    function (whileCb) {
                        //循环区域
                        itemdata = {
                            name: data[i].name,
                            email: data[i].email,
                            registTime: data[i].registTime
                        }
                        var blogname = data[i].name;
                        // 异步执行
                        async.parallel([
                                function (callback) {
                                    article.getArticleCountByName({
                                        author: blogname
                                    }, function (result) {
                                        var count = result.count;
                                        callback(null, count > 0 ? count : 0);
                                    });
                                },
                                function (callback) {
                                    life.getLifeCountByName({
                                        author: blogname
                                    }, function (result) {
                                        var count = result.count;
                                        callback(null, count > 0 ? count : 0);
                                    });
                                },
                                function (callback) {
                                    share.getShareCountByName({
                                        author: blogname
                                    }, function (result) {
                                        var count = result.count;
                                        callback(null, count > 0 ? count : 0);
                                    });
                                }
                            ],
                            function (err, results) {
                                itemdata.article = results[0];
                                itemdata.life = results[1];
                                itemdata.share = results[2];
                                resultdata.push(itemdata);
                                i++;
                                whileCb();
                            });
                    },
                    function (err) {
                        res.end(JSON.stringify({
                            statu: "success",
                            page:pagedata,
                            data: resultdata
                        }));　　
                    }
                )
            } else {
                res.end(JSON.stringify({
                    statu: "success",
                    data: resultdata
                }));
            }
        } else {
            res.end(JSON.stringify({
                statu: "err",
                msg: result.msg
            }));
        }
    });
}
// 修改数据
function update(req, res, next) {
    res.setHeader('content-type', 'application/json;charset=utf-8');
    var postdata = '';
    req.setEncoding("utf8");
    req.addListener("data", function (postDataChunk) {
        postdata += postDataChunk;
    });
    req.addListener("end", function () {
        var userinfo = querystring.parse(postdata);
        var id = userinfo._id;
        delete userinfo._id;

        user.update({
            _id: id
        }, userinfo, function (result) {
            console.log(result.statu + ":" + result.msg);
            res.end(JSON.stringify({
                statu: result.statu,
                msg: result.msg,
            }));
        });
    });
}
// 删除数据
function remove(req, res, next) {
    res.setHeader('content-type', 'application/json;charset=utf-8');
    req.setEncoding("utf8");
    var arg = url.parse(req.url, true).query;
    var id = arg._id;

    user.remove({
        _id: id
    }, function (result) {
        console.log(result.statu + ":" + result.msg);
        res.end(JSON.stringify({
            statu: result.statu,
            msg: result.msg
        }));
    });
}
// 通过id 获取数据
function getById(req, res, next) {
    res.setHeader('content-type', 'application/json;charset=utf-8');
    req.setEncoding("utf8");
    var arg = url.parse(req.url, true).query;
    var _id = arg._id;
    user.getUserById({
        _id: _id
    }, {}, function (result) {
        if (result.statu == "success") {
            res.end(JSON.stringify({
                statu: "success",
                msg: result.msg,
                data: {
                    data: result.data[0],
                }
            }));
        } else {
            res.end(JSON.stringify({
                statu: "err",
                msg: result.msg
            }));
        }
    });　
}


module.exports = {
    regist: regist,
    login: login,
    qqlogin: qqlogin,
    checkLogin: checkLogin,
    exit: exit,
    recentVisitors: recentVisitors,
    getUsers: getUsers,
    addUser: addUser,
    getBlogger: getBlogger,
    update:update,
    remove:remove,
    getById:getById
};