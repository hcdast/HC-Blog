var lifeType = ["爱情导语", "技术学习", "心灵鸡汤", "百味人生", "娱乐吐槽"];


// 主页面初始化数据
function initLifeData() {
    $.ajax({
        type: "get",
        url: "/api/life/getlife",
        dataType: "json",
        data:{page:1},
        error: function () {
            toastr.err("生活数据获取失败！","错误");
        },
        success: function (result) {
            if(result.statu=="success"){
                if(result.data.length>0){
                    showLife(result.data);
                    pageInit(result.page);
                }
            }else{
                toastr.err(result.msg,"错误");
            }

        }
    });
}
// 显示数据
function showLife(data) {
    var bloglist = $(".bloglist");
    bloglist.html("");
    for(var i in data){
        bloglist.append("<div class='newblog'>"+
        "<ul>"+
        "<h3>"+
          "<a href='"+data[i].pageurl+"'>"+data[i].title+"</a>"+
        "</h3>"+
        "<div class='autor'>"+
          "<span>作者："+data[i].author+"</span>"+
          "<span>分类：["+
            "<a href='"+data[i].pageurl+"'>"+lifeType[parseInt(data[i].type)]+"</a>]</span>"+
          "<span>浏览（"+
            "<a href='"+data[i].pageurl+"'>"+data[i].clicknum+"</a>）</span>"+
          "<span>评论（"+
            "<a href='"+data[i].pageurl+"'>"+data[i].comments.length+"</a>）</span>"+
          "<span>点赞（"+
            "<a href='"+data[i].pageurl+"'>"+data[i].praise+"</a>）</span>"+
        "</div>"+
        "<p>"+data[i].content+"<a href='"+data[i].pageurl+"' name='"+data[i]._id+"'  onclick='itemClick(this)' target='_blank' class='readmore'>全文</a></p>"+
        "</ul>"+
        "<figure>"+
          "<img src='"+data[i].imgurl+"'>"+
        "</figure>"+
        "<div class='dateview'>"+data[i].time.slice(0,11)+"</div>"+
      "</div>");
    }
}

// 点击排行
function clickRank() {
    $.ajax({
        type: "get",
        url: "/api/life/clickRank",
        dataType: "json",
        error: function () {
            toastr.err("最新数据获取失败！","错误");
        },
        success: function (result) {
            if(result.statu=="success"){
                if(result.data.length>0){
                     var data = result.data;
                     var clickrank = $(".ph_news .ph_n");
                     clickrank.html("");
                     for(var i in data){
                       if(i==0)
                       clickrank.append("<li><span class='num1'>"+parseInt(parseInt(i) + 1)+"</span><a href='"+data[i].pageurl+"'>"+data[i].title+"</a></li>");
                       if(i==1)
                       clickrank.append("<li><span class='num1'>"+parseInt(parseInt(i) + 1)+"</span><a href='"+data[i].pageurl+"'>"+data[i].title+"</a></li>");
                       if(i==2)
                       clickrank.append("<li><span class='num1'>"+parseInt(parseInt(i) + 1)+"</span><a href='"+data[i].pageurl+"'>"+data[i].title+"</a></li>");
                       if(i>2)
                       clickrank.append("<li><span>"+parseInt(parseInt(i) + 1)+"</span><a href='"+data[i].pageurl+"'>"+data[i].title+"</a></li>");
                     }
                }
            }else{
                toastr.err(result.msg,"错误");
            }

        }
    });
}

// 栏目推荐
function hotRank() {
    $.ajax({
        type: "get",
        url: "/api/life/hotRank",
        dataType: "json",
        error: function () {
            toastr.err("推荐数据获取失败！","错误");
        },
        success: function (result) {
            if(result.statu=="success"){
                if(result.data.length>0){
                    var data = result.data;
                     var hotrank = $(".ph_news .tj_n");
                     hotrank.html("");
                     for(var i in data){
                       hotrank.append("<li><a href='"+data[i].pageurl+"'>"+data[i].title+"</a></li>");
                     }
                }
            }else{
                toastr.err(result.msg,"错误");
            }

        }
    });
}
// 最新评论
function newComments() {
    $.ajax({
        type: "get",
        url: "/api/life/newcomments",
        dataType: "json",
        error: function () {
            toastr.err("留言数据获取失败！","错误");
        },
        success: function (result) {
            if(result.statu=="success"){
                if(result.data.length>0){
                    var data = result.data.comments;
                     var newpl = $(".ph_news .pl_n");
                     newpl.html("");
                    //  当前时间
                    var nowtime = time();
                    var time = '';
                     for(var i in data){
                        var y = parseInt(nowtime.slice(0,4)) - parseInt(data[i]._id.slice(0,4));
                        var m = parseInt(nowtime.slice(4,6)) - parseInt(data[i]._id.slice(0,4));
                        var d = parseInt(nowtime.slice(6,8)) - parseInt(data[i]._id.slice(0,4));
                        var h = parseInt(nowtime.slice(8,10)) - parseInt(data[i]._id.slice(8,10));
                        var f = parseInt(nowtime.slice(10,12)) - parseInt(data[i]._id.slice(10,12));
                        if(y>0)   { time= y+"年前";}
                        else if ( m>0 ) { time = m+"月前";}
                        else if ( d>0 ) { time = d+"天前";}
                        else if ( h>0 ) { time = h+"小时前";}
                        else if ( f>0 ) { time = f+"分钟前";}

                       hotrank.append("<dl>"+
                       "<dt><img src='"+data[i].userava+"'></dt>"+
                       "<dt> </dt>"+
                       "<dd>"+data[i].username+
                         "<time>"+time+"</time>"+
                       "</dd>"+
                       "<dd><a href='"+data[i].pageurl+"'>"+data[i].message+"</a></dd>"+
                     "</dl>");
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
        url: "/api/life/getlife",
        dataType: "json",
        data:{page:parseInt(page)},
        error: function () {
            toastr.err("生活数据获取失败！","错误");
        },
        success: function (result) {
            if(result.statu=="success"){
                if(result.data.length>0){
                    showLife(result.data);

                    $(".pagelist a").removeClass('on');
                    $(obj).addClass("on");
                }
            }else{
                toastr.err(result.msg,"错误");
            }
        }
    });
}

