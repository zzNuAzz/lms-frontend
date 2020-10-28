import React from 'react';
import { Button, Grid, Typography, TextField } from '@material-ui/core';

export default function Login() {
  return (
    <div className="section">
      <Grid
        container
        direction="column"
        justify="center"
        alignContent="center"
        spacing={3}
      >
        <Grid item>
          <TextField required variant="outlined" label="Username" />
        </Grid>
        <Grid item>
          <TextField required variant="outlined" label="Password" />
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary">Sign in</Button>
        </Grid>
      </Grid>
    </div>
  );
}
