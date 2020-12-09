import { Grid, Typography } from '@material-ui/core';
import React from 'react';

// TODO: Beautify Contact Info
const ContactComponent = ({ user }) => {
  return (
    <>
      <Typography variant="h4">Contact</Typography>
      <br />
      <Grid
        container
        direction="row"
      >
        <Grid item md={4}>
          Full name:
        </Grid>
        <Grid item md={8}>
          {user.lastName.concat(' ', user.firstName)}
        </Grid>
        <Grid item md={4}>
          Email:
        </Grid>
        <Grid item md={8}>
          {user.email}
        </Grid>
        <Grid item md={4}>
          Phone:
        </Grid>
        <Grid item md={8}>
          {user.phone}
        </Grid>
      </Grid>
    </>
  );
};

export default ContactComponent;
