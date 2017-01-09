import axios from 'axios';
import store from '../store.js';
import { connect } from 'react-redux';

var React         = require('react')
var AccountFields = require('./AccountFields')
//var SurveyFields  = require('./SurveyFields')
//var Confirmation  = require('./Confirmation')
//var Success       = require('./Success')

var fieldValues = {
  name     : null,
  answer   : null
}

const UserForm = React.createClass({
	getInitialState: function() {
		return {
			step: 1
		}
	},

	saveValues: function(fields) {
		var board = store.getState().boardState.board
		console.log("THE BOARD")
	 	var boardId = board.board_id
	  	var boardName = board.board_name

	    fieldValues = Object.assign({}, fieldValues, fields)

	    var payload = {
	    	sway: 1,
	    	status: 0,
	    	votes: 1,
	    	feature_text: fieldValues.answer,
	    	board_id: boardId,
	    	board_name: boardName
	    }

	    // INSERT into Cassandra
	    var postUp = "http://localhost:8080/api/v1/add/feature"
	    axios.post(postUp, payload).then(response => {
	    	store.dispatch({
	    		type: 'BOARD_ADD_FEATURE',
	    		newFeature: payload
	    	})
	      })
	      .catch(function (error) {
	    	console.log("PROBLEMS!");
	    	console.log(error);
	      });
	},

	nextStep: function() {
	  this.setState({
	    step : this.state.step + 1
	  })
	},

	// Same as nextStep, but decrementing
	previousStep: function() {
	  this.setState({
	    step : this.state.step - 1
	  })
	},	

	render: function() {
		return <AccountFields fieldValues={fieldValues} nextStep={this.nextStep} saveValues={this.saveValues} />
	}
})

module.exports = UserForm