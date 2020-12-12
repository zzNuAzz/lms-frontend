import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import { NavBar } from '../Components';
import Footer from '../Components/Footer/Footer';
import routes from './routes.config';

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

const route = route => {
	const { hasContainer, hasNavbar, hasFooter, component, path } = route;
	let content = component;
    content = hasContainer ?  withContainer(content) : content;
    content = hasNavbar ? withNavbar(content) : content;
    content = hasFooter ?  withFooter(content) : content;
    return <Route key={path} component={content} path={path} />;
};

const withContainer = component => {
	return	() => (
		<Container maxWidth="lg">{component()}</Container>
	);
}

const withToastContainer = Component => {
    return () => (
        <Fragment>
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
        </Fragment>
    );
};

const withNavbar = Component => {
	return () => (
		<Fragment>
			<NavBar />
			<Component />
		</Fragment>
	);
}

const withFooter = Component => {
	return () => (
		<Fragment>
			<div style={{minHeight: '90vh'}}>
				<Component/>
			</div>
			<Footer />
		</Fragment>
	);
}


export default withToastContainer(Page);