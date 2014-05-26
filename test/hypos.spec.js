var expect = require('expect.js');
var machiatto = require('../source/machiatto');

var spec = machiatto('hypos spec');

spec('context initalization')
	.when('setup context', function (context) {
		context.a = 1;
	})

	.and('additional setup context', function (context) {
		context.b = 2;
	})

	.should('initalize context.a', function (context) {
		expect(context.a).to.equal(1);
	})

	.should('initalize context.b', function (context) {
		expect(context.b).to.equal(2);
	});

spec('context initalization 2')
	.skip()

	.when('setup context', function (context) {
		context.a = 3;
	})

	.and('additional setup context', function (context) {
		context.b = 4;
	})

	.should('initalize context.a', function (context) {
		expect(context.a).to.equal(3);
	})

	.should('initalize context.b', function (context) {
		expect(context.b).to.equal(4);
	});

module.exports = spec;