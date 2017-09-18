var formidable = require('formidable');

module.exports = {
    async getPost(request) {
        var postData = {};
        var form = new formidable.IncomingForm();

        await form.parse(request, function(err, fields, files) {
            postData = fields;
        });
        return postData;
    },
    render(res) {
        if (res.serverStatus == 1) {
            res.write(JSON.stringify(res.okMsg));
        } else {
            res.write(JSON.stringify(res.errMsg));
        }
        res.end();
    }
}
