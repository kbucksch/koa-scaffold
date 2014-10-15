// require Server class
var server = require('./../index');
var router = require('./app/router');
var test = require('./app/controller/test_ctrl');

// create app instance and chain all stuff together,
// as you can see, express-scaffold injects models and ctrlers into
// app instance, it is a convenience way to organize all resource and modules
// which almost every route needs.
server({
    name: 'My very first App',
    database: {
        name: 'example',
        tables: ["test"]
    },
    views: "./examples/app/views"
})
    // example of how to secure areas of app
    .secure({
        admin: {
            type: "basic",
            user: {
                name: 'default',
                pass: '000'
            }
        }
    })
    // example of CRUD controller
    .resource(test)
    // example of individual routing
    .route('', router)
    // starting the app
    .run();