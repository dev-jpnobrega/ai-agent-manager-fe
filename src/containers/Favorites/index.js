import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { makeStyles } from '@material-ui/core/styles';
import Link  from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Divider  from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';

import { Context } from '../../context';

const useStyles = makeStyles(theme => ({
  container: {
    position: 'relative',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
  },
  divider: {
    marginTop: '2em',
    marginBottom: '2em',
  },
  paper: {
    padding: theme.spacing(2),
    margin: '2em',
  }
}))

function Favorites({ renderChildren }) {  
  const classes = useStyles();
  const [ t ] = useTranslation('translation');
 
  const [ state ] = useContext(Context);
  const { user } = state;

  function notHaveFavoritesRender() {
    return (
      <Paper className={ classes.paper }>
        <Typography variant="subtitle1" component="p">
          { t('favorites.not.have.favorites') } 
          <Link href="/" color="error" variant="subtitle1">
            { ' ' + t('favorites.back.to.home') }
          </Link>
        </Typography>
      </Paper>
    )
  }

  if (!user) return (<div/>)

  return (
    <>
      <section className={classes.container}>
        <div className={classes.title}>
          <Typography variant="h3" color={'secondary'}>
            {t('favorites.title')}
          </Typography>
        </div>
        <Divider variant="middle" className={classes.divider} />        
      </section>
      { 
        (user.favorites.length > 0)
          ? renderChildren(user.favorites)
          : notHaveFavoritesRender()
      }
    </>
  )
}

export default Favorites;