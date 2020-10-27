import React from 'react';
import { Container, Nav, Navbar, NavLink, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { NavSignin } from '../';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  makeStyles
} from '@material-ui/core';
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

}));

export default function NavBar() {
  const classes = useStyle();

  return (
    // <>
    //   <Navbar collapseOnSelect bg="default" expand="md">
    //     <Container fluid>
    //       <LinkContainer to="/" style={{ cursor: 'pointer' }}>
    //         <Navbar.Brand>Learning System</Navbar.Brand>
    //       </LinkContainer>
    //       <Navbar.Toggle aria-controls="navbar-collapse" />
    //       <Navbar.Collapse id="navbar-collapse">
    //         <Nav className="mr-auto">
    //           <LinkContainer to="/home">
    //             <NavLink>Home</NavLink>
    //           </LinkContainer>
    //           <LinkContainer to="/course">
    //             <NavLink>Courses</NavLink>
    //           </LinkContainer>
    //         </Nav>
    //         <Nav>
    //           <ButtonSignIn />
    //         </Nav>
    //       </Navbar.Collapse>
    //     </Container>
    //   </Navbar>
    //   <hr style={{ marginTop: 0 }} />
    // </>
    <div className={classes.root}>
      <AppBar color="primary" position="sticky">
        <Toolbar>
          <Typography className={classes.title} variant="h6">Learning System</Typography>
          <LinkContainer to="/">
            <Button color="inherit">Home</Button>
          </LinkContainer>
          <LinkContainer to="/course">
            <Button color="inherit">Courses</Button>
          </LinkContainer>
          <div className={classes.endPoint} />
          <ButtonSignIn />
        </Toolbar>
      </AppBar>
    </div>
  );
}
