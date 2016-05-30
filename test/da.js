// These tests will depend on the RethinDB API

"use strict"

var chai = require("chai"), expect = chai.expect;
chai.use(require('chai-as-promised'));
chai.use(require('sinon-chai'));

var sinon = require('sinon');

function createDependencies() {
	var insertSpy = sinon.spy();
	
	return {
		r: {
			table: function(dbname) {
				return {
					insert: insertSpy
				}
			}
		}
	}
}

var phgmsDb = require('../index');

describe("An insert is requested", function() {
	beforeEach(function() {
		this.dependencies = createDependencies();
		this.config = {
			dbName: "phgms"
		}
		this.db = new phgmsDb(this.dependencies,this.config);
		this.db.insert({foo: "bar"});
	});

	it("should insert the object into the database", function() {
		expect(this.dependencies.r.table(this.config.dbName).insert).to.have.been.called.once;
	});

}); 