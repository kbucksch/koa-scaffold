// require Server class
var example = require('./controller/example_ctrl');

module.exports = {

    get: {
        "":                         example.start,
        "show":                     example.show,
        ":name":                    example.name

    },

    post: {
        "postit":                   example.postit
    }
};