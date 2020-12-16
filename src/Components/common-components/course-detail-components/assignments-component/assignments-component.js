import {
  Grid, makeStyles, Paper, Typography,
} from '@material-ui/core';
import React, { useState } from 'react';

import AddAssignmentComponent from './add-assignment-component/add-assignment-component';
import EditAssignmentComponent from './edit-assignment-component';
import AssignmentItem from './assignment-item/assignment-item';

const useStyles = makeStyles((theme) => ({
  title: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  assignmentItem: {
    width: '100%',
  },
}));

const AssignmentsComponent = ({ assignments, courseId, fetchAssignments }) => {
  const classes = useStyles();
  const role = localStorage.getItem('role');

  const assignmentsList = assignments.map((assignment) => (
    <>
      <AssignmentItem assignment={assignment} key={assignment.assignmentId} />
      {
        role === 'Teacher'
          ? (
            <Grid item md="1" sm="12">
              <EditAssignmentComponent
                assignmentId={assignment.assignmentId}
                currentTitle={assignment.title}
                currentContent={assignment.content}
                fetchAssignments={fetchAssignments}
              />
            </Grid>
          )
          : null
      }
    </>
  ));

  return (
    <div className="assignments">
      {role === 'Teacher' ? <AddAssignmentComponent courseId={courseId} fetchAssignments={fetchAssignments} /> : null}
      <div className={classes.title}>
        <Typography variant="h3">Assignments</Typography>
      </div>
      <br />
      {
        role === 'Student'
          ? (
            <div className={classes.assignmentItem}>
              {assignments.map((assignment) => (
                <AssignmentItem assignment={assignment} key={assignment.assignmentId} />
              ))}
            </div>
          )
          : (
            <div className={classes.editAssignmentItem}>
              {assignments.map((assignment) => (
                <>
                  <EditAssignmentComponent assignment={assignment} key={assignment.assignmentId} />
                  <br />
                </>
              ))}
            </div>
          )
      }

    </div>
  );
};

export default AssignmentsComponent;
