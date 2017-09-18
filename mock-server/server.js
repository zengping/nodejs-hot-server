var http = require("http");

function start(route) {
    function onRequest(request, response) {
        route(request, response);
    }

    var server = http.createServer()
    server.on("request", onRequest)
    server.listen(8080);
    console.log("Server has started.");
    console.log("请在浏览器访问http://localhost:8080");
}

exports.start = start;