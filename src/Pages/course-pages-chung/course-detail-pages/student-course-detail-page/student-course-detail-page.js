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
  Divider,
  Dialog,
  DialogTitle,
  DialogActions,
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
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
import getUserCourseList from '../../../../api/graphql/get-user-course-list';
import getAssignmentsList from '../../../../api/graphql/get-assignments-list';
import CourseMembersComponent from '../../../../Components/teacher-components/course-members-component/course-members-component';
import getCourseMemberList from '../../../../api/graphql/get-course-member-list';
import getCourseHost from '../../../../api/graphql/get-course-host';
import getCourseDetails from '../../../../api/graphql/get-course-details';
import toastFetchErrors from '../../../../Components/tools/toast-fetch-errors';
import EditCourseComponent from '../../../../Components/common-components/course-detail-components/edit-course-component/edit-course-component';
import enrollCourse from '../../../../api/graphql/enroll-course';
import getEnrollStatus from '../../../../api/graphql/get-enroll-status';
import leaveCourse from '../../../../api/graphql/leave-course';

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
    borderColor: 'transparent',
    backgroundColor: 'white',
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
    borderColor: 'transparent transparent transparent #2a73cc',
    fontWeight: 'bolder',
  },
  tabButtonDisable: {
    '&:disabled': {
      borderColor: 'transparent',
      color: 'white',
      cursor: 'default',
    },
  },
}));

const NOT_ENROLL = 'NotEnroll';
const PENDING = 'Pending';
const ACCEPTED = 'Accepted';

const StudentCourseDetailPage = () => {
  const classes = useStyles();
  const history = useHistory();
  // const userId = parseInt(localStorage.getItem("userId"), 10);
  const { id: courseId } = useParams();
  const [enrollStatus, setEnrollStatus] = useState('NotEnroll');

  const [tabPosition, setTabPosition] = useState('Course Info');
  const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleTabChange = (newTab) => {
    setTabPosition(newTab);
  };

  const handleShowLeaveDialog = () => {
    setLeaveDialogOpen(true);
  };

  const handleLeaveCourse = async () => {
    setLoading(true);
    try {
      const result = await leaveCourse(parseInt(courseId, 10));
      const parsedResult = JSON.parse(result);
      if (parsedResult.data) {
        if (parsedResult.data.leaveCourse.success) {
          toast.info('Leave course successfully.', {
            autoClose: 3000,
          });
          history.push('/courses');
        } else {
          toast.error(parsedResult.data.leaveCourse.message);
        }
      } else {
        toastFetchErrors(parsedResult);
      }
    } catch (error) {
      toast.error(error.toString());
    }
    setLoading(false);
  };

  const handleEnroll = async () => {
    try {
      const result = await enrollCourse(parseInt(courseId, 10));
      // TODO
      const parsedResult = JSON.parse(result);
      if (parsedResult.data) {
        _getEnrollStatus();
        toast.success(
          'Your enroll request is sent to lecturer. Please wait to be accepted!',
          {
            autoClose: 5000,
          },
        );
      } else {
        toastFetchErrors(parsedResult);
      }
    } catch (error) {
      toast(error);
    }
  };

  const _getEnrollStatus = () => {
    getEnrollStatus(parseInt(courseId, 10))
      .then((result) => {
        const status = result.data.getEnrollStatus;
        if (status === ACCEPTED || status === PENDING) {
          setEnrollStatus(status);
        } else {
          setEnrollStatus(NOT_ENROLL);
        }
      }).catch((err) => {
        toast.error(err.message);
      });
  };
  useEffect(() => {
    _getEnrollStatus();
  }, [courseId]);

  const RenderComponent = (
    <div className={classes.root}>
      <Dialog
        open={leaveDialogOpen}
        onClose={() => setLeaveDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Are you sure you want to leave this course?</DialogTitle>
        <DialogActions>
          <Button
            variant="text"
            color="secondary"
            onClick={handleLeaveCourse}
            disabled={isLoading}
          >
            Yes
          </Button>
          <Button
            variant="text"
            onClick={() => setLeaveDialogOpen(false)}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container direction="row" style={{ minHeight: '100vh' }}>
        <Grid className={classes.tabs} item md="2" sm="0">
          <Grid container direction="column" alignItems="flex-start">
            <Grid item style={{ width: 'inherit' }}>
              <div
                role="tab"
                className={
                  tabPosition === 'Course Info'
                    ? classes.tabButtonActive
                    : classes.tabButtonInactive
                }
                onClick={() => handleTabChange('Course Info')}
              >
                <div className="tab-item">
                  <SubjectRoundedIcon />
                  &nbsp; Course Info
                </div>
              </div>
            </Grid>
            <Grid item style={{ width: 'inherit' }}>
              <button
                disabled={enrollStatus !== ACCEPTED}
                role="tab"
                className={
                  tabPosition === 'Documents'
                    ? classes.tabButtonActive
                    : classes.tabButtonInactive
                }
                // disabled={enrollStatus!==ACCEPTED}
                onClick={() => handleTabChange('Documents')}
              >
                <DescriptionRoundedIcon />
                &nbsp; Documents
              </button>
            </Grid>

            <Grid item style={{ width: 'inherit' }}>
              <button
                role="tab"
                disabled={enrollStatus !== ACCEPTED}
                className={
                  tabPosition === 'Assignments'
                    ? classes.tabButtonActive
                    : classes.tabButtonInactive
                }
                onClick={() => handleTabChange('Assignments')}
              >
                <BorderColorRoundedIcon />
                &nbsp; Assignments
              </button>
            </Grid>

            <Grid item style={{ width: 'inherit' }}>
              <button
                role="tab"
                disabled={enrollStatus !== ACCEPTED}
                className={
                  tabPosition === 'Forum'
                    ? classes.tabButtonActive
                    : classes.tabButtonInactive
                }
                // disabled={enrollStatus!==ACCEPTED}
                onClick={() => handleTabChange('Forum')}
              >
                <ForumRoundedIcon />
                &nbsp; Forums
              </button>
            </Grid>

            {enrollStatus !== ACCEPTED && (
              <>
                <Grid item>
                  <Box ml={2} mt={2} mb={2} />
                </Grid>
                <Grid item style={{ width: 'inherit' }}>
                  <Box mx={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={handleEnroll}
                      disabled={enrollStatus === PENDING}
                    >
                      {enrollStatus === NOT_ENROLL ? 'Enroll this course' : 'Waiting for teacher accept'}
                    </Button>
                  </Box>
                </Grid>
              </>
            )}
            {
              enrollStatus === ACCEPTED && (
                <>
                  <Grid item>
                    <Box ml={2} mt={2} mb={2} />
                  </Grid>
                  <Grid item style={{ width: 'inherit' }}>
                    <Box mx={2}>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={handleShowLeaveDialog}
                        disabled={enrollStatus === PENDING}
                      >
                        Leave course
                      </Button>
                    </Box>
                  </Grid>
                </>
              )
            }
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
                      <OverviewComponent courseId={courseId} />
                    </Paper>
                  );
                case 'Documents':
                  return <DocumentComponent courseId={courseId} />;
                case 'Assignments':
                  return <AssignmentsComponent courseId={courseId} />;
                case 'Forum':
                  history.push(`/course/${courseId}/forum`);
                  break;
              }
            })()}
          </Container>
        </Grid>
      </Grid>
    </div>
  );

  return <>{RenderComponent}</>;
};

export default StudentCourseDetailPage;
