module.exports = function(dependencies, config) {
	var dbName = config.dbName || "test";
	var dbHost = config.dbHost || "localhost";
	var dbPort = config.dbPort || 28015;
	var tableName = config.tableName || "test";

	var connection;
	connectToDb();

	function insert(objToPersist) {
		if(connection) {
			dependencies.r.db(dbName).table(tableName).insert(objToPersist).run(connection, function(err,res) {
				if(err) throw err;
				console.log(res);
			});
		} else {
			// No connection has been made yet.
			console.log("No connection");
			
			connectToDb(function(err,conn) {
				insert(objToPersist);	
			});
		}
	}

	function connectToDb(cb) {
		dependencies.r.connect({ host: dbHost, port: dbPort }, function(err, conn) {
	  	if(err) throw err;
	  	connection = conn;
	  	cb(null, connection);
	  });
	}

	return {
		insert: insert
	}
}