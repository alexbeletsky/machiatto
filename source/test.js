function Test(testName, specName) {
	this.testName = testName;
	this.specName = specName;
}

Test.prototype.slow = function () {
	return 100;
};

Test.prototype.fullTitle = function () {
	return this.specName + ' - ' + this.testName;
};

module.exports = Test;