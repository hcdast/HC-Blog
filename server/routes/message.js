var message = require("../controllers/index").Message;
var user = require("../controllers/index").User;


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
    server.get({
        path: '/api/message/recentVisitors'
    }, user.recentVisitors);   // 最近访客
    server.get({
        path: '/api/message/getmessage'
    }, message.getMessage);   // 获取数据列表
    server.post({
        path: '/api/message/useract'
    }, message.userAct);   // 用户回复
    server.get({
        path: '/api/message/messageinfo'
    },message.getById);  // 获取类型数据

    server.post({
        path: '/api/message/update'
    },message.update);  // 修改数据

    server.get({
        path: '/api/message/remove'
    },message.remove);  // 删除数据

    server.get({
        path: '/api/message/removereply'
    },message.removeReply);  // 删除回复
};