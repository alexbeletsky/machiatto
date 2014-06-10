var machiatto = require('../../source/machiatto');
var expect = require('expect.js');

var spec = machiatto('calc spec');
var calc = require('./calc.js');

spec
	.when('given numbers', function (context) {
		context.a = 1;
		context.b = 2;
	})
	.and('add operation', function (context) {
		context.result = calc.add(context.a, context.b);
	})
	.should('calculate sum', function (context) {
		expect(context.result).to.equal(3);
	})
	.should('calculate sum 2', function (context) {
		expect(context.result).to.equal(3);
	});

spec
	.when('given another numbers', function (context) {
		context.a = 3;
		context.b = 4;
	})
	.xand('add operation', function (context) {
		context.result = calc.add(context.a, context.b);
	})
	.should('calculate sum', function (context) {
		expect(context.result).to.equal(undefined);
	});

spec
	.when('given another numbers', function (context) {
		context.a = 5;
		context.b = 6;
	})
	.and('add operation')
	.xshould('calculate sum', function (context) {
		expect(context.result).to.equal(11);
	});


spec
	.xwhen('given another numbers', function (context) {
		context.a = 5;
		context.b = 6;
	})
	.and('add operation')
	.should('calculate sum', function (context) {
		expect(isNaN(context.result)).to.be(true);
	});

module.exports = spec;
