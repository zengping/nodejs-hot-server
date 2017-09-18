var fs = require('fs');

var path = __dirname + "/response";
var files = fs.readdirSync(path);
files.forEach(function(filename) {
    var pos = filename.lastIndexOf('.');
    if(pos == -1)
        return;
    var filePrefix = filename.substr(0, pos);
    var filePostfix = filename.substr(pos + 1);
    if(filePrefix.length < 1 || filePostfix.length < 1 || filePostfix != 'js')
        return;
    var model = require(path + '/' + filePrefix);
    exports[filePrefix] = model;
});