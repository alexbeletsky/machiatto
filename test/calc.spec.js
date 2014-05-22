var machiatto = require('../source/machiatto');
var expect = require('expect.js');

var spec = machiatto('calc spec');
var calc = require('./calc.js');

spec.
	when('add', function (context) {
		context.result = calc.add(context.a, context.b);
	});

spec
	.when('two numbers', function (context) {
		context.a = 2;
		context.b = 2;
	})

	.and('add')

	.should('return sum', function (context) {
		expect(context.result).equal(4);
	});

spec.
	when('two numbers', function (context) {
		context.a = 3;
		context.b = 3;
	})

	.and('add')

	.should('return sum', function (context, expect) {
		expect(context.result).equal(6);
	});

module.exports = spec;