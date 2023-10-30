import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import InstagramIcon from '@material-ui/icons/Instagram';

const useStyles = makeStyles(theme => ({
  container: {
    position: 'relative',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
  }
}))

function News(props) {  
  const classes = useStyles();

  return (
    <>
      <section className={classes.container}>
        <div className={classes.title}>
          <Link href="https://www.instagram.com/fio.amor/" target='_blank' color='textPrimary' >
            
            <Typography variant="h3" color={'secondary'}>
              <InstagramIcon fontSize={'large'} />
                Fio de Amor
            </Typography>
          </Link>
          
        </div>       
      </section>
    </>
  )
}

// <Feed userName="fio.amor" className='feed' classNameLoading="Loading" limit="4" />

export default News;