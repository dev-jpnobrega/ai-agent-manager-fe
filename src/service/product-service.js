// import axios from 'axios';
import productsMock from '../assets/products.json';

/*
const OPTIONS_REQUEST = {
  headers: {
    'Accept': **',
    'Content-Type': 'application/json'
  },
}
*/

export const get = async (params) => {
  return productsMock.data;
}