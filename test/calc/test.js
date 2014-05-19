var machiatto = require('../../source/machiatto');
var spec = machiatto('calc spec');
var calc = require('./calc.js');

spec.
	when('add', function (context) {
		context.results = calc.add(context.a, context.b);
	});

spec
	.given('two numbers', function (context) {
		context.a = 2;
		context.b = 2;
	})

	.when('add')

	.it('should return sum', function (context, expect) {
		expect().equal(4);
	});

spec.
	given('two numbers', function (context) {
		context.a = 3;
		context.b = 3;
	})

	.when('add')

	.it('should return sum', function (context, expect) {
		expect().equal(6);
	});

module.exports = spec;