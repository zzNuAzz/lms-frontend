import React, { useState } from 'react';
import {
  Button,
  TextField,
} from '@material-ui/core';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { DropzoneArea } from 'material-ui-dropzone';

import graphqlMultipleUpload from '../../../../../../api/graphql/graphql-multiple-upload';
import { toast } from 'react-toastify';
import toastFetchErrors from '../../../../../tools/toast-fetch-errors';
import createSubmission from '../../../../../../api/graphql/create-submission';

const CreateSubmissionComponent = ({ assignmentId, fetchSubmission }) => {
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [submissionOpen, setSubmissionOpen] = useState(false);

  const handleOnFilesChange = (addedFiles) => {
    setFiles(addedFiles);
  };

  const handleCloseSubmission = () => {
    setSubmissionOpen(false);
    setDescription('');
    setFiles([]);
  }

  const handleAssignmentsSubmit = async () => {
    setLoading(true);
    try {
      const fileUploadResult = await graphqlMultipleUpload(files);
      if (fileUploadResult.data?.uploadFileMultiple?.length !== 0) {
        const result = await createSubmission(
          assignmentId,
          description,
          fileUploadResult.data.uploadFileMultiple,
        );
        const parsedResult = JSON.parse(result);
        if (parsedResult.data) {
          if (parsedResult.data.createSubmission.success) {
            toast.success('Assignment uploaded successfully!', {
              autoClose: 3000,
            });
            setLoading(false);
            fetchSubmission();
          } else {
            toast.error(parsedResult.data.createSubmission.message);
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
      toast.error(error);
      setLoading(false);
    }
  }

  return (
    <div className="create-submission">
      {(() => {
        switch (submissionOpen) {
          case false:
            return (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setSubmissionOpen(true)}
              >
                <AddRoundedIcon />
                &nbsp;
                Create Submission
              </Button>
            )
          case true:
            return (
              <div className="create-submission">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleCloseSubmission}
                >
                  <CloseRoundedIcon />
                  &nbsp;
                  Cancel Submission
                </Button>
                <br />
                <br />
                <div className="file-upload">
                  <TextField
                    type="text"
                    name="assignment-description"
                    label="Description (Optional)"
                    value={description}
                    variant="outlined"
                    onChange={(event) => setDescription(event.target.value)}
                    fullWidth
                  />
                  <br />
                  <br />
                  <DropzoneArea
                    filesLimit={5}
                    showPreviews
                    showPreviewsInDropzone={false}
                    useChipsForPreview
                    showAlerts={false}
                    onChange={handleOnFilesChange}
                  />
                </div>
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAssignmentsSubmit}
                  fullWidth
                  disabled={isLoading}
                >
                  Submit
                </Button>
              </div>
            )
          default:
            return null;
        }
      })()}
    </div>
  )
};

export default CreateSubmissionComponent;
