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
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { toast } from 'react-toastify';

import createAssignment from '../../../../../api/graphql/create-assignment';

const useStyle = makeStyles((theme) => ({
  dialog: {
    width: '960px',
  },
}));

const EditAssignmentComponent = ({
  assignmentId,
  currentTitle,
  currentContent,
  fetchAssignments
}) => {
  const [title, setTitle] = useState(currentTitle);
  const [content, setContent] = useState(currentContent);
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

  };

  const EditAssignmentForm = (
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
            label="New Title"
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
            label="New Due Date"
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
            label="New Content"
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
        <DialogTitle>Edit Assignment</DialogTitle>
        <DialogContent>
          {EditAssignmentForm}
        </DialogContent>
        <DialogActions>
          <Button
            variant="text"
            color="primary"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Submit
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
        style={{ height: 54 }}
      >
        <EditRoundedIcon />
        &nbsp;
        Edit
      </Button>
      <br />
      <br />
    </>
  );
};

export default EditAssignmentComponent;
