import { createStore, combineReducers } from 'redux';

const initialState = {
	board: []
}

// The Board Reducer
const boardReducer = function(state = initialState, action) {
  switch(action.type) {
  	case 'BOARD_DESCRIBE_SUCCESS':
  		return Object.assign({}, state, { board: action.returned_board });
  }
  return state;
}

export default boardReducer;