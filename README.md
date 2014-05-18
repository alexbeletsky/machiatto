# Machiatto

Behaviour driven test framework.

## Usage

Install `machiatto` as npm package,

```bash
> npm install machiatto --save
```

Create `helloworld.spec.js` file,

```js
var behavior = require('machiatto');

behaviour('world behavior')
	.prepare(function(context) {
		context.world = new World();
	})
	.perform(function (context) {
		context.result = context.world.say();
	})
	.expect(function (context) {
		context.result.to.equal('hello');
	})
```

### Context less tests

Context-less tests are ones that don't require `.prepare()` function.

```js
var behavior = require('machiatto');
var calculator = require('calculator');

behavior('calc behaviour')
	.perform('when add two numbers', function (context) {
		context.result = calculator.add(4, 6);
	})
	expect('should return sum', function (context, expect) {
		expect.result.to.equal(10);
	});
```

### Context based tests

Context bases tests `.prepare()` function should prepare all tests dependencies.

```js

```

# License

MIT (c) alexander.beletsky@gmail.com



