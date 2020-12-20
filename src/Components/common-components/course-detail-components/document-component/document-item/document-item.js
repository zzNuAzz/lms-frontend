import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  makeStyles,
  AccordionActions,
  Dialog,
} from '@material-ui/core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { toast } from 'react-toastify';
import { DropzoneArea } from 'material-ui-dropzone';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import FileViewer from '../../../file-viewer/file-viewer';
import deleteDocument from '../../../../../api/graphql/delete-document';
import toastFetchErrors from '../../../../tools/toast-fetch-errors';
import graphqlMultipleUpload from '../../../../../api/graphql/graphql-multiple-upload';
import editDocument from '../../../../../api/graphql/edit-document';

const useStyles = makeStyles((theme) => ({
  title: {
    flexBasis: '33.33%',
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightBold,
  },
  dateCreated: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  accordionBody: {
    flexDirection: 'column',
  },
  bodyDescription: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const DocumentItem = ({ document, fetchDocuments }) => {
  const classes = useStyles();
  const role = localStorage.getItem('role');

  const [newTitle, setNewTitle] = useState(document.title);
  const [newDescription, setNewDescription] = useState(document.description);
  const [removedFiles, setRemovedFiles] = useState([]);
  const [newFiles, setNewFiles] = useState([]);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const createAt = new Date(document.createAt);
  const updateAt = new Date(document.updateAt);

  const handleOnFilesChange = (addedFiles) => {
    setNewFiles(addedFiles);
  };

  const handleEditSubmit = async () => {
    setLoading(true);
    try {
      let fileUploadResult = [];
      if (newFiles.length !== 0) {
        fileUploadResult = await graphqlMultipleUpload(newFiles);
        if (fileUploadResult.data.uploadFileMultiple.length === 0 || !fileUploadResult.data) {
          toast.error('Error(s) occured while uploading files. Please try again!');
        }
      }
      const removeFileId = [];
      removedFiles.forEach((file) => {
        removeFileId.push(file.documentFileId);
      });
      const result = await editDocument(
        parseInt(document.documentId, 10),
        newTitle,
        newDescription,
        removeFileId,
        fileUploadResult.data ? fileUploadResult.data.uploadFileMultiple : [],
      );
      const parsedResult = JSON.parse(result);
      if (parsedResult.data) {
        if (parsedResult.data.editDocument.success) {
          toast.success(`Successfully edited ${newTitle}!`, {
            autoClose: 3000,
          });
          fetchDocuments();
          setEditDialogOpen(false);
        } else {
          toast.error(parsedResult.data.editDocument.message);
        }
      } else {
        toastFetchErrors(parsedResult);
      }
    } catch (error) {
      toast.error(error.toString());
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const result = await deleteDocument(parseInt(document.documentId, 10));
      const parsedResult = JSON.parse(result);
      if (parsedResult.data) {
        if (parsedResult.data.deleteDocument.success) {
          toast.info('Document deleted.', {
            autoClose: 3000,
          });
          fetchDocuments();
          setDeleteDialogOpen(false);
        } else {
          toast.error('Unable to delete document. Please try again.');
        }
      } else {
        toastFetchErrors(parsedResult);
      }
    } catch (error) {
      toast.error(error.toString());
    }
    setLoading(false);
  };

  const EditDocumentForm = (
    <>
      <ValidatorForm>
        <TextValidator
          label="New Title"
          name="new-title"
          type="text"
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
          validators={['required']}
          errorMessages={['This field is required']}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextValidator
          label="New Description"
          name="new-description"
          type="text"
          value={newDescription}
          onChange={(event) => setNewDescription(event.target.value)}
          validators={['required']}
          errorMessages={['This field is required']}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <Typography variant="h6">Current Files</Typography>
        <FileViewer
          files={document.files}
          deletable
          type="Document"
          setRemovedFiles={setRemovedFiles}
        />
        <Typography variant="h6">Add new files</Typography>
        <DropzoneArea
          filesLimit={100}
          maxFileSize={100000000}
          showPreviews
          showPreviewsInDropzone={false}
          useChipsForPreview
          showAlerts={false}
          onChange={handleOnFilesChange}
        />
      </ValidatorForm>
    </>
  );

  return (
    <>
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>{`Edit ${document.title}`}</DialogTitle>
        <DialogContent>
          {EditDocumentForm}
        </DialogContent>
        <DialogActions>
          <Button
            variant="text"
            color="primary"
            onClick={handleEditSubmit}
            disabled={isLoading}
          >
            Submit
          </Button>
          <Button
            variant="text"
            onClick={() => setEditDialogOpen(false)}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {`Are you sure you want to delete ${document.title}?`}
        </DialogTitle>
        <DialogActions>
          <Button
            variant="text"
            color="secondary"
            onClick={handleDelete}
            disabled={isLoading}
          >
            Delete
          </Button>
          <Button
            variant="text"
            color="primary"
            onClick={() => setDeleteDialogOpen(false)}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreRoundedIcon />}
        >
          <Typography className={classes.title}>{document.title}</Typography>
          <Typography className={classes.dateCreated}>
            {`Last updated: ${updateAt.toLocaleDateString()}`}
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionBody}>
          <Typography variant="h6">Description</Typography>
          <Typography variant="body1">{document.description}</Typography>
          <br />
          <Typography variant="h6">Files</Typography>
          <FileViewer
            files={document.files}
          />
        </AccordionDetails>
        {
          role === 'Teacher'
            ? (
              <AccordionActions>
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => setEditDialogOpen(true)}
                >
                  Edit
                </Button>
                <Button
                  variant="text"
                  color="Secondary"
                  onClick={() => setDeleteDialogOpen(true)}
                >
                  Delete
                </Button>
              </AccordionActions>
            )
            : null
        }
      </Accordion>
    </>
  );
};

export default DocumentItem;
