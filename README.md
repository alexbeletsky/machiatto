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
	.when('world is created', function (context) {
		context.world = new World();
	})
	.and('greet', function (context) {
		context.result = context.world.greet();
	})
	.should('respond hello', function (context, expect) {
		expect(context.result).to.equal('hello');
	});
```

Then in `byeworld.spec.js` file,

```js
var behavior = require('machiatto');
var hello = behaviour('hello');

hello
	.when('world is created')	// -> context is re-used from test above
	.and('bye', function (context) {
		context.result = context.world.bye();
	})
	.should('respond bye', function (context, expect) {
		expect(context.result).to.equal('bye-bye');
	});

```

See [examples.js](/examples.js).

# License

MIT (c) alexander.beletsky@gmail.com



