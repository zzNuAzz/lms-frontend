import React from 'react';
import { Container, Nav, Navbar, NavLink } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { NavSignin } from '../';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core'
import SignInButton from './ButtonSignIn/button-sign-in';
export default function NavBar() {
  return (
    <>
      <Navbar collapseOnSelect bg="default" expand="md">
        <Container fluid>
          <LinkContainer to="/" style={{ cursor: 'pointer' }}>
            <Navbar.Brand>Learning System</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="navbar-collapse" />
          <Navbar.Collapse id="navbar-collapse">
            <Nav className="mr-auto">
              <LinkContainer to="/home">
                <NavLink>Home</NavLink>
              </LinkContainer>
              <LinkContainer to="/course">
                <NavLink>Courses</NavLink>
              </LinkContainer>
            </Nav>
            <Nav>
              <SignInButton />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <hr style={{ marginTop: 0 }} />
    </>
  );
}
