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
// Initialize application logic
// ---------------------------

// ---------------------------
// API 
// ---------------------------

// -----------------------------------------------
// Submit comment on a specific feature
//	1. INSERT INTO temp_comments_no_users
// 	2. WE WANT TO BE ABLE TO INSERT INTO comments
// -----------------------------------------------
app.post('/api/v1/add/comment', (req, res) => {
	console.log(req.body);
	var board_id = req.body.board_id;
	var feature_id = req.body.feature_id;
	var comment_text = req.body.comment_text;

	//Connect to the cluster
	const client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'dev'});
	const query = stringHelpers.parse("INSERT INTO temp_comments_no_user_id (board_id, feature_id, comment_id, added_date, comment_text) VALUES (?, ?, uuid(), toTimestamp(now()), ?)");

	client.execute(query, [board_id, feature_id, comment_text], { prepare: true }, function(err, result) {
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




// ---------------------------------
// Add Feature
//	1: INSERT INTO features_of_board 
// ---------------------------------
app.post('/api/v1/add/feature', (req, res) => {
	console.log(req.body);
	// Board
	var board_id = req.body.board_id;
	var board_name = req.body.board_name;

	// Feature	
	var name = req.body.name;
	var email = req.body.email;
	var organization = req.body.organization;
	var feature_summary = req.body.feature_title;
	var feature_text = req.body.feature_text;
    var desire = req.body.desire;
	var status = 0;

	//Connect to the cluster
	const client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'dev'});
	const query = stringHelpers.parse("INSERT INTO features_of_board (feature_id, added_date, board_id, board_name, name, email, organization, feature_summary, feature_text, status) VALUES (uuid(), toTimestamp(now()), ?, ?, ?, ?, ?, ?, ?, ?)");

	client.execute(query, [board_id, board_name, name, email, organization, feature_summary, feature_text, status], {prepare: true}, function (err, result) {
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

// ----------------------------------------------------------
// Upvote a specific Feature of a board
//	1: UPDATE the value of the counter in feature_election +1
// ----------------------------------------------------------
app.post('/api/v1/upvote/:board_id/:feature_id', (req, res) => {
	var board_id = req.params.board_id;
	var feature_id = req.params.feature_id;
	console.log("Board_id: " + board_id, "feature_id:" + feature_id);

	//Connect to the cluster
	const client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'dev'});
	const query = stringHelpers.parse("UPDATE feature_election SET votes = votes + 1 WHERE feature_id = ? AND board_id = ?");

	client.execute(query, [feature_id, board_id], { prepare: true }, function (err, result) {
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

// ----------------------------------------------------------
// Upvote a specific Feature of a board
//	1: UPDATE the value of the counter in feature_election -1
// ----------------------------------------------------------
app.post('/api/v1/unvote/:board_id/:feature_id', (req, res) => {
	var board_id = req.params.board_id;
	var feature_id = req.params.feature_id;
	console.log("Board_id: " + board_id, "feature_id:" + feature_id);

	//Connect to the cluster
	const client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'dev'});
	const query = stringHelpers.parse("UPDATE feature_election SET votes = votes - 1 WHERE feature_id = ? AND board_id = ?");

	client.execute(query, [feature_id, board_id], { prepare: true }, function (err, result) {
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

// ----------------------------------------------------------
// ADD a new board
//	1: INSERT INTO new board to the boards table
// ----------------------------------------------------------
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

// ----------------------------------------------------------
// ADD a new team
//	1: INSERT INTO new team to the teams table
// ----------------------------------------------------------
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


// ----------------------------------------------------------
// ADD a new company
//	1: INSERT INTO new board to the company table
// ----------------------------------------------------------
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


// ----------------------------------------------------------
// GET list of all boards
// ----------------------------------------------------------
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

// ----------------------------------------------------------
// DEPRECATED??!??!?!?!
// ----------------------------------------------------------
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
			if ( result.rows.length == 1 ) {
				console.log(result.rows[0]);
				res.status(200).send(result.rows[0]);
			} else if ( result.rows.length > 1 ) {
				console.log(err);
				res.status(500).send(["Error. Found more than one board with that boardId."]);
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

// ----------------------------------------------------------
// GET list of all features for a specific board
// ----------------------------------------------------------
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

// ----------------------------------------------------
// GET list of all of the comments for a specific board
// ----------------------------------------------------
app.get('/api/v1/commentsOfFeature/:board_id/:feature_id', (req, res) => {
	var board_id = req.params.board_id;
	var feature_id = req.params.feature_id;
	console.log("Board_id: " + board_id);
	console.log("Feature_id: " + feature_id);

	//Connect to the cluster
	const client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'dev'});
	const query = stringHelpers.parse("SELECT * FROM temp_comments_no_user_id WHERE board_id=%s AND feature_id=%s", board_id, feature_id);

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
})


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