var mongoose = require('mongoose'),
    redis = require('redis'),
    md5 = require('MD5'),
    Schema = mongoose.Schema,
    db = require('./db').db,
    time= require("../tools/createTime");

//表
var ShareSchema = new Schema({
    _id: { type: String},
    title: { type: String },
    content: { type: String, },
    type: {type: String},  //（0:书、1:人 、2:电影、3:记忆）
    author: { type: String }, 
    imgurl: { type: String },
    pageurl: {type: String },
    time: { type:String },
    clicknum: { type: Number,default:0 },
    comments: [
        {
            id: {type: String},
            username: { type: String},
            userava: { type: String},
            time: { type: String},
            message: { type: String}
        }
        ],
    pit: { type: Number,default:0 },
    praise:{ type: Number, default: 0 },
    report:{ type: Number, default: 0 }
});
//创建模型（类似数据库的表）
db.model('share', ShareSchema);
//如果该Model已经发布，则可以直接通过名字索引到，如果没有发布，这段代码将会异常
var model = db.model('share');

// 获取全部数据
var getAllData = function (callback){
    model.find({},function (err,docs) {
        if(!err){
             if(docs.length>0){
                 callback({statu:"success",msg:"获取数据成功！",data:docs});
             }else{
                 callback({statu:"success",msg:"暂无数据",data:docs});
             }
        }else{
            callback({statu:"err",msg:"获取全部数据失败 ！"});
        }
     });
}

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
           callback({statu:"err",msg:"获取文章数据失败 ！"});
       }
    }).sort({_id:-1}).skip(page*limit).limit(limit);
};
// 添加分享
var addShare = function (data,callback) { 
    var newShare = new model({
        _id:data._id,
        author:data.author,
        type:data.type,
        title: data.title,
        content: data.content,
        time: data.time,
        imgurl: data.imgurl,
        pageurl: data.pageurl,
        reply: []
    });
    newShare.save(function (err) {
        if(err){
            console.log(err);
             callback({statu:"err",msg:"分享失败"});
        }else{
            callback({statu:"success",msg:"分享成功"});
        }
    });
}
// 获取博主分享个数
var getShareCountByName = function(data,callback) {
    model.count(data,function (err,count) {
        if(!err){
             if(count>0){
                 callback({statu:"success",msg:"获取数据成功！",count:count});
             }else{
                 callback({statu:"success",msg:"暂无数据。。。",count:0});
             }
        }else{
            callback({statu:"err",msg:"获取博主分享数据失败 ！"});
        }
     });
}
// 获取分享初始化数据
var  getInitData = function (data ,limit, callback) {
    model.find(data,function (err,docs) {
       if(!err){
            if(docs.length>0){
                callback({statu:"success",msg:"获取数据成功！",data:docs});
            }else{
                callback({statu:"success",msg:"暂无数据",data:docs});
            }
       }else{
           callback({statu:"err",msg:"获取数据失败 ！"});
       }
    }).sort({_id:-1}).limit(limit);
}
// 点击排行
var clickRank =  function (callback) {
    model.find({},{title:1,pageurl:1},function (err,docs) {
        if(!err){
             if(docs.length>0){
                 callback({statu:"success",msg:"获取数据成功！",data:docs});
             }else{
                 callback({statu:"success",msg:"已经到底了。。。",data:docs});
             }
        }else{
            callback({statu:"err",msg:"获取文章数据失败 ！"});
        }
     }).sort({clicknum:-1}).limit(10);
}
// 栏目推荐
var hotRank = function (callback){
    model.find({},{title:1,pageurl:1},function (err,docs) {
        if(!err){
             if(docs.length>0){
                 callback({statu:"success",msg:"获取数据成功！",data:docs});
             }else{
                 callback({statu:"success",msg:"已经到底了。。。",data:docs});
             }
        }else{
            callback({statu:"err",msg:"获取文章数据失败 ！"});
        }
     }).sort({clicknum:-1,praise:-1,comments:-1}).limit(10);
}
// 最新评论
var newComments =  function (data,callback) {
    model.find(data,{comments:1},function (err,doc) { 
        if(!err){
            if(doc.length>0){
                var comments = doc[0].comments;
                var data = [];
                if(comments.length>5)
                    data= comments.slice(comments.length-5,comments.length)
                else data = comments;
                callback({statu:"success",msg:"获取数据成功",data:data});
            }
            else{
                callback({statu:"success",msg:"暂无数据",data:[]});
            }
            
       }else{
           callback({statu:"err",msg:"获取数据失败 ！"});
       }
    });
} 
// 更新点击量
var updateClikNum = function (data,callback){
    model.update(data,{$inc:{ clicknum: 1 }},function (err) {
        if(!err){
            callback({statu:"success",msg:"更新点击量成功！"});
        }else{
            callback({statu:"err",msg:"更新点击量失败 ！"});
        }
     });
}
// 通过id查找数据
var getLifeById = function (data,options,callback) {
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
// 通过id 添加评论
var addCommentById = function(data,options,callback){
    model.update(data, {
        $push:{
            comments: options
        }
    }, (err) => {
        //update操作完之后的回调函数
        if(!err){
            callback({statu:"success",msg:"添加评论成功！"});
        }else{
            callback({statu:"err",msg:"添加评论失败！"});
        }
    });
}
// 用户点评
var userAct = function (data,options,callback) {  
    model.update(data,options,(err)=>{
        if(!err){
            callback({statu:"success",msg:"操作成功！"});
        }else{
            callback({statu:"err",msg:"操作失败！"});
        }
    });
}
// 获取类型数据
function getTypeData(data,callback) {
    model.find(data,function (err,docs) { 
        if(!err){
            if(docs.length>0){
                callback({statu:"success",msg:"获取数据成功！",data:docs});
            }else{
                callback({statu:"success",msg:"没有查到数据",data:docs});
            }
       }else{
           callback({statu:"err",msg:"获取数据失败 ！"});
       }
    });
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
var getShareById = function (data,options,callback) {
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
    getData: getData,
    addShare: addShare,
    getShareCountByName:getShareCountByName,
    getInitData:getInitData,
    clickRank:clickRank,
    hotRank: hotRank,
    updateClikNum:updateClikNum,
    getLifeById:getLifeById,
    getAllData:getAllData,
    addCommentById:addCommentById,
    userAct:userAct,
    newComments:newComments,
    getTypeData:getTypeData,
    update:update,
    remove:remove,
    getShareById:getShareById
};