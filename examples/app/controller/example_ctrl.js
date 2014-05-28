var parse = require('co-body');

/**
 * Example of a controller where property names will be mapped.
 *
 * @returns {{start: *, show: *, :name: *}}
 */
module.exports = function() {

    return {

        get: {
            start: function *() {
                yield this.render('test.html');
            },

            show: function *() {
                this.body = "hello you";
            },

            ":name": function*(name) {
                console.log(name);
                this.body = "hello " + name;
            }
        },

        post: {
            postit: function *() {
                var form = yield parse(this);
                this.body = "hello you: " + form.texter;
            }
        }
    }
};