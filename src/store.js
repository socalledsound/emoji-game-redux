import { createStore, combineReducers } from 'redux';
import { gameReducer } from './Game';

const rootReducer = combineReducers({
    game : gameReducer,
})

const store = createStore(
    rootReducer
)

export default store