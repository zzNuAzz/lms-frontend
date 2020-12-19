import React, { useState } from 'react';
import {
  Button,
  makeStyles,
  Typography,
} from '@material-ui/core';
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
  const { id } = useParams();

  const handleSubmit = async () => {
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
  };

  return (
    <>
      <div className={classes.title}>
        <Typography variant="h3">Edit Course</Typography>
      </div>
      <hr />
      <div className="course-edit" style={{ display: 'flex', flexDirection: 'column' }}>
        <ValidatorForm>
          <TextValidator
            label="Course Name"
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
          <TextValidator
            label="Short Description"
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
          Description
          <CKEditor
              editor={ClassicEditor}
              data={description}
              onBlur={(event, editor) => setDescription(editor.getData())}
          />
          <br />
          <div className="update-button" style={{ justifyContent: 'flex-start' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Update
          </Button>
          </div>
        </ValidatorForm>
      </div>
    </>
  );
};

export default EditCourseComponent;
