import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@material-ui/core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { toast } from 'react-toastify';

import AddRoundedIcon from '@material-ui/icons/AddRounded';
import { ClassicEditor } from '@ckeditor/ckeditor5-build-classic';

const NewCourseButton = () => {
  const [isLoading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSubmit = () => {

  };

  const NewCourseForm = (
    <ValidatorForm onSubmit={handleSubmit}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <TextValidator
            label="Course Name"
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            validators={['required']}
            errorMessages={['This field is required']}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item>
          <TextValidator
            label="Description"
            name="description"
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
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
          {NewCourseForm}
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
        fullWidth
      >
        <AddRoundedIcon />
        New course
      </Button>
    </>
  );
};

export default NewCourseButton;
