var fs = require('fs');

var machiatto = require('../../source/machiatto');
var expect = require('expect.js');

var spec = machiatto('async spec');

spec
	.when('reading test.txt', function(context, done) {
		fs.readFile(__dirname + '/test.txt', 'utf8', function(err, data) {
			context.result = data;
			done(err);
		});
	})
	.should('have content', function(content) {
		expect(content.result).to.equal('message');
	});

module.exports = spec;
