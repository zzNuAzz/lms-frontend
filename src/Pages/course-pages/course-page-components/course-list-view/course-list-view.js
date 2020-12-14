import React from 'react';
import { Link } from 'react-router-dom';

import { CourseListElement } from '../../../../Components/common-components/course-list-element/course-list-element';

export default function CourseListView(passedCourses, isPending = false) {
  if (!isPending) {
    return passedCourses.map((course) => (
      <div style={{ marginBottom: '15px' }}>
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
    <div style={{ marginBottom: '15px' }}>
      <CourseListElement title={course.name} />
    </div>
  ));
}