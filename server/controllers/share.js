var share = require('./../models/index').Share;
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
    share.getData(data, function (result) {
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
                    page:pagedata,
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
// 添加分享
function addShare(req, res, next) {
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
                    userinfo.pageurl = "sharePages/" + userinfo._id + ".html";

                    var readpath = "../webroot/sharePages/model.html";
                    var writepath = "../webroot/sharePages/" + userinfo._id + ".html";
                    copyfile.copyFile(readpath, writepath, function (result) {
                        if (result.statu == "success") {
                            var path = "../webroot/images/share/" + userinfo._id + ".png";
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
                                    userinfo.imgurl = "images/share/" + userinfo._id + ".png";
                                    share.addShare(userinfo, function (result) {
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

// 获取分享初始化数据
function getInitData(req,res,next) {
    res.setHeader('content-type', 'application/json;charset=utf-8');
    req.setEncoding("utf8");

    var limit = 8;
    var data = {};
    async.parallel([
        function (callback) {
            share.getInitData({type:'0'},limit, function (result) {
                if (result.statu == "success") {
                    callback(null,result.data);
                } else {
                    callback(null,[]);
                }
            });
        },
        function (callback) {
            share.getInitData({type:"1"},limit, function (result) {
                if (result.statu == "success") {
                    callback(null,result.data);
                } else {
                    callback(null, []);
                }
            });
        },
        function (callback) {
            share.getInitData({type:'2'},limit, function (result) {
                if (result.statu == "success") {
                    callback(null,result.data);
                } else {
                    callback(null, []);
                }
            });
        },
        function (callback) {
            share.getInitData({type:'3'},limit, function (result) {
                if (result.statu == "success") {
                     callback(null,result.data);
                } else {
                    callback(null,[]);
                }
            });
        }
    ],
    function (err, results) {
        if(!err){
            data.book = results[0];
            data.person = results[1];
            data.movie = results[2];
            data.memory = results[3];

            res.end(JSON.stringify({
                statu: "success",
                msg: "数据获取成功",
                data : data
            }));
        }else{
            res.end(JSON.stringify({
                statu: "err",
                msg: "数据获取失败"
            }));
        }
    });


    
}


// 获取最新生活
function clickRank(req, res, next) {
    res.setHeader('content-type', 'application/json;charset=utf-8');
    req.setEncoding("utf8");

    share.clickRank(function (result) {
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

    share.hotRank(function (result) {
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
function newComments(req,res,next) {
    res.setHeader('content-type', 'application/json;charset=utf-8');
    req.setEncoding("utf8");

    var arg = url.parse(req.url, true).query;
    var id = arg.id;
    share.newComments({_id:id},function (result) {
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
    share.updateClikNum({_id:id},function (result) {
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
function getLifeById(req,res,next) {
    res.setHeader('content-type', 'application/json;charset=utf-8');
    req.setEncoding("utf8");
    var arg = url.parse(req.url, true).query;
    var id = arg.id;
    var options = {
        title:1,
        author:1,
        type:1,
        time:1,
        pageurl:1,
        clicknum:1,
        praise:1,
        report:1,
        pit:1,
        comments:1
    }
    share.getAllData(function (result) { 
        if(result.statu=="success"){
            var data = result.data;
            var predata={};
            var netdata={};
            var i=0;
            var pre = 0;
            var net = 0;
            async.whilst(
                function () {
                    return i < data.length;
                },
                function (whileCb) {
                    if(id==data[i]._id){
                        if(i==0&&data.length==1) {pre=0; net=0;}
                        else if(i==0&&data.length!=1){ pre=0; net=i+1 }
                        else if(i>0&&i<data.length-1) { pre = i-1; net = i+1; }
                        else if(i==data.length-1) { pre = i-1; net = i; }
                    }
                    i++;
                    whileCb();
                },
                function (err) {
                    share.getLifeById({_id:id},options, function (result) {
                        if (result.statu == "success") {
                            predata={ 
                                title: data[pre].title,
                                pageurl: data[pre].pageurl
                            }
                            netdata={ 
                                title: data[net].title,
                                pageurl: data[net].pageurl
                            }
                            res.end(JSON.stringify({
                                statu: "success",
                                msg: result.msg,
                                data:{  
                                    data : result.data[0],
                                    predata:predata,
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
           
            
        }else{
            res.end(JSON.stringify({
                statu: "err",
                msg: result.msg
            }));
        }
     });
    
}
// 发表评论
function submitComment(req,res,next) {
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
                share.addCommentById({_id:id},userinfo,function (result) {
                    if(result.statu=="success"){
                        res.end(JSON.stringify({
                            statu: "success",
                            msg: result.msg
                        }));
                    }else{
                        res.end(JSON.stringify({
                            statu: "err",
                            msg: result.msg
                        }));
                    }
                });
            }else{
                res.end(JSON.stringify({
                    statu: "err",
                    msg: "账号状态错误！请重新登录。。。"
                }));
            }
        });
    })
}
// 用户点评
function userAct(req,res,next) {
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
        if(act=="praise"){
            share.userAct({_id:id},{$inc:{praise:1}},function (result) { 
                res.end(JSON.stringify({
                    statu: result.statu,
                    msg: result.msg
                }));
            });
        }
        else if(act=="pit"){
            share.userAct({_id:id},{$inc:{pit:1}},function (result) { 
                res.end(JSON.stringify({
                    statu: result.statu,
                    msg: result.msg
                }));
            });
        }
        else if(act=="report"){
            share.userAct({_id:id},{$inc:{report:1}},function (result) { 
                res.end(JSON.stringify({
                    statu: result.statu,
                    msg: result.msg
                }));
            });
        }
    });
}
// 获取类型数据
function getTypeData(req,res,next) {
    res.setHeader('content-type', 'application/json;charset=utf-8');
    req.setEncoding("utf8");
    var arg = url.parse(req.url, true).query;
    var type = arg.type;
    share.getTypeData({type:type},function (result) {
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

        share.update({
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

    var htmlurl = "../webroot/sharePages/"+id+".html";
    var imgurl = "../webroot/images/share/"+id+".png";

    share.remove({
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
// 通过id 获取数据
function getById(req, res, next) {
    res.setHeader('content-type', 'application/json;charset=utf-8');
    req.setEncoding("utf8");
    var arg = url.parse(req.url, true).query;
    var _id = arg._id;
    share.getShareById({
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
    getData: getData,
    addShare: addShare,
    getEditUsers: getEditUsers,
    getInitData:getInitData,
    hotRank: hotRank,
    clickRank: clickRank,
    updateClikNum:updateClikNum,
    getLifeById:getLifeById,
    submitComment:submitComment,
    userAct:userAct,
    newComments:newComments,
    getTypeData:getTypeData,
    update:update,
    remove:remove,
    getById:getById
};