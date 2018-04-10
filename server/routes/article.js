var article = require("../controllers/index").Article;
 

module.exports = function (server) {
    server.get({
        path: '/api/article/getarticle'
    },article.getData);  // 获取文章列表
    server.post({
        path: '/api/article/addarticle'
    },article.addArticle);  // 添加文章
    server.get({
        path: '/api/article/geteditusers'
    },article.getEditUsers);  // 获取编辑权限用户
    server.get({
        path: '/api/article/getnewarticle'
    },article.getNewArticle);  // 获取最新文章
    server.get({
        path: '/api/article/gethotarticle'
    },article.getHotArticle);  // 获取最热文章

    server.get({
        path: '/api/article/clickRank'
    },article.clickRank);  // 获取文章点击排行
    server.get({
        path: '/api/article/hotRank'
    },article.hotRank);  // 获取栏目推荐文章

    server.get({
        path: '/api/article/newcomments'
    },article.newComments);  // 获取最新评论

    server.get({
        path: '/api/article/itemclick'
    },article.updateClikNum);  // 更新文章点击量
    server.get({
        path: '/api/article/itemdata'
    },article.getArticleById);  // 获取当前页面数据
    server.post({
        path: '/api/article/submitcomment'
    },article.submitComment);  // 发表评论
    server.post({
        path: '/api/article/useract'
    },article.userAct);  // 用户点评

    server.get({
        path: '/api/article/gettypedata'
    },article.getTypeData);  // 获取类型数据

    server.get({
        path: '/api/article/articleinfo'
    },article.getById);  // 获取类型数据

    server.post({
        path: '/api/article/update'
    },article.update);  // 修改数据

    server.get({
        path: '/api/article/remove'
    },article.remove);  // 删除数据

};