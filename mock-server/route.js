var handle = require("./requestHandlers");
var url = require("url");
var lib = require("./lib");

async function route(request, response) {
    var path = url.parse(request.url, true);
    var routes = path.pathname.split("/");
    var query = path.query;
    request.rootPath = __dirname;
    response.okMsg = okMsg();
    response.errMsg = errMsg();
    let basePath = routes[1];
    let ctrl = routes[2];
    let action = routes[3];
    if (basePath == 'api' && ctrl && action && handle[ctrl] && handle[ctrl][action]) {
        response.writeHead(200, {"Content-Type": "application/json;charset=utf-8"});
        if (ctrl === 'file') {
            handle[ctrl][action](request, response, {routes, query});
            return;
        } else {
            try {
                if (request.method == 'POST') {
                    request.postData = await lib.getPost(request);
                }
                let data = await handle[ctrl][action](request, response, {routes, query});
                response.serverStatus = 1;
                response.okMsg.data = data.data;
            } catch(e) {
                response.serverStatus = 0;
                response.errMsg.status.msg = e.message;
            }
            lib.render(response);
        }
    } else {
        response.writeHead(404, {"Content-Type": "text/plain;charset=utf-8"});
        response.write("404 Not found");
        response.end();
    }
}

function okMsg() {
    return {
        status: {
            code: 200,
            msg: 'ok'
        }
    }
}

function errMsg() {
    return {
        status: {
            code: 500,
            msg: 'error'
        }
    }
}

exports.route = route;
