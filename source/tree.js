function node(parent, model) {
	return {
		parent: parent,

		model: model,

		add: function (model) {
			var added = node(this, model);
			return added;
		},

		path: function (options) {
			var path = [];

			if (options && options.includeSelf) {
				path.push(this);
			}

			var parent = this.parent;

			while (true) {
				if (parent) {
					path.push(parent);
					parent = parent.parent;
				} else {
					return path.reverse();
				}
			}
		}
	};
}

function tree(model) {
	var root = node(null, model);
	return root;
}

module.exports = tree;


// var t = tree();

// var when = t.add({type: 'when', name: 'initialize', fn: function () { console.log('initializing');} });
// when = when.add({type: 'and', name: 'two numbers', fn: function () { console.log('adding numbers'); } });
// var should = when.add({type: 'should', name: 'return sum', fn: function () { console.log('asserting'); }});

// var path = should.path();

// path.forEach(function (node) {
// 	node.model.fn();
// });