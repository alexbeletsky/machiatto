// collections.non.auth.spec.js
var behavior = require('machiatto');
var collections = behavior('collections api');

collections
	.when('non authorized', function (done) {
		request('/api/collections', done);
	})
	.should('respond with 401 (non autorized)', function (expect) {
		expect(this.results[0].statusCode).to.equal(200);
	});

collections
	.when('non authorized')
	.should('explain reason', function (expect) {
		expect(this.results[1].message).to.equal('user token is missing');
	});

// collections.create.spec.js
var behavior = require('machiatto');
var collections = behavior('collections api');

collections
	.when('authorized', function (done) {
		var context = this;
		testUtils.createTestUserAndLoginToApi(function (err, createdUser, accessToken) {
			context.token = accessToken;
			context.user = createdUser;
			context.headers = {'X-Access-Token': accessToken};
			done(err);
		});
	});

collections
	.when('authorized')
	.and('correct collection payload', function () {
		this.collection = {name: 'test collection', description: 'my test collection'};
	})
	.and('new collection created', function (done) {
		request.post('/api/collections', {headers: this.headers, body: this.collection}, done);
	})
	.should('respond with 201 (created)', function (expect) {
		expect(this.results[0].statusCode).to.equal(201);
	})
	.should('return new collection', function (expect) {
		expect(this.results[1].name).to.equal('test collection');
		expect(this.results[1].description).to.equal('my test collection');
	});

collections
	.when('authorized')
	.and('name is missing', function () {
		this.collection = {description: 'my test collection'};
	})
	.and('new collection created')
	.should('respond 412 (bad request)', function (expect) {
		expect(this.results[0].statusCode).to.equal(412);
	});

collection
	.when('authorized')
	.and('description is missing', function () {
		this.collection = {name: 'test collection'};
	})
	.and('new collection created')
	.should('respond 412 (bad request)');