import React from 'react';
import { Container, Nav, Navbar, NavLink, Row } from 'react-bootstrap';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  makeStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { NavSignin } from '../';
import ButtonSignIn from './ButtonSignIn/button-sign-in';

const useStyle = makeStyles((theme) => ({
  title: {
    flexGrow: 0,
  },

  root: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
  },

  endPoint: {
    flexGrow: 1,
  },

  navigationButton: {
    margin: '10px 10px',
  },

}));

export default function NavBar() {
  const classes = useStyle();

  return (
    <div className={classes.root}>
      <AppBar color="primary" position="sticky">
        <Toolbar>
          <Typography className={classes.title} variant="h6">Learning System</Typography>
          <Link to="/home">
            <Button className={classes.navigationButton} variant="contained" color="primary">Home</Button>
          </Link>
          <Link to="/course">
            <Button className={classes.navigationButton} variant="contained" color="primary">Courses</Button>
          </Link>
          <div className={classes.endPoint} />
          <ButtonSignIn />
        </Toolbar>
      </AppBar>
    </div>
  );
}
