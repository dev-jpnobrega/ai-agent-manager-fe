import Wrapper from './components/Wrapper';

import Page404 from './pages/404';
import Agents from './pages/ListAgents';
import Agent from './pages/Agent';
import UseCases from './pages/UseCases';
import Permissions from './pages/Permissions';
import { getLocallyChats } from './service/chat-service';
import HistoryChats from './pages/HistoryChats';

export default [
  {
    path: "/",
    component: Wrapper,
    exact: true,
    showMenu: false,
  },
  {
    path: "/404",
    component: Page404,
    showMenu: false,
  },
  {
    path: "/agents",
    component: Agents,
    showMenu: true,
    title: 'agents',
    description: 'Agents'
  },
  {
    path: "/agent",
    component: Agent,
    showMenu: false,
    title: 'create.agents',
    description: 'Agents'
  },
  {
    path: "/history-chats",
    component: HistoryChats,
    showMenu: !!getLocallyChats(),
    title: 'history.chats',
    description: 'Chats'
  },
  {
    path: "/use-cases",
    component: UseCases,
    showMenu: true,
    title: 'use.cases',
    description: 'Use cases'
  },
  {
    path: "/permissions",
    component: Permissions,
    showMenu: true,
    title: 'permissions',
    description: 'Permissions'
  },
];
