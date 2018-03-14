var user = require('./../models/index').User;

var async = require('async'),
    md5 = require('MD5'),
    querystring = require('querystring'),
    redisClient = require('../models/redis'),
    fs = require('fs'),
    time= require("../tools/createTime");


//用户注册
function regist(req,res,next) {
    res.setHeader('content-type', 'application/json;charset=utf-8');
    var postdata='';
    req.setEncoding("utf8");
    req.addListener("data", function(postDataChunk) {
        postdata += postDataChunk;
    });
    req.addListener("end", function() {
        var userdata=querystring.parse(postdata);
        console.log(userdata);
        var data={
          $or :[{name: userdata.name},{email: userdata.email}]
        };
        user.getUser(data,function (result) {
            if(result.statu=="success"){
                if(result.userInfo.length>0){
                    res.setHeader('content-type', 'application/json;charset=utf-8');
                    res.end(JSON.stringify({statu:"err",data:"您已注册！请登录。。。"}));
                }else{
                    userdata._id=time.createTime();
                    var path = "../webroot/images/user/"+userdata._id+".png";
                    var base64 = (userdata.userImg).replace(/^data:image\/\w+;base64,/, "");
                    var dataBuffer = new Buffer(base64, 'base64');
                    fs.writeFile(path,dataBuffer,function(err){//用fs写入文件
                        if(err){
                            console.log("图片保存失败！："+err);
                            res.end(JSON.stringify({statu:"err",data:"图片保存失败"}));
                        }else{
                            console.log('写入成功！');

                            userdata.userImg= "images/user/"+userdata._id+".png";
                            user.userRegist(userdata,function (result) {
                                if(result.statu=="success"){
                                    res.setHeader('content-type', 'application/json;charset=utf-8');
                                    res.end(JSON.stringify({statu:"success",data:result.msg}));
                                }else{
                                    res.setHeader('content-type', 'application/json;charset=utf-8');
                                    res.end(JSON.stringify({statu:"err",data:result}));
                                }
                            });
                        }
                    })
                }
            }else{
                res.setHeader('content-type', 'application/json;charset=utf-8');
                res.end(JSON.stringify({statu:"err",data:"注册失败！请重试。。。"}));
            }
        });
    });
}
//用户登录
function login(req,res,next) {
    res.setHeader('content-type', 'application/json;charset=utf-8');
    var postdata='';
    req.setEncoding("utf8");
    req.addListener("data", function(postDataChunk) {
        postdata += postDataChunk;
    });
    req.addListener("end", function() {
        var userData=querystring.parse(postdata);
        var logindata={name:userData.name,password:userData.password};
        user.userLogin(logindata,function (result) {
            if(result.statu=="err"){
                res.end(JSON.stringify(result));
            }else{
                var data = {
                    name:result.userInfo.name,
                    ava: result.userInfo.ava,
                };
                var token = md5(result.userInfo._id);
                redisClient.setRedis(token,result.userInfo._id,function (reply){
                    if(reply.statu=="success"){
                        var userInfo={_id:result.userInfo._id,lastLoginTime:userData.loginTime};
                        user.lastLoginTime(userInfo,function (result) {
                            if(result.statu=="err"){
                                console.log(result.msg);
                                res.end(JSON.stringify({statu:"err",data:result}));
                            }else {
                                console.log(result.msg);
                                data.token=token;
                                res.end(JSON.stringify({statu:"success", data: data}));
                            }
                        });
                    }
                });
            }
        });
    });
}
//检测登录
function checkLogin(req,res,next) {
    res.setHeader('content-type', 'application/json;charset=utf-8');
    var postdata='';
    req.setEncoding("utf8");
    req.addListener("data", function(postDataChunk) {
        postdata += postDataChunk;
    });
    req.addListener("end", function() {
        var userData = querystring.parse(postdata);
         redisClient.getRedis(userData.token,function (result) {
             if(result.statu=="success"){
                 res.end(JSON.stringify({statu: "success"}));
            }else{
                 res.end(JSON.stringify({statu:"err"}));
            }
        });

    });
}

//qq登录
function qqlogin(req,res,next) {
    res.setHeader('content-type', 'application/json;charset=utf-8');

    var postdata='';
    req.setEncoding("utf8");
    req.addListener("data", function(postDataChunk) {
        postdata += postDataChunk;
    });
    req.addListener("end", function() {
        var userData = querystring.parse(postdata);
        console.log(userData);
        user.qqlogin(userData, function (result) {
            if (result.statu == "err") {
                res.end(JSON.stringify(result));
            } else {
                var userInfo={_id:result.userInfo._id,lastLoginTime:userData.loginTime};
                var token = md5(userInfo._id);
                console.log(token+":"+result.userInfo.name);
                redisClient.setRedis(token,userInfo._id,function (result) {
                    // console.log(result.msg)
                    if(result.statu=="err"){
                        console.log(result.msg);
                        res.end(JSON.stringify({statu: "err", data: result}));
                    }else {
                        user.lastLoginTime(userInfo, function (result) {
                            if (result.statu == "err") {
                                console.log(result.msg);
                                res.end(JSON.stringify({statu: "err", data: result}));
                            }
                            else {
                                console.log(result.msg);
                                // console.log("token"+token);
                                res.end(JSON.stringify({statu: "success", data: {token:token}}));
                            }
                        });
                    }
                });
            }
        });
    });
}

//退出登录
function exit(req,res,next) {
    res.setHeader('content-type', 'application/json;charset=utf-8');

    var postdata='';
    req.setEncoding("utf8");
    req.addListener("data", function(postDataChunk) {
        postdata += postDataChunk;
    });
    req.addListener("end", function() {
        var userData = querystring.parse(postdata);
        redisClient.getRedis(userData.token,function (result) {
            if(result.statu=="success"){
                redisClient.setRedis(userData.token,"",function (result) {
                    if(result.statu=="success"){
                        res.end(JSON.stringify({statu: "success", msg:"退出成功！"}));
                    }else{
                        res.end(JSON.stringify({statu: "err", msg:"退出失败！redis重置失败"}));
                    }
                })
            }else{
                res.end(JSON.stringify({statu: "err", msg:"退出失败！redis查询失败"}));
            }
        })

    });
}

module.exports = {
    regist: regist,
    login: login,
    qqlogin: qqlogin,
    checkLogin: checkLogin,
    exit: exit
};