import React from 'react';
import PropType from 'prop-types';
import { useTranslation } from 'react-i18next';


import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';


const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function CardComponent({ title, description, link, imgSrc, quantites, product, isFavorite, onClickPurchase, onClickFavorite }) {
  const classes = useStyles();
  const [ t ] = useTranslation('translation');

  function onClickPurchaseHandler(event) {
    return onClickPurchase(product);
  }

  function onClickFavoriteHandler(event) {
    return onClickFavorite(product);
  }

  return (
      <Card className={classes.root}>
        <CardHeader
          title={title}
          subheader={new Date().toLocaleDateString()}
        />
        <CardMedia
          className={classes.media}
          title={title}
          image={imgSrc}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="div">
            <div dangerouslySetInnerHTML={{ __html: description}}></div>           
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label={ t('card.favorites') } onClick={onClickFavoriteHandler}>
            { 
              (isFavorite) 
                ? <FavoriteIcon htmlColor={red[500]} />
                : <FavoriteIcon />
            }
          </IconButton>
          <IconButton aria-label={ t('card.share') }>
            <ShareIcon />
          </IconButton>
          <Button className={classes.expand} aria-label={ t('card.buy') } variant="outlined" color="secondary" onClick={ onClickPurchaseHandler } >
            { t('card.buy') }
          </Button>
        </CardActions>
      </Card>
  )
}

CardComponent.propTypes = {
  title: PropType.string.isRequired,
  description: PropType.string,
  imgSrc: PropType.string.isRequired,
  link: PropType.string,
  onClickFavorite: PropType.func.isRequired,
  onClickPurchase: PropType.func.isRequired,
}

export default CardComponent;