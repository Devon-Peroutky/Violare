const cassandra = require('cassandra-driver');

function getCassandraClient() {
	return new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'dev'});
}

module.exports = {
	SELECT: function (query) {
		var client = getCassandraClient()
		var returnObject = {}
		var status = 200		

		var response = client.execute(query, function (err, result) {
			console.log("Connected to Cassandra. Executing query: %s", query);	
			if(!err) {
				if ( result.rows.length > 0 ) {
					console.log(result.rows);
					status = 200;
					returnObject = { data: result.rows };
				} else {
					console.log("No results");
					status = 404;
					returnObject = { data: [] };
				}
			} else {
				console.log(err);
				status = 500;
				returnObject = { data: [] };
			}
			client.shutdown();
			console.log("HEYYYY");
			console.log(status);
			console.log(returnObject);
			return [status, returnObject];
		});
		console.log("HOOOOO");
		console.log(status);
		console.log(returnObject);	
		return response;
	}, 

	INSERT: function (query) {
		var client = getCassandraClient()
		var returnObject = {}
		var status = 200
		var response = client.execute(query, function (err, result) {
			console.log("Connected to Cassandra. Executing query: %s", query);
			if(!err) { 
				
				console.log("Got response: "); console.log(result);
				returnObject = { message:"INSERT successful!" };
				status = 200;
			} else {
				console.log(err);
				returnObject = { message:"ERROR attempting to INSERT!" };
				status = 500;
			}
			client.shutdown();
			console.log(status);
			console.log(returnObject);			
			return [status, returnObject];
		});
		console.log(status);
		console.log(returnObject);		
		return response;
	}
};