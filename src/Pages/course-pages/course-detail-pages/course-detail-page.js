/* eslint-disable no-undef */
import React from 'react';

import StudentCourseDetailPage from './student-course-detail-page/student-course-detail-page';
import TeacherCourseDetailPage from './teacher-course-detail-page/teacher-course-detail-page';

const CourseDetailPage = () => {
  const userRole = localStorage.getItem('role');
  return (
    <>
      {
        userRole === 'Student'
          ? <StudentCourseDetailPage />
          : <TeacherCourseDetailPage />
      }
    </>
  );
};

export default CourseDetailPage;
