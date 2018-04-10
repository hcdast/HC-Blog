var life = require("../controllers/index").Life;


module.exports = function (server) {
    server.get({
        path: '/api/life/getlife'
    },life.getData);  // 获取生活列表
    server.post({
        path: '/api/life/addlife'
    },life.addLife);  // 添加生活
    server.get({
        path: '/api/life/geteditusers'
    },life.getEditUsers);  // 获取编辑用户
    
    server.get({
        path: '/api/life/clickRank'
    },life.clickRank);  // 获取文章点击排行
    server.get({
        path: '/api/life/hotRank'
    },life.hotRank);  // 获取栏目推荐文章
    server.get({
        path: '/api/life/newcomments'
    },life.newComments);  // 获取最新评论
    server.get({
        path: '/api/life/itemclick'
    },life.updateClikNum);  // 更新生活点击量
    server.get({
        path: '/api/life/itemdata'
    },life.getLifeById);  // 获取当前页面数据
    server.post({
        path: '/api/life/submitcomment'
    },life.submitComment);  // 发表评论
    server.post({
        path: '/api/life/useract'
    },life.userAct);  // 用户点评
    server.get({
        path: '/api/life/gettypedata'
    },life.getTypeData);  // 获取类型数据

    server.get({
        path: '/api/life/lifeinfo'
    },life.getById);  // 获取类型数据
    server.post({
        path: '/api/life/update'
    },life.update);  // 修改数据

    server.get({
        path: '/api/life/remove'
    },life.remove);  // 删除数据
};