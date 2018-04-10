var Redis = require('ioredis');
var cluster = new Redis.Cluster(
    [   {   port: 7001, host: '10.46.228.29'},
        {   port: 7002, host: '10.46.228.29'},
        {   port: 7001, host: '10.46.228.29'},
        {   port: 7004, host: '10.80.230.26'},
        {   port: 7002, host: '10.80.230.26'},
        {   port: 7003, host: '10.80.230.26'}
    ],{ redisOptions: {
        password: '7898cbbe7db1d0b0a147501e1b41d85d'
    }});

    cluster.on('connect',function(){
        console.log("REDIS CONNECT");
    });
    cluster.on('error',function(err){
        console.log("REDIS CONNECT error "+ err);
    });

function setRedis(key,value,callback) {
    cluster.set(key,value,function (err,reps) {
        if(err){
            callback({statu:"err",msg:"redis保存错误"+err});
        }else{
            callback({statu:"success",msg:"redis保存成功",data:res.toString()});
        }
    });
}
function getRedis(key,callback) {
    cluster.get(key,function (err,res) {
        if(err){
            callback({statu:"err",msg:"redis查询错误"+err});
        }else{
            callback({statu:"success", msg:"redis查询成功", data:reply.toString()});
        }
    });
}


module.exports= {
    setRedis : setRedis,
    getRedis : getRedis
};