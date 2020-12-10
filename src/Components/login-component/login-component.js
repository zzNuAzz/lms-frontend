/* eslint-disable no-undef */
import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ToastContainer, toast } from 'react-toastify';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import 'react-toastify/dist/ReactToastify.css';

import userLogin from '../../api/user-login';

const useStyles = makeStyles((theme) => ({
  paper: {
    // marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  h5: {
    margin: 20,
  },
}));

function LoginComponent({ setUsername, callbackToParent }) {
  const classes = useStyles();

  const [submitted, setSubmitted] = useState(false);
  const [formUsername, setFormUsername] = useState('');
  const [formPassword, setFormPassword] = useState('');

  const handleSubmit = async () => {
    const result = await userLogin(formUsername, formPassword);

    if (result.code === 200) {
      setUsername(formUsername);
      localStorage.setItem('username', formUsername);
      localStorage.setItem('userId', result.credentials.user.userId);
      localStorage.setItem('role', result.credentials.user.role);
      localStorage.setItem('pictureUrl', result.credentials.user.pictureUrl);
      callbackToParent();
    } else if (result.code === 400 || 401) {
      toast.error('😞 Wrong username or password, please try again!');
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar
            className="classes.avatar"
            alt="Remy Sharp"
            src="https://w7.pngwing.com/pngs/797/100/png-transparent-course-training-class-professional-certification-education-courses-miscellaneous-angle-business.png"
          />
          <Typography component="h1" variant="h5" className={classes.h5}>
            Sign in
          </Typography>
          <ValidatorForm className={classes.form} onSubmit={handleSubmit}>
            <TextValidator
              label="Username"
              onChange={(event) => setFormUsername(event.target.value)}
              name="username"
              value={formUsername}
              validators={['required']}
              errorMessages={['This field is required', 'Username is not valid']}
              variant="outlined"
              margin="normal"
              fullWidth
              autoComplete="username"
              autoFocus
            />
            <TextValidator
              label="Password"
              name="password"
              type="password"
              value={formPassword}
              onChange={(event) => setFormPassword(event.target.value)}
              validators={['required']}
              errorMessages={['This field is required']}
              variant="outlined"
              margin="normal"
              fullWidth
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/signup" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </ValidatorForm>
        </div>
      </Container>
    </>
  );
}

export default LoginComponent;
