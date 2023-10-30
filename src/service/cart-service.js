
const CART_LOCAL_STORAGE = 'cart';


const createOrGet = () => {
  const cart = get();

  if (cart !== null) return cart;

  create();

  return JSON.parse(get());
}

export const set = (cart) => localStorage.setItem(CART_LOCAL_STORAGE, JSON.stringify(cart));

export const get = () => {
  return JSON.parse(localStorage.getItem(CART_LOCAL_STORAGE));
}

export const create = () => {
  return set({
    items: [],
  });
}

export const addItems = (items = []) => {
   const cart = createOrGet();
   
   const cartNew = {
     ...cart,
     items: [
       ...cart.items,
       ...items,
     ]
   }
   
   set(cartNew);

   return true;
}

