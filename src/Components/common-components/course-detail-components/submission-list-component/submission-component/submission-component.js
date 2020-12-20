import React, { useEffect, useState } from 'react';
import {
  Button,
  Collapse,
  IconButton,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
  Paper,
} from '@material-ui/core';
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from '@material-ui/icons';
import { toast } from 'react-toastify';
import getSubmissionList from '../../../../../api/graphql/get-submission-list';
import toastFetchErrors from '../../../../tools/toast-fetch-errors';
import FileViewer from '../../../file-viewer/file-viewer';

const useStyles = makeStyles((theme) => ({
  tableRow: {
    '& > *': {
      borderBottom: 'none',
      cursor: 'pointer',
    },
  },

  onTimeButton: {
    color: '#FFFFFF',
    background: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
  },

  overdueButton: {
    color: '#FFFFFF',
    background: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));

const SubmissionComponent = ({ assignmentId, description, dueDate }) => {
  const classes = useStyles();

  const [submissionList, setSubmissionList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const due = new Date(dueDate);

  const fetchSubmissionList = async () => {
    try {
      const result = await getSubmissionList(parseInt(assignmentId, 10));
      const parsedResult = JSON.parse(result);
      if (parsedResult.data) {
        if (parsedResult.data.submissionList.submissionList.length !== 0) {
          setSubmissionList(parsedResult.data.submissionList.submissionList);
        }
      } else {
        toastFetchErrors(parsedResult);
      }
    } catch (error) {
      toast.error(error.toString());
    }
  };

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setSubmissionList([]);
      await fetchSubmissionList();
      setLoading(false);
    };

    fetch();
  }, [assignmentId]);

  const SubmissionStatusButton = ({ isOverdue }) => (
    <>
      {
        isOverdue
          ? (
            <Button variant="contained" className={classes.overdueButton}>Overdue</Button>
          )
          : (
            <Button variant="contained" className={classes.onTimeButton}>On time</Button>
          )
      }
    </>
  );

  const Row = ({ submission }) => {
    const [open, setOpen] = useState(false);
    const lastUpdated = new Date(submission.updateAt);

    return (
      <>
        <TableRow hover className={classes.tableRow} onClick={() => setOpen(!open)}>
          <TableCell>{submission.author.userId}</TableCell>
          <TableCell>{submission.author.lastName.concat(' ', submission.author.firstName)}</TableCell>
          <TableCell>{lastUpdated.toLocaleDateString()}</TableCell>
          <TableCell>
            {
              lastUpdated > due
                ? <SubmissionStatusButton isOverdue />
                : <SubmissionStatusButton />
            }
          </TableCell>
          <TableCell>
            <IconButton size="small" onClick={() => setOpen(!open)}>
              {
                open
                  ? <KeyboardArrowUpRounded />
                  : <KeyboardArrowDownRounded />
              }
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
            <Collapse in={open} unmountOnExit>
              <Typography variant="h6">Submission Files</Typography>
              <FileViewer files={submission.files} />
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  };

  const RenderSubmissionTable = (
    <>
      <Paper elevation={3} style={{padding: '15px 15px'}}>
        <Typography variant="h6">Description</Typography>
        <Typography variant="body1">{description}</Typography>
        <br />
        <Typography variant="h6">Due date</Typography>
        <Typography variant="body1">{due.toLocaleDateString()}</Typography>
        <hr />
        <Typography variant="h6">Submission List</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Last Updated</TableCell>
              <TableCell>Status</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {
              submissionList.map((submission) => (
                <Row submission={submission} />
              ))
            }
          </TableBody>
        </Table>
      </Paper>
    </>
  );

  const RenderComponent = (
    <>
      {
        submissionList.length === 0
          ? (
            <Typography variant="body1">There are no submissions for this Assignment.</Typography>
          )
          : RenderSubmissionTable
      }
    </>
  );
  return (
    <>
      {
        isLoading
          ? <LinearProgress />
          : RenderComponent
      }
    </>
  );
};

export default SubmissionComponent;
