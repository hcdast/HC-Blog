var user = require("./user");
var message = require("./message");


module.exports = function (server) {
    user(server);
    message(server);
};