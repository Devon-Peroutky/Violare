import React from 'react'
import { connect } from 'react-redux';
import store from '../store/BoardStore.js';
import axios from 'axios';
var stringHelpers = require('../utilities/stringHelpers.js');

const BoardListContainer = React.createClass({
  getInitialState: function() {
  	console.log("Setting the intial state")	
    return {
      boards: []
    };
  },

  componentDidMount: function() {
  	var boardId = "668b92ac-4df7-49fa-9909-f966147472f8"
  	var boardResourcePath = stringHelpers.parse("http://localhost:8080/api/boards/%s", boardId)
  	console.log(boardResourcePath);
    axios.get(boardResourcePath).then(response => {
    	console.log("SUCCESS!");
    	console.log(response.data);
    	store.dispatch({
    		type: 'BOARD_LIST_SUCCESS',
    		returned_boards: response.data
    	});
    });
  },

  render: function() {
	return (<div><h2>{this.props.boards}</h2></div>);
  }	
});

const mapStateToProps = function(store) {
	console.log("Mapping: ");
	console.log(store)
	return {
		boards: store.boardState.boards
	};
}

export default connect(mapStateToProps)(BoardListContainer);