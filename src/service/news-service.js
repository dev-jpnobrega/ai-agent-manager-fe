import newsMock from '../assets/products.json';

export const fetchNews = async (params) => {
  return newsMock.data;
}