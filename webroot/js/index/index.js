var articleType = ["政治知事", "国防军事", "经济论坛", "文化先锋", "科学探索", "体育中心"];

// 主页面初始化数据
function initIndexData() {
    $.ajax({
        type: "get",
        url: "/api/article/getarticle",
        dataType: "json",
        data:{page:1},
        error: function () {
            toastr.err("文章数据获取失败！","错误");
        },
        success: function (result) {
            if(result.statu=="success"){
                if(result.data.length>0){
                    showIndex(result.data);
                    pageInit(result.page);
                }
            }else{
                toastr.err(result.msg,"错误");
            }

        }
    });
}
// 显示数据
function showIndex(data) {
    var bloglist = $(".bloglist");
    bloglist.html("");
    for(var i in data){
        var time = data[i].time.slice(0,11);
        bloglist.append("<div class='blogs'>"+
        "<h3>"+
          "<a href='"+data[i].pageurl+"'>"+data[i].title+"</a>"+
        "</h3>"+
        "<figure>"+
          "<img src='"+data[i].imgurl+"'>"+
        "</figure>"+
        "<ul>"+
          "<p>"+data[i].content+"</p>"+
          "<a href='"+data[i].pageurl+"' target='_blank' class='readmore'>阅读全文&gt;&gt;</a>"+
        "</ul>"+
        "<p class='autor'>"+
          "<span>作者："+data[i].author+"</span>"+
          "<span>分类：【"+
            "<a href='"+data[i].pageurl+"'>"+articleType[parseInt(data[i].type)]+"</a>】</span>"+
          "<span>浏览（"+
            "<a href='"+data[i].pageurl+"'>"+data[i].clicknum+"</a>）</span>"+
          "<span>评论（"+
            "<a href='"+data[i].pageurl+"'>"+data[i].comments.length+"</a>）</span>"+
          "<span>点赞（"+
            "<a href='"+data[i].pageurl+"'>"+data[i].praise+"</a>）</span>"+
        "</p>"+
        "<div class='dateview'>"+time+"</div>"+
      "</div>");
    }
}

// 最新文章
function newArticle() {
    $.ajax({
        type: "get",
        url: "/api/article/getnewarticle",
        dataType: "json",
        // data:{page:1},
        error: function () {
            toastr.err("最新数据获取失败！","错误");
        },
        success: function (result) {
            if(result.statu=="success"){
                if(result.data.length>0){
                     var data = result.data;
                     var newArticleList = $(".tj_news .new");
                     for(var i in data){
                         newArticleList.append("<li>"+
                         "<a href='"+data[i].pageurl+"'>"+data[i].title+"</a>"+
                       "</li>");
                     }
                }
            }else{
                toastr.err(result.msg,"错误");
            }

        }
    });
}


// 推荐文章
function hotArticle() {
    $.ajax({
        type: "get",
        url: "/api/article/gethotarticle",
        dataType: "json",
        // data:{page:1},
        error: function () {
            toastr.err("留言数据获取失败！","错误");
        },
        success: function (result) {
            if(result.statu=="success"){
                if(result.data.length>0){
                    var data = result.data;
                    var hotArticleList = $(".tj_news .hot");
                    for(var i in data){
                        hotArticleList.append("<li>"+
                        "<a href='"+data[i].pageurl+"'>"+data[i].title+"</a>"+
                      "</li>");
                    }
                }
            }else{
                toastr.err(result.msg,"错误");
            }

        }
    });
}
// 分页跳转
function goPage(obj) {
    var page = $(obj).attr("name");
    $.ajax({
        type: "get",
        url: "/api/article/getarticle",
        dataType: "json",
        data:{page:parseInt(page)},
        error: function () {
            toastr.err("文章数据获取失败！","错误");
        },
        success: function (result) {
            if(result.statu=="success"){
                if(result.data.length>0){
                    showIndex(result.data);

                    $(".pagelist a").removeClass('on');
                    $(obj).addClass("on");
                }
            }else{
                toastr.err(result.msg,"错误");
            }

        }
    });
}
