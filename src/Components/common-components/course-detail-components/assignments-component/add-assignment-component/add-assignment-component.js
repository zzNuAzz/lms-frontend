import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
} from '@material-ui/core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { toast } from 'react-toastify';
import createAssignment from '../../../../../api/graphql/create-assignment';
import { AddRounded } from '@material-ui/icons';

const useStyle = makeStyles((theme) => ({
  dialog: {
    width: '960px',
  }
}));

const AddAssignmentComponent = ({ courseId, fetchAssignments }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [dueDate, setDueDate] = useState('');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const classes = useStyle();

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSubmit = async () => {
    const payload = {
      assignment: {
        courseId: parseInt(courseId, 10),
        title,
        content,
        dueDate: new Date(dueDate).getTime(),
        files: [],
      },
    };
    setLoading(true);
    const result = await createAssignment(payload);
    const parsedResult = JSON.parse(result);
    if (parsedResult.data) {
      if (parsedResult.data.createAssignment.success) {
        toast('Assignment added successfully!', {
          autoClose: 3000,
          type: 'success',
        });
        fetchAssignments();
        setDialogOpen(false);
        setLoading(false);
      } else {
        toast('Failed to add new assignment. Please try again!', {
          autoClode: 3000,
          type: 'error',
        });
        setLoading(false);
      }
    } else {
      toast(result, {
        autoClode: 5000,
        type: 'error',
      });
      setLoading(false);
    }
  };

  const AddAssignmentForm = (
    <ValidatorForm onSubmit={handleSubmit}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={6}>
          <TextValidator
            label="Title"
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            validators={['required']}
            errorMessages={['This field is required']}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextValidator
            id="date"
            name="date"
            label="Due date"
            type="date"
            variant="outlined"
            onChange={(event) => setDueDate(event.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            validators={['required']}
            errorMessages={['This field is required']}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextValidator
            label="Content"
            name="content"
            type="text"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            validators={['required']}
            errorMessages={['This field is required']}
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>
    </ValidatorForm>
  );

  return (
    <>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        maxWidth="md"
      >
        <DialogTitle>Add a new Assignment</DialogTitle>
        <DialogContent>
          {AddAssignmentForm}
        </DialogContent>
        <DialogActions>
          <Button
            variant="text"
            color="primary"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Add
          </Button>
          <Button
            variant="text"
            onClick={handleDialogClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Button
        variant="contained"
        color="primary"
        onClick={handleDialogOpen}
      >
        <AddRounded />
        &nbsp;
        Add Assignment
      </Button>
      <br />
      <br />
    </>
  );
};

export default AddAssignmentComponent;
