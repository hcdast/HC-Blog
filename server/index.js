var restify = require('restify');
var redisClusterClient = require('./models/redis');
var mongodbClient = require('./models/db');


var router  = require('./routes');


var server = restify.createServer();

router(server);

server.listen(8000,'127.0.0.1',function () {
    console.log("服务器已开启：127.0.0.1:8000正在监听。。。");
    redisClusterClient.redisClusterConn();
    mongodbClient.mongodbConn();
});