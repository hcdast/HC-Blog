var share = require("../controllers/index").Share;


module.exports = function (server) {
    server.get({
        path: '/api/share/getshare'
    },share.getData);  // 获取分享列表
    server.post({
        path: '/api/share/addshare'
    },share.addShare);  // 添加分享
    server.get({
        path: '/api/share/geteditusers'
    },share.getEditUsers);  // 获取编辑权限用户

    server.get({
        path: '/api/share/getinitdata'
    },share.getInitData);  // 获取分享初始数据

    server.get({
        path: '/api/share/itemclick'
    },share.updateClikNum);  // 更新生活点击量
    server.get({
        path: '/api/share/itemdata'
    },share.getLifeById);  // 获取当前页面数据
    server.get({
        path: '/api/share/clickRank'
    },share.clickRank);  // 获取文章点击排行
    server.get({
        path: '/api/share/hotRank'
    },share.hotRank);  // 获取栏目推荐文章
    server.get({
        path: '/api/share/newcomments'
    },share.newComments);  // 获取最新评论


    server.post({
        path: '/api/share/submitcomment'
    },share.submitComment);  // 发表评论
    server.post({
        path: '/api/share/useract'
    },share.userAct);  // 用户点评
    server.get({
        path: '/api/share/gettypedata'
    },share.getTypeData);  // 获取类型数据

    server.get({
        path: '/api/share/shareinfo'
    },share.getById);  // 获取类型数据
    server.post({
        path: '/api/share/update'
    },share.update);  // 修改数据

    server.get({
        path: '/api/share/remove'
    },share.remove);  // 删除数据
};