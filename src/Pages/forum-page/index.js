import React, { Fragment, useEffect, useState } from 'react';
import {
  IconButton,
  Toolbar,
  Box,
  Menu,
  MenuItem,
  Fade,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Link, useParams, useHistory } from 'react-router-dom';
import SearchBar from 'material-ui-search-bar';
import {
  green, pink, yellow, blue,
} from '@material-ui/core/colors';

import ThreadList from './ThreadList';
import MostHelpful from './MostHelpful';
import { NewPostBox } from './NewPostBox';
import getThreadList from '../../api/graphql/get-thread-list';
import getUserCourseList from '../../api/graphql/get-user-course-list';
import getUserInformation from '../../api/graphql/get-user-information';
import { toast } from 'react-toastify';
import toastFetchErrors from '../../Components/tools/toast-fetch-errors';
import getTeacherCourseList from '../../api/graphql/get-teacher-course-list';

export default function Forum() {
  const history = useHistory();

  const { courseId } = useParams();
  // console.log({courseId});
  const [course, setCourse] = useState({ name: "Course's Name" });
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState(
    parseInt(localStorage.getItem('userId'), 10),
  );
  // console.log({ userId });
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [thread, setThread] = useState([]);
  const [courseList, setCourseList] = useState([]);

  const fetchUser = async () => {
    try{
      const result = await getUserInformation(userId);
      const parsedResult = JSON.parse(result);
      if(parsedResult.data){
        console.log(parsedResult.data.userProfile);
        setUser(parsedResult.data.userProfile);
      } else {
        toastFetchErrors(parsedResult);
      }
    } catch (error) {
      toast(error);
    }
  }

  useEffect(()=> fetchUser(), [userId]); 

  useEffect(() => {
    if(user.role === 'Teacher') {
      // console.log(typeof(user.userId));
      let hostId = parseInt(userId, 10);
      console.log(typeof(hostId));
      getTeacherCourseList(hostId)
      .then((result) => {
        if (result.errors) throw new Error(result.errors[0].message);
        console.log({result});
        setCourseList(JSON.parse(result).data.courseList.courseList);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    else if(user.role === 'Student') {
      console.log(user.role);
      getUserCourseList({ userId })
      .then((result) => {
        if (result.errors) throw new Error(result.errors[0].message);
        setCourseList(JSON.parse(result).data.userCourseList.courseList);
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [user]);

  useEffect(() => {
    getThreadList(parseInt(courseId, 10))
      .then((result) => {
        if (result.errors) throw new Error(result.errors[0].message);
        const {
          threadList: { threadList },
          course,
        } = result.data;
        setThread(threadList);
        setCourse(course);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [courseId]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickOnCourse = (course) => {
    setAnchorEl(null);
    history.push(`/course/${course.courseId}/forum`);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // console.log('CourseList: ', courseList);
  const newThreadLink = `/course/${courseId}/newthread`;
  return (
    <>
      <div className={classes.root}>
        <Box className={classes.search}>
          <Container>
            <br />
            <Typography variant="h4" gutterBottom className={classes.welcome}>
              Welcome to LMS Forum
            </Typography>
            <SearchBar
              className={classes.searchBar}
              placeholder="Search for your topic"
            />
          </Container>
        </Box>
        <Container>
          <Toolbar>
            <Grid container>
              <Grid item container alignItems="center" xs={6}>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="primary"
                  aria-label="menu"
                  aria-controls="fade-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <ArrowDropDownIcon />
                </IconButton>
                <Menu
                  id="fade-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={open}
                  onClose={handleClose}
                  TransitionComponent={Fade}
                >
                  {courseList.map((course) => (
                    <MenuItem onClick={() => handleClickOnCourse(course)}>
                      {course.name}
                    </MenuItem>
                  ))}
                </Menu>
                <Typography variant="h6" color="primary">
                  {course.name}
                </Typography>
              </Grid>
              <Grid
                item
                container
                alignItems="center"
                justify="flex-start"
                xs={5}
              >
                <Link to={newThreadLink}>
                  <IconButton edge="start" color="primary" aria-label="menu">
                    <AddBoxIcon />
                    <Typography variant="subtitle1" color="primary">
                      Add new topic
                    </Typography>
                  </IconButton>
                </Link>
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
        <Container className={classes.root}>
          <Grid container direction="row" spacing={8}>
            <Grid container item xs={12} lg={8} direction="column" spacing={2}>
              <ThreadList thread={thread} />
            </Grid>
            <Grid container item xs={12} lg={4} direction="column" spacing={2}>
              <MostHelpful />
              <NewPostBox />
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#f5f7fa',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  search: {
    backgroundImage: `url(${'https://uploads-us-west-2.insided.com/coursera-en/attachment/0ee512f0-c148-4e6c-a3c5-ae5ea674bbf9_thumb.jpg'})`,
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    padding: 30,
    width: '100%',
    marginBottom: 50,
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  media: {
    height: 0,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  appBar: {},
  welcome: {
    color: '#ffffff',
    textColor: '#ffffff',
    fontWeight: 600,
  },
  searchBar: {
    width: 300,
    marginBottom: 60,
  },
  m1: {
    margin: 8,
  },
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: 15,
  },
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
  green: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
  },
  yellow: {
    color: theme.palette.getContrastText(yellow[500]),
    backgroundColor: yellow[500],
  },
  blue: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
  },
}));
