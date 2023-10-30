import React from 'react';
import Main from '../../pages/Main';

function WrapperComponent(props) {
  return (
    <Main { ...props } /> 
  )
};

export default WrapperComponent;