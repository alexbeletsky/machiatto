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

# License

MIT (c) alexander.beletsky@gmail.com



