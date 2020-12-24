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
import { AddRounded } from '@material-ui/icons';
import { toast } from 'react-toastify';
import moment from 'moment';
import createAssignment from '../../../../../api/graphql/create-assignment';
import FileUpload from '../../../file-upload/file-upload';
import graphqlMultipleUpload from '../../../../../api/graphql/graphql-multiple-upload';

const useStyle = makeStyles((theme) => ({
  dialog: {
    width: '960px',
  },
}));

const AddAssignmentComponent = ({ courseId, fetchAssignments }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [dueDate, setDueDate] = useState();
  const [files, setFiles] = useState([]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showUploadProgress, setShowUploadProgress] = useState(false);

  const classes = useStyle();

  const handleOnFilesChange = (addedFiles) => {
    setFiles(addedFiles);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let fileUploadResult = [];
      if (files.length !== 0) {
        setShowUploadProgress(true);
        fileUploadResult = await graphqlMultipleUpload(files, (event) => {
          setProgress(Math.round((100 * event.loaded) / event.total));
        });
        if (fileUploadResult.data?.uploadFileMultiple?.length === 0) {
          toast.error('Error(s) occured while uploading files');
        }
      }
      const payload = {
        assignment: {
          courseId: parseInt(courseId, 10),
          title,
          content,
          dueDate: new Date(dueDate).getTime(),
          files: fileUploadResult.data ? fileUploadResult.data.uploadFileMultiple : [],
        },
      };
      const result = await createAssignment(payload);
      const parsedResult = JSON.parse(result);
      if (parsedResult.data) {
        if (parsedResult.data.createAssignment.success) {
          toast('Assignment added successfully!', {
            autoClose: 3000,
            type: 'success',
          });
          await fetchAssignments();
          setDialogOpen(false);
        } else {
          toast('Failed to add new assignment. Please try again!', {
            autoClode: 3000,
            type: 'error',
          });
        }
      } else {
        toast(result, {
          autoClode: 5000,
          type: 'error',
        });
      }
    } catch (error) {
      toast.error(error.toString());
    }
    setLoading(false);
    setProgress(0);
    setShowUploadProgress(false);
  };

  const AddAssignmentForm = (
    <ValidatorForm onSubmit={handleSubmit} id="add-assignment-form">
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
            value={moment(dueDate).format('YYYY-MM-DD')}
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
        <Grid item xs={12}>
          <FileUpload
            handleOnFilesChange={handleOnFilesChange}
            progress={progress}
            showUploadProgress={showUploadProgress}
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
            type="submit"
            form="add-assignment-form"
            variant="text"
            color="primary"
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
