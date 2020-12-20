import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import deleteCourseById from "../../api/graphql/deleteCourseById";
import toastFetchErrors from "../../Components/tools/toast-fetch-errors";
import EditCourseButton from "./course-page-components/edit-course-button/edit-course-button";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function TeacherCourseCard({ course, fetchTeacherCourse }) {
  const classes = useStyles();
  const history = useHistory();

  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };
  const [open, setOpen] = React.useState(false);

  const handleRedirectToCourse = () => {
    history.push(linkToCourse);
  };

  const openAlertDelete = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const backGroundArr = [
    classes.greenBack,
    classes.blueBack,
    classes.yellowBack,
  ];
  // const backGround = backGroundArr[course.courseId % 3];
  const backGround = classes.grayBack;

  console.log({ backGround });
  const linkToForum = `/course/${course.courseId}/forum`;
  const linkToCourse = `/course/${course.courseId}`;
  const deleteCourse = async () => {
    try {
      const courseName = course.name;
      const result = await deleteCourseById(course.courseId);
      // TODO
      const parsedResult = JSON.parse(result);
      if (parsedResult.data) {
        toast.success(`Delete Course: ${courseName} Successfully`, {
          autoClose: 3000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        toastFetchErrors(parsedResult);
      }
    } catch (error) {
      toast(error);
    }
    setOpen(false);
  };
  return (
    <Box mt={10}>
      <Container className={backGround} maxWidth="md">
        <Box className={classes.courseCard}>
          <Box pt={3} pb={1}>
            <Typography variant="button">Course</Typography>
          </Box>
          <Grid container direction="row" alignItems="center">
            <Grid item xs={12} lg={6} className={classes.bodyCourse}>
              <Link to={linkToCourse}>
                <Typography
                  variant="h5"
                  color="primary"
                  className={`${classes.fw700} ${classes.blackText}`}
                >
                  {course.name}
                </Typography>
              </Link>
              <Typography variant="body2">{course.shortDescription}</Typography>
            </Grid>
            <Grid item xs={12} lg={6} container justify="flex-end">
              <Grid item xs={0} lg={6}>
                <Box className={classes.whiteBack}></Box>
              </Grid>
              <Grid item xs={12} lg={6} container justify="center">
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth={Boolean(true)}
                  onClick={handleRedirectToCourse}
                >
                  View Course
                </Button>
                <br />
                <Grid item>
                  <Box py={3}>
                    <Link to={linkToForum}>
                      <Typography
                        classname={classes.center}
                        variant="body1"
                        className={classes.blackText}
                      >
                        Go to forum
                      </Typography>
                    </Link>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider variant="fullWidth" />
            </Grid>
            <Grid
              container
              style={{ marginBlock: 10 }}
              className={classes.dFlex}
              justify="flex-end"
            >
              <Box mr={2}>
                <EditCourseButton
                  courseName={course.name}
                  courseDescription={course.description}
                  courseId={course.courseId}
                  fetchTeacherCourse={fetchTeacherCourse}
                />
              </Box>
              <Box mr={0}>
                <Button
                  color="secondary"
                  variant="contained"
                  size="small"
                  onClick={openAlertDelete}
                >
                  Delete
                </Button>
                <Dialog
                  open={open}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-slide-title"
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle id="alert-dialog-slide-title">
                    Are you sure to delete this course?
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      All the documents, forum and lectures will be deleted with
                      this course!
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={deleteCourse}
                    >
                      Yes, I'm sure
                    </Button>
                    <Button
                      onClick={handleClose}
                      color="primary"
                      variant="contained"
                    >
                      No, Bring Me Back
                    </Button>
                  </DialogActions>
                </Dialog>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  whiteBack: {
    backgroundColor: "#ffffff",
  },
  blueBack: {
    backgroundColor: "#1e94eb",
  },
  yellowBack: {
    backgroundColor: "#f3c800",
  },
  greenBack: {
    backgroundColor: "#00d2a1",
  },
  grayBack: {
    backgroundColor: "#f5f7fa",
  },
  bodyCourse: {
    height: "fit-content",
  },
  fw700: {
    fontWeight: 700,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  center: {
    margin: "auto",
  },
  courseCard: {
    marginBottom: "28px",
    color: "#1f1f1f",
  },
  dFlex: {
    display: "flex",
    marginBlock: "auto",
  },
  blackText: {
    color: "#1f1f1f",
  },
  fw700: {
    fontWeight: 700,
  },
}));
