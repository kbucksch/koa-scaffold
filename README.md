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

### Security

We added basic authentication too. For now only one user and pw can be passed.
To use this feature just call ```secure( opts )``` function.
```javascript
.secure({
    admin: {
        type: "basic",
            user: {
                name: 'default',
                pass: '0000'
            }
        })
    }
```
This will secure ```/admin``` url with http basic with username default and password 0000.

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

### i18n

We are using i18n for internationalisation. 
To switch to a different, configured language, just append f.e. ?lang=en to the next url you are requesting.
If you do that, the cookie called "lang" will be added to the response and users will keep that language
until they call an url with ?lang=[another language] again.

To use a language, you need to have a .js - file in /locals that is named after the language like "en.js".
That file contains every translation identified by a id that you can call in f.e. template-engine like swig.

For Example in swig: 

template:
```html
<h1>{{ __('this.is.a.test') }}</h1>
```
locales-file:

en.js :
```javascript
    {
	    "this.is.a.test": "Your Headline"
    }
```
de.js :
```javascript
    {
	    "this.is.a.test": "Deine Überschrift"
    }
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
