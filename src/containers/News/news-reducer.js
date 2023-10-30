import { fetchNews } from '../../service/news-service';
import { FETCH_NEWS, FETCHED_NEWS } from './news-actions';

export const initialNewsState = {
  news: [],
  newsFilter: [],
};

export const newsReducer = (state, action) => {
  switch (action.type) {
    case FETCHED_NEWS:
      return { ...state, news: [ ...action.news ] };
    case FETCH_NEWS:
      const result = fetchNews(action);
      return { ...state, news: [ ...result ] };
    default:
      return state;
  }
};