

function ExampleController() {

};
module.exports = ExampleController;
var controller = ExampleController.prototype;

controller.start = function *(app) {
    yield app.render('test.html');
}