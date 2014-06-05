var spec = require('./calc.spec.js');
var expect = require('expect.js');

var calc = require('./calc');

// reuse add here

spec('reuse add operation')
	.when('two numbers', function (context) {
		context.a = 4;
		context.b = 4;
	})

	.and('add operation')

	.should('calculate sum', function (context) {
		expect(context.result).equal(8);
	});

// start new context here

spec('create another context').
	when('mul operation', function (context) {
		context.result = calc.mul(context.a, context.b);
	});

spec('reuse when & and')
	.when('two numbers')

	.and('mul operation')

	.should('calculate multiplication', function (context) {
		expect(context.result).equal(16);
	});

module.exports = spec;