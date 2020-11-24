/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import {
  Button,
  ButtonGroup,
  Grid,
  List,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import ListRoundedIcon from '@material-ui/icons/ListRounded';
import CardIcon from '@material-ui/icons/ViewAgendaRounded';
import { toast } from 'react-toastify';
import CourseCard from '../Components/course-card/course-card.js';
import { CourseListElement } from '../Components/course-list-element/course-list-element';
import getUserCourseList from '../api/graphql/get-user-course-list';
// import courses from '../sample-data/sample-course';

export default function CoursePage() {
  const [courseView, setCourseView] = useState('list');
  const [userId, setUserId] = useState(parseInt(localStorage.getItem('userId'), 10));
  const [courses, setCourses] = useState([]);

  const handleListView = () => {
    setCourseView('list');
  };
  const handleCardView = () => {
    setCourseView('card');
  };

  const fetchCourse = async () => {
    const result = await getUserCourseList({
      userId,
      status: 'Accepted',
      pageNumber: 0,
      pageSize: 10,
    });
    const parsedResult = JSON.parse(result);
    if (parsedResult.data.userCourseList.courseList.length !== 0) {
      setCourses(parsedResult.data.userCourseList.courseList);
    } else {
      toast.error('You have no enrolled courses... :(');
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [userId]);

  // TODO: Fade in/out animation when entering CourseDetail
  const CourseListView = courses.map((course) => (
    <div style={{ margin: '15px' }}>
      <Link
        to={`/course/${course.courseId}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <CourseListElement title={course.name} />
      </Link>
    </div>
  ));

  const CourseCardView = courses.map((course) => (
    <Grid item md={4}>
      <Link
        to={`/course/${course.courseId}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <CourseCard title={course.name} id={course.courseId} />
      </Link>
    </Grid>
  ));

  return (
    <>
      <h1>All Courses</h1>

      {/* List-View Switcher */}
      <Grid
        container
        direction="row"
        justify="flex-end"
        alignContent="center"
        alignItems="center"
      >
        {/* <Grid item>
          <Typography variant="body1">View as:&nbsp;</Typography>
        </Grid> */}
        <Grid item>
          <ButtonGroup color="primary">
            <Button
              variant="text"
              color="primary"
            >
              View as
            </Button>
            <Button
              variant={courseView === 'list' ? 'contained' : 'outlined'}
              onClick={handleListView}
            >
              <ListRoundedIcon />
              &nbsp;
              List
            </Button>
            <Button
              variant={courseView === 'card' ? 'contained' : 'outlined'}
              onClick={handleCardView}
            >
              <CardIcon />
              &nbsp;
              Card
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
      <br />
      {
        courseView === 'list'
          ? (
            <List>
              {CourseListView}
            </List>
          )
          : (
            <Grid
              container
              direction="row"
              justify="center"
              spacing={3}
            >
              {CourseCardView}
            </Grid>
          )
      }
    </>
  );
}
