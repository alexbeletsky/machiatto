var machiatto = require('../../source/machiatto');
var empty = machiatto('empty');

empty('empty spec')
	.when('nothing', function () {

	})

	.should('nothing', function (context) {

	});

module.exports = empty;
