var React = require('react')
import axios from 'axios';
var stringHelpers = require('../utilities/stringHelpers.js');

var Feature = React.createClass({
    getInitialState: function() {
       return { 
       	voted : false 
       };
    },
	upvote: function(board_id, feature_id) {
		if (!this.state.voted) {
			var featureUpvotePath = stringHelpers.parse("http://localhost:8080/api/v1/upvote/%s/%s", board_id, feature_id);
			console.log(featureUpvotePath);
			axios.post(featureUpvotePath)
			  .then(response => {
			    console.log(response.data);
			    this.setState({ voted: true });
			  })
			  .catch(function (error) {
			    console.log("PROBLEMS!");
			    console.log(error);
			  });
		}
	},
	render: function() {
		console.log(this.props);
	    var statusMap = { 
	      0: "Pending Decision", 
	      1: "Planned", 
	      2: "Will not do", 
	      3: "Currently working on", 
	      4: "Incorporated!"
	    };
	    console.log(this.state.voted);
		return ( 
		  <div>
		    {this.props.feature_text}<br/>
		    <button className="btn btn-success" data-toggle="button" aria-pressed= { this.state.voted } onClick = { () => this.upvote(this.props.board_id, this.props.feature_id) } >I want this!</button>
		    <span className="badge badge-default badge-pill" id="featureStatus">{statusMap[this.props.status]}</span>
		  </div>
		)
	}
})

module.exports = Feature