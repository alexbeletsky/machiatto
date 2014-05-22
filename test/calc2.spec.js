var spec = require('./calc.spec.js');
var expect = require('expect.js');

//var calc = require('./calc.js');

// reuse add here

spec
	.when('two numbers', function (context) {
		context.a = 4;
		context.b = 4;
	})

	.and('add')

	.should('return sum', function (context) {
		expect(context.result).equal(8);
	});

// start new context here

// spec.
// 	when('mul', function (context) {
// 		context.result = calc.mul(context.a, context.b);
// 	});

// spec
// 	.given('two numbers')

// 	.when('mul')

// 	.then('should multiply', function (context, expect) {
// 		expect().equal(16);
// 	});

module.exports = spec;