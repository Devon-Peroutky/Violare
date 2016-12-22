import React from 'react'
import { connect } from 'react-redux';
import store from '../reducers/FeatureReducer.js';
import axios from 'axios';
var stringHelpers = require('../utilities/stringHelpers.js');


export default React.createClass({

  getInitialState: function() {
  	console.log("Setting the intial state")
    return {
      features: []
    };
  },

  componentDidMount: function() {
  	var boardId = "668b92ac-4df7-49fa-9909-f966147472f8"
  	var boardResourcePath = stringHelpers.parse("http://localhost:3001/api/featuresOfBoard/%s"
  	
    axios.get("").then(response => {
      this.setState({users: response.data});
    });
  },

  render: function() {
	  return (
	      <div>
	        <h2>{this.props.params.boardId}</h2>
	      </div>
      )
  }
})