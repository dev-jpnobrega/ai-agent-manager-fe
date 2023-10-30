import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';

import PageBase from './PageBase';
import CartContainer from '../containers/Cart';

import MainContainer from '../containers/Main';

function Cart() {

  return (    
    <MainContainer>
      <PageBase>
        <CartContainer />
      </PageBase>     
    </MainContainer>
  )
}

export default withAuthenticator(Cart);