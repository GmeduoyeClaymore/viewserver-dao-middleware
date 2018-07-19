import {combineReducers} from 'redux-seamless-immutable';
import {UPDATE_STATE, UPDATE_COMMAND_STATUS, UPDATE_OPTIONS, RESET_ALL_COMPONENT_STATE, UPDATE_COMPONENT_STATE, CLEAR_COMPONENT_STATE} from './dao/ActionConstants';

const dao = (state = {}, action) => {
  if (action.type && (action.type.startsWith(UPDATE_STATE('')) || action.type.startsWith(UPDATE_OPTIONS('')) || action.type.startsWith(UPDATE_COMMAND_STATUS('')))){
    return state.setIn(action.path || [], action.data);
  }
  return state;
};


export default daoReducer = dao;
