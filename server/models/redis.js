//   redis 单例
var redis = require('redis'),
    RDS_PORT = 6379,        //端口号
    // RDS_PORT = 7001,        //端口号
    // RDS_HOST = '115.159.112.111',    //服务器IP
    // RDS_HOST = '10.105.48.221',    //服务器IP
    RDS_HOST = '127.0.0.1',    //服务器IP
    // RDS_PWD = '',
    // RDS_OPTS = {auth_pass:RDS_PWD},            //设置项
    client = redis.createClient(RDS_PORT,RDS_HOST /*, RDS_OPTS */);

// client.auth(RDS_PWD,function(){
//     console.log('redis通过认证');
// });


function redisClusterConn() {
    client.on('ready',function(res){
        console.log('redis连接成功');
    });

    client.on('close',function(res){
        console.log('redis关闭成功');
    });
}


function setRedis(key,value,callback) {
    client.set(key,value,function (err) {
        if(err){
            callback({statu:"err",msg:"redis保存错误"+err});
        }else{
            callback({statu:"success",msg:"redis保存成功"});
        }
    });
}
function getRedis(key,callback) {
    client.get(key,function (err,reply) {
        if(err){
            callback({statu:"err",msg:"redis查询错误"+err});
        }else if(reply!=""){
            callback({statu:"success", msg:"redis查询成功" , data:reply});
        }
    });
}



//   redis集群
//
// var Redis = require('ioredis');            //10.105.48.221       115.159.112.111
// var cluster = new Redis.Cluster(
//     [
//         {   port: 7001, host: '115.159.112.111'},
//         {   port: 7002, host: '115.159.112.111'},
//         {   port: 7003, host: '115.159.112.111'},
//         {   port: 7004, host: '115.159.112.111'},
//         {   port: 7005, host: '115.159.112.111'},
//         {   port: 7006, host: '115.159.112.111'}
//
//         // {   port: 7001, host: '10.105.48.221 '},
//         // {   port: 7002, host: '10.105.48.221 '},
//         // {   port: 7003, host: '10.105.48.221 '},
//         // {   port: 7004, host: '10.105.48.221 '},
//         // {   port: 7005, host: '10.105.48.221 '},
//         // {   port: 7006, host: '10.105.48.221 '}
//     ]
//     );
//
//     cluster.subscriber
//
// function redisClusterConn() {
//     cluster.on('connect',function(){
//         console.log("redis连接成功！");
//     });
//     cluster.on('error',function(err){
//         console.log("redis连接失败！ "+ err);
//     });
// }
//
// function setRedis(key,value,callback) {
//     // console.log(key+":"+value);
//     cluster.set("name","hc");
//     callback({statu:"success",msg:"redis保存成功"});
//
// }
// function getRedis(key,callback) {
//     cluster.get(key,function (err,res) {
//         console.log(res);
//         if(err){
//             callback({statu:"err",msg:"redis查询错误"+err});
//         }else{
//             callback({statu:"success", msg:"redis查询成功", data:res.toString()});
//         }
//     });
// }





module.exports= {
    redisClusterConn:redisClusterConn,
    setRedis : setRedis,
    getRedis : getRedis
};