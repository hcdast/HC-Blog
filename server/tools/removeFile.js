var fs = require("fs");


// 删除文件
function removeFile(url,callback) {
    fs.unlink(url,function (err) {
        if(err) throw err;
        else{
        console.log('文件删除成功');
        callback("success");
        }
    });
}

module.exports = {
    removeFile:removeFile
};
