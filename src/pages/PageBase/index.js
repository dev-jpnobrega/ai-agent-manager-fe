import React from 'react';
import { Box, Typography, Divider } from '@material-ui/core';


function PageBase(props) {
  return (
    <div id="wrapper">
      <section id="main">
        {props.title && <>
          <Box mt={2} ml={2}>
            <Typography variant='body1'>{props.title}
            </Typography>
          </Box>
          <br />
          <Divider variant="middle" />
        </>}

        {props.children}
      </section>
    </div>
  )
}

export default PageBase;
