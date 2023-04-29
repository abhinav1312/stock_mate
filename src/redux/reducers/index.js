import {combineReducers} from 'redux';
import addToDbReducer from './addToDbReducer'

const reducers = combineReducers({
    addToDb: addToDbReducer
})

export default reducers;