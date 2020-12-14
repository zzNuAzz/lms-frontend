import React from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Divider,
  Avatar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

export function CourseCard({ course }) {
  const classes = useStyles();
  const backGroundArr = [
    classes.greenBack,
    classes.blueBack,
    classes.yellowBack,
  ];
  const teacherName = `Lecturer: ${course.host.lastName} ${course.host.firstName}`;
  // const backGround = backGroundArr[course.courseId % 3];
  const backGround = classes.grayBack;

  // console.log({ backGround });
  const linkToForum = `/course/${course.courseId}/forum`;
  return (
    <Box mt={10}>
      <Container className={backGround} maxWidth="md">
        <Box className={classes.courseCard}>
          <Box pt={3} pb={1}>
            <Typography variant="button">Course</Typography>
          </Box>
          <Grid container direction="row" alignItems="center">
            <Grid item xs={12} lg={6} className={classes.bodyCourse}>
              <Link>
                <Typography
                  variant="h5"
                  color="primary"
                  // className={`${classes.fw700} ${classes.blackText}`}
                  className={`${classes.fw700}`}
                >
                  {course.name}
                </Typography>
              </Link>
              <Typography variant="body2">
                {course.description.substring(0, 200) + '...'}
              </Typography>
            </Grid>
            <Grid item xs={12} lg={6} container justify="flex-end">
              <Grid item xs={0} lg={6}>
                <Box className={classes.whiteBack}></Box>
              </Grid>
              <Grid item xs={12} lg={6} container justify="center">
                <Button variant="contained" color="primary" fullWidth={Boolean(true)}>
                  Go to Course
                </Button>
                <br />
                <Grid item>
                  <Box py={3}>
                    <Link to={linkToForum}>
                      <Typography
                        classname={classes.center}
                        variant="body1"
                        // className={classes.blackText}
                      >
                        Go to forum
                      </Typography>
                    </Link>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider variant="fullWidth"></Divider>
            </Grid>
            <Grid style={{ marginBlock: 10 }} className={classes.dFlex}>
              <Box mr={2}>
                <Avatar src={course.host.pictureUrl}></Avatar>
              </Box>
              <Link>
                {/* <Typography variant="subtitle2" className={classes.blackText}> */}
                <Typography variant="subtitle2">
                  {teacherName}
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  whiteBack: {
    backgroundColor: '#ffffff',
  },
  blueBack: {
    backgroundColor: '#1e94eb',
  },
  grayBack: {
    backgroundColor: '#f5f7fa',
  },
  yellowBack: {
    backgroundColor: '#f3c800',
  },
  greenBack: {
    backgroundColor: '#00d2a1',
  },
  bodyCourse: {
    height: 170,
  },
  fw700: {
    fontWeight: 700,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  center: {
    margin: 'auto',
  },
  courseCard: {
    marginBottom: '28px',
    // color: '#1f1f1f',
  },
  dFlex: {
    display: 'flex',
    marginBlock: 'auto',
  },
  blackText: {
    color: '#1f1f1f',
  },
  fw700: {
    fontWeight: 700,
  },
}));
