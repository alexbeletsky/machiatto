# Machiatto

Behaviour driven test framework.

## Motivation

[Machiatto]() is [Mocha]() inspired frawemork. There was several motivation points, why I think it's time to reconsider [Mocha]().

1. [Mocha]() supposed to be BDD framework. Each time I try to explain BDD priciples with Mocha, it appears to be hard because of inspite of common BDD language of `"given-when-then"`, it exposes API based on `"describe-before-it"` methods, that makes inpedence mismatch between BDD language and framework itself.

2. In [Mocha]() nested context are nested `describe` functions. With too many nested contexts, the code blocks move right and it's a harder to read such code and maintantain it. Besides, the code re-use between specs are impossible, some many times you put it to some utitlity objects and call from specs.

3. [Mocha]() exposes all their API as global functions, so `describe` or `it` are usually warnings for `jshint`.

[Machiatto]() is an effort to fix [Mocha]() and provide better BDD testing framework.

## Usage

Install `machiatto` as npm package,

```bash
> npm install machiatto --save
```

Create `helloworld.spec.js` file,

```js
var behavior = require('machiatto');
var expect = require('expect.js');

var spec = behaviour('hello world specs');

spec('hello world behaviour')
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
var behavior = require('machiatto');
var expect = require('expect.js');

var spec = behaviour('hello');

spec('bye world behaviour')
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


## Features

* Context re-use between tests and files
* Better structure for same context tests
* Sync and async code testing
* Browser and node.js
* Simple to use

## API

TBD.

# License

MIT (c) alexander.beletsky@gmail.com



