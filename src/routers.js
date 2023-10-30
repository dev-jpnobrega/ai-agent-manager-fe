import Wrapper from './components/Wrapper';

import Page404 from './pages/404';
import Favorites from './pages/Favorites';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Product from './pages/Product';

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
    path: "/who-we-are",
    component: Favorites,
    showMenu: true,
    title: 'who we are',
    description: 'Who we are'
  },
  {
    path: "/contact",
    component: Contact,
    showMenu: true,
    title: 'contact',
    description: 'Your favorites'
  },
  {
    path: "/revenues",
    component: Favorites,
    showMenu: true,
    title: 'revenues',
    description: 'Revenues'
  },
  {
    path: "/favorites",
    component: Favorites,
    showMenu: true,
    title: 'favorites',
    description: 'Your favorites'
  },
  {
    path: "/cart",
    component: Cart,
    showMenu: false,
    title: 'cart',
    description: ''
  },
  {
    path: "/product/:productId",
    component: Product,
    showMenu: false,
    title: 'product',
    description: 'Product'
  }
];
