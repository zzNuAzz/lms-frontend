import {
  Box,
  Container,
  LinearProgress,
  Tab,
  Tabs,
  Typography,
  makeStyles,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import SubjectRoundedIcon from '@material-ui/icons/SubjectRounded';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import BorderColorRoundedIcon from '@material-ui/icons/BorderColorRounded';
import ForumRoundedIcon from '@material-ui/icons/ForumRounded';
import PersonPinRoundedIcon from '@material-ui/icons/PersonPinRounded';
import { toast } from 'react-toastify';

import CourseCardLarge from '../../../../Components/common-components/course-card/course-card-large';
import OverviewComponent from '../../../../Components/common-components/course-detail-components/overview-component/overview-component';
import AssignmentsComponent from '../../../../Components/common-components/course-detail-components/assignments-component/assignments-component';
import DocumentComponent from '../../../../Components/common-components/course-detail-components/document-component/document-component';
import ContactComponent from '../../../../Components/common-components/course-detail-components/contact-component/contact-component';
import getAssignmentsList from '../../../../api/graphql/get-assignments-list';
import getCourseHost from '../../../../api/graphql/get-course-host';
import getCourseDetails from '../../../../api/graphql/get-course-details';
import toastFetchErrors from '../../../../Components/tools/toast-fetch-errors';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.paper,
  },
  courseName: {
    fontSize: '',
  },
  header: {
    backgroundImage: 'url("//s3.amazonaws.com/coursera_assets/logged-in-home/header-bg-alt_optim.png")',
    backgroundColor: '#d7eef7',
    width: '100%',
    backgroundPosition: 'right 120px center',
    backgroundPositionX: 'right 120px',
    backgroundPositionY: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundRepeatX: 'no-repeat',
    backgroundRepeatY: 'no-repeat',
    backgroundSize: 'contain',
    height: 'fit-content',
  },
  welcome: {
    color: theme.palette.primary,
    fontSize: '3rem',
    lineHeight: '3.75rem',
    fontWeight: 700,
    paddingTop: 90,
  },
}));

const StudentCourseDetailPage = () => {
  const history = useHistory();
  const classes = useStyles();

  const [isLoading, setLoading] = useState(false);
  const { id } = useParams();
  const [courseName, setCourseName] = useState('');
  const [courseId, setCourseId] = useState(id);
  const [courseDescription, setCourseDescription] = useState('');
  const [courseHostId, setCourseHostId] = useState(0);
  const [host, setHost] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    birthday: '',
    address: '',
  });
  const [tabPosition, setTabPosition] = useState(0);

  const [assignments, setAssignments] = useState([]);

  const fetchCourseHost = async () => {
    try {
      const result = await getCourseHost(parseInt(courseId, 10));
      const parsedResult = JSON.parse(result);
      if (parsedResult.data) {
        setHost({
          firstName: parsedResult.data.course.host.firstName,
          lastName: parsedResult.data.course.host.lastName,
          phone: parsedResult.data.course.host.phone,
          email: parsedResult.data.course.host.email,
          birthday: parsedResult.data.course.host.birthday,
          address: parsedResult.data.course.host.address,
        });
      } else {
        toastFetchErrors(parsedResult);
      }
    } catch (error) {
      toast(error);
    }
  };

  const fetchCourseDetails = async () => {
    try {
      let result = await getCourseDetails(parseInt(courseId, 10));
      result = JSON.parse(result);
      if (result.data) {
        setCourseName(result.data.course.name);
        setCourseDescription(result.data.course.description || '');
        setCourseHostId(result.data.course.host.userId);
      } else {
        toastFetchErrors(result);
      }
    } catch (error) {
      toast(error);
    }
  };

  const fetchAssignments = async () => {
    try {
      const result = await getAssignmentsList(parseInt(courseId, 10));
      const parsedResult = JSON.parse(result);
      if (parsedResult.data) {
        setAssignments(parsedResult.data.assignmentList.assignmentList);
      } else {
        toastFetchErrors(parsedResult);
      }
    } catch (error) {
      toast(error);
    }
  };

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      await fetchCourseDetails();
      await fetchCourseHost();
      await fetchAssignments();
      setLoading(false);
    };
    fetchContent();
  }, []);

  const RenderComponent = (
    <div className="course-detail-page">
      <Box className={classes.root}>
        {/* HEADER */}
        <Box className={classes.header}>
          <Container maxWidth="md">
            <Typography
              variant="h3"
              gutterBottom
              className={classes.welcome}
            >
              {courseName}
            </Typography>
            <Typography
              variant="h5"
              gutterBottom
            >
              {`Lecturer: ${host.lastName.concat(' ', host.firstName)}`}
            </Typography>
            <br />
          </Container>
        </Box>
      </Box>
      <Tabs
        variant="scrollable"
        value={tabPosition}
        onChange={(event, newPos) => setTabPosition(newPos)}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab
          label={(
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <SubjectRoundedIcon />
              &nbsp;
              Overview
            </div>
          )}
        />
        <Tab
          label={(
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <DescriptionRoundedIcon />
              &nbsp;
              Documents
            </div>
          )}
        />
        <Tab
          label={(
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <BorderColorRoundedIcon />
              &nbsp;
              Assignments
            </div>
          )}
        />
        <Tab
          label={(
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <ForumRoundedIcon />
              &nbsp;
              Forum
            </div>
          )}
        />
        <Tab
          label={(
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <PersonPinRoundedIcon />
              &nbsp;
              Contact
            </div>
          )}
        />
      </Tabs>
      <br />
      {(() => {
        switch (tabPosition) {
          case 0:
            return <OverviewComponent currentDescription={courseDescription} />;
          case 1:
            return <DocumentComponent />;
          case 2:
            return <AssignmentsComponent assignments={assignments} courseId={id} />;
          case 3:
            history.push(`/course/${courseId}/forum`);
            break;
          case 4:
            return <ContactComponent user={host} />;
          default:
            return null;
        }
      })()}
    </div>
  );

  return (
    <>
      {
        isLoading ? <LinearProgress /> : RenderComponent
      }
    </>
  );
};

export default StudentCourseDetailPage;
