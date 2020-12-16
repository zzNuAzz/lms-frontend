import React from 'react';
import {
  Typography,
  Button,
} from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import graphqlMultipleUpload from '../../../../api/graphql/graphql-multiple-upload';
import { toast } from 'react-toastify';
import toastFetchErrors from '../../../tools/toast-fetch-errors';

// TODO: Submit button loading state and success/failure messages
const FileUpload = ({ setUploadedFiles }) => {
  const [files, setFiles] = React.useState([]);

  const handleOnFilesChange = (addedFiles) => {
    setFiles(addedFiles);
  };

  const handleFilesSubmit = async () => {
    try {
      const result = await graphqlMultipleUpload(files);
      if (result.data?.uploadFileMultiple?.length !== 0) {
        setUploadedFiles(result.data.uploadFileMultiple);
      } else {
        toastFetchErrors(result);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="file-upload">
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
    </div>
  );
};

export default FileUpload;
