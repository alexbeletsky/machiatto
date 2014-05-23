var spec = require('./calc.spec.js');
var expect = require('expect.js');

var calc = require('./calc');

// reuse add here

spec
	.when('two numbers', function (context) {
		context.a = 4;
		context.b = 4;
	})

	.and('add operation')

	.should('calculate sum', function (context) {
		expect(context.result).equal(8);
	});

// start new context here

spec.
	when('mul operation', function (context) {
		context.result = calc.mul(context.a, context.b);
	});

spec
	.when('two numbers')

	.and('mul operation')

	.should('calculate multiplication', function (context) {
		expect(context.result).equal(16);
	});

module.exports = spec;