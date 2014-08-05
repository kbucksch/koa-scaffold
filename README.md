## koa-scaffold

Sexy Koa in smart MVC environment

### Installation
````
$ npm install https://github.com/unicorn-it/koa-scaffold/archive/<CURRENT_VERSION>.tar.gz
````
E.g.:
````
$ npm install https://github.com/unicorn-it/koa-scaffold/archive/0.0.9.tar.gz
````

### Quick start

We are using koa-scaffold in many projects by our self. It helps you to build MVC web application with powerful koa.js and known MVC patterns in seconds. 

````javascript
// require Server class
var Server = require('koa-scaffold');
var your_router = require('./app/router');

// create app instance and chain all stuff together,
// as you can see, koa-scaffold injects models and ctrlers into
// app instance, it is a convenience way to organize all resource and modules
// which almost every route needs.
new Server({
  name: 'My very first App',
  database: {
    name: 'example'
  }
})
// A router will be a vera readable object which leads URLs to handlers
// they can look like:
// {
//   get: {
//     "":                  my_controller.main,
//     "list":              my_controller.list
//   }
// }
// Placing router.js in app folder helps readability
.route('', your_router)
// start the app
.run();
````

### Configs

all config params list below:
````javascript
{
  // site name
  name : "site name",
}
````

### Structure

```
/app
|-- assets
|-- controller
|-- helper
|-- model
|-- view
`-- router.js
```

### MIT license
Copyright (c) 2013 turing &lt;o.u.turing@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

---
