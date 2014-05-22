var expect = require('expect.js');
var machiatto = require('../source/machiatto');

var spec = machiatto('hypos spec');

spec
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
		expect(context.b).to.equal(3);
	});

module.exports = spec;