import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_FETCHED } from './cart-actions';

import * as cartService from '../../service/cart-service';


export const initialCartState = {
  hasFetched: false,
  items: [],
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      let cartState = {};
      const itemAdded = state.items.find(item => item.id === action.item.id)  

      if (itemAdded !== undefined || state.items.length > 0) {  
        return { ...state };
      }

      cartState = {
        ...state,
        items: [
          ...state.items,
          action.item,
        ],
      };

      cartService.set(cartState);
      
      return { ...cartState };

    case CART_REMOVE_ITEM:
      const cartRemove = {
        ...state,
        items: [
          ...state.items.filter(item => item.id !== action.productId),
        ]
      };

      cartService.set(cartRemove);
      
      return { ...cartRemove };
    case CART_FETCHED:
      const cart = {
        ...state,
        ...action.cart,
        hasFetched: true,
      }

      cartService.set(cart);

      return { ...cart };
    default:
      return state;
  }
};