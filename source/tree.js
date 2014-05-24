function node(parent, model) {
	return {
		parent: parent,

		children: [],

		model: model,

		add: function (model) {
			var added = node(this, model);
			this.children.push(added);

			return added;
		},

		path: function (options) {
			var path = [];

			if (options && options.includeSelf) {
				path.push(this);
			}

			var parent = this.parent;

			while(true) {
				if (!parent) {
					break;
				}

				path.push(parent);
				parent = parent.parent;
			}

			return path.reverse();
		},

		find: function (pred) {
			if (pred(this)) {
				return this;
			}

			var found = deep(this.children);
			if (found) {
				return found;
			}

			function deep(children) {
				var found;

				for(var i = 0; i < children.length; i++) {
					found = children[i].find(pred);
					if (found) {
						break;
					}
				}

				return found;
			}
		}
	};
}

function tree(model) {
	var root = node(null, model);
	return root;
}

module.exports = tree;