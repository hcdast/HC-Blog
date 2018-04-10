var nowpage = 1;
var allpage = 1;
var page =1;
// 分页
function pageInit(pagedata) {
    nowpage = pagedata.nowpage;
    allpage = pagedata.allpage;
    var pagelist = $(".page .pagelist");

    var allPage = $(".page .all");
    allPage.html(allpage);

    for(var i=1;i<=allpage;i++){
        if(i==1)
        pagelist.append("<a onclick='goPage(this)' class='on' name='1'>1</a>");
        else 
        pagelist.append("<a onclick='goPage(this)'  name='"+i+"'>"+i+"</a>");
    }
}
// 上一页
function prePage(){
    var pagelist = $(".page .pagelist");
    if(page > 1) {
        pagelist.html("");
        for(var i=1;i<5;i++){
            pagelist.append("<a onclick='goPage(this)' name='"+(page+i-2)+"'>"+(page+i-2)+"</a>");
        }
        page = page-1;
    }
    
}
// 下一页
function nextPage(){
    var p =  parseInt($(".pagelist").attr("name"));
    var pagelist = $(".page .pagelist");
    if(page+5 <= allpage) {
        pagelist.html("");
        for(var i=1;i<5;i++){
            pagelist.append("<a onclick='goPage(this)' name='"+(page+i)+"'>"+(page+i)+"</a>");
        }
        page = page+1;
    }
}
// 上一列
function preList(){
    var pagelist = $(".page .pagelist");
    if(page > 1) {
        pagelist.html("");
        if(page-5 > 1){
            for(var i=1;i<5;i++){
                pagelist.append("<a onclick='goPage(this)' name='"+(page-5)+"'>"+(page-5)+"</a>");
            }
            page = page-5;
        }else{
            for(var i=1;i<5;i++){
                pagelist.append("<a onclick='goPage(this)' name='"+i+"'>"+i+"</a>");
            }
            page = 1;
        }
    }
}
// 下一列
function nextList(){
    var pagelist = $(".page .pagelist");
    if(page+5 < allpage) {
        pagelist.html("");
        if(page+9 < allpage){
            for(var i=1;i<5;i++){
                pagelist.append("<a onclick='goPage(this)' name='"+(page+5)+"'>"+(page+5)+"</a>");
            }
            page = page+5;
        }else{
            for(var i=1;i<5;i++){
                pagelist.append("<a onclick='goPage(this)' name='"+(allpage-5+i)+"'>"+(allpage-5+i)+"</a>");
            }
            page = allpage-4;
        }
    }
}


