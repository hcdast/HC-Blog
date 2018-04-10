var mongoose = require('mongoose'),
    redis = require('redis'),
    md5 = require('MD5'),
    Schema = mongoose.Schema,
    db = require('./db').db,
    time= require("../tools/createTime");

//表
var UserSchema = new Schema({
    _id: { type: String},
    name: { type: String },
    password: { type: String,default:"123456" },
    ava: {type: String},
    phone: { type: String },
    email: { type: String },
    type: { type: String, default: "4" },
    registTime: { type: String },
    lastLoginTime: { type: String },
    loginAcount:{ type: String, default: "blog" }
});

//创建模型（类似数据库的表）
db.model('user', UserSchema);
//如果该Model已经发布，则可以直接通过名字索引到，如果没有发布，这段代码将会异常
var model = db.model('user');

//方法
//用户注册
var userRegist = function (userInfo,callback) {
    var newUser = new model({
        _id:userInfo._id,
        name:userInfo.name,
        password:userInfo.password,
        ava: userInfo.userImg,
        phone: userInfo.phone,
        email: userInfo.email,
        isAdmin: userInfo.isAdmin,
        registTime: userInfo.registTime,
        lastLoginTime: userInfo.lastLoginTime
    });
    newUser.save(function (err) {
        if(err){
            // console.log(err);
            callback({statu:"err",msg:"注册失败"});
        }else{
            callback({statu:"success",msg:"注册成功"});
        }
    });

};
//用户登录
var userLogin = function (userInfo,callback) {
    // console.log(userInfo);
    model.find(userInfo, function(err, docs) {
        if(err||docs.length==0){
            console.log("login error:"+docs.length);
            callback({statu:'err',msg:"登录出错，请确认您的登录信息！"});
        }else {
            callback({statu:"success",msg:"登录成功！",userInfo:docs[0]});
        }
    });
};
//qq登录
var qqLogin = function (userInfo,callback) {
    var userdata={name:userInfo.nickname,loginAcount : userInfo.loginAcount};
    model.find(userdata, function(err, docs) {
        var registTime=userInfo.loginTime;
        var lastLoginTime = userInfo.loginTime;
        var nickname = userInfo.nickname;
        var createTime = time.createTime();
        var ava= userInfo.userava;
        if(err){
            console.log("login error:"+err);
            callback({statu:'err',msg:"登录出错，请确认您的登录信息！"});
        }else if(docs.length==0){
            var userinfo={
                _id:createTime,
                name:nickname,
                password:"123456",
                ava:ava,
                phone:"",
                email:"",
                isAdmin:false,
                registTime: registTime,
                lastLoginTime: lastLoginTime,
                loginAcount: "qq"
            };
            var newUser = new model(userinfo);
            newUser.save(function (err){
              if(err){
                  callback({statu:"err",msg:"登录失败！"});
              }else{
                  callback({statu:"success",msg:"登录成功！",userInfo:userinfo});
              }
            });
        } else {
            callback({statu:"success",msg:"登录成功！",userInfo:docs[0]});
        }
    });
};
//记录用户最后一次登录
var lastLoginTime = function (userInfo, callback) {
    model.update({_id:userInfo._id},{lastLoginTime:userInfo.lastLoginTime},function (error) {
        if(error){
            console.log("loginLastTime error"+error);
            callback({statu:"err",msg:"用户登录时间更新失败！"})
        }else{
            callback({statu:"success",msg:"用户登录时间更新成功！"});
        }

    });
};
//查找用户
var getUser = function (data,callback) {
    model.find(data, function(err, docs) {
        if(err){
            // console.log("login error:"+docs.length);
            callback({statu:'err',msg:"查找出错，请确认您的查找信息！"});
        }else {
            callback({statu:"success",msg:"查找成功！",userInfo:docs});
        }
    });
};
//最近访客
var recentVisitors = function (callback) {
    model.find({},['name','ava','loginAcount'], function(err, docs) {
        if(err){
             callback({statu:'err',msg:"查找出错，请确认您的查找信息！"});
        }else {
            callback({statu:"success",msg:"查找成功！",data:docs});
        }
    }).sort({lastLoginTime:-1}).limit(12);
};
//用户列表数据
var getData = function (data,callback) {
    var page = parseInt(data.page)-1;
    var limit = data.limit;
    model.find({},function (err,docs) {
       if(!err){
            if(docs.length>0){
                callback({statu:"success",msg:"获取数据成功！",data:docs});
            }else{
                callback({statu:"success",msg:"已经到底了。。。",data:docs});
            }
       }else{
           callback({statu:"err",msg:"获取用户数据失败 ！"});
       }
    }).sort({_id:-1}).skip(page*limit).limit(limit);
};
// 查询编辑人员
function getEditUsers(data,callback) {
    model.find(data,{name:1}, function(err, docs) {
        if(err){
             callback({statu:'err',msg:"加载编辑权限用户信息出错！"});
        }else {
            callback({statu:"success",msg:"加载编辑权限用户信息成功！",data:docs});
        }
    });
}
// 获取博主用户
function getBlogger(option,data,callback) {
    var page = parseInt(data.page)-1;
    var limit = data.limit;
    model.find(option,function (err,docs) {
       if(!err){
            if(docs.length>0){
                callback({statu:"success",msg:"获取数据成功！",data:docs});
            }else{
                callback({statu:"success",msg:"已经到底了。。。",data:docs});
            }
       }else{
           callback({statu:"err",msg:"获取用户数据失败 ！"});
       }
    }).sort({_id:-1}).skip(page*limit).limit(limit);
}
// 修改数据
function update(options,data,callback) {
    model.update(options,data,function (err) {
        if(!err){
            callback({statu:"success",msg:"修改数据成功！"});

        }else{
            callback({statu:"err",msg:"修改数据失败 ！"});
        }
    });
}
// 删除数据
function remove(options,callback) {
    model.remove(options,function (err) { 
        if(!err){
            callback({statu:"success",msg:"删除数据成功！"});
        }else{
            callback({statu:"err",msg:"删除数据失败 ！"});
        }
     });
}
// 通过id查找数据
var getUserById = function (data,options,callback) {
    model.find(data,options,function (err,doc) { 
        if(!err){
            if(doc.length>0){
                callback({statu:"success",msg:"获取数据成功！",data:doc});
            }else{
                callback({statu:"success",msg:"没有查到数据",data:doc});
            }
       }else{
           callback({statu:"err",msg:"获取文章数据失败 ！"});
       }
    });
}


module.exports ={
    model:model,
    userLogin:userLogin,
    userRegist:userRegist,
    lastLoginTime:lastLoginTime,
    qqlogin:qqLogin,
    getUser:getUser,
    recentVisitors:recentVisitors,
    getData:getData,
    getEditUsers:getEditUsers,
    getBlogger:getBlogger,
    update:update,
    remove:remove,
    getUserById:getUserById
};