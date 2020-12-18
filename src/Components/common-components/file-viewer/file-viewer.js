import React, { useEffect, useState } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import DownloadRoundedIcon from '@material-ui/icons/GetAppRounded';
import { DeleteForeverRounded } from '@material-ui/icons';
import RestoreFromTrashRoundedIcon from '@material-ui/icons/RestoreFromTrashRounded';

const FileViewer = ({
  files,
  type = 'Document',
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
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    <DownloadRoundedIcon />
                  </Button>
                </Link>
                &nbsp;
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={() => handleRestoreFile(index)}
                >
                  <RestoreFromTrashRoundedIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  );

  return (
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
                <TableCell style={tableCellStyle}>{file.filename || ''}</TableCell>
                <TableCell>
                  <Link to={file.url || ''} target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                    >
                      <DownloadRoundedIcon />
                    </Button>
                  </Link>
                  {
                    deletable
                      ? (
                        <>
                          &nbsp;
                          <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            onClick={() => handleRemoveFile(index)}
                          >
                            <DeleteForeverRounded />
                          </Button>
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
              <Typography variant="h6">Removed Files</Typography>
              {RenderRemovedFiles}
            </>
          )
          : null
      }
    </>
  );
};

export default FileViewer;
