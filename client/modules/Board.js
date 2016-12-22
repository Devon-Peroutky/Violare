import React from 'react';
import axios from 'axios';
import store from '../store.js';
import { connect } from 'react-redux';
import NavLink from './NavLink';
var stringHelpers = require('../utilities/stringHelpers.js');

function Board(props) {
  console.log("IN HERE DAWG");
  const board = props.board;
  const listFeatures = board.map((boardWithFeatures) => 
    <li key={boardWithFeatures.feature_id}><NavLink to={ "/feature/" + boardWithFeatures.feature_id }>{boardWithFeatures.board_name}: {boardWithFeatures.feature_text}, {boardWithFeatures.status}, {boardWithFeatures.sway}</NavLink></li>
  );
  return (
    <ul>{listFeatures}</ul>
  )

  return (
    <div>
      <h1>{board.board_name}</h1>
      <h2>{board.question}</h2>
    </div>
  )
}

const BoardContainer = React.createClass({
  getInitialState: function() {
  	console.log("Setting the intial state of the board");
    return {
      board: []
    };
  },

  componentDidMount: function() {
  	var boardId = this.props.params.boardId;
  	var boardResourcePath = stringHelpers.parse("http://localhost:8080/api/v1/featuresOfBoard/%s", boardId);
  	console.log(boardResourcePath);
    axios.get(boardResourcePath).then(response => {
    	console.log("SUCCESS!");
    	store.dispatch({
    		type: 'BOARD_DESCRIBE_SUCCESS',
    		returned_board: response.data
    	});
    });
  },

  render: function() {
    var board = this.props.board ? this.props.board : [];
    return (
      <Board board={ board } />
    )
  }	
});


const mapStateToProps = function(store) {
  return {
  	board: store.boardState.board
  };
}

export default connect(mapStateToProps)(BoardContainer);