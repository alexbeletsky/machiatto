var machiatto = require('../source/machiatto');
var expect = require('expect.js');

var spec = machiatto('calc spec');
var calc = require('./calc.js');

spec('calculating sum')
	.when('given numbers', function () {
		this.a = 1;
		this.b = 2;
	})

	.and('add operation', function () {
		this.result = calc.add(this.a, this.b);
	})

	.should('calculate sum', function () {
		expect(this.result).to.equal(3);
	})

	.should('calculate sum 2', function () {
		expect(this.result).to.equal(3);
	});

spec('calculating another sum with xand')
	.when('given another numbers', function () {
		this.a = 3;
		this.b = 4;
	})

	.xand('add operation', function () {
		this.result = calc.add(this.a, this.b);
	})

	.should('calculate sum', function () {
		expect(this.result).to.equal(undefined);
	});

spec('calculating another sum with xshould')
	.when('given another numbers', function () {
		this.a = 5;
		this.b = 6;
	})

	.and('add operation')

	.xshould('calculate sum', function () {
		expect(this.result).to.equal(11);
	});


spec('calculating another sum with xwhen')
	.xwhen('given another numbers', function () {
		this.a = 5;
		this.b = 6;
	})

	.and('add operation')

	.should('calculate sum', function () {
		expect(isNaN(this.result)).to.be(true);
	});

module.exports = spec;