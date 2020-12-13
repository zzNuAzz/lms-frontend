import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Button, Grid } from '@material-ui/core';

export function NewCourseBox() {
  const classes = useStyles();
  return (
    <>
      <Card style={{ marginTop: '30px' }}>
        <CardContent className={classes.newCourse}>
          <Typography variant="h6" style={{ fontWeight: 700 }}>
            Wanna create a whole new course?
          </Typography>
          <Typography variant="body1">
            Start a new course to share knowledge with your students
          </Typography>
          <br />
          <br />
          <Grid>
            <Link to="">
              <Button
                fullWidth={Boolean(true)}
                variant="contained"
                color="primary"
              >
                Create A New Course
              </Button>
            </Link>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  newCourse: {
    backgroundColor: '#f5f7fa',
  },
}));
