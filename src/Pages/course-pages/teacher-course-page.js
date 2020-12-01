/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import {
  Button,
  ButtonGroup,
  Grid,
  List,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import ListRoundedIcon from '@material-ui/icons/ListRounded';
import CardIcon from '@material-ui/icons/ViewAgendaRounded';
import { toast } from 'react-toastify';
import CourseCard from '../../Components/common-components/course-card/course-card.js';
import { CourseListElement } from '../../Components/common-components/course-list-element/course-list-element';
import getTeacherCourseList from '../../api/graphql/get-teacher-course-list.js';

export default function CoursePage() {
  const [courseView, setCourseView] = useState('list');
  const hostId = parseInt(localStorage.getItem('userId'), 10);
  const [courses, setCourses] = useState([]);

  const handleListView = () => {
    setCourseView('list');
  };
  const handleCardView = () => {
    setCourseView('card');
  };

  const fetchTeacherCourse = async () => {
    //* Fetch teacher courses
    const result = await getTeacherCourseList(
      hostId,
    );
    const parsedResult = JSON.parse(result);
    if (parsedResult.data.courseList.courseList.length !== 0) {
      setCourses(parsedResult.data.courseList.courseList);
    } else {
      toast.error('You have no active courses.');
    }
  };

  useEffect(() => {
    fetchTeacherCourse();
  }, []);

  // TODO: Fade in/out animation when entering CourseDetail
  const CourseListView = (passedCourses, isPending = false) => {
    if (!isPending) {
      return passedCourses.map((course) => (
        <div style={{ margin: '15px' }}>
          <Link
            to={`/course/${course.courseId}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <CourseListElement title={course.name} />
          </Link>
        </div>
      ));
    }
    return passedCourses.map((course) => (
      <div style={{ margin: '15px' }}>
        <CourseListElement title={course.name} />
      </div>
    ));
  };
  const CourseCardView = (passedCourses, isPending = false) => {
    if (!isPending) {
      return passedCourses.map((course) => (
        <Grid item md={4}>
          <Link
            to={`/course/${course.courseId}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <CourseCard title={course.name} id={course.courseId} />
          </Link>
        </Grid>
      ));
    }
    return passedCourses.map((course) => (
      <Grid item md={4}>
        <CourseCard title={course.name} id={course.courseId} />
      </Grid>
    ));
  };

  return (
    <>
      <Grid
        container
        direction="row"
        justify="flex-end"
        alignContent="center"
        alignItems="center"
      >
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
      <Typography variant="h4">My Courses</Typography>
      {/* List-View Switcher */}
      {
        courseView === 'list'
          ? (
            <List>
              {CourseListView(courses)}
            </List>
          )
          : (
            <Grid
              container
              direction="row"
              justify="center"
              spacing={3}
            >
              {CourseCardView(courses)}
            </Grid>
          )
      }
      <br />
    </>
  );
}
