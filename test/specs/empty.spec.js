var machiatto = require('../../source/machiatto');
var empty = machiatto('empty');

empty
	.when('nothing', function() {

	})
	.should('nothing', function(context) {

	});

module.exports = empty;
