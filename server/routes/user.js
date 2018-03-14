var user = require("../controllers/index").User;


module.exports = function (server) {

    server.post({
        path: '/api/index/login'
    }, user.login); // blog登录
    server.post({
        path: '/api/index/qqlogin'
    }, user.qqlogin); // qq登录
    server.post({
        path:'/api/index/checkLogin'
    },user.checkLogin);
    server.post({
        path: '/api/index/regist'
    },user.regist);  // 用户注册
    server.post({
        path: '/api/index/exit'
    },user.exit);  // 用户注册

};