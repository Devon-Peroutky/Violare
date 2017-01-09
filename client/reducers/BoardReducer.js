import { createStore, combineReducers } from 'redux';

const initialState = {
	board: {},
	features: []
}

// The Board Reducer
const boardReducer = function(state = initialState, action) {
  switch(action.type) {
  	case 'BOARD_CURRENT':
  		return Object.assign({}, state, { board: action.active_board })
  	case 'BOARD_DESCRIBE_SUCCESS':
  		return Object.assign({}, state, { features: action.returned_board });
    case 'BOARD_ADD_FEATURE':
      var updatedFeatures = [...state.features, action.newFeature]
      return Object.assign({}, state, { features: updatedFeatures });
  }
  return state;
}

export default boardReducer;