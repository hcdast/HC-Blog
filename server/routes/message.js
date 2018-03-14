var message = require("../controllers/index").Message;


module.exports = function (server) {

    server.post({
        path: '/api/message/initdata'
    }, message.initData); // 初始化数据

    server.post({
        path: '/api/message/publish'
    }, message.publish); // 用户留言
    server.post({
        path: '/api/message/reply'
    }, message.reply);   // 用户回复

};