# Machiatto

Behaviour driven test framework.

## Features

* BDD friendly syntax
* Context re-use between tests and files
* Better structure for same context tests
* Sync and async code testing
* Browser and node.js

## Status

Project is currently under heavy development and not yet ready for production usage.

Checkout current [Road Map](https://github.com/alexanderbeletsky/machiatto/wiki/Road-Map) to `0.2.0` stable version.

## Usage

Install `machiatto` as npm package,

```bash
> npm install machiatto --save
```

Create `helloworld.spec.js` file,

```js
var behaviour = require('machiatto');
var expect = require('expect.js');

var spec = behaviour('hello world specs');

spec
	.when('world is created', function (context) {
		context.world = new World();
	})

	.and('greet', function (context) {
		context.result = context.world.greet();
	})

	.should('respond hello', function (context) {
		expect(context.result).to.equal('hello');
	});

module.exports = spec;
```

Then in `byeworld.spec.js` file,

```js
var behaviour = require('machiatto');
var expect = require('expect.js');

var spec = behaviour('hello');

spec
	.when('world is created')

	.and('bye', function (context) {
		context.result = context.world.bye();
	})

	.should('respond bye', function (contexts) {
		expect(context.result).to.equal('bye-bye');
	});

module.exports = spec;
```

See [/test](/test).

## API

All tests are grouped by suites. To start new `suite`, call `machiatto` function with spec name,

```js
var machiatto = require('machiatto');

var spec = machiatto('/api/user specs');
```

```js
spec.when('call api without access token', function (context, done) {
		request('/api/user', function (err, response, body) {
			context.response = resp;
			context.body = body;
			done(err);
		});
	})
```

`when()` is a function that establish context for test. For async tests it supports second parameter `done()` as callback function.

`when()` expected to do one (and only one) action. If you need to extend context, there is `.and()` function for that,

```js
spec.when('call api without access token', function (context, done) {
		request('/api/user', function (err, response, body) {
			context.response = resp;
			context.body = body;
			done(err);
		});
	})

	.and('try to update user', function (context, done) {
		request.post('/api/user', body: {name: 'me'}, done);
	})
```

The assert is expected to be done in `.should()` function. `.should()` is never async and takes only one parameter - `context`.

```js
spec.when('call api without access token', function (context, done) {
		request('/api/user', function (err, response, body) {
			context.response = resp;
			context.body = body;
			done(err);
		});
	})

	.and('try to update user', function (context, done) {
		request.post('/api/user', body: {name: 'me'}, done);
	})

	.should('respond with 401', function (context) {
		expect(context.response.statusCode).to.equal(401);
	})

	.should('explain the reason', function (context) {
		expect(context.body.message).to.equal('missing authorization token');
	});
```

As `.when()` and `.and()` functions, `.should()` suppose to verify only one aspect of behaviour. Ideally it should contain of one `expect()` call. No async calls, no initialization of context (or actions) are supposed to be done inside `.should()`.

The `spec` have to be exported from module, to allow runner to execute it.

```js
module.exports = spec;
```

### Context re-usage

Once `.when()` or `.and()` function is called it's possible to reuse it's body within same suite by name.

```js
spec
	.when('collection is created', function (context) {
		context.collection = new Collection();
	})

	.and('item added', function (context) {
		context.collection.add(new Item());
	})

	.should('have correct length', function (context) {
		expect(context.collection).to.have.length(1);
	});

spec
	.when('collection is created')

	.and('item added')

	.and('item removed after', function (context) {
		context.collection.remove(0);
	})

	.should('have correct length', function (context) {
		expect(context.collection).to.have.length(0);
	});
```

### X-functions

It's possible to prevent and of `.when()`, `.and()` or `.should()` from execution, by prefix function name with `x` - `.xwhen()`, '.xand()' and `.xshould()`.

```js
spec
	.when('collection is created')

	.and('item added')

	.and('item removed after', function (context) {
		context.collection.remove(0);
	})

	// this one will be skipped..
	.xshould('have correct length', function (context) {
		expect(context.collection).to.have.length(0);
	});
```

### Execution flow

You can manage execution flow of specs with `.skip()` and `.only()` functions.

```js
spec
	.when('collection is created', function (context) {
		context.collection = new Collection();
	})

	.and('item added', function (context) {
		context.collection.add(new Item());
	})

	.should('have correct length', function (context) {
		expect(context.collection).to.have.length(1);
	})

	// only this spec will run
	.only();

spec
	.when('collection is created')

	.and('item added')

	.and('item removed after', function (context) {
		context.collection.remove(0);
	})

	.should('have correct length', function (context) {
		expect(context.collection).to.have.length(0);
	})

	// this spec will be excluded of execution
	.skip()
```

## Motivation

[Machiatto][] is [Mocha][] inspired frawemork. There was several motivation points, why I think it's time to reconsider [Mocha][].

1. [Mocha][] supposed to be BDD framework. Each time I try to explain BDD priciples with Mocha, it appears to be hard because of inspite of common BDD language of `"given-when-then"`, it exposes API based on `"describe-before-it"` methods, that makes inpedence mismatch between BDD language and framework itself.

2. In [Mocha][] nested context are nested `describe` functions. With too many nested contexts, the code blocks move right and it's a harder to read such code and maintantain it. Besides, the code re-use between specs are impossible, some many times you put it to some utitlity objects and call from specs.

3. [Mocha][] exposes all their API as global functions, so `describe` or `it` are usually warnings for `jshint`.

[Machiatto][] is an effort to fix [Mocha][] and provide better BDD testing framework.

# License

MIT

(c) 2014 alexander.beletsky@gmail.com

[Machiatto]: https://github.com/alexanderbeletsky/machiatto/
[Mocha]: http://visionmedia.github.io/mocha/
