/**
 * Example of a controller where property names will be mapped.
 *
 * @returns {{start: *, show: *, :name: *}}
 */
module.exports = function() {

    return {
        start: function *() {
            yield this.render('test.html');
        },

        show: function *() {
            this.body = "hello you";
        },

        ":name": function*(name) {
            this.body = "hello " + name;
        }
    }
};