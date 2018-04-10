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
    },user.exit);  // 用户退出
    server.get({
        path: '/api/user/getusers'
    },user.getUsers);  // 获取用户列表
    server.post({
        path: '/api/user/adduser'
    },user.addUser);  // 添加用户
    server.get({
        path: '/api/user/getblogger'
    },user.getBlogger);  // 获取博主用户

    server.get({
        path: '/api/users/usersinfo'
    },user.getById);  // 获取类型数据
    
    server.post({
        path: '/api/user/update'
    },user.update);  // 修改数据

    server.get({
        path: '/api/user/remove'
    },user.remove);  // 删除数据

};