/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import { AccountCircleRounded } from "@material-ui/icons";
import { ToastContainer, toast } from "react-toastify";

import LoginComponent from "../../login-component/login-component";
import LoggedInButton from "./logged-in-button/logged-in-button";
import { getSignedInUser } from "../../../api/graphql/get-signedin-user";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "500px",
    height: "fit-content",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function UserButton({ isLoggedIn, setLoginStatus }) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [user, setUser] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (localStorage.getItem("signedIn")) {
      setLoginStatus(true);
    } else {
      setLoginStatus(false);
    }
  }, [localStorage.getItem("signedIn")]);

  useEffect(()=> {
    getSignedInUser()
      .then(JSON.parse)
      .then(data => data?.data?.currentUser)
      .then(data => {
        if(data.signedIn) {
          setUser(data.user);
          localStorage.setItem("username", data.user.username);
          localStorage.setItem("userId", data.user.userId);
          localStorage.setItem("role", data.user.role);
          localStorage.setItem("pictureUrl", data.user.pictureUrl);
          localStorage.setItem('signedIn', true)
        }else {
          setUser({});
          localStorage.clear();
        }
      })
      .catch(err=>toast.error(err.message));
  },[])

  return (
    <div>
      {isLoggedIn ? (
        <LoggedInButton user={user} setUser={setUser} />
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
          style={{ margin: "10px 10px" }}
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
              setUsername={setUser}
              callbackToParent={handleClose}
            />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
