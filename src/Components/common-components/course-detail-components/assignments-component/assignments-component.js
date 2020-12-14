import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import React, { useState } from 'react';
import AddAssignmentComponent from './add-assignment-component/add-assignment-component';
import FileUpload from '../file-upload/file-upload';
import EditAssignmentComponent from './edit-assignment-component';

const useStyles = makeStyles((theme) => ({
  accordionHeader: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightBold,
  },
  accordionBody: {
    flexDirection: 'column',
  },
  bodyDescription: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const AssignmentsComponent = ({ assignments, courseId, fetchAssignments }) => {
  const classes = useStyles();

  const assignmentsList = assignments.map((assignment) => (
    <>
      <Grid
        container
        direction="row"
        spacing="1"
      >
        <Grid item md="11">
          <Paper elevation={4}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreRoundedIcon />}
                className={classes.accordionHeader}
              >
                {assignment.title}
              </AccordionSummary>
              <AccordionDetails className={classes.accordionBody}>
                <Typography className={classes.bodyDescription} variant="body1">
                  {assignment.content}
                </Typography>
                <FileUpload />
              </AccordionDetails>
            </Accordion>
          </Paper>
        </Grid>
        <Grid item md="1">
          <EditAssignmentComponent
            assignmentId={assignment.assignmentId}
            currentTitle={assignment.title}
            currentContent={assignment.content}
            fetchAssignments={fetchAssignments}
          />
        </Grid>
      </Grid>
      <br />
    </>
  ));

  return (
    <div className="assignments">
      {localStorage.getItem('role') === 'Teacher' ? <AddAssignmentComponent courseId={courseId} fetchAssignments={fetchAssignments} /> : null}
      {assignmentsList}
    </div>
  );
};

export default AssignmentsComponent;
