import React from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getSignedInUser } from '../../api/graphql/get-signedin-user';
import toastFetchErrors from '../../Components/tools/toast-fetch-errors';
import StudentCoursePage from './student-course-page';
import TeacherCoursePage from './teacher-course-page';

export default function CoursePage() {
  const userRole = localStorage.getItem('role');
  const history = useHistory();

  const checkLoginState = async () => {
    try {
      const result = await getSignedInUser();
      const parsedResult = JSON.parse(result);
      if (parsedResult.data) {
        if (parsedResult.data.currentUser.signedIn === false) {
          localStorage.clear();
          history.push('/login');
        }
      } else {
        toastFetchErrors(parsedResult);
      }
    } catch (error) {
      toast.error(error.toString());
    }
  };

  checkLoginState();

  return (
    <>
      {userRole === 'Student' ? <StudentCoursePage /> : <TeacherCoursePage />}
    </>
  );
}
