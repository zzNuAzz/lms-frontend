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

import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import createCourse from '../../../../api/graphql/create-course';

const editorConfig = {
  toolbar: [
    'heading',
    '|',
    'bold',
    'italic',
    'underline',
    'alignment',
    '|',
    'fontSize',
    'fontFamily',
    'fontColor',
    'fontBackgroundColor',
    '|',
    'link',
    'bulletedList',
    'numberedList',
    'indent',
    'outdent',
    'imageUpload',
    'blockQuote',
    'insertTable',
    'mediaEmbedded',
  ],
};

const EditCourseButton = ({ courseId, courseName, courseDescription, fetchTeacherCourse }) => {
  const [isLoading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState(courseName);
  const [description, setDescription] = useState(courseDescription);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSubmit = async () => {
    const result = await createCourse(name, description);
    const parsedResult = JSON.parse(result);
    if (parsedResult.data) {
      if (parsedResult.data.createCourse.success) {
        toast.success(`Successfully created course ${name}`, {
          autoClose: 3000,
        });
        setDialogOpen(false);
        fetchTeacherCourse();
      }
    }
  };

  const NewCourseForm = (
    <ValidatorForm onSubmit={handleSubmit}>
      <Grid
        container
        direction="column"
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
          <CKEditor
            editor={ClassicEditor}
            config={editorConfig}
            data={description}
            onBlur={(event, editor) => { setDescription(editor.getData()) }}
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
        maxWidth="lg"
      >
        <DialogTitle>{`Edit ${courseName}`}</DialogTitle>
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
            Update
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
        size="small"
      >
        Edit
      </Button>
    </>
  );
};

export default EditCourseButton;
