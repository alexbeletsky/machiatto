// collections.non.auth.spec.js
var behavior = require('machiatto');
var collections = behavior('collections api');

collections
	.when('non authorized', function (context, done) {
		request('/api/collections', done);
	})
	.should('respond with 401 (non autorized)', function (context, expect) {
		expect(context.results[0].statusCode).to.equal(200);
	});

collections
	.when('non authorized')
	.should('explain reason', function (context, expect) {
		expect(context.results[1].message).to.equal('user token is missing');
	});

// collections.create.spec.js
var behavior = require('machiatto');
var collections = behavior('collections api');

collections
	.when('authorized', function (context, done) {
		testUtils.createTestUserAndLoginToApi(function (err, createdUser, accessToken) {
			context.token = accessToken;
			context.user = createdUser;
			context.headers = {'X-Access-Token': accessToken};
			done(err);
		});
	});

collections
	.when('authorized')
	.and('correct collection payload', function (context) {
		context.collection = {name: 'test collection', description: 'my test collection'};
	})
	.and('new collection created', function (context, done) {
		request.post('/api/collections', {headers: context.headers, body: context.collection}, done);
	})
	.should('respond with 201 (created)', function (context, expect) {
		expect(context.results[0].statusCode).to.equal(201);
	})
	.should('return new collection', function (context, expect) {
		expect(context.results[1].name).to.equal('test collection');
		expect(context.results[1].description).to.equal('my test collection');
	});

collections
	.when('authorized')
	.and('name is missing', function () {
		context.collection = {description: 'my test collection'};
	})
	.and('new collection created')
	.should('respond 412 (bad request)', function (context, expect) {
		expect(context.results[0].statusCode).to.equal(412);
	});

collection
	.when('authorized')
	.and('description is missing', function () {
		context.collection = {name: 'test collection'};
	})
	.and('new collection created')
	.should('respond 412 (bad request)');