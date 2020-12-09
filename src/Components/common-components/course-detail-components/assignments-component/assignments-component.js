import { Accordion, AccordionDetails, AccordionSummary, makeStyles, Paper, Typography } from '@material-ui/core';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import React from 'react';
import AddAssignmentComponent from '../../../teacher-components/add-assignment-component/add-assignment-component';
import FileUpload from '../file-upload/file-upload';

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
