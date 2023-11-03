import { AGENTS_SET_AGENTS_LIST } from './agent-actions';

export const initialAgentState = {
  items: [],
};

export const agentReducer = (state, action) => {
  switch (action.type) {
    case AGENTS_SET_AGENTS_LIST:
      return { ...state, items: action.agents };
    default:
      return state;
  }
};