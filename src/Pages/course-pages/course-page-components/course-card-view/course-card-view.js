import React from 'react';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import CourseCard from '../../../../Components/common-components/course-card/course-card.js';

export default function CourseCardView(passedCourses, isPending = false) {
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
}
