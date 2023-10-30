import { USER_FETCHED, USER_ADD_FAVORITE } from './profile-actions';
import * as userService from '../../service/user-service';


export const initialProfileState = undefined;

export const profileReducer = (state, action) => {
  switch (action.type) {
    case USER_FETCHED:
      return {
        ...state,
        ...action.user,
      }
    case USER_ADD_FAVORITE:
      const newFavorites = userService.addFavorites(action.productUids, state.email);
      
      return {
        ...state,
        favorites: [
          ...newFavorites,
        ]
      }
    default:
      return state;
  }
};