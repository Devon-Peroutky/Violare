import { combineReducers } from 'redux';

// Reducers
import boardReducer from './BoardReducer.js';
import featureReducer from './FeatureReducer.js';

// Combine Reducers
var reducers = combineReducers({
    boardState: boardReducer,
    featureState: featureReducer
});

export default reducers;