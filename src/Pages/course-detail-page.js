import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseById } from '../api/graphql/get-course-by-id';
import { getUserInformation } from '../api/graphql/get-user-information';

const CourseDetailPage = () => {
  const { id } = useParams();
  const [courseName, setCourseName] = useState('');
  const [courseId, setCourseId] = useState(id);
  const [courseDescription, setCourseDescription] = useState('');

  const [courseHostId, setCourseHostId] = useState(0);
  const [hostFirstName, setHostFirstName] = useState('');
  const [hostLastName, setHostLastName] = useState('');

  const fetchCourseDetails = async () => {
    try {
      let result = await getCourseById(parseInt(courseId, 10));
      result = JSON.parse(result);
      if (result.data) {
        setCourseName(result.data.course.name);
        setCourseDescription(result.data.course.description || '');
        setCourseHostId(result.data.course.host.userId);
      }
    } catch (err) {
      alert(`Error detected: ${err}`);
    }
  };

  const fetchCourseHostInformation = async () => {
    try {
      let result = await getUserInformation(parseInt(courseHostId, 10));
      result = JSON.parse(result);
      if (result.data) {
        setHostFirstName(result.data.userProfile.firstName || '');
        setHostLastName(result.data.userProfile.lastName || '');
      }
    } catch (err) {
      alert(`Error detected: ${err}`);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
    fetchCourseHostInformation();
  }, [courseId]);

  return (
    <>
      <h5>{`Placeholder for CourseDetailPage ${courseName}`}</h5>
      <h5>{`Lecturer: ${hostLastName + ' ' + hostFirstName}`}</h5>
    </>
  );
};

export default CourseDetailPage;
