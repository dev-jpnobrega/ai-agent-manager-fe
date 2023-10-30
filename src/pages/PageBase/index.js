import React from 'react';
import Footer from './Footer';

function PageBase(props) {
  return (
    <div id="wrapper">
      <section id="main">
        { props.children }  
      </section>
      <Footer { ...props } />
    </div>
  )
}

export default PageBase;
