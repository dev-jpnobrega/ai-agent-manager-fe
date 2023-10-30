import React, { useContext, useEffect } from 'react';
import PropType from 'prop-types';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

import { Context } from '../../context';
import * as actions from './products-actions';
import * as userActions from '../Profile/profile-actions';
import * as productService from '../../service/product-service';

import Card from '../../components/Card';

function ProductsContainer({ history, productIds = [] }) {  
  const [ state, dispatch ] = useContext(Context);
  const { products, user } = state;

  useEffect(() => {
    if (products.list.length !== 0) return;
    
    productService.get().then(ps => 
      dispatch({
        type: actions.PRODUCTS_LIST_FETCHED,
        productsService: ps,
      })
    );    
  }, [ products.list ]);

  const onClickPurchase = (product) => {
    dispatch({
      type: 'CART_ADD_ITEM',
      item: {
        ...product,
        quantity: 1,
      },
    })

    history.push('/cart')
  }

  const onClickFavorite = (product) => {
    if (!user || !user.email) return history.push('/favorites')

    dispatch({
      type: userActions.USER_ADD_FAVORITE,
      productUids: [product.id],
      userId: user.email,
    })
  }

  function filterProduct(products, productIds) {
    return (productIds.length === 0 ? products : [
      ...products.filter(product => productIds.includes(product.id)),
    ])
  }

  function mapperProductsRender(products) {
    const list = filterProduct(products, productIds);

    return list.map((product, index) => (
      <Grid item xs={ 12 } sm={ 4 } key={ product.id }>
        <Card
          key={ product.id }
          title={ product.title }
          description={ product.description }
          imgSrc={ product.image }
          link={ product.link }
          quantities= { product.quantites }
          alt=""
          onClickPurchase={ onClickPurchase }
          onClickFavorite={ onClickFavorite }
          product={ product }
          isFavorite={(user) ? user.favorites.includes(product.id) : false}
        />
      </Grid>
    ));
  }

  return (
    <>
      <section>
        <Grid container spacing={2}>
          { mapperProductsRender(products.list) }
        </Grid>
      </section>
    </>
  )
}

ProductsContainer.propTypes = {
  productIds: PropType.array,
}

export default withRouter(ProductsContainer);