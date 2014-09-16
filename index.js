var koa = require('koa');
var _ = require('underscore');
var views = require('koa-views');
var router = require('koa-router');
var route = require('koa-route');
var logger = require('koa-logger');
var serve = require('koa-static');
var session = require('koa-session');
var errors = require('koa-error');
var locals = require('koa-locals');
var Resource = require('koa-resource-router');
var monk = require('monk');
var path = require('path');
var locale = require('koa-locale');
var i18n = require('koa-i18n');

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
    if(Array.isArray(settings.publics)) {
        for(var i = 0; i < settings.publics.length; i++) {
            app.use(serve(settings.publics[i]));
        }
    }
    else {
        app.use(serve(settings.publics));
    }

    locale(app);

    // expose locals to template engine
    locals(app, {
        sys: pkg,
        site: settings
    });

    app.use(i18n(app, settings.i18n));

    //app.use(errors());

    app.use(function *(next) {
        try {
            yield next;
        } catch (err) {
            console.log(err);
            if(!err.status) {
                this.status = 500;
                yield this.render(settings.error['500']);
            }
            else {
                this.status = err.status;
            }
        }

        if(this.status === 200) {
            return;
        }

        if(!this.status) {
            this.status = 404;
        }

        if(this.status === 404) {
            yield this.render(settings.error['404']);
        }
        if(this.status === 500) {
            yield this.render(settings.error['500']);
        }
    });

    // setup server settings
    var port = _.isNumber(settings.port) ? settings.port : defaults.port;

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
};

Inner.prototype.route = function(url, controller) {

    // adding all post commands
    if(controller.post) {
        for(var key in controller.post) {
            app.use(route.post(url + '/' + key, controller.post[key]));
        }
    }

    // adding all get
    if(controller.get) {
        for(var key in controller.get) {
            app.use(route.get(url + '/' + key, controller.get[key]));
        }
    }

    // add to all
    for(var key in controller) {
        if(key !== 'get' && key !== 'post') {
            app.use(route.all(url + '/' + key, controller[key]));
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