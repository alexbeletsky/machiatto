var expect = require('expect.js');
var machiatto = require('../source/machiatto');

var spec = machiatto('hypos spec');

spec('context initalization')
	.when('setup context', function () {
		this.a = 1;
	})

	.and('additional setup context', function () {
		this.b = 2;
	})

	.should('initalize a', function () {
		expect(this.a).to.equal(1);
	})

	.should('initalize b', function () {
		expect(this.b).to.equal(2);
	});

spec('context initalization 2')
	.when('setup context', function () {
		this.a = 3;
	})

	.and('additional setup context', function () {
		this.b = 4;
	})

	.should('initalize a', function () {
		expect(this.a).to.equal(3);
	})

	.should('initalize b', function () {
		expect(this.b).to.equal(4);
	});

module.exports = spec;