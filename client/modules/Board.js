import React from 'react';
import axios from 'axios';
import store from '../store.js';
import { connect } from 'react-redux';
import NavLink from './NavLink';
import UserForm from './UserForm'
var stringHelpers = require('../utilities/stringHelpers.js');

var BoardView = React.createClass({
  render: function() {
    var boardFeatures = store.getState().boardState.features;
    var board = store.getState().boardState.board;
    const listFeatures = boardFeatures.map((boardWithFeatures) => 
      <li key={boardWithFeatures.feature_id}>
        <NavLink to={ "/feature/" + boardWithFeatures.feature_id } key = { boardWithFeatures.feature_id }>
          {boardWithFeatures.feature_text}, {boardWithFeatures.status}, {boardWithFeatures.sway}
        </NavLink>
        <button onClick = { () => this.upvote(board.board_id, boardWithFeatures.feature_id) } >I want this!</button>
      </li>
    );
    return (
      <div>
        <h1>{board.board_name}</h1>
        <h2>{board.question}</h2>
        <ul>{listFeatures}</ul>
      </div>
    )
  },

  upvote: function(board_id, feature_id) {
    var featureUpvotePath = stringHelpers.parse("http://localhost:8080/api/v1/upvote/%s/%s", board_id, feature_id);
    console.log(featureUpvotePath)
    axios.post(featureUpvotePath)
      .then(response => {
        console.log(response.data)    
      })
      .catch(function (error) {
        console.log("PROBLEMS!");
        console.log(error);
      });
  }
});

const BoardContainer = React.createClass({
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
      <div>
        <BoardView />
        <UserForm />
      </div>
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