var mongoose = require('mongoose');
var db=null;
    // var db=mongoose.connect('mongodb://localhost/myblog');
    // db.connection.on("error", function (error) {
    //     console.log("数据库连接失败：" + error);
    // });
    // db.connection.on("open", function () {
    //     console.log("数据库连接成功");
    // });
mongoose.Promise = global.Promise;
var db = mongoose.createConnection("127.0.0.1","myblog");

    function mongodbConn() {
        if (!db) {
            db = null;
        }
        else{
            console.log("数据库连接成功！");
        }
    }


// module.exports = db;
module.exports= {
    db:db,
    mongodbConn:mongodbConn
};
