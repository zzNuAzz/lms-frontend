import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  LinearProgress,
  Typography,
  Tabs,
  Tab,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import Pagination from "@material-ui/lab/Pagination";
import SwipeableViews from "react-swipeable-views";

import { CourseCard } from "./CourseCard";

import getUserCourseList from "../../api/graphql/get-user-course-list";
import getAllCourses from "../../api/graphql/get-all-courses.js";
import getRecommendCourses from "../../api/graphql/get-recommend-courses.js";
import toastFetchErrors from "../../Components/tools/toast-fetch-errors";
import { Recommend } from "./Recommend";

// TabPanel
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
const reduceAllCourses = (arr1, arr2) => {
  var pendingIdList = [];
  var result = [];
  for (var i = 0; i < arr2.length; i++) {
    pendingIdList.push(arr2[i].courseId);
  }
  // console.log("Reduce1", pendingIdList);
  for (var i = 0; i < arr1.length; i++) {
    if (!pendingIdList.includes(arr1[i].courseId)) {
      result.push(arr1[i]);
    }
  }
  // console.log("Reduce2", result);
  return result;
};
//CoursePage
export default function CoursePage() {
  const [isLoading, setLoading] = useState(false);
  const userId = parseInt(localStorage.getItem("userId"), 10);
  const [courses, setCourses] = useState([]);
  const [pendingCourses, setPendingCourses] = useState([]);
  var [allCourses, setAllCourses] = useState([]);
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [pageNumber, setPageNumber] = React.useState(1);
  var [totalPage, setTotalPage] = React.useState(1);
  var [totalPageAllCourses, setTotalPageAllCourses] = React.useState(1);
  const [totalPageIPCourses, setTotalPageIPCourses] = React.useState(1);
  const [totalPagePeCourses, setTotalPagePeCourses] = React.useState(1);
  const [recommendArr, setRecommendArr] = useState([]);
  const pageSize = 5;

  const handlePagination = (event, pageNum) => {
    setPageNumber(pageNum);
    const fetchContent = async () => {
      // setLoading(true);
      if (value == 0) {
        await fetchAllCourses(pageNum - 1, pageSize);
        window.scrollTo(0, 900);
      } else if (value == 1 || value == 2) {
        await fetchStudentCourse(pageNum - 1, pageSize);
        window.scrollTo(0, 100);
      }
      // setLoading(false);
    };
    fetchContent();
  };
  const handleSwitchCourseType = (event, newValue) => {
    if (newValue == 0) setTotalPage(totalPageAllCourses);
    else if (newValue == 1) setTotalPage(totalPageIPCourses);
    else if (newValue == 2) setTotalPage(totalPagePeCourses);
    setValue(newValue);
    setPageNumber(1);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  }
  // API
  const fetchStudentCourse = async (pageNumber, pageSize) => {
    try {
      //* Fetch enrolled courses
      const acceptedResult = await getUserCourseList({
        userId,
        status: "Accepted",
        pageNumber,
        pageSize,
      });
      const parsedResult = JSON.parse(acceptedResult);
      // console.log(parsedResult);
      if (parsedResult.data) {
        if (parsedResult.data.userCourseList.courseList.length !== 0) {
          setCourses(parsedResult.data.userCourseList.courseList);
          setTotalPageIPCourses(parsedResult.data.userCourseList.totalPages);
        } else {
          toast.error("You have no enrolled courses... :(");
        }
      } else {
        toastFetchErrors(parsedResult);
        // console.log({ parsedResult });
      }

      //* Fetch pending courses
      const result = await getUserCourseList({
        userId,
        status: "Pending",
        pageNumber: pageNumber,
        pageSize: pageSize,
      });
      const temp = JSON.parse(result);
      if (temp.data) {
        if (temp.data.userCourseList.courseList.length !== 0) {
          setPendingCourses(temp.data.userCourseList.courseList);
          setTotalPagePeCourses(parsedResult.data.userCourseList.totalPages);
        }
      } else {
        toastFetchErrors(temp);
      }
    } catch (error) {
      toast.error(error.toString());
    }
  };

  const fetchAllCourses = async (pageNumber, pageSize) => {
    try {
      const result = await getAllCourses(pageNumber, pageSize);
      const parsedResult = JSON.parse(result);
      if (parsedResult.data) {
        setAllCourses(parsedResult.data.courseList.courseList);
      } else {
        toastFetchErrors(parsedResult);
      }
      // console.log({ parsedResult });
    } catch (error) {
      toast.error(error.toString());
    }
  };

  const fetchRecommendCourses = async (pageSize) => {
    try {
      const result = await getRecommendCourses(pageSize);
      const parsedResult = JSON.parse(result);

      if (parsedResult.data) {
        setRecommendArr(parsedResult.data.courseList.courseList);
      } else {
        toastFetchErrors(parsedResult);
      }
      // console.log({ parsedResult });
    } catch (error) {
      toast.error(error.toString());
    }
  };

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      await fetchStudentCourse();
      await fetchAllCourses(pageNumber - 1, pageSize);
      await fetchRecommendCourses(20);
      setLoading(false);
    };
    fetchContent();
  }, []);

  if (allCourses.length > 0) {
    allCourses = reduceAllCourses(allCourses, courses);
    totalPageAllCourses = Math.floor(allCourses.length / pageSize) + 1;
    totalPage = totalPageAllCourses;
    // console.log("Length", allCourses.length);
  }

  // console.log({ courses });
  // console.log({ allCourses });
  // console.log({ pendingCourses });
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
          <br />
        </Box>
      </Box>

      {/* MIDDLE NAV */}
      <Container fixed className={classes.middleNav}>
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

      {/* COURSE CARD */}
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {/* HOME */}
        <TabPanel value={value} index={0} dir={theme.direction}>
          {/* RECOMMEND FOR 3RD YEAR STUDENTS */}
          <Box className={classes.root} py={2}>
            <Container maxWidth="lg">
              <Recommend
                recommendArr={recommendArr}
                title="Recommended courses for Computer Science"
              />
            </Container>
          </Box>
          <Box className={classes.whiteBack} pt={4}>
            <Container maxWidth="md">
              <Box mb={-6}>
                <Grid container justify="center">
                  <Grid item xs={12} sm={5}>
                    <Box pl={3}>
                      <Typography variant="h5" className={classes.fw700}>
                        You might be interested in:
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={7} container justify="flex-end">
                    <Box pr={3}>
                      <Pagination
                        count={totalPage}
                        page={pageNumber}
                        color="primary"
                        onChange={handlePagination}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Container>
            <Container maxWidth="md">
              {allCourses.map((course) => (
                <CourseCard course={course} />
              ))}
            </Container>
          </Box>
        </TabPanel>
        {/* IN PROGRESS */}
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Box className={classes.whiteBack}>
            <Container maxWidth="md">
              <Box mb={-6}>
                <Grid container justify="center">
                  <Grid item xs={4}>
                    <Box pl={3}>
                      <Typography variant="h5" className={classes.fw700}>
                        Your Courses:
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={8} container justify="flex-end">
                    <Box pr={3}>
                      <Pagination
                        count={totalPage}
                        page={pageNumber}
                        color="primary"
                        onChange={handlePagination}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Container>
            <Container maxWidth="lg">
              {courses.map((course) => (
                <CourseCard course={course} isEnrolled={new Boolean(true)} />
              ))}
            </Container>
          </Box>
        </TabPanel>
        {/* PENDING */}
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Box className={classes.whiteBack}>
            <Container maxWidth="md">
              <Box mb={-6}>
                <Grid container justify="center">
                  <Grid item xs={4}>
                    <Box pl={3}>
                      <Typography variant="h5" className={classes.fw700}>
                        Pending Courses:
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={8} container justify="flex-end">
                    <Box pr={3}>
                      <Pagination
                        count={totalPage}
                        page={pageNumber}
                        color="primary"
                        onChange={handlePagination}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Container>
            <Container maxWidth="lg">
              {pendingCourses.map((course) => (
                <CourseCard course={course} />
              ))}
            </Container>
          </Box>
        </TabPanel>
      </SwipeableViews>

      {/* PAGINATE */}
      <Grid container justify="center">
        <Pagination
          count={totalPage}
          page={pageNumber}
          color="primary"
          onChange={handlePagination}
        />
      </Grid>
    </>
  );
  return (
    <>
      {isLoading ? (
        <LinearProgress style={{ backGround: "#2a73cc" }} />
      ) : (
        RenderComponent
      )}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f5f7fa",
  },
  whiteBack: {
    backgroundColor: "#ffffff",
  },
  header: {
    backgroundImage: `url("//s3.amazonaws.com/coursera_assets/logged-in-home/header-bg-alt_optim.png")`,
    backgroundColor: "#d7eef7",
    width: "100%",
    backgroundPosition: "right 120px center",
    backgroundPositionX: "right 120px",
    backgroundPositionY: "center",
    backgroundRepeat: "no-repeat",
    backgroundRepeatX: "no-repeat",
    backgroundRepeatY: "no-repeat",
    backgroundSize: "contain",
    height: "fit-content",
  },
  bodyCourse: {
    height: 170,
  },
  fw700: {
    fontWeight: 700,
  },
  welcome: {
    color: "#271066",
    fontSize: "3rem",
    lineHeight: "3.75rem",
    fontWeight: 700,
    paddingTop: 90,
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
    marginTop: "28px",
  },
  middleNav: {
    backgroundColor: "#ffffff",
    width: 950,
  },
  tabs: {
    backgroundColor: "#ffffff",
    fontSize: 14,
    fontWeight: 700,
  },
}));
