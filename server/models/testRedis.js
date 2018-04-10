var redis = require('redis'),
    // RDS_PORT = 6379,        //端口号
    RDS_PORT = 7005,        //端口号
    RDS_HOST = '115.159.112.111',    //服务器IP
    // RDS_HOST = '10.105.48.221',    //服务器IP
    // RDS_PWD = '',
    // RDS_OPTS = {auth_pass:RDS_PWD},            //设置项
    client = redis.createClient(RDS_PORT,RDS_HOST /*, RDS_OPTS */);

    // client.auth(RDS_PWD,function(){
    //     console.log('redis通过认证');
    // });
    client.on('ready',function(res){
        console.log('redis连接成功');

        setRedis("name","hc",function (res) {
            console.log("success");
        });

        getRedis("name",function (res) {
            console.log(res.data)
        })
    });

    client.on('close',function(res){
        console.log('redis关闭成功');
    });

    function setRedis(key,value,callback) {
        client.set(key,value,function (err,reply) {
            if(err){
                callback({statu:"err",msg:"redis保存错误"+err});
            }else{
                callback({statu:"success",msg:"redis保存成功",data:reply.toString()});
            }
        });
    }
    function getRedis(key,callback) {
        client.get(key,function (err,reply) {
            if(err){
                callback({statu:"err",msg:"redis查询错误"+err});
            }else{
                callback({statu:"success", msg:"redis查询成功", data:reply.toString()});
            }
        });
    }