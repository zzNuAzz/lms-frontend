import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  makeStyles,
  Typography,
  Paper,
} from '@material-ui/core';
import { toast } from 'react-toastify';
import ReactHTMLParser from 'react-html-parser';

import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';

import enrollCourse from '../../../../api/graphql/enroll-course';

const useStyles = makeStyles((theme) => ({
  accordionHeader: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightBold,
  },
  accordionBody: {
    flexDirection: 'column',
  },
  bodyDescription: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const AllCourseView = ({
  courses,
  enrolledCourses,
  pendingCourses,
  fetchAllCourses,
}) => {
  const classes = useStyles();

  const handleEnroll = async (courseId) => {
    const result = await enrollCourse(parseInt(courseId, 10));
    const parsedResult = JSON.parse(result);
    if (parsedResult.data) {
      if (parsedResult.data.enrollCourse.success) {
        fetchAllCourses();
      } else {
        toast(parsedResult.data.enrollCourse.message, {
          type: 'error',
          autoClose: 5000,
        });
      }
    } else {
      toast(result, {
        type: 'error',
        autoClose: 5000,
      });
    }
  };

  return courses.map((course) => {
    //! Iterate through all courses' array to find enrolled (or pending) courses.
    //! Need implementation from backend for performance reason (still fast in frontend though)
    const isEnrolled = !!enrolledCourses.find((el) => el.courseId === course.courseId);
    const isPending = !!pendingCourses.find((el) => el.courseId === course.courseId);

    const RenderComponent = (
      <>
        <Grid item xs={12} md={11}>
          <Paper elevation={4}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreRoundedIcon />}
                className={classes.accordionHeader}
              >
                {course.name}
              </AccordionSummary>
              <AccordionDetails className={classes.accordionBody}>
                <div className="overview">
                  {ReactHTMLParser(course.description)}
                </div>
                <Typography variant="body1">
                  {`Lecturer: ${course.host.lastName.concat(' ', course.host.firstName)}`}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Paper>
        </Grid>
        <Grid item xs={12} md={1}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            //* Forgive me for hardcoding this style element...
            style={{ height: '54px' }}
            disabled={isEnrolled || isPending}
            onClick={() => {
              handleEnroll(course.courseId);
            }}
          >
            {(() => {
              if (isEnrolled) return 'Enrolled';
              if (isPending) return 'Pending';
              return 'Enroll';
            })()}
          </Button>
        </Grid>
        <br />
      </>
    );

    return (
      <>
        {
          (isEnrolled || isPending)
            ? null
            : RenderComponent
        }
      </>
    );
  });
};

export default AllCourseView;
