//生成时间表
function createTime() {
    var date = new Date();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var minute = date.getMinutes();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (minute >= 0 && minute <= 9) {
        minute = "0" + minute;
    }
    var currentdate = date.getFullYear() + "年" + month + "月" + strDate
        + "日  " + date.getHours() + ":" + minute;
        // + "分" + date.getSeconds()+"秒";

    // var currentdate = date.getFullYear() + "年" + month + "月" + strDate
    //     + "日  " + date.getHours() + "时" + date.getMinutes();
    // + "分" + date.getSeconds()+"秒";

    return currentdate;
}
//休眠
function sleep(delay,callback) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
    callback();
}
