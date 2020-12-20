import {
  LinearProgress,
  Menu,
  MenuItem,
  NativeSelect,
  Select,
  Typography,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import getAssignmentsList from '../../../../api/graphql/get-assignments-list';
import toastFetchErrors from '../../../tools/toast-fetch-errors';
import SubmissionComponent from './submission-component/submission-component';

const SubmissionListComponent = ({ courseId }) => {
  const [assignments, setAssignments] = useState([]);
  const [assignmentId, setAssignmentId] = useState(-1);
  const [assignmentContent, setAssignmentContent] = useState('');
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [assignmentDueDate, setAssignmentDueDate] = useState('');
  const [isLoading, setLoading] = useState(true);

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
      toast.error(err.toString());
    }
  };

  const fetch = async () => {
    setLoading(true);
    await fetchAssignments();
    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleSelectedAssignmentChange = (event) => {
    const { id, title, content, dueDate } = event.target.value;
    setAssignmentId(id);
    setAssignmentContent(content);
    setAssignmentTitle(title);
    setAssignmentDueDate(dueDate);
  };

  const RenderComponent = (
    <>
      <Typography variant="h6">Select an Assignment</Typography>
      <Select
        value={assignmentId}
        renderValue={() => assignmentTitle}
        onChange={handleSelectedAssignmentChange}
        variant="outlined"
        fullWidth
      >
        {
          assignments.map((assignment) => (
            <MenuItem
              value={{
                title: assignment.title,
                id: assignment.assignmentId,
                content: assignment.content,
                dueDate: assignment.dueDate,
              }}
            >
              {assignment.title}
            </MenuItem>
          ))
        }
      </Select>
      <hr />
      {
        assignmentId !== -1
          ? (
            <SubmissionComponent
              assignmentId={assignmentId}
              description={assignmentContent}
              dueDate={assignmentDueDate}
            />
          )
          : null
      }
    </>
  );

  return (
    <>
      <div className="submission-title" style={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h3">Submissions</Typography>
      </div>
      <hr />
      {
        isLoading
          ? <LinearProgress />
          : RenderComponent
      }
    </>
  );
};

export default SubmissionListComponent;
