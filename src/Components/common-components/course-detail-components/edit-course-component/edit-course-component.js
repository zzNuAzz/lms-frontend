import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { EditRounded } from '@material-ui/icons';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import editCourse from '../../../../api/graphql/edit-course';
import toastFetchErrors from '../../../tools/toast-fetch-errors';

const useStyles = makeStyles((theme) => ({
  title: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const EditCourseComponent = ({
  courseName,
  currentShortDescription,
  currentDescription,
  fetchCourseDetails,
}) => {
  const classes = useStyles();
  const [name, setName] = useState(courseName);
  const [shortDescription, setShortDescription] = useState(currentShortDescription);
  const [description, setDescription] = useState(currentDescription);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { id } = useParams();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await editCourse(parseInt(id, 10), name, shortDescription, description);
      const parsedResult = JSON.parse(result);
      if (parsedResult.data) {
        if (parsedResult.data.editCourse.success) {
          toast(`Successfully updated course ${name}!`, {
            type: 'success',
            autoClose: 3000,
          });
          fetchCourseDetails();
        } else {
          toast(parsedResult.data.editCourse.message, {
            type: 'error',
          });
        }
      } else {
        toastFetchErrors(parsedResult);
      }
    } catch (error) {
      toast.error(error.toString());
    }
    setLoading(false);
  };

  const handleRevertChanges = () => {
    setName(courseName);
    setShortDescription(currentShortDescription);
    setDescription(currentDescription);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const EditCourseForm = (
    <div className="course-edit" style={{ display: 'flex', flexDirection: 'column' }}>
      <ValidatorForm>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h6">Course name</Typography>
            <TextValidator
              onChange={(event) => setName(event.target.value)}
              name="course-name"
              value={name}
              validators={['required']}
              errorMessages={['This field is required']}
              variant="outlined"
              margin="normal"
              fullWidth
              autoFocus
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6">Short description</Typography>
            <TextValidator
              name="short-description"
              type="text"
              value={shortDescription}
              onChange={(event) => setShortDescription(event.target.value)}
              validators={['required']}
              errorMessages={['This field is required']}
              variant="outlined"
              margin="normal"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>

            <Typography variant="h6">Description</Typography>
            <CKEditor
              editor={ClassicEditor}
              data={description}
              onBlur={(event, editor) => setDescription(editor.getData())}
            />
          </Grid>
        </Grid>
      </ValidatorForm>
    </div>
  );

  return (
    <>
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6">{`Edit ${courseName}`}</Typography>
        </DialogTitle>
        <DialogContent>
          {EditCourseForm}
        </DialogContent>
        <DialogActions>
          <Button
            variant="text"
            color="primary"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Update
          </Button>
          <Button
            variant="text"
            color="secondary"
            onClick={handleRevertChanges}
            disabled={isLoading}
          >
            Revert Changes
          </Button>
          <Button
            variant="text"
            color="default"
            onClick={handleEditDialogClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setEditDialogOpen(true)}
      >
        <EditRounded />
        &nbsp;
        Edit course
      </Button>
    </>
  );
};

export default EditCourseComponent;
