import { LinearProgress } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import React from 'react';

const FileUpload = ({ handleOnFilesChange, showUploadProgress, progress }) => {
  return (
    <>
      <DropzoneArea
        a
        filesLimit={100}
        maxFileSize={100000000}
        showPreviews
        showPreviewsInDropzone={false}
        useChipsForPreview
        showAlerts={false}
        onChange={handleOnFilesChange}
      />
      {
        showUploadProgress
          ? (
            <>
              <br />
              <LinearProgress variant="determinate" value={progress} />
            </>
          )
          : null
      }
    </>
  );
};

export default FileUpload;
