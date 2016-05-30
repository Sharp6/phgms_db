module.exports = function(dependencies, config) {
	var dbName = config.dbName || "test";

	function insert() {
		dependencies.r.table(dbName).insert();
	}

	return {
		insert: insert
	}
}