import React, { useReducer, createContext } from 'react';
import combineReducer from './combineReducer';

import { agentReducer, initialAgentState } from '../../containers/Agent/agent-reducer';
import { newsReducer, initialNewsState } from '../../containers/News/news-reducer';
import { notificationsReducer, initialNotifcationsState } from '../../containers/Notifications/notifications-reducer';
import { profileReducer, initialProfileState } from '../../containers/Profile/profile-reducer';

export const Context = createContext(null);

export const Provider = ({ children }) => {
  const [ state, dispatch ] = combineReducer({
    agents: useReducer(agentReducer, initialAgentState),
    news: useReducer(newsReducer, initialNewsState),
    user: useReducer(profileReducer, initialProfileState),
    notifications: useReducer(notificationsReducer, initialNotifcationsState),
  })

  return (
    <Context.Provider value={[ state, dispatch ]}>
      { children }
    </Context.Provider>
  )
};
