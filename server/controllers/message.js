var message = require('./../models/index').Message;
var user = require('./../models/index').User;

var async = require('async'),
    md5 = require('MD5'),
    querystring = require('querystring'),
    redisClient = require('../models/redis'),
    fs = require('fs'),
    url = require('url'),
    time= require("../tools/createTime");

// 发表评论
function publish(req,res,next) {
    res.setHeader('content-type', 'application/json;charset=utf-8');
    var postdata='';
    req.setEncoding("utf8");
    req.addListener("data", function(postDataChunk) {
        postdata += postDataChunk;
    });
    req.addListener("end", function() {
        var userinfo = querystring.parse(postdata);
        var token = userinfo.token;
        redisClient.getRedis(token,function (result) {

            if(result.statu=="success"){
                var userId= result.data;
                user.getUser({_id: userId},function (result) {

                    if(result.statu=="success"&&result.userInfo.length>0){
                        var userdata= result.userInfo[0];
                        var data={
                            _id: time.createTime(),
                            username: userdata.name,
                            userava: userdata.ava,
                            message: userinfo.message,
                            time: userinfo.time,
                            report: 0,
                            pit: 0,
                            praise: 0,
                            reply: []
                        };
                        message.publish(data,function (result) {
                            console.log(result.msg);
                            if(result.statu=="success"){
                                message.getData({page:1},function (result) {
                                    res.end(JSON.stringify({statu:"success",data:result.data[0]}));
                                });
                            }else{
                                res.end(JSON.stringify({statu:"err",data:result.msg}));
                            }
                        })
                    }
                });
            }else{
                res.end(JSON.stringify({statu:"err",msg:"账号状态错误！请重新登录。。。"}));
            }
        })


    });
}
function reply(req,res,next) {
    res.setHeader('content-type', 'application/json;charset=utf-8');
    var postdata='';
    req.setEncoding("utf8");
    req.addListener("data", function(postDataChunk) {
        postdata += postDataChunk;
    });
    req.addListener("end", function() {
        var userinfo = querystring.parse(postdata);
        var token = userinfo.token;
        var messageId = userinfo.messageId;
        redisClient.getRedis(token, function (result) {
            if (result.statu == "success") {
                var userId = result.data;
                user.getUser({_id: userId}, function (result) {
                    if (result.statu == "success" && result.userInfo.length > 0) {
                        var userdata = result.userInfo[0];
                        var data={
                            username: userdata.name,
                            userava: userdata.ava,
                            message: userinfo.message,
                            time: userinfo.time
                        };
                        var conditions = {messageId:messageId};
                        message.getOneData(conditions,function (result) {
                         if(result.statu=="success"){
                            var messageData = result.data;
                            messageData.reply.push(data);
                            message.updateData(conditions,messageData,function (result) {
                                if(result.statu=="success"){
                                    res.end(JSON.stringify({statu:"success",msg:"回复成功！",data:data}));
                                }else{
                                    res.end(JSON.stringify({statu:"err",msg:"回复失败1！"}));
                                }
                            });
                        }else{
                            res.end(JSON.stringify({statu:"err",msg:"回复失败2！"}));
                        }
                    });
                    }
                });
            }
        });
    });
}

// 获取初始化数据
function initData(req,res,next) {
    res.setHeader('content-type', 'application/json;charset=utf-8');
    var postdata='';
    req.setEncoding("utf8");
    req.addListener("data", function(postDataChunk) {
        postdata += postDataChunk;
    });
    req.addListener("end", function() {
        var messageinfo = querystring.parse(postdata);
        var data={ page: messageinfo.page, limit:5 };
        message.getData(data,function (result) {
            if(result.statu=="success"){
                if(result.data.length>0){
                    res.end(JSON.stringify({statu:"success",msg:result.msg,data:result.data}));
                }else{
                    res.end(JSON.stringify({statu:"success",msg:result.msg,data:result.data}));
                }
            }else{
                res.end(JSON.stringify({statu:"err",msg:result.msg}));
            }
        });




    });
}
// 获取留言数据
function getMessage(req,res,next) {
    res.setHeader('content-type', 'application/json;charset=utf-8');
    req.setEncoding("utf8");
    
    var arg= url.parse(req.url,true).query;
    var page = arg.page;
    var limit = 10;
    var data = {page:page,limit:limit }
    message.getData(data,function (result) {
        if(result.statu=="success"){
            if(result.data.length>0){
                var data = result.data;
                var pagedata = {
                    nowpage: parseInt(page),
                    allpage: parseInt(data.length / 10) + 1,
                    alldata: data.length
                };
                res.end(JSON.stringify({ statu: "success", msg: result.msg,page:pagedata, data: result.data }));
            }else{
                res.end(JSON.stringify({statu:"success",msg:result.msg,data:result.data}));
            }
        }else{
            res.end(JSON.stringify({statu:"err",msg:result.msg}));
        }
    });
}
// 用户操作
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
            message.userAct({_id:id},{$inc:{praise:1}},function (result) { 
                res.end(JSON.stringify({
                    statu: result.statu,
                    msg: result.msg
                }));
            });
        }
        else if(act=="pit"){
            message.userAct({_id:id},{$inc:{pit:1}},function (result) { 
                res.end(JSON.stringify({
                    statu: result.statu,
                    msg: result.msg
                }));
            });
        }
        else if(act=="report"){
            message.userAct({_id:id},{$inc:{report:1}},function (result) { 
                res.end(JSON.stringify({
                    statu: result.statu,
                    msg: result.msg
                }));
            });
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

        message.update({
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

    message.remove({
        _id: id
    }, function (result) {
        console.log(result.statu + ":" + result.msg);
        res.end(JSON.stringify({
            statu: result.statu,
            msg: result.msg,
        }));
    });
}
// 删除回复
function removeReply(req,res,next) {
    res.setHeader('content-type', 'application/json;charset=utf-8');
    req.setEncoding("utf8");
    var arg = url.parse(req.url, true).query;
    var mid = arg.mid;
    var rid = arg.rid;

    message.removeReply({
        mid: mid,rid: rid
    }, function (result) {
        console.log(result.statu + ":" + result.msg);
        res.end(JSON.stringify({
            statu: result.statu,
            msg: result.msg,
        }));
    });

}


// 通过id 获取数据
function getById(req, res, next) {
    res.setHeader('content-type', 'application/json;charset=utf-8');
    req.setEncoding("utf8");
    var arg = url.parse(req.url, true).query;
    var _id = arg._id;
    message.getMessageById({
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
    publish: publish,
    initData:initData,
    reply:reply,
    getMessage:getMessage,
    userAct:userAct,
    update:update,
    remove:remove,
    removeReply:removeReply,
    getById:getById
 
};