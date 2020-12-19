import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container, makeStyles } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import { NavBar } from '../Components';
import Footer from '../Components/Footer/Footer';
import routes from './routes.config';

const useStyles = makeStyles((theme) => ({
  container: {
    '& button:focus': {
      outline: 'none',
    },
  },
}));

function Page() {
  return (
    <>
      <Switch>
        <Redirect exact from="/" to="/home" />
        {routes.map(route)}
      </Switch>
    </>
  );
}

const route = (route) => {
  const {
    hasContainer, hasNavbar, hasFooter, component, path,
  } = route;
  let content = component;
  content = hasContainer ? withContainer(content) : content;
  content = hasNavbar ? withNavbar(content) : content;
  content = hasFooter ? withFooter(content) : content;
  return <Route key={path} component={content} path={path} />;
};

const withContainer = (component) => () => (
  <Container maxWidth="lg">{component()}</Container>
);

const withToastContainer = (Component) => () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Component />
    </div>
  )
};

const withNavbar = (Component) => () => (
  <>
    <NavBar />
    <Component />
  </>
);

const withFooter = (Component) => () => (
  <>
    <div style={{ minHeight: '90vh' }}>
      <Component />
    </div>
    <Footer />
  </>
);

export default withToastContainer(Page);
