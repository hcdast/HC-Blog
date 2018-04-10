var article = require('./../models/index').Article;
var user = require('./../models/index').User;

var async = require('async'),
    md5 = require('MD5'),
    querystring = require('querystring'),
    redisClient = require('../models/redis'),
    fs = require('fs'),
    url = require('url'),
    copyfile = require('../tools/copyFile'),
    removefile = require('../tools/removeFile'),
    time = require("../tools/createTime");


// 获取数据列表
function getData(req, res, next) {
    res.setHeader('content-type', 'application/json;charset=utf-8');
    req.setEncoding("utf8");

    var arg = url.parse(req.url, true).query;
    var page = arg.page;
    var limit = 10;
    var data = {
        page: page,
        limit: limit
    }
    article.getData(data, function (result) {
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
// 添加文章
function addArticle(req, res, next) {
    res.setHeader('content-type', 'application/json;charset=utf-8');
    var postdata = '';
    req.setEncoding("utf8");
    req.addListener("data", function (postDataChunk) {
        postdata += postDataChunk;
    });
    req.addListener("end", function () {
        var userinfo = querystring.parse(postdata);
        var token = userinfo.token;
        redisClient.getRedis(token, function (result) {
            if (result.statu == "success") {
                if (parseInt(userinfo.identity) < 3) {
                    delete userinfo.token;
                    delete userinfo.identity;
                    userinfo._id = time.createTime();
                    userinfo.pageurl = "articlePages/" + userinfo._id + ".html";

                    var readpath = "../webroot/articlePages/model.html";
                    var writepath = "../webroot/articlePages/" + userinfo._id + ".html";
                    copyfile.copyFile(readpath, writepath, function (result) {
                        if (result.statu == "success") {
                            var path = "../webroot/images/article/" + userinfo._id + ".png";
                            var base64 = (userinfo.imgurl).replace(/^data:image\/\w+;base64,/, "");
                            var dataBuffer = new Buffer(base64, 'base64');
                            fs.writeFile(path, dataBuffer, function (err) { //用fs写入文件
                                if (err) {
                                    console.log("图片保存失败！：" + err);
                                    res.end(JSON.stringify({
                                        statu: "err",
                                        data: "图片保存失败"
                                    }));
                                } else {
                                    console.log('图片保存成功！');
                                    userinfo.imgurl = "images/article/" + userinfo._id + ".png";
                                    article.addArticle(userinfo, function (result) {
                                        if (result.statu == "success") {
                                            res.end(JSON.stringify({
                                                statu: result.statu,
                                                msg: result.msg
                                            }));
                                        } else {
                                            res.end(JSON.stringify({
                                                statu: result.statu,
                                                msg: result.msg
                                            }));
                                        }
                                    });
                                }
                            });

                        } else {
                            res.end(JSON.stringify({
                                statu: "err",
                                msg: "页面错误！请稍后重试。。。"
                            }));
                        }
                    });
                } else {
                    res.end(JSON.stringify({
                        statu: "err",
                        msg: "用户权限错误！请确认身份。。。"
                    }));
                }
            } else {
                res.end(JSON.stringify({
                    statu: "err",
                    msg: "账号状态错误！请重新登录。。。"
                }));
            }
        });
    });
}
// 获取编辑权限用户
function getEditUsers(req, res, next) {
    res.setHeader('content-type', 'application/json;charset=utf-8');
    req.setEncoding("utf8");
    var data = {
        type: {
            "$in": ['0', '1', '2']
        }
    };
    user.getEditUsers(data, function (result) {
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
    });
}
// 获取点击量文章
function clickRank(req, res, next) {
    res.setHeader('content-type', 'application/json;charset=utf-8');
    req.setEncoding("utf8");

    article.clickRank(function (result) {
        if (result.statu == "success") {
            var data = result.data;
            if (data.length > 0) {
                res.end(JSON.stringify({
                    statu: "success",
                    msg: result.msg,
                    data: data
                }));
            } else {
                res.end(JSON.stringify({
                    statu: "success",
                    msg: result.msg,
                    data: data
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
// 获取最新文章
function getNewArticle(req, res, next) {
    res.setHeader('content-type', 'application/json;charset=utf-8');
    req.setEncoding("utf8");

    article.getNewArticle(function (result) {
        if (result.statu == "success") {
            var data = result.data;
            if (data.length > 0) {
                res.end(JSON.stringify({
                    statu: "success",
                    msg: result.msg,
                    data: data
                }));
            } else {
                res.end(JSON.stringify({
                    statu: "success",
                    msg: result.msg,
                    data: data
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
// 获取最热文章
function getHotArticle(req, res, next) {
    res.setHeader('content-type', 'application/json;charset=utf-8');
    req.setEncoding("utf8");

    article.getHotArticle(function (result) {
        if (result.statu == "success") {
            var data = result.data;
            if (data.length > 0) {
                res.end(JSON.stringify({
                    statu: "success",
                    msg: result.msg,
                    data: data
                }));
            } else {
                res.end(JSON.stringify({
                    statu: "success",
                    msg: result.msg,
                    data: data
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
// 获取推荐生活
function hotRank(req, res, next) {
    res.setHeader('content-type', 'application/json;charset=utf-8');
    req.setEncoding("utf8");

    article.hotRank(function (result) {
        if (result.statu == "success") {
            var data = result.data;
            if (data.length > 0) {
                res.end(JSON.stringify({
                    statu: "success",
                    msg: result.msg,
                    data: data
                }));
            } else {
                res.end(JSON.stringify({
                    statu: "success",
                    msg: result.msg,
                    data: data
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

// 获取最新评论
function newComments(req, res, next) {
    res.setHeader('content-type', 'application/json;charset=utf-8');
    req.setEncoding("utf8");

    var arg = url.parse(req.url, true).query;
    var id = arg.id;
    article.newComments({
        _id: id
    }, function (result) {
        if (result.statu == "success") {
            res.end(JSON.stringify({
                statu: "success",
                msg: result.msg,
                data: result.data
            }));
        } else {
            res.end(JSON.stringify({
                statu: "err",
                msg: result.msg
            }));
        }
    });
}

// 更新生活点击量
function updateClikNum(req, res, next) {
    res.setHeader('content-type', 'application/json;charset=utf-8');
    req.setEncoding("utf8");
    var arg = url.parse(req.url, true).query;
    var id = arg.id;
    article.updateClikNum({
        _id: id
    }, function (result) {
        if (result.statu == "success") {
            res.end(JSON.stringify({
                statu: "success",
                msg: result.msg,
            }));
        } else {
            res.end(JSON.stringify({
                statu: "err",
                msg: result.msg
            }));
        }
    });
}
// 通过id 获取相关数据
function getArticleById(req, res, next) {
    res.setHeader('content-type', 'application/json;charset=utf-8');
    req.setEncoding("utf8");
    var arg = url.parse(req.url, true).query;
    var id = arg.id;
    var options = {
        title: 1,
        author: 1,
        type: 1,
        time: 1,
        pageurl: 1,
        clicknum: 1,
        praise: 1,
        report: 1,
        pit: 1,
        comments: 1
    }
    article.getAllData(function (result) {
        if (result.statu == "success") {
            var data = result.data;
            var predata = {};
            var netdata = {};
            var i = 0;
            var pre = 0;
            var net = 0;
            async.whilst(
                function () {
                    return i < data.length;
                },
                function (whileCb) {
                    if (id == data[i]._id) {
                        if (i == 0 && data.length == 1) {
                            pre = 0;
                            net = 0;
                        } else if (i == 0 && data.length != 1) {
                            pre = 0;
                            net = i + 1
                        } else if (i > 0 && i < data.length - 1) {
                            pre = i - 1;
                            net = i + 1;
                        } else if (i == data.length - 1) {
                            pre = i - 1;
                            net = i;
                        }
                    }
                    i++;
                    whileCb();
                },
                function (err) {
                    article.getArticleById({
                        _id: id
                    }, options, function (result) {
                        if (result.statu == "success") {
                            predata = {
                                title: data[pre].title,
                                pageurl: data[pre].pageurl
                            }
                            netdata = {
                                title: data[net].title,
                                pageurl: data[net].pageurl
                            }
                            res.end(JSON.stringify({
                                statu: "success",
                                msg: result.msg,
                                data: {
                                    data: result.data[0],
                                    predata: predata,
                                    netdata: netdata
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
            )


        } else {
            res.end(JSON.stringify({
                statu: "err",
                msg: result.msg
            }));
        }
    });

}
// 通过id 获取数据
function getById(req, res, next) {
    res.setHeader('content-type', 'application/json;charset=utf-8');
    req.setEncoding("utf8");
    var arg = url.parse(req.url, true).query;
    var _id = arg._id;
    article.getArticleById({
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

// 发表评论
function submitComment(req, res, next) {
    res.setHeader('content-type', 'application/json;charset=utf-8');
    var postdata = '';
    req.setEncoding("utf8");
    req.addListener("data", function (postDataChunk) {
        postdata += postDataChunk;
    });
    req.addListener("end", function () {
        var userinfo = querystring.parse(postdata);
        var token = userinfo.token;
        redisClient.getRedis(token, function (result) {
            if (result.statu == "success") {
                var id = userinfo.id;
                delete userinfo.token;
                delete userinfo.id;
                userinfo.id = time.createTime();
                article.addCommentById({
                    _id: id
                }, userinfo, function (result) {
                    if (result.statu == "success") {
                        res.end(JSON.stringify({
                            statu: "success",
                            msg: result.msg
                        }));
                    } else {
                        res.end(JSON.stringify({
                            statu: "err",
                            msg: result.msg
                        }));
                    }
                });
            } else {
                res.end(JSON.stringify({
                    statu: "err",
                    msg: "账号状态错误！请重新登录。。。"
                }));
            }
        });
    })
}
// 用户点评
function userAct(req, res, next) {
    res.setHeader('content-type', 'application/json;charset=utf-8');
    var postdata = '';
    req.setEncoding("utf8");
    req.addListener("data", function (postDataChunk) {
        postdata += postDataChunk;
    });
    req.addListener("end", function () {
        var userinfo = querystring.parse(postdata);
        var id = userinfo.id;
        var act = userinfo.act;
        if (act == "praise") {
            article.userAct({
                _id: id
            }, {
                $inc: {
                    praise: 1
                }
            }, function (result) {
                res.end(JSON.stringify({
                    statu: result.statu,
                    msg: result.msg
                }));
            });
        } else if (act == "pit") {
            article.userAct({
                _id: id
            }, {
                $inc: {
                    pit: 1
                }
            }, function (result) {
                res.end(JSON.stringify({
                    statu: result.statu,
                    msg: result.msg
                }));
            });
        } else if (act == "report") {
            article.userAct({
                _id: id
            }, {
                $inc: {
                    report: 1
                }
            }, function (result) {
                res.end(JSON.stringify({
                    statu: result.statu,
                    msg: result.msg
                }));
            });
        }
    });
}

// 获取类型数据
function getTypeData(req, res, next) {
    res.setHeader('content-type', 'application/json;charset=utf-8');
    req.setEncoding("utf8");
    var arg = url.parse(req.url, true).query;
    var type = arg.type;
    article.getTypeData({
        type: type
    }, function (result) {
        if (result.statu == "success") {
            res.end(JSON.stringify({
                statu: "success",
                msg: result.msg,
                data: result.data
            }));
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

        article.update({
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

    var htmlurl = "../webroot/articlePages/"+id+".html";
    var imgurl = "../webroot/images/article/"+id+".png";

    article.remove({
        _id: id
    }, function (result) {
        console.log(result.statu + ":" + result.msg);
        if(result.statu=="success"){
            removefile.removeFile(htmlurl,function (statu) {
                if(statu=="success"){
                    removefile.removeFile(imgurl,function (statu) {
                        if(statu=="success"){
                            res.end(JSON.stringify({
                                statu: result.statu,
                                msg: result.msg
                            }));
                        }
                    });
                }
            });
        }else {
            res.end(JSON.stringify({
                statu: result.statu,
                msg: result.msg,
            }));
        }
    });
}





module.exports = {
    getData: getData,
    addArticle: addArticle,
    getEditUsers: getEditUsers,
    clickRank: clickRank,
    getNewArticle: getNewArticle,
    getHotArticle: getHotArticle,
    hotRank: hotRank,
    updateClikNum: updateClikNum,
    getArticleById: getArticleById,
    getById: getById,
    submitComment: submitComment,
    userAct: userAct,
    newComments: newComments,
    getTypeData: getTypeData,
    update: update,
    remove: remove
};