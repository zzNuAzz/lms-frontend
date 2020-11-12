import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
  Container,
} from '@material-ui/core';
import { NavBar } from '../Components';
import Footer from '../Components/Footer/Footer';
import routes from './routes.config';
import './style.css';

export default function Page() {
  return (
    <>
      <NavBar />
      <br />
      <Container maxWidth="lg">
        <Switch>
          <Redirect exact from="/" to="home" />
          {routes.map((route) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <Route {...route} key={route.path} />
          ))}
        </Switch>
      </Container>
      <Footer />
    </>
  );
}
