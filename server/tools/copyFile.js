var fs=require("fs");

function copyFile(readPath,writePath,callback){
    console.log('--------开始读取文件--------');
    var fs = require('fs');
    fs.readFile(readPath, 'utf-8', function(err, data) {
        if (err) {
            console.log("读取失败"+err);
            callback({statu:'error'});
        } else {
            fs.writeFile(writePath,data,'utf8',function(error){
                if(error){
                    callback({statu:'error'});
                    throw error;
                }else{
                    callback({statu:'success'});
                    console.log("文件已保存");    
                }
            });
        }
    });
    console.log('--------读取结束--------');
}

module.exports = {
    copyFile:copyFile,
};