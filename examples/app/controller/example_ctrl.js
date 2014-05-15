
var controller = ExampleController.prototype;

exports = module.exports = ExampleController;

function ExampleController() {

}

controller.start = function *(app) {
    yield app.render('test.html');
}