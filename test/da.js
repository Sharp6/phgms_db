// These tests will depend on the RethinDB API

"use strict"

var chai = require("chai"), expect = chai.expect;
chai.use(require('chai-as-promised'));
chai.use(require('sinon-chai'));

var phgmsDb = require('../index');

describe("An insert is requested", function() {
	beforeEach(function() {
		this.db = new phgmsDb();
		this.db.insert({foo: "bar"});
	});

	it("should insert the object into the database");

}); 