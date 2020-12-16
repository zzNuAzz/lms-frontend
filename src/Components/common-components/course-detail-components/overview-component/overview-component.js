import {
  Button, Typography, makeStyles, Grid, Avatar,
} from '@material-ui/core';
import React, { useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactHtmlParser from 'react-html-parser';

const useStyles = makeStyles((theme) => ({
  title: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  contactInfo: {

  },
  hostAvatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
}));

const OverviewComponent = ({
  courseName, host, description,
}) => {
  const classes = useStyles();

  return (
    <div className="overview">
      <div className={classes.title}>
        <Typography variant="h3">
          {courseName}
        </Typography>
        <Typography variant="body1">
          {`by ${host.lastName.concat(' ', host.firstName)}`}
        </Typography>
      </div>
      <hr />
      <div className="course-description">
        {ReactHtmlParser(description)}
      </div>
      <hr />
      <div className={classes.contactInfo}>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="flex-start"
          spacing={2}
        >
          <Grid item>
            <Avatar className={classes.hostAvatar} src={host.pictureUrl} />
          </Grid>
          <Grid item>
            <Typography variant="h6">
              {`Taught by: ${host.lastName.concat(' ', host.firstName)}`}
            </Typography>
            <Typography variant="body2">
              Professor at UET - VNU
            </Typography>
            <Typography variant="body2">
              Computer Science
            </Typography>
            <Typography variant="body2">
              {'Email: '}
              <a href={`mailto:${host.email}`}>{host.email}</a>
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default OverviewComponent;
