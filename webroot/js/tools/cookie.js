//设置cookie
function setCookie(name,value,callback) {
    var d = new Date();
    d.setTime(d.getTime() + value*(60*60*1000));
    var expires = ";expires="+d.toUTCString();
    document.cookie = name + "=" + escape(value) + expires;
    callback();
}

//清除cookie
function clearCookie(name) {
    setCookie(name, -1,function(){
        console.log("clear cookie success");
    });
}

//获取cookie
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';'); //把cookie分割成组
    for(var i=0;i < ca.length;i++) {
        var c = ca[i]; //取得字符
        while (c.charAt(0)==' ') { //判断字符串有没有前导空
            c = c.substring(1,c.length); //有的话，从第二位开始取
        }
        if (c.indexOf(nameEQ) == 0) { //如果含有我们要的name
            return unescape(c.substring(nameEQ.length,c.length)); //解码并截取我们要的内容
        }
    }
    return false;
}
