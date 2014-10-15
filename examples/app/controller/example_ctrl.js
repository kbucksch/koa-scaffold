var parse = require('co-body');

/**
 * Example of a controller where property names will be mapped.
 *
 * @returns {{start: *, show: *, :name: *}}
 */
module.exports = {

    start: function *() {
        yield this.render('example.html');
    },

    show: function *() {
        this.body = "hello you";
    },

    name: function*(name) {
        this.body = "hello " + name;
    },

    postit: function *() {
        var form = yield parse(this);
        this.body = "hello you: " + form.texter;
    }
};