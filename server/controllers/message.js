var message = require('./../models/index').Message;
var user = require('./../models/index').User;

var async = require('async'),
    md5 = require('MD5'),
    querystring = require('querystring'),
    redisClient = require('../models/redis'),
    fs = require('fs'),
    time= require("../tools/createTime");


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
                                    res.end(JSON.stringify({statu:"success",msg:"回复成功！",data:messageData}));
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
        var data={ page: messageinfo.page};
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



module.exports = {
    publish: publish,
    initData:initData,
    reply:reply
    // login: login,
    // qqlogin: qqlogin,
    // checkLogin: checkLogin,
    // exit: exit
};