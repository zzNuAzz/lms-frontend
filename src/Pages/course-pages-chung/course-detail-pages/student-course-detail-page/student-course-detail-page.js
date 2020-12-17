/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  Box,
  Container,
  LinearProgress,
  Tab,
  Tabs,
  Typography,
  makeStyles,
  Grid,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors'
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import SubjectRoundedIcon from '@material-ui/icons/SubjectRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import BorderColorRoundedIcon from '@material-ui/icons/BorderColorRounded';
import ForumRoundedIcon from '@material-ui/icons/ForumRounded';
import PeopleRoundedIcon from '@material-ui/icons/PeopleRounded';
import { toast } from 'react-toastify';

import OverviewComponent from '../../../../Components/common-components/course-detail-components/overview-component/overview-component';
import AssignmentsComponent from '../../../../Components/common-components/course-detail-components/assignments-component/assignments-component';
import ForumComponent from '../../../../Components/common-components/course-detail-components/forum-component/forum-component';
import DocumentComponent from '../../../../Components/common-components/course-detail-components/document-component/document-component';
import getAssignmentsList from '../../../../api/graphql/get-assignments-list';
import CourseMembersComponent from '../../../../Components/teacher-components/course-members-component/course-members-component';
import getCourseMemberList from '../../../../api/graphql/get-course-member-list';
import getCourseHost from '../../../../api/graphql/get-course-host';
import getCourseDetails from '../../../../api/graphql/get-course-details';
import toastFetchErrors from '../../../../Components/tools/toast-fetch-errors';
import EditCourseComponent from '../../../../Components/common-components/course-detail-components/edit-course-component/edit-course-component';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.paper,
  },
  tabs: {
    borderRight: '1px solid',
    borderRightColor: grey['300'],
  },
  tabButtonInactive: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 10px',
    width: 'inherit',
    height: 50,
    cursor: 'pointer',
    '&:hover': {
      background: grey['50'],
    },
  },
  tabButtonActive: {
    display: 'flex',
    background: theme.palette.background.paper,
    color: theme.palette.primary.main,
    padding: '10px 10px',
    alignItems: 'center',
    width: 'inherit',
    height: 50,
    cursor: 'pointer',
    borderLeft: '8px solid #2a73cc',
    fontWeight: 'bolder',
  },
}));

const TeacherCourseDetailPage = () => {
  const classes = useStyles();
  const history = useHistory();

  const { id } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [courseName, setCourseName] = useState('');
  const [courseId, setCourseId] = useState(id);
  const [courseDescription, setCourseDescription] = useState('');
  const [courseShortDescription, setCourseShortDescription] = useState('');
  const [courseHostId, setCourseHostId] = useState(0);
  const [host, setHost] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    birthday: '',
    address: '',
    pictureUrl: '',
  });

  const [enrolledMembers, setEnrolledMembers] = useState([]);
  const [pendingMembers, setPendingMembers] = useState([]);
  const [rejectedMembers, setRejectedMembers] = useState([]);

  const [assignments, setAssignments] = useState([]);

  const [tabPosition, setTabPosition] = useState('Course Info');

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
          pictureUrl: parsedResult.data.course.host.pictureUrl,
        });
      } else {
        toast(result);
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
        setCourseShortDescription(result.data.course.shortDescription || '')
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
    } catch (err) {
      toast(err);
    }
  };

  const fetchMembers = async (status) => {
    try {
      const result = await getCourseMemberList(parseInt(courseId, 10), status);
      const parsedResult = JSON.parse(result);
      if (parsedResult.data.courseMemberList) {
        switch (status) {
          case 'Accepted':
            setEnrolledMembers(parsedResult.data.courseMemberList.memberList);
            break;
          case 'Pending':
            setPendingMembers(parsedResult.data.courseMemberList.memberList);
            break;
          case 'Rejected':
            setRejectedMembers(parsedResult.data.courseMemberList.memberList);
            break;
          default:
            break;
        }
      } else {
        const { errors } = parsedResult;
        errors.forEach((error) => {
          toast(error.message, {
            type: 'error',
            autoClose: 5000,
          });
        });
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchAllMembers = () => {
    fetchMembers('Accepted');
    fetchMembers('Pending');
    fetchMembers('Rejected');
  };

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      await fetchCourseDetails();
      await fetchCourseHost();
      await fetchAssignments();
      await fetchAllMembers();
      setLoading(false);
    };
    fetchContent();
  }, []);

  const handleTabChange = (newTab) => {
    setTabPosition(newTab);
  };

  const RenderComponent = (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        style={{ minHeight: '100vh' }}
      >
        <Grid className={classes.tabs} item md="2" sm="0">
          <Grid container direction="column" alignItems="flex-start">
            <Grid item style={{ width: 'inherit' }}>
              <div
                role="tab"
                className={tabPosition === 'Course Info' ? classes.tabButtonActive : classes.tabButtonInactive}
                onClick={() => handleTabChange('Course Info')}
              >
                <div className="tab-item">
                  <SubjectRoundedIcon />
                  &nbsp;
                  Course Info
                </div>
              </div>
            </Grid>
            <Grid item style={{ width: 'inherit' }}>
              <div
                role="tab"
                className={tabPosition === 'Documents' ? classes.tabButtonActive : classes.tabButtonInactive}
                onClick={() => handleTabChange('Documents')}
              >
                <DescriptionRoundedIcon />
                &nbsp;
                Documents
              </div>
            </Grid>
            <Grid item style={{ width: 'inherit' }}>
              <div
                role="tab"
                className={tabPosition === 'Assignments' ? classes.tabButtonActive : classes.tabButtonInactive}
                onClick={() => handleTabChange('Assignments')}
              >
                <BorderColorRoundedIcon />
                &nbsp;
                Assignments
              </div>
            </Grid>
            <Grid item style={{ width: 'inherit' }}>
              <div
                role="tab"
                className={tabPosition === 'Forum' ? classes.tabButtonActive : classes.tabButtonInactive}
                onClick={() => handleTabChange('Forum')}
              >
                <ForumRoundedIcon />
                &nbsp;
                Forum
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md="10">
          <br />
          <Container maxWidth="md">
            {(() => {
              switch (tabPosition) {
                case 'Course Info':
                  return (
                    <Paper elevation="3" style={{ padding: '20px 20px' }}>
                      <OverviewComponent
                        courseName={courseName}
                        host={host}
                        description={courseDescription}
                        fetchCourseDetails={fetchCourseDetails}
                      />
                    </Paper>
                  );
                case 'Documents':
                  return <DocumentComponent />;
                case 'Assignments':
                  return <AssignmentsComponent assignments={assignments} courseId={id} />;
                case 'Forum':
                  history.push(`/course/${courseId}/forum`);
                  history.go(0);
                  break;
                default:
                  return null;
              }
            })()}
          </Container>
        </Grid>
      </Grid>
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

export default TeacherCourseDetailPage;
