# Machiatto

Behaviour driven test framework.

## Features

* Context re-use between tests and files
* Better structure for same context tests
* Sync and async code testing
* Browser and node.js
* Simple to use

## Usage

Install `machiatto` as npm package,

```bash
> npm install machiatto --save
```

Create `helloworld.spec.js` file,

```js
var behavior = require('machiatto');
var hello = behaviour('hello');

hello
	.given('world is created', function (context) {
		context.world = new World();
	})
	.when('greet', function (context) {
		context.result = context.world.greet();
	})
	.then('respond hello', function (context, expect) {
		expect(context.result).to.equal('hello');
	});
```

Then in `byeworld.spec.js` file,

```js
var behavior = require('machiatto');
var hello = behaviour('hello');

hello
	.given('world is created')	// -> context is re-used from test above
	.when('bye', function (context) {
		context.result = context.world.bye();
	})
	.then('respond bye', function (context, expect) {
		expect(context.result).to.equal('bye-bye');
	});

```

See [/examples](/examples/examples.js).

# License

MIT (c) alexander.beletsky@gmail.com



