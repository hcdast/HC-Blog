//监听状态
function userStatu(){
    $.ajax({
        type: "post",
        url: "/api/statu",
        dataType: "json",
        error: function () {
        },
        success: function (result) {
            var head=document.getElementById("head");
            var count=0;
            for (var i in result) {
                if (result[i].password == getCookie(result[i].name)) {
                    if (head.getAttribute('name') == "f") {
                        if(result[i].flag==true){
                            head.innerHTML += "<a href='../manger.html'>" +
                                "管理页面</a> <button class='login'  onclick='exit(this)' name='" + result[i].name + "' >退出</button>";
                            head.setAttribute('name', 't');
                            flag=true;
                        }else{
                            head.innerHTML += "<a href='../index.html'>" +
                                "您好！"+result[i].name+"</a><button class='login'  onclick='exit(this)' name='" + result[i].name + "' >退出</button>";
                            head.setAttribute('name', 't');
                        }
                    }
                }
                else count++;
            }
            if(count==result.length){
                head.innerHTML += "<a href='../index.html'>您好！游客。请</a><button class='login' onclick='show()'>登陆</button>";
            }
        }
    });
}
