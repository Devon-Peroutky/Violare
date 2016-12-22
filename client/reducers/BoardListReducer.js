import { createStore, combineReducers } from 'redux';

const initialState = {
	boards: []
}

// The Board Reducer
const boardListReducer = function(state = initialState, action) {
  switch(action.type) {
  	case 'BOARD_LIST_SUCCESS':
  		return Object.assign({}, state, { boards: action.returned_boards });
  }
  return state;
}

export default boardListReducer;