var shareType = ["那本书", "那个人", "那场电影", "那段记忆"];

// 主页面初始化数据
function initShareData() {
    $.ajax({
        type: "get",
        url: "/api/share/getinitdata",
        dataType: "json",
        error: function () {
            toastr.err("生活数据获取失败！","错误");
        },
        success: function (result) {
            if(result.statu=="success"){
                var data = result.data;
                if(data.book!=0||data.person!=0||data.movie!=0||data.memory!=0){
                    showShare(result.data);
                }
            }else{
                toastr.err(result.msg,"错误");
            }

        }
    });
}
// 显示数据
function showShare(data) {
    var booklist = $(".template .book");
    booklist.html("");
    var personlist = $(".template .person");
    personlist.html("");
    var movielist = $(".template .movie");
    movielist.html("");
    var memorylist = $(".template .memory");
    memorylist.html("");
    
    var book = data.book;
    var person = data.person;
    var movie = data.movie;
    var memory = data.memory;

    for(var i in book){
        booklist.append("<li>"+
        "<a href='../"+book[i].pageurl+"' target='_blank'>"+
          "<img src='../"+book[i].imgurl+"'>"+
        "</a>"+
          "<span> "+book[i].title+"</span>"+
        "</li>");
    }
    for(var i in person){
        personlist.append("<li>"+
        "<a href='../"+person[i].pageurl+"' target='_blank'>"+
          "<img src='../"+person[i].imgurl+"'>"+
        "</a>"+
          "<span> "+person[i].title+"</span>"+
        "</li>");
    }
    for(var i in movie){
        movielist.append("<li>"+
        "<a href='../"+movie[i].pageurl+"' target='_blank'>"+
          "<img src='../"+movie[i].imgurl+"'>"+
        "</a>"+
          "<span> "+movie[i].title+"</span>"+
        "</li>");
    }
    for(var i in memory){
        memorylist.append("<li>"+
        "<a href='../"+memory[i].pageurl+"' target='_blank'>"+
          "<img src='../"+memory[i].imgurl+"'>"+
        "</a>"+
          "<span> "+memory[i].title+"</span>"+
        "</li>");
    }
}