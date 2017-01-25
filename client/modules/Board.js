import React from 'react';
import axios from 'axios';
import store from '../store.js';
import { connect } from 'react-redux';
import NavLink from './NavLink';
import UserForm from './UserForm';
import Feature from './Feature';
var stringHelpers = require('../utilities/stringHelpers.js');

var BoardView = React.createClass({
  render: function() {    
    var boardFeatures = store.getState().boardState.features;
    var board = store.getState().boardState.board;
    console.log(boardFeatures)
    var listFeatures = boardFeatures.map((boardFeature) => 
      <li className ="list-group-item" key={boardFeature.feature_id}>
        <Feature 
          feature_id = { boardFeature.feature_id }
          feature_summary = { boardFeature.feature_summary }
          desire = { boardFeature.desire }
          email = { boardFeature.email }
          organization = { boardFeature.organization }
          name = { boardFeature.name }
          feature_text = { boardFeature.feature_text }
          board_id = { board.board_id }
          status = { boardFeature.status }/>
      </li>);
    return (
      <div>
        <h1>{board.board_name}</h1>
        <h2>{board.question}</h2>
        <ul className = "list-group" id="featureList">
          {listFeatures}
          <li className ="list-group-item"><UserForm /></li>
        </ul>
      </div>
    )
  }
});

var BoardContainer = React.createClass({
  currentBoard: function(boardId) {
    var boardResourcePath = stringHelpers.parse("http://localhost:8080/api/v1/boards/%s", boardId);
    axios.get(boardResourcePath)
      .then(response => {
        console.log(response.data)
        store.dispatch({
          type: 'BOARD_CURRENT',
          active_board: response.data
        });
      })
      .catch(function (error) {
        console.log("PROBLEMS!");
        console.log(error);
      }); 
  },

  // List all of the Features of this board
  getFeaturesOfBoard: function(boardId) {
    var boardResourcePath = stringHelpers.parse("http://localhost:8080/api/v1/featuresOfBoard/%s", boardId);
    axios.get(boardResourcePath)
      .then(response => {
        store.dispatch({
          type: 'BOARD_DESCRIBE_SUCCESS',
          returned_board: response.data
        });
      })
      .catch(function (error) {
        store.dispatch({
          type: 'BOARD_DESCRIBE_SUCCESS',
          returned_board: []
        });
        console.log("PROBLEMS!");
        console.log(error);

      });
  },  

  getInitialState: function() {
    return this.props.currentBoard
  },

  componentDidMount: function() {
    // Get current boardId from URI params
    var boardId = this.props.params.boardId;

    // Set state
    this.currentBoard(boardId)

    // Get feature of current board
    this.getFeaturesOfBoard(boardId)

    console.log(store.getState())
  },

  render: function() {
    var boardFeatures = this.props.boardFeatures ? this.props.boardFeatures : [];
    return (
      <BoardView />
    )
  }
});


const mapStateToProps = function(store) {
  return {
  	currentBoard: store.boardState.board,
    boardFeatures: store.boardState.features
  };
}

export default connect(mapStateToProps)(BoardContainer);