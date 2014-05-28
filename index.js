var koa = require('koa');
var _ = require('underscore');
var views = require('koa-views');
var router = require('koa-router');
var logger = require('koa-logger');
var serve = require('koa-static');
var session = require('koa-session');
var errors = require('koa-error');
var locals = require('koa-locals');
var Resource = require('koa-resource-router');
var less = require('koa-less');
var monk = require('monk');
var path = require('path');

var finder = require('./libs/finder');
var pkg = require('./package');
var defaults = require('./configs');

module.exports = Scaffold;

Scaffold.Inner = Inner;


function Scaffold(configs) {

    var settings = _.extend(_.clone(defaults), configs || {});

    var devMode = true;
    if (settings.env === 'production') devMode = false;

    // find `views` and `public` abs path
    var dirs = {};
    dirs.views = finder(configs, 'views');
    dirs.uploads = finder(configs, 'uploads');

    var app = koa();

    app.db = monk(settings.database.name);
    app.keys = ['feedr session'];

    app.use(session());
    app.use(views(settings.views, settings.view_options));
    app.use(logger(devMode ? 'dev' : settings.logformat));
    app.use(router(app));
    app.use(serve(settings.publics));
    app.use(less(settings.publics));
    app.use(errors());

    // setup server settings
    var port = _.isNumber(settings.port) ? settings.port : defaults.port;

    // expose locals to template engine
    locals(app, {
        sys: pkg,
        site: settings
    });

    this.app = app;
    this.port = port;

    return new Inner(app, port);
}

function Inner(app, port) {
    this.app = app;
    this.port = port;
}

Inner.prototype.resource = function(resource) {
    this.app.use(resource.middleware());
    return this;
}

Inner.prototype.route = function(url, controller) {

    var con = controller(this.app);

    // adding all post commands
    if(con.post) {
        for(var key in con.post) {
            app.post(url + '/' + key, con.post[key]);
        }
    }

    // adding all get
    if(con.get) {
        for(var key in con.get) {
            app.get(url + '/' + key, con.get[key]);
        }
    }

    // add to all
    for(var key in con) {
        if(key !== 'get' && key !== 'post') {
            app.all(url + '/' + key, con[key]);
        }
    }

    return this;
};

Inner.prototype.run = function(port) {
    var app = this.app;
    var selectedPort = port && _.isNumber(port);
    if (selectedPort) this.port = port;
    console.log(app.locals.site.name + ' is running on port ' + this.port);
    return app.listen(this.port);
};