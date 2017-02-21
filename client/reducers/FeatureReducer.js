import { createStore, combineReducers } from 'redux';

const initialState = {
	comments: []
}

// The Feature Reducer
const featureReducer = function(state = initialState, action) {
  switch(action.type) {
  	case 'FEATURE_DESCRIBE':
  		return Object.assign({}, state, { comments: action.returned_comments });
	case 'FEATURE_ADD_COMMENT':
		var updatedComments = [...state.comments, action.newComment];
		return Object.assign({}, state, { comments: updatedComments });
  }
  return state;
}

export default featureReducer;