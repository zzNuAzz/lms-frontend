import React from 'react';
import { Container } from 'react-bootstrap';
import { Redirect, Route, Switch } from 'react-router-dom';
import { NavBar } from '../Components';
import Footer from '../Components/Footer/Footer';
import routes from './routes.config';
import './style.css';

export default function Page() {
  return (
    <>
      <NavBar />
      <Container fluid className="px-5">
        <Switch>
          <Redirect exact from="/" to="home" />
          {routes.map(route => (
            <Route {...route} key={route.path} />
          ))}
        </Switch>
      </Container>
      <Footer />
    </>
  );
}
