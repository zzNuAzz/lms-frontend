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
import getUserCourseList from '../../api/graphql/get-user-course-list';
// import courses from '../sample-data/sample-course';

export default function CoursePage() {
  const [courseView, setCourseView] = useState('list');
  const userId = parseInt(localStorage.getItem('userId'), 10);
  const [courses, setCourses] = useState([]);
  const [pendingCourses, setPendingCourses] = useState([]);

  const handleListView = () => {
    setCourseView('list');
  };
  const handleCardView = () => {
    setCourseView('card');
  };

  const fetchStudentCourse = async () => {
    //* Fetch enrolled course
    const acceptedResult = await getUserCourseList({
      userId,
      status: 'Accepted',
      pageNumber: 0,
      pageSize: 10,
    });
    const parsedResult = JSON.parse(acceptedResult);
    if (parsedResult.data.userCourseList.courseList.length !== 0) {
      setCourses(parsedResult.data.userCourseList.courseList);
    } else {
      toast.error('You have no enrolled courses... :(');
    }

    //* Fetch pending course
    const result = await getUserCourseList({
      userId,
      status: 'Pending',
      pageNumber: 0,
      pageSize: 10,
    });
    const temp = JSON.parse(result);
    if (temp.data.userCourseList.courseList.length !== 0) {
      setPendingCourses(temp.data.userCourseList.courseList);
    }
  };

  useEffect(() => {
    fetchStudentCourse();
  }, [userId]);

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
      <Typography variant="h4">Enrolled Courses</Typography>
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
      <Typography variant="h4">Pending Courses</Typography>
      {
        courseView === 'list'
          ? (
            <List>
              {CourseListView(pendingCourses, true)}
            </List>
          )
          : (
            <Grid
              container
              direction="row"
              justify="center"
              spacing={3}
            >
              {CourseCardView(pendingCourses, true)}
            </Grid>
          )
      }
    </>
  );
}
