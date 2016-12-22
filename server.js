// server.js
var stringHelpers = require('./utilities/stringHelpers.js');
var cassandraHelpers = require('./utilities/cassandraHelpers.js');
var express = require('express');
var path = require('path');
var compression = require('compression');
var bodyParser = require('body-parser')
const cassandra = require('cassandra-driver');

// ---------------------------
// Initialize Server
// ---------------------------
var app = express();
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// ---------------------------
// API 
// ---------------------------
app.post('/api/v1/add/feature', (req, res) => {
	console.log(req.body);
	var sway = 0;
	var status = 0;
	var votes = 0;
	var feature_text = req.body.featureText;
	var board_id = req.body.boardId;

	//Connect to the cluster
	const client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'dev'});
	const query = stringHelpers.parse("INSERT INTO features (feature_id, added_date, board_id, feature_text, votes, status, sway) VALUES (uuid(), toTimestamp(now()), " + board_id + ", \'" + feature_text + "\', \'" + votes + "\', \'" + status + "\', \'" + sway + "\')");

	client.execute(query, function (err, result) {
		console.log("Connected to Cassandra. Executing query: %s", query);
		if(!err) { 
			res.status(200).send("INSERT successful");
		} else {
			console.log(err);
			res.status(500).send(["Error"]);			
		}
		client.shutdown();
	});	
});

app.post('/api/v1/add/board', (req, res) => {
	console.log(req.body);
	var board_name = req.body.boardName;
	var question = req.body.question;
	var team_id = req.body.teamId;

	//Connect to the cluster
	const client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'dev'});
	const query = stringHelpers.parse("INSERT INTO boards (board_id, added_date, board_name, question, team_id) VALUES (uuid(), toTimestamp(now()), \'" + board_name + "\', \'" + question + "\', " + team_id + ")");

	client.execute(query, function (err, result) {
		console.log("Connected to Cassandra. Executing query: %s", query);
		if(!err) { 
			res.status(200).send("INSERT successful");
		} else {
			console.log(err);
			res.status(500).send(["Error"]);			
		}
		client.shutdown();
	});
});

app.post('/api/v1/add/team', (req, res) => {
	console.log(req.body);
	var team_name = req.body.teamName;
	var company_id = req.body.companyId;

	//Connect to the cluster
	const client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'dev'});
	const query = stringHelpers.parse("INSERT INTO team (team_id, added_date, team_name, company_id) VALUES (uuid(), toTimestamp(now()), \'" + team_name + "\', \'" + company_id + "\')");

	client.execute(query, function (err, result) {
		console.log("Connected to Cassandra. Executing query: %s", query);
		if(!err) { 
			res.status(200).send("INSERT successful");
		} else {
			console.log(err);
			res.status(500).send(["Error"]);			
		}
		client.shutdown();
	});
});

app.post('/api/v1/add/company', (req, res) => {
	var company = req.body.companyName
	console.log(company)

	//Connect to the cluster
	const client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'dev'});
	const query = stringHelpers.parse("INSERT INTO company (company_id, added_date, company_name) VALUES (uuid(), toTimestamp(now()), \'" + company + "\')");

	client.execute(query, function (err, result) {
		if(!err) { 
			console.log("Connected to Cassandra. Executing query: %s", query);
			console.log("Got response: "); console.log(result);
			res.status(200).json({  message:"INSERT successful" });
		} else {
			console.log(err);
			res.status(500).json({ message:"Error" });			
		}
		client.shutdown();
	});
});

app.get('/api/v1/boards/', (req, res) => {
	//Connect to the cluster
	const client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'dev'});
	const query = stringHelpers.parse("SELECT * FROM boards");

	// Read users and print to console
	client.execute(query, function (err, result) {
		if(!err) {
			console.log("Connected to Cassandra. Executing query: %s", query);	
			if ( result.rows.length > 0 ) {
				console.log(result.rows);
				res.status(200).send(result.rows);
			} else {
				console.log("No results");
				res.status(404).send(["Sorry"]);
			}
		} else {
			console.log(err);
			res.status(500).send(["Error"]);
		}
		client.shutdown();
	});
});

app.get('/api/v1/boards/:boardId', (req, res) => {
	var board_id = req.params.boardId;
	console.log("Board_id: ".concat(board_id));

	//Connect to the cluster
	const client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'dev'});
	const query = stringHelpers.parse("SELECT * FROM boards WHERE board_id=%s", board_id);

	// Read users and print to console
	client.execute(query, function (err, result) {
		if(!err) {
			console.log("Connected to Cassandra. Executing query: %s", query);	
			if ( result.rows.length > 0 ) {
				console.log(result.rows);
				res.status(200).send(result.rows);
			} else {
				console.log("No results");
				res.status(404).send(["Sorry"]);
			}
		} else {
			console.log(err);
			res.status(500).send(["Error"]);
		}
		client.shutdown();
	});
});

app.get('/api/v1/featuresOfBoard/:board_id', (req, res) => {
	var board_id = req.params.board_id;
	console.log("Board_id: " + board_id);

	//Connect to the cluster
	const client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'dev'});
	const query = stringHelpers.parse("SELECT * FROM features_of_board WHERE board_id=%s", board_id);

	// Read users and print to console
	client.execute(query, function (err, result) {
		if(!err) {
			console.log("Connected to Cassandra. Executing query: %s", query);	
			if ( result.rows.length > 0 ) {
				console.log(result.rows);
				res.status(200).send(result.rows);
			} else {
				console.log("No results");
				res.status(404).send(["Sorry"]);
			}
		} else {
			console.log(err);
			res.status(500).send(["Error"]);
		}
		client.shutdown();
	});
});

app.get('/api/v1/test', (req, res) => {
	console.log(req.query.q);

	//Connect to the cluster
	const client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'dev'});
	const query = stringHelpers.parse("SELECT tempid, temp_dept, temp_first, temp_last FROM temp WHERE tempid=%s", req.query.q);

	// Read users and print to console
	client.execute(query, function (err, result) {
		if(!err) {
			console.log("Connected to Cassandra. Executing query: %s", query);	
			if ( result.rows.length > 0 ) {
				console.log(result.rows);
				res.status(200).send(result.rows);
			} else {
				console.log("No results");
				res.status(404).send(["Sorry"]);
			}
		} else {
			console.log(err);
			res.status(500).send(["Error"]);
		}
		client.shutdown();
	});
});

app.get('/', function (req, res) {
  res.send('Hello World!\n');
})

app.get('*', function(req, res) {
  console.log("DID NOT CATCH");
  res.status(404).send(["WHAT ARE YOU TRYING TO DO??!?!?!?"]);
});

// ---------------------------
// Run the Server
// ---------------------------
app.set('port', (process.env.PORT || 3001));
app.listen(app.get('port'), function() {
  console.log('Production Express server running at localhost:' + app.get('port'));
});