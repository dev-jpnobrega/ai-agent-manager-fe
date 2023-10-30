import React from 'react';
import { useParams } from 'react-router-dom';

import PageBase from './PageBase';

import ProductContainer from '../containers/Products';
import MainContainer from '../containers/Main';

function Products() {
  const { productId } = useParams();

  return (    
    <MainContainer>
        <PageBase>
          <ProductContainer productIds={ [Number(productId)] } />
        </PageBase>     
    </MainContainer>
  )
}

export default Products;