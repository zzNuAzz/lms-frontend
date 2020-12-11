/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  LinearProgress,
  Typography,
  Tabs,
  Tab,
} from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';

import { CourseCard } from './CourseCard';
import { toast } from 'react-toastify';

import getUserCourseList from '../../api/graphql/get-user-course-list';
import getAllCourses from '../../api/graphql/get-all-courses.js';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import toastFetchErrors from '../../Components/tools/toast-fetch-errors';
import { Recommend } from './Recommend';

//TabPanel
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

//CoursePage
export default function CoursePage() {
  const [isLoading, setLoading] = useState(false);
  const [courseView, setCourseView] = useState('list');
  const userId = parseInt(localStorage.getItem('userId'), 10);
  const [courses, setCourses] = useState([]);
  const [pendingCourses, setPendingCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const handleSwitchCourseType = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
  // API
  const fetchStudentCourse = async () => {
    try {
      //* Fetch enrolled courses
      const acceptedResult = await getUserCourseList({
        userId,
        status: 'Accepted',
        pageNumber: 0,
        pageSize: 10,
      });
      const parsedResult = JSON.parse(acceptedResult);
      if (parsedResult.data) {
        if (parsedResult.data.userCourseList.courseList.length !== 0) {
          setCourses(parsedResult.data.userCourseList.courseList);
        } else {
          toast.error('You have no enrolled courses... :(');
        }
      } else {
        toastFetchErrors(parsedResult);
      }

      //* Fetch pending courses
      const result = await getUserCourseList({
        userId,
        status: 'Pending',
        pageNumber: 0,
        pageSize: 10,
      });
      const temp = JSON.parse(result);
      if (temp.data) {
        if (temp.data.userCourseList.courseList.length !== 0) {
          setPendingCourses(temp.data.userCourseList.courseList);
        }
      } else {
        toastFetchErrors(temp);
      }
    } catch (error) {
      toast(error);
    }
  };

  const fetchAllCourses = async () => {
    try {
      const result = await getAllCourses();
      const parsedResult = JSON.parse(result);
      if (parsedResult.data) {
        setAllCourses(parsedResult.data.courseList.courseList);
      } else {
        toastFetchErrors(parsedResult);
      }
    } catch (error) {
      toast(error);
    }
  };

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      await fetchStudentCourse();
      await fetchAllCourses();
      setLoading(false);
    };
    fetchContent();
  }, []);
  console.log({ courses });
  const RenderComponent = (
    <>
      <Box className={classes.root}>
        {/* HEADER */}
        <Box className={classes.header}>
          <Container maxWidth="md">
            <Typography
              variant="h3"
              color="primary"
              gutterBottom
              className={classes.welcome}
            >
              Welcome back!
            </Typography>
          </Container>
        </Box>
      </Box>
      {/* MIDDLE NAV */}
      <Container maxWidth="xl" className={classes.middleNav}>
        <Grid container justify="flex-start">
          <Grid item>
            <Box position="static" color="default">
              <Tabs
                value={value}
                onChange={handleSwitchCourseType}
                indicatorColor="primary"
                variant="fullWidth"
                className={classes.tabs}
              >
                <Tab label="Home" {...a11yProps(0)} />
                <Tab label="In Progress" {...a11yProps(1)} />
                <Tab label="Pending" {...a11yProps(2)} />
              </Tabs>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Box className={classes.root}>
        {/* COURSE CARD */}
        <Container maxWidth="lg">
          <SwipeableViews
            className={classes.root}
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            {/* HOME */}
            <TabPanel value={value} index={0} dir={theme.direction}>
              {/* RECOMMEND FOR 3RD YEAR STUDENTS */}
              <Recommend allCourses={allCourses} />
              {allCourses.map((course) => (
                <CourseCard course={course} />
              ))}
            </TabPanel>
            {/* IN PROGRESS */}
            <TabPanel value={value} index={1} dir={theme.direction}>
              {courses.map((course) => (
                <CourseCard course={course} />
              ))}
            </TabPanel>
            {/* PENDING */}
            <TabPanel value={value} index={2} dir={theme.direction}>
              {pendingCourses.map((course) => (
                <CourseCard course={course} />
              ))}
            </TabPanel>
          </SwipeableViews>
        </Container>
      </Box>
    </>
  );
  // const theme = {
  //   spacing: 8,
  // }
  return <>{isLoading ? <LinearProgress /> : RenderComponent}</>;
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#f5f7fa',
  },
  whiteBack: {
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundImage: `url("//s3.amazonaws.com/coursera_assets/logged-in-home/header-bg-alt_optim.png")`,
    backgroundColor: '#d7eef7',
    width: '100%',
    backgroundPosition: 'right 120px center',
    backgroundPositionX: 'right 120px',
    backgroundPositionY: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundRepeatX: 'no-repeat',
    backgroundRepeatY: 'no-repeat',
    backgroundSize: 'contain',
    height: 150,
  },
  bodyCourse: {
    height: 170,
  },
  fw700: {
    fontWeight: 700,
  },
  welcome: {
    color: '#271066',
    fontSize: '3rem',
    lineHeight: '3.75rem',
    fontWeight: 700,
    paddingTop: 90,
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
    marginTop: '28px',
  },
  middleNav: {
    backgroundColor: '#ffffff',
    width: 950,
  },
  tabs: {
    backgroundColor: '#ffffff',
    fontSize: 14,
    fontWeight: 700,
  },
}));
