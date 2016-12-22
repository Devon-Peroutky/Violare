import { combineReducers } from 'redux';

// Reducers
import boardReducer from './BoardReducer.js';
import boardListReducer from './BoardListReducer.js';
import featureReducer from './FeatureReducer.js';

// Combine Reducers
var reducers = combineReducers({
	boardState: boardReducer,
    boardListState: boardListReducer,
    featureState: featureReducer
});

export default reducers;