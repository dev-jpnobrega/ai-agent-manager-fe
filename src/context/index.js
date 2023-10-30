import React, { useReducer, createContext } from 'react';
import combineReducer from './combineReducer';

import { cartReducer, initialCartState } from '../containers/Cart/cart-reducer';
import { newsReducer, initialNewsState } from '../containers/News/news-reducer';
import { productsReducer, initialProductsState } from '../containers/Products/products-reducer';
import { notificationsReducer, initialNotifcationsState } from '../containers/Notifications/notifications-reducer';
import { profileReducer, initialProfileState } from '../containers/Profile/profile-reducer';

export const Context = createContext(null);

export const Provider = ({ children }) => {
  const [ state, dispatch ] = combineReducer({
    cart: useReducer(cartReducer, initialCartState),
    news: useReducer(newsReducer, initialNewsState),
    products: useReducer(productsReducer, initialProductsState),
    user: useReducer(profileReducer, initialProfileState),
    notifications: useReducer(notificationsReducer, initialNotifcationsState),
  })

  return (
    <Context.Provider value={[ state, dispatch ]}>
      { children }
    </Context.Provider>
  )
};
