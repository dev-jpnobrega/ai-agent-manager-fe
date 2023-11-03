import React from 'react';
import { Link } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import Divider from '@material-ui/core/Divider';
import AdbRoundedIcon from '@material-ui/icons/AdbRounded';
import DeveloperBoardRoundedIcon from '@material-ui/icons/DeveloperBoardRounded';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';

import { useTranslation } from 'react-i18next';

export default function MenuItemsComponent({ items }) {
  const [t] = useTranslation('translation');

  const getListIcon = (name) => {
    const icons = [
      { name: 'agents', icon: AdbRoundedIcon, },
      { name: 'permissions', icon: LockOpenRoundedIcon, },
      { name: 'use.cases', icon: DeveloperBoardRoundedIcon, },
    ]

    const selected = icons.find(e => e.name === name);
    const Apt = (selected) ? selected.icon : icons.find(e => e.name === 'default').icon;

    return (
      <ListItemIcon>
        <Apt />
      </ListItemIcon>
    )
  }

  return (
    <>
      <Divider />
      <List>
        {items.map((item, index) => (
          <Link to={item.path} key={index}>
            <ListItem button key={index} style={{ paddingLeft: '24px' }}>
              {getListIcon(item.title)}
              <ListItemText primary={t(`menu.item.${item.title}`)} />
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  )
}