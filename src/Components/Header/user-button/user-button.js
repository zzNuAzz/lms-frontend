/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import { AccountCircleRounded } from '@material-ui/icons';
import { ToastContainer, toast } from 'react-toastify';

import LoginComponent from '../../login-component/login-component';
import LoggedInButton from './logged-in-button/logged-in-button';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: '500px',
    height: 'fit-content',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function UserButton({ isLoggedIn, setLoginStatus }) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (localStorage.getItem('username')) {
      setUsername(localStorage.getItem('username'));
      setLoginStatus(true);
      if (username) toast.success(`😃 Welcome ${username}`);
    } else {
      setLoginStatus(false);
    }
  }, [username]);

  return (
    <div>
      {isLoggedIn ? (
        // TODO: Logout and Account Information menu
        <LoggedInButton setUsername={setUsername} />
      ) : (
        <Button
          variant="contained"
          color="default"
          // style={{ color: '#1f1f1f', backgroundColor: '#f3c800' }}
          onClick={handleOpen}
        >
          <AccountCircleRounded />
          &nbsp; Sign In
        </Button>
      )}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <LoginComponent
              setUsername={setUsername}
              callbackToParent={handleClose}
            />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
