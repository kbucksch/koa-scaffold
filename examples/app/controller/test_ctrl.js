var Resource = require('koa-resource-router');

/**
 * Controller using koa-resource-router for CRUD purpose
 *
 * @type {Resource}
 */
module.exports = new Resource('users', {

    // GET /users
    index: function *(next) {
        yield this.render('test.html', {
            user: 'John'
        });
    },
    // GET /users/new
    new: function *(next) {
    },
    // POST /users
    create: function *(next) {
    },
    // GET /users/:id
    show: function *(next) {
    },
    // GET /users/:id/edit
    edit: function *(next) {
    },
    // PUT /users/:id
    update: function *(next) {
    },
    // DELETE /users/:id
    destroy: function *(next) {
    }
});
