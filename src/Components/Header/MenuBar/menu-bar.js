import React, { useState } from 'react';
import {
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
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import { Link } from 'react-router-dom';

const useStyle = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  iconButton: {
    '&:focus': {
      outline: 'none',
    },
  },
}));

const MenuBar = ({ isLoggedIn }) => {
  const classes = useStyle();

  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const LoggedInMenuBar = (
    <List component="nav">
      <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItem button>
          <ListItemIcon>
            <HomeRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </Link>
      <Link to="/courses" style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItem button>
          <ListItemIcon>
            <MenuBookRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Courses" />
        </ListItem>
      </Link>
    </List>
  );

  const LoggedOutMenuBar = (
    <List component="nav">
      <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItem button>
          <ListItemIcon>
            <ExitToAppRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Sign In" />
        </ListItem>
      </Link>
      <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItem button>
          <ListItemIcon>
            <ExitToAppRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Sign Up" />
        </ListItem>
      </Link>
    </List>
  );

  return (
    <>
      <IconButton className={classes.iconButton} color="inherit" onClick={handleIsOpen}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={isOpen} onClose={handleIsOpen}>
        <div className={classes.list} role="presentation" onClick={handleIsOpen}>
          {isLoggedIn ? (LoggedInMenuBar) : (LoggedOutMenuBar)}
          <Divider />
        </div>
      </Drawer>
    </>
  );
};

export default MenuBar;
