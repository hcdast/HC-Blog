var mongoose = require('mongoose'),
    redis = require('redis'),
    md5 = require('MD5'),
    Schema = mongoose.Schema,
    db = require('./db').db;

//表
var MessageSchema = new Schema({
    _id: { type: String},
    username: {type :String},
    userava: { type: String},
    message: { type: String},
    time: { type: String },
    report: { type: Number,default:"0" },
    pit: {type: Number,default:"0"},
    praise: { type: Number,default:"0"},
    reply: [
        {
            username: { type: String},
            userava: { type: String},
            time: { type: String},
            message: { type: String}
        }
        ]
});

//创建模型（类似数据库的表）
db.model('message', MessageSchema);
//如果该Model已经发布，则可以直接通过名字索引到，如果没有发布，这段代码将会异常
var model = db.model('message');


//用户留言
var publish = function (data,callback) {
    // console.log(data)
    var newMessage = new model({
        _id:data._id,
        username:data.username,
        userava:data.userava,
        message: data.message,
        time: data.time,
        report: data.report,
        pit: data.pit,
        praise: data.praise,
        reply: []
    });
    newMessage.save(function (err) {
        if(err){
            console.log(err);
             callback({statu:"err",msg:"留言失败"});
        }else{
            callback({statu:"success",msg:"留言成功"});
        }
    });
};

//获取数据
var getData = function (data,callback) {
    var page=parseInt(data.page);
    model.find({},function (err,docs) {
       if(!err){
            if(docs.length>0){
                callback({statu:"success",msg:"获取数据成功！",data:docs});
            }else{
                callback({statu:"success",msg:"已经到底了。。。",data:docs});
            }
       }else{
           callback({statu:"err",msg:"获取留言数据失败 ！"});
       }
    }).sort({_id:-1}).skip(5*(page-1)).limit(5);
};

//查询数据
var getOneData = function (data,callback) {
    var messageId = data.messageId;
    model.find({_id:messageId},function (err,docs) {
        if(!err&&docs){
            callback({statu:"success",msg:"查询成功 ！",data:docs[0]});
        }else{
            callback({statu:"err",msg:"查询失败 ！"});
        }
    });
};

//更新数据
var updateData = function (opt,data,callback) {
    model.update({_id:opt.messageId},data,function (err) {
        console.log(err)
        if(!err){
            callback({statu:"success",msg:"更新成功 ！"});
        }else{
            callback({statu:"err",msg:"更新失败 ！"});
        }
    });
};

module.exports ={
    model:model,
    publish:publish,
    getData:getData,
    getOneData:getOneData,
    updateData:updateData
};