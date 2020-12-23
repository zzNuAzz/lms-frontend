import React, { useEffect, useState } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Typography,
  IconButton,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import DownloadRoundedIcon from '@material-ui/icons/GetAppRounded';
import { DeleteForeverRounded } from '@material-ui/icons';
import RestoreFromTrashRoundedIcon from '@material-ui/icons/RestoreFromTrashRounded';
import FileExtensionIcon from './file-extension-icon/file-extension-icon';

const FileViewer = ({
  files,
  deletable = false,
  setRemovedFiles,
}) => {
  const [currentFiles, setCurrentFiles] = useState(files);
  const [currentRemovedFiles, setCurrentRemovedFiles] = useState([]);

  const tableCellStyle = {
    minWidth: '500px',
  };

  const handleRemoveFile = (index) => {
    const removedFile = currentFiles[index];
    const tempCurrentFiles = [...currentFiles];
    const tempCurrentRemovedFiles = [...currentRemovedFiles];

    tempCurrentRemovedFiles.push(removedFile);
    setCurrentRemovedFiles([...tempCurrentRemovedFiles]);
    setRemovedFiles([...tempCurrentRemovedFiles]);

    tempCurrentFiles.splice(index, 1);
    setCurrentFiles([...tempCurrentFiles]);
  };

  const handleRestoreFile = (index) => {
    const restoredFile = currentRemovedFiles[index];
    const tempCurrentFiles = [...currentFiles];
    const tempCurrentRemovedFiles = [...currentRemovedFiles];

    tempCurrentFiles.push(restoredFile);
    setCurrentFiles([...tempCurrentFiles]);

    tempCurrentRemovedFiles.splice(index, 1);
    setCurrentRemovedFiles([...tempCurrentRemovedFiles]);
    setRemovedFiles([...tempCurrentRemovedFiles]);
  };

  const RenderRemovedFiles = (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Filename</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          currentRemovedFiles.map((file, index) => (
            <TableRow hover>
              <TableCell style={tableCellStyle}>{file.filename || ''}</TableCell>
              <TableCell>
                <Link to={file.url || ''} target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <IconButton
                    color="primary"
                  >
                    <DownloadRoundedIcon />
                  </IconButton>
                </Link>
                &nbsp;
                <IconButton color="primary" onClick={() => handleRestoreFile(index)}>
                  <RestoreFromTrashRoundedIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  );

  const RenderComponent = (
    <>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Filename</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            currentFiles.map((file, index) => (
              <TableRow hover>
                <TableCell style={tableCellStyle}>
                  <FileExtensionIcon filename={file.filename} />
                  &nbsp;
                  {file.filename || ''}
                </TableCell>
                <TableCell>
                  <Link to={file.url || ''} target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <IconButton
                      color="primary"
                    >
                      <DownloadRoundedIcon />
                    </IconButton>
                  </Link>
                  {
                    deletable
                      ? (
                        <>
                          &nbsp;
                          <IconButton
                            color="secondary"
                            onClick={() => handleRemoveFile(index)}
                          >
                            <DeleteForeverRounded />
                          </IconButton>
                        </>
                      )
                      : null
                  }
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
      {
        deletable
          ? (
            <>
              {
                currentRemovedFiles.length === 0
                  ? null
                  : (
                    <>
                      <Typography variant="h6">Removed Files</Typography>
                      {RenderRemovedFiles}
                    </>
                  )
              }
            </>
          )
          : null
      }
    </>
  );

  return (
    <>
      {
        files.length === 0
          ? (
            <Typography variant="body1">No files available</Typography>
          )
          : RenderComponent
      }
    </>
  );
};

export default FileViewer;
