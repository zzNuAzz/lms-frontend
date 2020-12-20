import {
  LinearProgress,
  Tab,
  Tabs,
  makeStyles,
  Grid,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SubjectRoundedIcon from '@material-ui/icons/SubjectRounded';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import BorderColorRoundedIcon from '@material-ui/icons/BorderColorRounded';
import ForumRoundedIcon from '@material-ui/icons/ForumRounded';
import PersonPinRoundedIcon from '@material-ui/icons/PersonPinRounded';
import PeopleRoundedIcon from '@material-ui/icons/PeopleRounded';
import { toast } from 'react-toastify';

import CourseCardLarge from '../../../../Components/common-components/course-card/course-card-large';
import OverviewComponent from '../../../../Components/common-components/course-detail-components/overview-component/overview-component';
import AssignmentsComponent from '../../../../Components/common-components/course-detail-components/assignments-component/assignments-component';
import ForumComponent from '../../../../Components/common-components/course-detail-components/forum-component/forum-component';
import DocumentComponent from '../../../../Components/common-components/course-detail-components/document-component/document-component';
import ContactComponent from '../../../../Components/common-components/course-detail-components/contact-component/contact-component';
import getAssignmentsList from '../../../../api/graphql/get-assignments-list';
import CourseMembersComponent from '../../../../Components/teacher-components/course-members-component/course-members-component';
import getCourseMemberList from '../../../../api/graphql/get-course-member-list';
import getCourseHost from '../../../../api/graphql/get-course-host';
import getCourseDetails from '../../../../api/graphql/get-course-details';
import toastFetchErrors from '../../../../Components/tools/toast-fetch-errors';
import CourseTitle from '../course-title';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0vw 5vw 0vw 5vw',
  },
  courseName: {
    fontSize: '',
  },
  tabs: {
    '& .MuiTab-wrapper': {
      alignItems: 'flex-end',
    },
  },
}));

const TeacherCourseDetailPage = () => {
  const classes = useStyles();

  const { id } = useParams();
  const [isLoading, setLoading] = useState(false);
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

  const [enrolledMembers, setEnrolledMembers] = useState([]);
  const [pendingMembers, setPendingMembers] = useState([]);
  const [rejectedMembers, setRejectedMembers] = useState([]);

  const [assignments, setAssignments] = useState([]);

  const [tabPosition, setTabPosition] = useState(0);

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
        toast(result);
      }
    } catch (error) {
      toast.error(error.toString());
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
      toast.error(error.toString());
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
      toast.error(error.toString());
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

  const RenderComponent = (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        spacing="1"
      >
        <Grid item md="2">
          <Grid
            container
            direction="row"
            justify="center"
          >
            <Grid item>
              <CourseTitle title={courseName} />
              <br />
            </Grid>
            <Grid item>
              <Tabs
                className={classes.tabs}
                orientation="vertical"
                variant="standard"
                value={tabPosition}
                onChange={(event, newPos) => setTabPosition(newPos)}
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab
                  label={(
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      Overview
                      &nbsp;
                      <SubjectRoundedIcon />
                    </div>
                  )}
                />
                <Tab
                  label={(
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      Members
                      &nbsp;
                      <PeopleRoundedIcon />
                    </div>
                  )}
                />
                <Tab
                  label={(
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      Documents
                      &nbsp;
                      <DescriptionRoundedIcon />
                    </div>
                  )}
                />
                <Tab
                  label={(
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      Assignments
                      &nbsp;
                      <BorderColorRoundedIcon />
                    </div>
                  )}
                />
                <Tab
                  label={(
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      Forum
                      &nbsp;
                      <ForumRoundedIcon />
                    </div>
                  )}
                  className={classes.tab}
                />
                <Tab
                  label={(
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      Contact
                      &nbsp;
                      <PersonPinRoundedIcon />
                    </div>
                  )}
                />
              </Tabs>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md="10">
          {(() => {
            switch (tabPosition) {
              case 0:
                return <OverviewComponent currentDescription={courseDescription} fetchCourseDetails={fetchCourseDetails} />;
              case 1:
                return (
                  <CourseMembersComponent
                    courseId={id}
                    enrolledMembers={enrolledMembers}
                    pendingMembers={pendingMembers}
                    rejectedMembers={rejectedMembers}
                    fetchAllMembers={fetchAllMembers}
                  />
                );
              case 2:
                return <DocumentComponent />;
              case 3:
                return <AssignmentsComponent assignments={assignments} courseId={id} fetchAssignments={fetchAssignments} />;
              case 4:
                return <ForumComponent courseId={courseId} />;
              case 5:
                return <ContactComponent user={host} />;
              default:
                return null;
            }
          })()}
        </Grid>
      </Grid>
      <br />

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
