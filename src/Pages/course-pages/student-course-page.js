/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import {
  Grid,
  LinearProgress,
  List,
  Typography,
} from '@material-ui/core';
import { toast } from 'react-toastify';

import getUserCourseList from '../../api/graphql/get-user-course-list';
import getAllCourses from '../../api/graphql/get-all-courses.js';

import CourseListView from './course-page-components/course-list-view/course-list-view';
import CourseCardView from './course-page-components/course-card-view/course-card-view';
import SwitchViewButton from './course-page-components/switch-view-button/switch-view-button.js';
import AllCourseView from './course-page-components/all-courses-view/all-courses-view';

export default function CoursePage() {
  const [isLoading, setLoading] = useState(false);
  const [courseView, setCourseView] = useState('list');
  const userId = parseInt(localStorage.getItem('userId'), 10);
  const [courses, setCourses] = useState([]);
  const [pendingCourses, setPendingCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);

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

  const fetchAllCourses = async () => {
    const result = await getAllCourses();
    const parsedResult = JSON.parse(result);
    if (parsedResult.data) {
      setAllCourses(parsedResult.data.courseList.courseList);
    } else {
      toast(result, {
        type: 'error',
        autoClose: 5000,
      });
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

  const RenderComponent = (
    <>
      <SwitchViewButton
        courseView={courseView}
        setCourseView={setCourseView}
      />
      <Typography variant="h4">Enrolled Courses</Typography>
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
      <br />
      <Typography variant="h4">All Courses</Typography>
      <Grid
        container
        direction="row"
        spacing={2}
      >
        <AllCourseView
          courses={allCourses}
          enrolledCourses={courses}
          pendingCourses={pendingCourses}
          fetchAllCourses={fetchAllCourses}
        />
      </Grid>
    </>
  );

  return (
    <>
      {
        isLoading ? <LinearProgress /> : RenderComponent
      }
    </>
  );
}
