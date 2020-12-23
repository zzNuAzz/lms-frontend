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
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  LinearProgress,
} from '@material-ui/core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { toast } from 'react-toastify';
import { grey } from '@material-ui/core/colors';
import { ExpandMoreRounded } from '@material-ui/icons';
import moment from 'moment';
import uuid from 'react-uuid';

import editAssignment from '../../../../../api/graphql/edit-assignment';
import toastFetchErrors from '../../../../tools/toast-fetch-errors';
import deleteAssignment from '../../../../../api/graphql/delete-assignment';
import graphqlMultipleUpload from '../../../../../api/graphql/graphql-multiple-upload';
import FileViewer from '../../../file-viewer/file-viewer';
import FileUpload from '../../../file-upload/file-upload';

const useStyle = makeStyles((theme) => ({
  dialog: {
    width: '960px',
  },
  paper: {
    display: 'flex',
    flexDirection: 'row',
    padding: '10px 10px',
  },
  title: {
    flexBasis: '33.33%',
    flexShrink: 0,
    fontWeight: theme.typography.fontWeightBold,
  },
  dueDate: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    flexGrow: 1,
  },
  editForm: {
    width: '100%',
  },
}));

const EditAssignmentComponent = ({
  assignment,
  fetchAssignments,
}) => {
  const [title, setTitle] = useState(assignment.title);
  const [content, setContent] = useState(assignment.content);
  const [dueDate, setDueDate] = useState(assignment.dueDate ? new Date(assignment.dueDate) : '');
  const [files, setFiles] = useState(assignment.files);
  const [removedFiles, setRemovedFiles] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [progress, setProgress] = useState(0);
  const [showUploadProgress, setShowUploadProgress] = useState(false);

  const classes = useStyle();

  const handleOnFilesChange = (addedFiles) => {
    setNewFiles(addedFiles);
  };

  const handleDelete = async () => {
    try {
      const result = await deleteAssignment(parseInt(assignment.assignmentId, 10));
      const parsedResult = JSON.parse(result);
      if (parsedResult.data) {
        if (parsedResult.data.deleteAssignment.success) {
          toast.info(`Assignment ${title} deleted.`);
          fetchAssignments();
          setDeleteDialogOpen(false);
        }
      } else {
        toastFetchErrors(parsedResult);
      }
    } catch (error) {
      toast.error(error.toString());
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let fileUploadResult = [];
      if (newFiles.length !== 0) {
        setShowUploadProgress(true);
        fileUploadResult = await graphqlMultipleUpload(newFiles, (event) => {
          setProgress(Math.round((100 * event.loaded) / event.total));
        });
        if (fileUploadResult.data?.uploadFileMultiple?.length === 0) {
          toast.error('Error(s) occured while uploading files');
        }
      }
      const removeFileId = [];
      removedFiles.forEach((file) => {
        removeFileId.push(file.assignmentFileId);
      });
      const result = await editAssignment(
        assignment.assignmentId,
        title,
        content,
        dueDate.toISOString(),
        removeFileId,
        fileUploadResult.data ? fileUploadResult.data.uploadFileMultiple : [],
      );
      const parsedResult = JSON.parse(result);
      if (parsedResult.data) {
        if (parsedResult.data.editAssignment.success) {
          toast.success(`Assignment ${title} updated successfully!`, {
            autoClose: 3000,
          });
          await fetchAssignments();
        } else {
          toast.error(parsedResult.data.editAssignment.message);
        }
      } else {
        toastFetchErrors(parsedResult);
      }
    } catch (error) {
      toast.error(error.toString());
    }
    setLoading(false);
    setProgress(0);
    setShowUploadProgress(false);
  };

  const handleRevertChanges = async () => {
    const { title, content, dueDate } = assignment;
    setTitle(title);
    setContent(content);
    setDueDate(new Date(dueDate));
    setFiles(assignment.files);
    setRemovedFiles([]);
    setNewFiles([]);
  };

  const EditAssignmentForm = (
    <>
      <ValidatorForm className={classes.editForm} onSubmit={handleSubmit} id="edit-assignment-form">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={6}>
            <Typography variant="h6">Title</Typography>
            <TextValidator
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
            <Typography variant="h6">Due date</Typography>
            <TextValidator
              id="date"
              name="date"
              type="date"
              value={moment(dueDate).format('YYYY-MM-DD')}
              variant="outlined"
              onChange={(event) => setDueDate(new Date(event.target.value))}
              InputLabelProps={{
                shrink: true,
              }}
              validators={['required']}
              errorMessages={['This field is required']}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Content</Typography>
            <TextValidator
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
      <br />
      <Typography variant="h6">Current files</Typography>
      <FileViewer
        files={files}
        deletable
        setRemovedFiles={setRemovedFiles}
      />
      <br />
      <Typography variant="h6">Upload new files</Typography>
      <FileUpload
        handleOnFilesChange={handleOnFilesChange}
        showUploadProgress={showUploadProgress}
        progress={progress}
      />
    </>
  );

  return (
    <>
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{`Are you sure you want to delete ${title}?`}</DialogTitle>
        <DialogActions>
          <Button
            variant="text"
            color="secondary"
            onClick={handleDelete}
            disabled={isLoading}
          >
            Yes
          </Button>
          <Button
            variant="text"
            onClick={() => setDeleteDialogOpen(false)}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreRounded />}>
          <Typography className={classes.title}>{assignment.title}</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ flexDirection: 'column' }}>
          {EditAssignmentForm}
        </AccordionDetails>
        <AccordionActions>
          <Button
            type="submit"
            form="edit-assignment-form"
            variant="text"
            color="primary"
            size="small"
            style={{ float: 'right' }}
            disabled={isLoading}
          >
            Update
          </Button>
          <Button
            variant="text"
            color="default"
            size="small"
            onClick={handleRevertChanges}
            style={{ float: 'right' }}
            disabled={isLoading}
          >
            Revert changes
          </Button>
          <Button
            variant="text"
            color="secondary"
            size="small"
            onClick={() => setDeleteDialogOpen(true)}
            style={{ float: 'right' }}
            disabled={isLoading}
          >
            Delete
          </Button>
        </AccordionActions>
      </Accordion>
    </>
  );
};

export default EditAssignmentComponent;
