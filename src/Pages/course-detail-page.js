import { Tab, Tabs } from '@material-ui/core';
import TabPanel from '@material-ui/lab/TabPanel'
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseById } from '../api/graphql/get-course-by-id';
import CourseCardLarge from '../Components/course-card/course-card-large';
import OverviewComponent from '../Components/course-detail-components/overview-component/overview-component';
import AssignmentsComponent from '../Components/course-detail-components/assignments-component/assignments-component';
import ForumComponent from '../Components/course-detail-components/forum-component/forum-component';
import { useHistory } from 'react-router-dom';

const CourseDetailPage = () => {
  const { id } = useParams();
  const [courseName, setCourseName] = useState('');
  const [courseId, setCourseId] = useState(id);
  // console.log({courseId});
  const [courseDescription, setCourseDescription] = useState('');
  const [courseHostId, setCourseHostId] = useState(0);
  const [hostFirstName, setHostFirstName] = useState('');
  const [hostLastName, setHostLastName] = useState('');
  const [tabPosition, setTabPosition] = useState(0);
  const history = useHistory();

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
        courseLecturer={
          (hostFirstName && hostLastName)
            ? `${hostFirstName + ' ' + hostLastName}`
            : `Lecturer has...no name?`
        }
      />
      <br />
      <Tabs
        value={tabPosition}
        onChange={(event, newPos) => setTabPosition(newPos)}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Overview" />
        <Tab label="Assignments" />
        <Tab label="Forum" />
      </Tabs>
      <br />
      {(() => {
        switch (tabPosition) {
          case 0:
            return <OverviewComponent />;
          case 1:
            return <AssignmentsComponent />;
          case 2:
            history.push(`/course/${courseId}/forum`);
          default:
            return null;
        }
      })()}
    </>
  );
};

export default CourseDetailPage;
