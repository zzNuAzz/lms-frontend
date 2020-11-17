import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseById } from '../api/graphql/get-course-by-id';
import { getUserInformation } from '../api/graphql/get-user-information';
import { CourseCardLarge } from '../Components/course-card/course-card-large';

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
        setHostFirstName(result.data.course.host.firstName);
        setHostLastName(result.data.course.host.lastName);
      }
    } catch (err) {
      alert(`Error detected: ${err}`);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, [courseId]);

  return (
    <>
      <CourseCardLarge
        courseName={courseName}
        courseId={courseId}
        courseLecturer={`${hostFirstName + ' ' + hostLastName}`}
      />
    </>
  );
};

export default CourseDetailPage;
