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
import SwipeableViews from "react-swipeable-views";
import { toast } from "react-toastify";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

import { TeacherCourseCard } from "./TeacherCourseCard";
import getTeacherCourseList from "../../api/graphql/get-teacher-course-list.js";
import toastFetchErrors from "../../Components/tools/toast-fetch-errors";
import { Recommend } from "./Recommend";
import { NewCourseBox } from "./NewCourseBox";

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

export default function CoursePage() {
  const [isLoading, setLoading] = useState(false);
  const hostId = parseInt(localStorage.getItem("userId"), 10);
  const [courses, setCourses] = useState([]);
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(1);
  const pageSize = 5;

  const handlePagination = (event, pageNum) => {
    setPageNumber(pageNum);
    const fetchContent = async () => {
      if (value == 0) {
        await fetchTeacherCourseByNewest(pageNum - 1, pageSize);
        window.scrollTo(0, 900);
      } else if (value == 1) {
        await fetchTeacherCourseByOldest(pageNum - 1, pageSize);
        window.scrollTo(0, 100);
      } else {
        await fetchTeacherCourseByAlphabet(pageNum - 1, pageSize);
        window.scrollTo(0, 100);
      }
    };
    fetchContent();
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const fetchTeacherCourseByNewest = async (pageNumber, pageSize) => {
    try {
      const result = await getTeacherCourseList(hostId, pageNumber, pageSize, [
        ["courseId", "desc"],
      ]);
      const parsedResult = JSON.parse(result);
      if (parsedResult.data) {
        setCourses(parsedResult.data.courseList.courseList);
        setTotalPage(parsedResult.data.courseList.totalPages);
      } else {
        toastFetchErrors(parsedResult);
      }
    } catch (error) {
      toast.error(error.toString());
    }
  };

  const fetchTeacherCourseByOldest = async (pageNumber, pageSize) => {
    try {
      const result = await getTeacherCourseList(hostId, pageNumber, pageSize, [
        ["createAt", "asc"],
      ]);
      const parsedResult = JSON.parse(result);
      if (parsedResult.data) {
        if (parsedResult.data.courseList.courseList.length !== 0) {
          setCourses(parsedResult.data.courseList.courseList);
          setTotalPage(parsedResult.data.courseList.totalPages);
        } else {
          toast.error("You have no active courses.");
        }
      } else {
        toastFetchErrors(parsedResult);
      }
    } catch (error) {
      toast.error(error.toString());
    }
  };

  const fetchTeacherCourseByAlphabet = async (pageNumber, pageSize) => {
    try {
      const result = await getTeacherCourseList(hostId, pageNumber, pageSize, [
        ["name", "asc"],
      ]);
      const parsedResult = JSON.parse(result);
      if (parsedResult.data) {
        if (parsedResult.data.courseList.courseList.length !== 0) {
          setCourses(parsedResult.data.courseList.courseList);
          setTotalPage(parsedResult.data.courseList.totalPages);
        } else {
          toast.error("You have no active courses.");
        }
      } else {
        toastFetchErrors(parsedResult);
      }
    } catch (error) {
      toast.error(error.toString());
    }
  };

  const handleSwitchCourseType = (event, newValue) => {
    if (newValue == 0) {
      fetchTeacherCourseByNewest(pageNumber - 1, pageSize);
    } else if (newValue == 1) {
      fetchTeacherCourseByOldest(pageNumber - 1, pageSize);
    } else if (newValue == 2) {
      fetchTeacherCourseByAlphabet(pageNumber - 1, pageSize);
    }
    setValue(newValue);
    setPageNumber(1);
  };
  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  }
  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      await fetchTeacherCourseByNewest(pageNumber - 1, pageSize);
      setLoading(false);
    };
    fetchContent();
  }, []);
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
                <Tab label="Oldest" {...a11yProps(1)} />
                <Tab label="ABC" {...a11yProps(2)} />
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
              <Recommend recommendArr={courses} title="Recommended Courses" />
            </Container>
          </Box>
          <Box className={classes.whiteBack} pt={4}>
            <Container maxWidth="lg">
              <Grid container spacing={3}>
                <Grid item xs={12} lg={8}>
                  <Container maxWidth="md">
                    <Box mb={-6}>
                      <Grid container justify="center">
                        <Grid item xs={4}>
                          <Box pl={3}>
                            <Typography variant="h5" className={classes.fw700}>
                              All Courses:
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
                  {courses.map((course) => (
                    <TeacherCourseCard
                      course={course}
                      fetchTeacherCourse={fetchTeacherCourseByNewest}
                    />
                  ))}
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Box mt={9}>
                    <NewCourseBox
                      fetchTeacherCourse={fetchTeacherCourseByNewest}
                    />
                  </Box>
                  {/* <NewPostBox /> */}
                </Grid>
              </Grid>
            </Container>
          </Box>
        </TabPanel>
        {/* OLDEST */}
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Box className={classes.whiteBack}>
            <Container maxWidth="md">
              <Box mb={-6}>
                <Grid container justify="center">
                  <Grid item xs={4}>
                    <Box pl={3}>
                      <Typography variant="h5" className={classes.fw700}>
                        Oldest courses first:
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
                <TeacherCourseCard
                  course={course}
                  // fetchTeacherCourse={fetchTeacherCourse}
                />
              ))}
            </Container>
          </Box>
        </TabPanel>
        {/* ABC */}
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Box className={classes.whiteBack}>
            <Container maxWidth="md">
              <Box mb={-6}>
                <Grid container justify="center">
                  <Grid item xs={4}>
                    <Box pl={3}>
                      <Typography variant="h5" className={classes.fw700}>
                        Sort by alphabet:
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
                <TeacherCourseCard
                  course={course}
                  // fetchTeacherCourse={fetchTeacherCourse}
                />
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

  return <>{isLoading ? <LinearProgress /> : RenderComponent}</>;
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
    height: "fit-content",
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
  newCourse: {
    backgroundColor: "#f5f7fa",
  },
}));
