import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import ButtonBase from '@material-ui/core/ButtonBase';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControl from '@material-ui/core/FormControl';

import Notification from '../../components/Notification';

import { Context } from '../../context';
import * as actions from './cart-actions';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: '2em',
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

function CartContainer(props) {  
  const [ t ] = useTranslation('translation');
  const classes = useStyles();

  const [ state, dispatch ] = useContext(Context);
  const { cart } = state;

  const [quantitySelected, setQuantitySelected] = useState('');
  const [open, setOpen] = React.useState(false);

  const notificationMessage = {
    severity: 'HIGHT',
    title: 'ATENÇÃO',
    message: 'Ao finalizar sua compra você será redirecionado para o MercadoPago, onde encontrará as opções de pagamento.',
  }


  const handleChange = (event) => {
    setQuantitySelected(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const onClickRemoveItem = (productId) => dispatch({
    type: actions.CART_REMOVE_ITEM,
    productId,
  });

  function quantitiesRender(quantities = []) {
    return (
      <Grid item container>     
        <Grid item xs={4}>    
          <FormControl className={classes.formControl}>
          <InputLabel id="demo-controlled-open-select-label">{ t('cart.quantity') }</InputLabel>
          <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={quantitySelected}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              { 
                quantities.map(item => {
                  return <MenuItem key={item.quantity} value={item}>{item.quantity}</MenuItem>
                })
              }
          </Select>
          </FormControl>
        </Grid> 
        { (quantitySelected !== '') ? 
            <>
              <Grid item xs={4}>                   
                <Typography variant="body2">{ t('cart.unitValue') }:  ${ quantitySelected.price }</Typography>
              </Grid>
              <Grid item xs={4}> 
                <Typography variant="body2">{ t('cart.total') }:  ${ (quantitySelected.price) }</Typography>  
              </Grid>  
            </>
         : <div/> }  
        
      </Grid>
    )
  }

  function itemRender(item) {
    return (
      <Paper className={ classes.paper } key={ item.id }>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase className={ classes.image }>
                <img className={ classes.img } alt={ item.title } src={ item.image } />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography noWrap variant="body2">
                    { item.title }
                  </Typography>
                  <Typography variant="body2" noWrap component={"div"}>
                    <div dangerouslySetInnerHTML={{ __html: item.description}}></div> 
                  </Typography>
                  <Typography variant="body2">
                    ID: { item.id }
                  </Typography>
                </Grid>
                { quantitiesRender(item.quantities) }
              </Grid>
              <Grid item >               
                <IconButton onClick={ (e) => onClickRemoveItem(item.id) } title={'Remover do carrinho'} aria-label={'Remover do carrinho'}>                  
                  <DeleteIcon />     
                </IconButton>   
              </Grid>
            </Grid>
          </Grid>
        </Paper>
    )
  }

  function mapperCartItemsRender(cart) {
    return cart.items.map(itemRender);
  };

  function cartItemRender(cart) {
    return (
      <div>
        { mapperCartItemsRender(cart) }
        { 
          (quantitySelected !== '') ?
            <div>
              <Notification notification={notificationMessage} />
              <br/><br/>
              <Link href={quantitySelected.link} target='_blank' color='textPrimary'>               
                <Button  className={classes.expand} aria-label={ t('card.buy') } variant="outlined" color="inherit" >
                  Finalizar compra
                </Button>          
              </Link>
            </div>
             : <div/>
        }
      </div>
    )
  }

  function notHaveItemsRender() {
    return (
      <Paper className={ classes.paper }>
        <Typography variant="subtitle1" component="p">
          { t('cart.not.have.items') } 
          <Link href="/" color="error" variant="subtitle1">
            { ' ' + t('cart.keep.buying') }
          </Link>
        </Typography>
      </Paper>
    )
  }

  return (
    <>
      <section>
          <header>
            <Typography variant="h3" color="secondary" component="h3">
              {t('cart.title')}
            </Typography>
          </header>
          <div className={classes.root}>
            {
              (cart.items.length > 0)
                ? cartItemRender(cart)
                : notHaveItemsRender()
            }
          </div>         
      </section>      
    </>
  )
}

export default CartContainer;