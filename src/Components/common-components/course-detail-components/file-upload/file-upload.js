import React from 'react';
import {
  Typography,
  Button,
} from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
 import graphqlMultipleUpload from '../../../../api/graphql/graphql-multiple-upload';
import { toast } from 'react-toastify';

// TODO: Submit button loading state and success/failure messages
const FileUpload = ({ title }) => {
  const [files, setFiles] = React.useState([]);

  const handleOnFilesChange = (addedFiles) => {
    setFiles(addedFiles);
  };

  const handleFilesSubmit = async () => {
    const result = await graphqlMultipleUpload(files);
    if (result.data?.uploadFileMultiple?.length !== 0) {
      toast.success('Assignments uploaded successfully!', {
        autoClose: 3000,
      });
    } else {
      toast.error('No assignments were uploaded.');
    }
  };

  return (
    <div className="file-upload">
      <Typography variant="h5">{title}</Typography>
      <br />
      <DropzoneArea
        filesLimit={5}
        showPreviews
        showPreviewsInDropzone={false}
        useChipsForPreview
        showAlerts={false}
        // alertSnackbarProps={{
        //   anchorOrigin: {
        //     horizontal: 'right',
        //     vertical: 'bottom',
        //   },
        // }}
        onChange={handleOnFilesChange}
      />
      <br />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        onClick={handleFilesSubmit}
        fullWidth
      >
        Submit
      </Button>
    </div>
  );
};

export default FileUpload;
