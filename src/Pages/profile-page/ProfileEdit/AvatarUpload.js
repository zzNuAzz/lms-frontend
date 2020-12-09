import { Button, Grid } from '@material-ui/core';
import React, {Fragment} from 'react';

export default function AvatarUpload({userProfile}) {
  return (
    <Fragment>
      {/* <div style={{marginTop: "25px", paddingLeft: "50px"}}>
        <Grid container direction="row"> 
          <Grid item container xs={2} justify="flex-end" alignItems="flex-start" style={{paddingRight: "1rem",fontWeight: "bold" }} >Photo Profile</Grid>
          <Grid item container xs={8} alignItems="flex-start">
            <img src={userProfile.pictureUrl} alt="User Avatar" style={{width:"80%",heigh:"80%"}}/>
          </Grid>
        </Grid>
        <Grid style={{marginTop: "20px", marginLeft:"29%"}}>
          <Button size="large" variant="contained" color="primary">
            Upload Photo 
          </Button>
        </Grid>
      </div> */}
      <div className="mr-5 ml-2 mt-5" />
    </Fragment>
  );
}
