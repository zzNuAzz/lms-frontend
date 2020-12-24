import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useParams } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Button, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({}));

export function NewPostBox({Id}) {
  const newThreadLink = `/course/${Id}/newthread`;
  return (
    <>
      <Card style={{ marginTop: '30px' }}>
        <CardContent>
          <Typography variant="h6" style={{ fontWeight: 700 }}>
            Don't see a topic you're interested in?
          </Typography>
          <Typography variant="body1">Start a new conversation!</Typography>
          <br />
          <br />
          <Grid>
            <Link to={newThreadLink}>
              <Button fullWidth={Boolean(true)} variant="contained" color="primary">
                Write a post
              </Button>
            </Link>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
