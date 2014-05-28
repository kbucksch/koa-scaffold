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
                this.body = "hello " + name;
            }
        },

        post: {
            postit: function *() {
                this.body = "hello you";
            }
        }
    }
};