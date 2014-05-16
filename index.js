var koa = require('koa');
var _ = require('underscore');
var views = require('koa-views');
var router = require('koa-router');
var logger = require('koa-logger');
var serve = require('koa-static');
var session = require('koa-session');
var errors = require('koa-error');
var locals = require('koa-locals');
var less = require('koa-less');
var monk = require('monk');

var finder = require('./libs/finder');
var pkg = require('./package');
var defaults = require('./configs');


module.exports = function Scaffold(configs) {

    this.settings = _.extend(_.clone(defaults), configs || {});

    var devMode = true;
    if (this.settings.env === 'production') devMode = false;

    this.dirs = {};
    this.app = koa();

    this.app.db = monk(this.settings.database.name);

    // find `views` and `public` abs path
    this.dirs.views = finder(configs, 'views');
    this.dirs.uploads = finder(configs, 'uploads');

    this.settings = _.extend(_.clone(defaults), configs || {});

    this.app.keys = ['feedr session'];
    this.app.use(session());
    this.app.use(views(this.settings.views, this.settings.view_options));
    this.app.use(logger(devMode ? 'dev' : this.settings.logformat));
    this.app.use(router(this.app));
    this.app.use(serve(this.settings.publics));

    this.app.use(less(this.settings.publics));
    this.app.use(errors());

    // setup server settings
    this.port = _.isNumber(this.settings.port) ? this.settings.port : defaults.port;

    // expose locals to template engine
    locals(this.app, {
        sys: pkg,
        site: this.settings
    });

    var self = this;

    this.run = function(port) {
        var app = self.app;
        var selectedPort = port && _.isNumber(port);
        if (selectedPort) self.port = port;
        console.log(app.locals.site.name + ' is running on port ' + self.port);
        return app.listen(self.port);
    };

    self.routes = function(cb) {
        cb(self.app);
        return self;
    };

    return this;
};