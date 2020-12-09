/* eslint-disable no-undef */
import React from 'react';
import StudentCoursePage from './student-course-page';
import TeacherCoursePage from './teacher-course-page';

export default function CoursePage() {
  const userRole = localStorage.getItem('role');
  return (
    <>
      {
        userRole === 'Student'
          ? <StudentCoursePage />
          : <TeacherCoursePage />
      }
    </>
  );
}
