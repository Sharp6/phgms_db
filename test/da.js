// These tests will depend on the RethinDB API

"use strict"

var chai = require("chai"), expect = chai.expect;
chai.use(require('chai-as-promised'));
chai.use(require('sinon-chai'));

var sinon = require('sinon');

function createDependencies() {
	var insertSpy = sinon.stub();
	var connectSpy = sinon.stub();
	connectSpy.returns({ not: "empty" });

	return {
		r: {
			connect: connectSpy,
			db: function(dbName) {
				return {
					table: function(dbname) {
						return {
							insert: function() {
								return {
									run: insertSpy
								}	
							}
						}
					}		
				}
			}
		}
	}
}

var phgmsDb = require('../index');

describe("Database functionality", function() {
	beforeEach(function() {
		this.dependencies = createDependencies();
		this.config = {
			dbName: "phgms"
		}
		this.db = new phgmsDb(this.dependencies,this.config);
	});

	it("should have connected to the database", function() {
		expect(this.dependencies.r.connect).to.have.been.called.once;
	});

	describe("An insert is requested", function() {
		beforeEach(function() {
			this.db.insert({foo: "bar"});
		});

		it("should insert the object into the database", function() {
			expect(this.dependencies.r.db(this.config.dbName).table(this.config.dbName).insert().run).to.have.been.called.once;
		});

	}); 
});

