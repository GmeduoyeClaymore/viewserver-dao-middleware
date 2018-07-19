import {UPDATE_STATE, UPDATE_OPTIONS, UPDATE_COMMAND_STATUS} from './ActionConstants';

export const daoReducer = (state = {}, action) => {
    if (action.type && (action.type.startsWith(UPDATE_STATE('')) || action.type.startsWith(UPDATE_OPTIONS('')) || action.type.startsWith(UPDATE_COMMAND_STATUS('')))){
      return state.setIn(action.path || [], action.data);
    }
    return state;
};
  
export default daoReducer;