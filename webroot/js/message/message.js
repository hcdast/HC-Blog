//发表留言
function publish() {
    var loginStatu= getCookie("loginStatu");
    var token = getCookie("token");
    if((loginStatu=="qq"||loginStatu=="blog")&&token!=""){
        var message = $("#comCon").val();
        var time = createTime();
        var datajson= {token: token,message:message,time:time};
        $.ajax({
            type: "post",
            url: "/api/message/publish",
            dataType: "json",
            data: datajson,
            error: function () {
                toastr.error("留言失败！","错误");
            },
            success: function (result) {
                if (result.statu=="success") {
                    $("#nodatalog").css({"display":"none"});
                    $("#pagenum").css({"display":"block"});
                    $('#comCon').val("");
                    var data= [];
                    data.push(result.data);
                    showMessage(0,data);
                }
                else {
                    toastr.error("留言失败！","错误");
                }
            }
        });
    }else{
        alert("您还未登录！请先登录。。。");
    }

}
// 发表回复
function reply(messageId) {
    var loginStatu= getCookie("loginStatu");
    var token = getCookie("token");
    if((loginStatu=="qq"||loginStatu=="blog")&&token!=""){
        var message = $("#comCon"+messageId).val();
        var time = createTime();
        var datajson= {token: token,messageId:messageId,message:message,time:time};
        $.ajax({
            type: "post",
            url: "/api/message/reply",
            dataType: "json",
            data: datajson,
            error: function () {
                toastr.error("回复失败！","错误");
            },
            success: function (result) {
                $('#comCon'+messageId).val("");
                if (result.statu=="success") {
                     closeReply({name:messageId});
                    var data= [];
                    data.push(result.data);
                    showReply(messageId,data);
                }
                else {
                    toastr.error("回复失败！","错误");
                }
            }
        });
    }else{
        alert("您还未登录！请先登录。。。");
    }
}


//act 操作
function commentsAct(obj) {

}
//关闭回复框
function closeReply(obj) {
    var changeStatu=$("#reply"+obj.name+"");
    var replyArea=$('#'+obj.name+'input');

    changeStatu.attr("onclick",'openReply(this)');
    changeStatu.text("回复");
    changeStatu.css('color','');
    replyArea.html("");
}
//打开回复框
function openReply(obj) {
    var changeStatu=$("#reply"+obj.name+"");
    var replyArea=$('#'+obj.name+'input');
    var div=$.tag("div",{
    });
    div.append("textarea",{
        id:'comCon'+obj.name,
        name:obj.name,
        placeholder:"快对他（她）说几句吧"
    });
    div.append("button",{
        innerHTML:'回复',
        onclick:function () {
            reply(obj.name);
        }
    });
    replyArea.append(div);
    changeStatu.attr("onclick",'closeReply(this)');
    changeStatu.text("取消回复");
    changeStatu.css('color','#e41635');


}


// 显示留言数据
function showMessage(type,data) {
    var userlist = document.getElementById("user-list");
    // userlist.innerHTML="";
    for(var i in data){
        if(type==1){
            userlist.innerHTML="<dl>"+
                "<dt class='img'><img src='"+data[i].userava+"'></dt>"+
                "<dd class='user'><a href=''>"+data[i].username+"</a></dd>"+
                "<dd class='time'><p>"+data[i].time+"</p></dd>"+
                "<dd class='review'><p>"+data[i].message+"</p></dd>"+
                "<div class='reply-list' id='replys"+data[i]._id+"' ></div>"+
                "<div class='act'>" +
                "<i class='fa fa-flag' aria-hidden='true'><a id='report"+data[i]._id+"' name="+data[i]._id+" onclick='commentsAct(this)'>举报【0】</a></i>" +
                "<i class='fa fa-comment-o fa-1x' aria-hidden='true'><a id='reply"+data[i]._id+"' name='"+data[i]._id+"' onclick='openReply(this)'>回复</a></i>" +
                "<i class='fa fa-thumbs-o-down' aria-hidden='true'><a id='pit"+data[i]._id+"' name='"+data[i]._id+"' onclick='commentsAct(this)'>坑【0】</a></i>" +
                "<i class='fa fa-thumbs-o-up' aria-hidden='true'><a id='praise"+data[i]._id+"' name='"+data[i]._id+"' onclick='commentsAct(this)'>赞【0】</a></i>" +
                "</div>"+
                "<div class='comments-input' id='"+data[i]._id+"input'></div>"+
                "</dl>"+userlist.innerHTML;
            showReply(data[i]._id,data[i].reply);
        }
        else{
            userlist.innerHTML="<dl>"+
                "<dt class='img'><img src='"+data[i].userava+"'></dt>"+
                "<dd class='user'><a href=''>"+data[i].username+"</a></dd>"+
                "<dd class='time'><p>"+data[i].time+"</p></dd>"+
                "<dd class='review'><p>"+data[i].message+"</p></dd>"+
                "<div class='reply-list' id='replys+"+data[i]._id+"' ></div>"+
                "<div class='act'>" +
                "<i class='fa fa-flag' aria-hidden='true'><a id='report"+data[i]._id+"' name="+data[i]._id+" onclick='commentsAct(this)'>举报【0】</a></i>" +
                "<i class='fa fa-comment-o fa-1x' aria-hidden='true'><a id='reply"+data[i]._id+"' name='"+data[i]._id+"' onclick='openReply(this)'>回复</a></i>" +
                "<i class='fa fa-thumbs-o-down' aria-hidden='true'><a id='pit"+data[i]._id+"' name='"+data[i]._id+"' onclick='commentsAct(this)'>坑【0】</a></i>" +
                "<i class='fa fa-thumbs-o-up' aria-hidden='true'><a id='praise"+data[i]._id+"' name='"+data[i]._id+"' onclick='commentsAct(this)'>赞【0】</a></i>" +
                "</div>"+
                "<div class='comments-input' id='"+data[i]._id+"input'></div>"+
                "</dl>"+userlist.innerHTML;
            showReply(data[i]._id,data[i].reply);
        }
    }
}
// 显示回复数据
function showReply(messageID,data) {
    var id = "replys"+messageID.toString();
    var reply= document.getElementById(id);
    if(data){
         for(var i in data){
            reply.innerHTML+="<dl class='reply-user'>" +
                "<dt class='reply-ava'><img src='"+data[i].userava+"' alt=''></dt>" +
                "<dd class='reply-name'><a href=''>"+data[i].username+"</a></dd>" +
                "<dd class='reply-time'><p>"+data[i].time+"</p></dd>" +
                "<dd class='reply-review'><p>"+data[i].message+"</p></dd>" +
                "</dl>";
        }
    }
}

// 获取更多留言数据
function getMore(obj) {
    var page =parseInt($(obj).attr("name"));
    $.ajax({
        type: "post",
        url: "/api/message/initdata",
        dataType: "json",
        data: {page:page+1},
        error: function () {
            toastr.error("获取数据失败！","错误");
        },
        success: function (result) {
            if (result.statu=="success") {
                if(result.data.length>0){
                    $("#pagenum").attr("name","2");
                    showMessage(result.data);
                }else{
                    // alert(result.msg);
                    toastr.success(result.msg,"正确");
                }
            }
            else {
                toastr.error(result.msg,"错误");
            }
        }
    });
}

