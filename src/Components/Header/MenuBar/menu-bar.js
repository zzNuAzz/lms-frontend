import React, { useState } from 'react';
import {
  Button,
  Drawer,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';
import { Link } from 'react-router-dom';

const useStyle = makeStyles((theme) => ({
  list: {
    width: 250,
  },
}));

const MenuBar = () => {
  const classes = useStyle();

  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <IconButton color="inherit" onClick={handleIsOpen}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={isOpen} onClose={handleIsOpen}>
        <div className={classes.list} role="presentation" onClick={handleIsOpen}>
          <List component="nav">
            <Link to="/home">
              <ListItem button>
                <ListItemIcon>
                  <HomeRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Link>
            <Link to="/course">
              <ListItem button>
                <ListItemIcon>
                  <MenuBookRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Courses" />
              </ListItem>
            </Link>
          </List>
          <Divider />
        </div>
      </Drawer>
    </div>
  );
}

export default MenuBar;
