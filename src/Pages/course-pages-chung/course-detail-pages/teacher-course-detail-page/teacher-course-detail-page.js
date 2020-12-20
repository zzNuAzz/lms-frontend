/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  Container,
  makeStyles,
  Grid,
  Paper,
  Badge,
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import SubjectRoundedIcon from '@material-ui/icons/SubjectRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import BorderColorRoundedIcon from '@material-ui/icons/BorderColorRounded';
import ForumRoundedIcon from '@material-ui/icons/ForumRounded';
import PeopleRoundedIcon from '@material-ui/icons/PeopleRounded';
import SubmissionListRoundedIcon from '@material-ui/icons/ListRounded';
import { toast } from 'react-toastify';

import OverviewComponent from '../../../../Components/common-components/course-detail-components/overview-component/overview-component';
import AssignmentsComponent from '../../../../Components/common-components/course-detail-components/assignments-component/assignments-component';
import DocumentComponent from '../../../../Components/common-components/course-detail-components/document-component/document-component';
import getAssignmentsList from '../../../../api/graphql/get-assignments-list';
import CourseMembersComponent from '../../../../Components/teacher-components/course-members-component/course-members-component';
import getCourseMemberList from '../../../../api/graphql/get-course-member-list';
import getCourseHost from '../../../../api/graphql/get-course-host';
import getCourseDetails from '../../../../api/graphql/get-course-details';
import toastFetchErrors from '../../../../Components/tools/toast-fetch-errors';
import EditCourseComponent from '../../../../Components/common-components/course-detail-components/edit-course-component/edit-course-component';
import SubmissionListComponent from '../../../../Components/common-components/course-detail-components/submission-list-component/submission-list-component';

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
  const [pendingMember, setPendingMember] = useState(0);
  const [tabPosition, setTabPosition] = useState('Course Info');

  const _getPendingMember = () => {
    getCourseMemberList(+id, 'Pending').then(result => {
      setPendingMember(JSON.parse(result).data?.courseMemberList?.totalRecords || 0)
    }).catch(err => {
      toast.error(err.message);
    })
  }

  useEffect(()=> {
    _getPendingMember();
  },[])

  const handleTabChange = (newTab) => {
    _getPendingMember();
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
                  <SubjectRoundedIcon style={{marginRight: "1rem"}}/>
                  Course Info
                </div>
              </div>
            </Grid>
            <Grid item style={{ width: 'inherit' }}>
              <div
                role="tab"
                className={tabPosition === 'Edit Course' ? classes.tabButtonActive : classes.tabButtonInactive}
                onClick={() => handleTabChange('Edit Course')}
              >
                <div className="tab-item">
                  <EditRoundedIcon style={{marginRight: "1rem"}} />
                  Edit Course
                </div>
              </div>
            </Grid>
            <Grid item style={{ width: 'inherit' }}>
              <div
                role="tab"
                className={tabPosition === 'Members' ? classes.tabButtonActive : classes.tabButtonInactive}
                onClick={() => handleTabChange('Members')}
              >
                <Badge badgeContent={pendingMember} color="primary" style={{marginRight: "1rem"}}>
                  <PeopleRoundedIcon />
                </Badge>
                Members   
              </div>
            </Grid>
            <Grid item style={{ width: 'inherit' }}>
              <div
                role="tab"
                className={tabPosition === 'Documents' ? classes.tabButtonActive : classes.tabButtonInactive}
                onClick={() => handleTabChange('Documents')}
              >
                <DescriptionRoundedIcon style={{marginRight: "1rem"}}/>
                Documents
              </div>
            </Grid>
            <Grid item style={{ width: 'inherit' }}>
              <div
                role="tab"
                className={tabPosition === 'Assignments' ? classes.tabButtonActive : classes.tabButtonInactive}
                onClick={() => handleTabChange('Assignments')}
              >
                <BorderColorRoundedIcon style={{marginRight: "1rem"}}/>
                Assignments
              </div>
            </Grid>
            <Grid item style={{ width: 'inherit' }}>
              <div
                role="tab"
                className={tabPosition === 'Submissions' ? classes.tabButtonActive : classes.tabButtonInactive}
                onClick={() => handleTabChange('Submissions')}
              >
                <SubmissionListRoundedIcon />
                &nbsp;
                Submissions
              </div>
            </Grid>
            <Grid item style={{ width: 'inherit' }}>
              <div
                role="tab"
                className={tabPosition === 'Forum' ? classes.tabButtonActive : classes.tabButtonInactive}
                onClick={() => handleTabChange('Forum')}
              >
                <ForumRoundedIcon style={{marginRight: "1rem"}}/>
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
                        courseId={id}
                      />
                    </Paper>
                  );
                case 'Edit Course':
                  return (
                    // <EditCourseComponent
                    //   courseName={courseName}
                    //   currentDescription={courseDescription}
                    //   currentShortDescription={courseShortDescription}
                    // />
                    <p>To be implemented into Teacher's Course info page</p>
                  );
                case 'Members':
                  return (
                    <CourseMembersComponent
                      courseId={id}
                    />
                  );
                case 'Documents':
                  return <DocumentComponent courseId={id} />;
                case 'Assignments':
                  return <AssignmentsComponent courseId={id} />;
                case 'Submissions':
                  return <SubmissionListComponent courseId={id} />;
                case 'Forum':
                  history.push(`/course/${id}/forum`);
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
      {RenderComponent}
    </>
  );
};

export default TeacherCourseDetailPage;
