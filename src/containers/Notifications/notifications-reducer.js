import { FETCHED_NOTIFICATIONS } from './notifications-actions';

export const initialNotifcationsState = {
  filters: {},
  notifications: [],
};

export const notificationsReducer = (state, action) => {
  switch (action.type) {
    case FETCHED_NOTIFICATIONS:
      return { ...state, notifications: [ ...action.notifications ] };
    default:
      return state;
  }
};