import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import { grey } from '@material-ui/core/colors';
import { toast } from 'react-toastify';

import getSubmission from '../../../../../api/graphql/get-submission';
import toastFetchErrors from '../../../../tools/toast-fetch-errors';
import CreateSubmissionComponent from './create-submission-component/create-submission-component';
import CurrentStudentSubmission from './current-student-submission/current-student-submission';
import FileViewer from '../../../file-viewer/file-viewer';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightBold,
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  dueDate: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  tabs: {
    height: 20,
    '& div': {
      cursor: 'pointer',
    }
  },
  tabInactive: {
    '&:hover': {
      backgroundColor: grey['200'],
    },
  },
  tabActive: {
    fontWeight: theme.typography.fontWeightBold,
    borderBottom: '3px solid',
    borderBottomColor: theme.palette.primary.main,
  },
  accordionBody: {
    flexDirection: 'column',
  },
  bodyDescription: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const AssignmentItem = ({ assignment }) => {
  const classes = useStyles();

  const [submissionFiles, setSubmissionFiles] = useState([]);
  const [submissionDescription, setSubmissionDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date(assignment.dueDate));
  const [tab, setTab] = useState(0);

  const fetchSubmission = async () => {
    try {
      const result = await getSubmission(parseInt(assignment.assignmentId, 10));
      const parsedResult = JSON.parse(result);
      if (parsedResult.data) {
        if (parsedResult.data.submission) {
          setSubmissionFiles(parsedResult.data.submission.files);
          setSubmissionDescription(parsedResult.data.submission.description);
        }
      } else {
        toastFetchErrors(parsedResult);
      }
    } catch (error) {
      toast.error(error.toString());
    }
  };

  const RenderContent = (
    <>
      <Typography variant="h6">Description</Typography>
      <Typography variant="body1">
        {assignment.content}
      </Typography>
      <hr />
      <Typography variant="h6">Attached Files</Typography>
      {
        assignment.files.length === 0
          ? (
            <Typography variant="body1">There are no attached files!</Typography>
          )
          : (
            <FileViewer files={assignment.files} />
          )
      }
    </>
  )

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreRoundedIcon />}
      >
        <Typography className={classes.title}>{assignment.title}</Typography>
        <Typography className={classes.dueDate}>{`Due: ${assignment.dueDate ? dueDate.toLocaleString() : 'none'}`}</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionBody}>
        <div className={classes.tabs}>
          <Grid
            container
            direction="row"
            spacing={3}
          >
            <Grid item>
              <div
                className={tab === 0 ? classes.tabActive : classes.tabInactive}
                role="tab"
                onClick={() => setTab(0)}
              >
                Content
              </div>
            </Grid>
            <Grid item>
              <div
                className={tab === 1 ? classes.tabActive : classes.tabInactive}
                role="tab"
                onClick={() => setTab(1)}
              >
                My Submission
              </div>
            </Grid>
          </Grid>
        </div>
        <br />
        {(() => {
          switch (tab) {
            case 0:
              return RenderContent;
            case 1:
              return (
                <div className="submission">
                  <CurrentStudentSubmission
                    files={submissionFiles}
                    description={submissionDescription}
                    key={assignment.assignmentId}
                    fetchSubmission={fetchSubmission}
                  />
                  <br />
                  <CreateSubmissionComponent
                    assignmentId={assignment.assignmentId}
                    key={assignment.assignmentId}
                    fetchSubmission={fetchSubmission}
                  />
                </div>
              );
            default:
              return null;
          }
        })()}
      </AccordionDetails>
    </Accordion>
  );
};

export default AssignmentItem;
