import React, {Fragment, useEffect, useState} from 'react';
import { IconButton, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import { toast } from 'react-toastify';
import toastFetchErrors from '../../Components/tools/toast-fetch-errors';
import PersonIcon from '@material-ui/icons/Person';
import CloudIcon from '@material-ui/icons/Cloud';
import FaceIcon from '@material-ui/icons/Face';
import { getSignedInUser } from './../../api/graphql/get-signedin-user';
import homeImage from './home_image.png';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
	display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  font18: {
    fontSize: 18,
  },
}));

export default function HomePage() {
	const classes = useStyles();
	const history = useHistory();
	const signedIn = Boolean(localStorage.getItem("userId"));
	return (
		<div className={classes.root}>
		<Grid container spacing={3} style={{ marginTop: '40px', minHeight:"80vh" }}>
			<Grid item xs={12} lg={6} container alignItems="center" justify="center" direction="row">
				<Grid item container direction="column" alignItems="center" justify="center">
					<Typography item style={{ fontSize: '30px', fontWeight: 'bolder', color: '#4e99e3' }}>LMS</Typography>
					<Typography item style={{ fontSize: '24px', fontWeight: 'bolder', color: '#1c205f' }}>Learning Management System</Typography>
					<Typography item style={{ fontSize: '18px', color: '#000000' }}>You are never too old to learn.</Typography>
					<div className={classes.root}>
					{
						signedIn 
						? 
						<Button onClick={() => history.push("/courses")} variant="outlined" color="primary">Go to Courses</Button>
						:
						<Fragment>
							<Button onClick={() => history.push("/login")} variant="outlined" color="primary">Login</Button>
							<Button onClick={() => history.push("/signup")} variant="outlined" color="primary">Sign Up</Button>
						</Fragment>
					}
					</div>
				</Grid>
			</Grid>
			<Grid item xs={12} lg={6} container alignItems="center" justify="center">
				<img item src={homeImage}  style={{ height:'50vh' }} />
			</Grid>

			<Grid container style={{ marginTop: '40px' }}>
			<Grid item xs={12} md={4} container alignItems="center" justify="center" direction="column">
				<IconButton item aria-label="delete">
				<PersonIcon item className={classes.large} />
				</IconButton>
				<Typography item>Group 06 - INT3306 21</Typography>
			</Grid>
			<Grid item xs={12} md={4} container alignItems="center" justify="center" direction="column">
				<IconButton item aria-label="delete">
				<CloudIcon item className={classes.large} />
				</IconButton>
				<Typography item>MySQL - Express - ReactJs - Nodejs</Typography>
			</Grid>
			<Grid item xs={12} md={4} container alignItems="center" justify="center" direction="column">
				<IconButton item aria-label="delete">
				<FaceIcon item className={classes.large} />
				</IconButton>
				<Typography item>Lecturer: Hoang Xuan Tung</Typography>
			</Grid>
			</Grid>
		</Grid>
		</div>
	);
}
