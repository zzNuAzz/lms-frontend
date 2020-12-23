import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { toast } from "react-toastify";

import createUserAccount from "../../api/graphql/create-user-account";
import toastFetchErrors from "../../Components/tools/toast-fetch-errors";
import checkUsernameAvailability from "../../api/graphql/check-username-availability";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  h5: {
    margin: 20,
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [role, setRole] = useState("Student");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setLoading] = useState(false);
  const usernameRef = React.createRef();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async () => {
    // alert("Sign up");
    setLoading(true);
    try {
      const result = await createUserAccount(
        username,
        password,
        role,
        firstName,
        lastName,
        phoneNumber,
        address,
        birthday
      );

      // TODO: Loading Animation
      const parsedResult = JSON.parse(result);
      if (parsedResult.data) {
        toast.success(
          "Successfully created your account! You will be redirected to the Sign In page in 3 seconds...",
          {
            autoClose: 3000,
          }
        );
        setTimeout(() => {
          history.push("/login");
          history.go(0);
        }, 3000);
      } else {
        toastFetchErrors(parsedResult);
      }
    } catch (error) {
      toast.error(error.toString());
    }
    setLoading(false);
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      usernameRef.current.validate(value);
    }
  };

  useEffect(() => {
    ValidatorForm.addValidationRule("usernameExists", async (value) => {
      try {
        const result = await checkUsernameAvailability(value);
        const parsedResult = JSON.parse(result);
        if (parsedResult.data) {
          if (!parsedResult.data.usernameAvailability) {
            return false;
          }
        } else {
          toastFetchErrors(parsedResult);
        }
      } catch (error) {
        toast.error(error.toString());
      }
      return true;
    });
  });

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
            Sign up
          </Typography>
          <ValidatorForm onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextValidator
                  label="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                  name="first name"
                  value={firstName}
                  validators={["required"]}
                  errorMessages={["This field is required"]}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="firstName"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextValidator
                  label="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                  name="last name"
                  value={lastName}
                  validators={["required"]}
                  errorMessages={["This field is required"]}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="lastname"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextValidator
                  label="Username"
                  ref={usernameRef}
                  onChange={(e) => setUsername(e.target.value)}
                  onBlur={handleBlur}
                  name="username"
                  value={username}
                  validators={["required"]}
                  errorMessages={["This field is required"]}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="email"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextValidator
                  label="Password"
                  onChange={handlePasswordChange}
                  name="password"
                  value={password}
                  validators={["required"]}
                  errorMessages={["This field is required"]}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  type="password"
                  id="password"
                />
              </Grid>
              <Grid item xs="12">
                <TextField
                  label="Phone Number (optional)"
                  id="phone-number"
                  type="number"
                  variant="outlined"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs="12">
                <TextField
                  label="Home Address (optional)"
                  id="address"
                  type="text"
                  variant="outlined"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs="12" sm="6">
                <TextField
                  id="date"
                  label="Birthday"
                  type="date"
                  variant="outlined"
                  // className={classes.form}
                  onChange={(e) => setBirthday(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs="12" sm="6">
                <FormControl variant="outlined" className={classes.form}>
                  <InputLabel>Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    label="Role"
                  >
                    <MenuItem value="Student">Student</MenuItem>
                    <MenuItem value="Teacher">Lecturer</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I accept the Terms of Service."
                  validators={["required"]}
                  errorMessages={[
                    "You have to agree with the Terms of Service.",
                  ]}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isLoading}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have account? Sign in
                </Link>
              </Grid>
            </Grid>
          </ValidatorForm>
        </div>
      </Container>
    </>
  );
}
