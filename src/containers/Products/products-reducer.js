import * as actions from './products-actions';

export const initialProductsState = {
  hasFetched: false,
  list: [],
  productSelected: null,
};

export const productsReducer = (state, action) => {
  switch (action.type) {
    case actions.PRODUCTS_FETCHED:
        return { ...state, productSelected: { ...action.product } };
    case actions.PRODUCTS_LIST_FETCHED:
      return { ...state, hasFetched: true, list: [ ...action.productsService ] };
    default:
      return state;
  }
};