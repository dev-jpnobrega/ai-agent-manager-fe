import React from 'react';

import { withAuthenticator } from '@aws-amplify/ui-react';

import MainContainer from '../containers/Main';
import ProductsContainer from '../containers/Products';
import FavoritesContainer from '../containers/Favorites';

import PageBase from './PageBase';

function Favorites() {
  return (
    <MainContainer>
      <PageBase>
        <FavoritesContainer renderChildren={(favorites) => (
          <ProductsContainer productIds={favorites} />
        )} />
      </PageBase>      
    </MainContainer>
  )
}

export default withAuthenticator(Favorites);