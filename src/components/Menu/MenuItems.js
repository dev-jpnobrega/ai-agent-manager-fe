import React from 'react';
import { Link } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import Divider from '@material-ui/core/Divider';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import { useTranslation } from 'react-i18next';

export default function MenuItemsComponent({ items }) {
  const [ t ] = useTranslation('translation');

  const getListIcon = (name) => {
    const icons = [
      { name: 'contact', icon: ContactPhoneIcon, },
      { name: 'who we are', icon: ContactPhoneIcon, },
      { name: 'revenues', icon: ContactPhoneIcon, },
      { name: 'favorites', icon: ContactPhoneIcon, },
      { name: 'cart', icon: ContactPhoneIcon, },
      { name: 'product', icon: ContactPhoneIcon, },
      { name: 'default', icon: ContactPhoneIcon, },
    ]

    const selected = icons.find(e => e.name === name);
    const Apt = (selected) ? selected.icon : icons.find(e => e.name === 'default').icon;

    return (
      <ListItemIcon>
          <Apt/>
      </ListItemIcon>
    )
  }


  return (
    <>    
      <Divider />
      <List>
        {items.map((item, index) => (
          <Link to={item.path} key={index}>
            <ListItem button key={index}>             
              { getListIcon(item.title) }
              <ListItemText primary={ t(`menu.item.${item.title}`) } />
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  )
}