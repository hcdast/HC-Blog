var user = require("./user");
var message = require("./message");
var article = require("./article");
var share = require("./share");
var life = require("./life");



module.exports = function (server) {
    user(server);
    message(server);
    article(server);
    share(server);
    life(server);
};