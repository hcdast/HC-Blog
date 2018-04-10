//生成时间表
function createTime() {
    var date = new Date();
    var year =date.getFullYear();
    var month = date.getMonth() + 1;
    month= month>9?month:"0"+month;
    var strDate = date.getDate();
    strDate= strDate>9?strDate:"0"+strDate;
    var hour = date.getHours();
    hour= hour>9?hour:"0"+hour;
    var minutes = date.getMinutes();
    minutes= minutes>9?minutes:"0"+minutes;
    var seconds = date.getSeconds();
    seconds= seconds>9?seconds:"0"+seconds;

    var currentdate = year + "" + month + "" + strDate + "" + hour + "" + minutes + "" + seconds+"";
    return currentdate;
}

module.exports = {
    createTime: createTime
};