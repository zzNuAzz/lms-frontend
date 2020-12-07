import { Accordion, AccordionDetails, AccordionSummary, makeStyles, Paper, Typography } from '@material-ui/core';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import React from 'react';
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

const AssignmentsComponent = ({ assignments }) => {
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
    <>
      {assignmentsList}
    </>
  );
};

export default AssignmentsComponent;
