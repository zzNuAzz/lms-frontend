/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Menu,
  MenuItem,
  makeStyles,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import userLogout from '../../../../api/user-logout';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

const LoggedInButton = ({ setUsername }) => {
  const history = useHistory();
  const classes = useStyles();
  const username = localStorage.getItem('username') || '';
  const avatarUrl = localStorage.getItem('pictureUrl') || '';
  const [anchorEl, setAnchorEl] = useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDialog = () => {
    setLogoutDialogOpen(true);
    setAnchorEl(null);
  };

  const handleProfileRedirect = () => {
    history.push('/profile/edit');
    history.go(0);
  };

  const handleLogout = async () => {
    const result = await userLogout();
    if (result.success) {
      localStorage.clear();
      setUsername('');
      setLogoutDialogOpen(false);
      toast.info('See you soon!', {
        autoClose: 3000,
      });
      history.push('/home');
    } else {
      toast.error('Unable to logout, please try again!');
    }
  };

  const handleLogoutDialogClose = () => {
    setLogoutDialogOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={(event) => handleClick(event)}
        style={{margin: '10px 10px'}}
      >
        {/* <SentimentVerySatisfiedRoundedIcon /> */}
        <Avatar alt="User's Avatar" src={avatarUrl} className={classes.avatar} />
        &nbsp;
        {username}
      </Button>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        // Render Menu under current button
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div onClick={handleProfileRedirect}>
          <MenuItem>My Account</MenuItem>
        </div>
        <div onClick={handleDialog}>
          <MenuItem>Logout</MenuItem>
        </div>
      </Menu>
      <Dialog open={logoutDialogOpen} onClose={handleLogoutDialogClose}>
        <DialogTitle>Are you sure you want to log out?</DialogTitle>
        <DialogActions>
          <Button color="primary" variant="text" onClick={handleLogout}>
            Yes, I'm sure
          </Button>
          <Button
            color="primary"
            variant="text"
            onClick={handleLogoutDialogClose}
          >
            No, bring me back!
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LoggedInButton;
