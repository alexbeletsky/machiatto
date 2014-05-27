var spec = require('./calc.spec.js');
var expect = require('expect.js');

var calc = require('./calc');

// reuse add here

spec('reuse add operation')
	.when('two numbers', function () {
		this.a = 4;
		this.b = 4;
	})

	.and('add operation')

	.should('calculate sum', function () {
		expect(this.result).equal(8);
	});

// start new context here

spec('create another this').
	when('mul operation', function () {
		this.result = calc.mul(this.a, this.b);
	});

spec('reuse when & and')
	.when('two numbers')

	.and('mul operation')

	.should('calculate multiplication', function () {
		expect(this.result).equal(16);
	});

module.exports = spec;