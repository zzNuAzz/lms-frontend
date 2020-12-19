import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@material-ui/core';
import { CreateRounded } from '@material-ui/icons';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { DropzoneArea } from 'material-ui-dropzone';
import { toast } from 'react-toastify';
import toastFetchErrors from '../../../../tools/toast-fetch-errors';
import createDocument from '../../../../../api/graphql/create-document';
import graphqlMultipleUpload from '../../../../../api/graphql/graphql-multiple-upload';

const CreateDocumentComponent = ({ courseId, fetchDocuments }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleOnFilesChange = (addedFiles) => {
    setFiles(addedFiles);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const fileUploadResult = await graphqlMultipleUpload(files);
      if (fileUploadResult.data?.uploadFileMultiple?.length !== 0) {
        const result = await createDocument(
          parseInt(courseId, 10),
          title,
          description,
          fileUploadResult.data.uploadFileMultiple,
        )
        const parsedResult = JSON.parse(result);
        if (parsedResult.data) {
          if (parsedResult.data.createDocument.success) {
            toast.success(`Successfully added document ${title}!`, {
              autoClose: 3000,
            });
            await fetchDocuments();
            setLoading(false);
            setDialogOpen(false);
          } else {
            toast.error(parsedResult.data.createDocument.message);
            setLoading(false);
          }
        } else {
          toastFetchErrors(parsedResult);
          setLoading(false);
        }
      } else {
        toastFetchErrors(fileUploadResult);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.toString());
      setLoading(false);
    }
  };

  const CreateDocumentForm = (
    <ValidatorForm onSubmit={handleSubmit}>
      <Grid
        container
        direction="column"
        spacing={2}
      >
        <Grid item>
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
        <Grid item>
          <TextValidator
            id="description"
            name="description"
            label="Description"
            type="text"
            variant="outlined"
            onChange={(event) => setDescription(event.target.value)}
            validators={['required']}
            errorMessages={['This field is required']}
            fullWidth
          />
        </Grid>
        <Grid item>
          <DropzoneArea
            filesLimit={5}
            showPreviews
            showPreviewsInDropzone={false}
            useChipsForPreview
            showAlerts={false}
            onChange={handleOnFilesChange}
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
        fullWidth
      >
        <DialogTitle>Add a new Document</DialogTitle>
        <DialogContent>
          {CreateDocumentForm}
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
        <CreateRounded />
        &nbsp;
        Create document
      </Button>
    </>
  );
};

export default CreateDocumentComponent;
