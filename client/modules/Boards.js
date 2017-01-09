import React from 'react';
import { connect } from 'react-redux';
import store from '../store.js';
import axios from 'axios';
import NavLink from './NavLink';
var stringHelpers = require('../utilities/stringHelpers.js');

function BoardList(props) {
  console.log(props);
  const boards = props.boards;
  const listBoards = boards.map((board) => 
    <li className ="list-group-item" key={board.board_id}>
      <NavLink to={ "/boards/" + board.board_id }>
        <h2 id="boardName">{board.board_name}</h2>      
        <h3 id="boardQuestion">{board.question}</h3>
      </NavLink>
    </li>
  );
  return (
    <ul className = "list-group">{listBoards}</ul>
  )
}

const BoardListContainer = React.createClass({
  getInitialState: function() {
  	console.log("Setting the intial state");
    return {
      board: []
    };
  },

  componentDidMount: function() {
    var boardResourcePath = "http://localhost:8080/api/v1/boards/";
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
    var boards = this.props.boards ? this.props.boards : [];
    return (
      <div>
        <h1>TeamName's boards </h1>
        <BoardList boards={ boards } />
      </div>
    )
  }	
});

const mapStateToProps = function(store) {
	return {
		boards: store.boardListState.boards
	};
}

export default connect(mapStateToProps)(BoardListContainer);