import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@material-ui/core";
import { CreateRounded } from "@material-ui/icons";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { toast } from "react-toastify";
import toastFetchErrors from "../../../../tools/toast-fetch-errors";
import createDocument from "../../../../../api/graphql/create-document";
import graphqlMultipleUpload from "../../../../../api/graphql/graphql-multiple-upload";
import FileUpload from "../../../file-upload/file-upload";

const CreateDocumentComponent = ({ courseId, fetchDocuments }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showUploadProgress, setShowUploadProgress] = useState(false);

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
      let fileUploadResult = [];
      if (files.length !== 0) {
        setShowUploadProgress(true);
        fileUploadResult = await graphqlMultipleUpload(files, (event) => {
          setProgress(Math.round((100 * event.loaded) / event.total));
        });
        if (fileUploadResult.data?.uploadFileMultiple?.length === 0) {
          toast.error("Error(s) occured while uploading files");
        }
      }
      const result = await createDocument(
        parseInt(courseId, 10),
        title,
        description,
        fileUploadResult.data.uploadFileMultiple
      );
      const parsedResult = JSON.parse(result);
      if (parsedResult.data) {
        if (parsedResult.data.createDocument.success) {
          toast.success(`Successfully added document ${title}!`, {
            autoClose: 3000,
          });
          await fetchDocuments();
          setDialogOpen(false);
        } else {
          toast.error(parsedResult.data.createDocument.message);
        }
      } else {
        toastFetchErrors(parsedResult);
      }
    } catch (error) {
      toast.error(error.toString());
    }
    setLoading(false);
    setShowUploadProgress(false);
  };

  const CreateDocumentForm = (
    <ValidatorForm onSubmit={handleSubmit} id="create-document-form">
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <TextValidator
            label="Title"
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            validators={["required"]}
            errorMessages={["This field is required"]}
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
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            validators={["required"]}
            errorMessages={["This field is required"]}
            fullWidth
          />
        </Grid>
        <Grid item>
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
        fullWidth
      >
        <DialogTitle>Add a new Document</DialogTitle>
        <DialogContent>{CreateDocumentForm}</DialogContent>
        <DialogActions>
          <Button
            type="submit"
            form="create-document-form"
            variant="text"
            color="primary"
            disabled={isLoading}
          >
            Add
          </Button>
          <Button variant="text" onClick={handleDialogClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Button variant="contained" color="primary" onClick={handleDialogOpen}>
        <CreateRounded />
        &nbsp; Add new document
      </Button>
    </>
  );
};

export default CreateDocumentComponent;
