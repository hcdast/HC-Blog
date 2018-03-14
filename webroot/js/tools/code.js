var code;    //验证码

//初始化验证码  登录  注册
function initCode(){
    var l_checkCode = document.getElementById("l_checkCode");
    var r_checkCode = document.getElementById("r_checkCode");
    code=createCode();
    l_checkCode.setAttribute("value",code);
    r_checkCode.setAttribute("value",code);
}

//生成验证码
function createCode() {
    code = "";
    var codeLength = 6; //验证码的长度
    var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        'a','b','c','d','e','f','g','h','i','j','k','l','m',
        'n','o','p','q','r','s','t','u','v','w','x','y','z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
    for(var i = 0; i < codeLength; i++)
    {
        var charNum = Math.floor(Math.random() * 52);
        code += codeChars[charNum];
    }
    return code;
}