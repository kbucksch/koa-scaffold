var koa = require('koa');
var Resource = require('koa-resource-router');
var views = require('koa-views');
var _ = require('underscore');

var app = koa();

app.use(views('views', {
    default: 'jade',
    cache: true,

    map: {
        html: 'underscore'
    }
}));

var users = new Resource('users', {

    // GET /users
    index: function *(next) {
        yield this.render('index.html', {
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

app.use(users.middleware());


app.listen(3000);