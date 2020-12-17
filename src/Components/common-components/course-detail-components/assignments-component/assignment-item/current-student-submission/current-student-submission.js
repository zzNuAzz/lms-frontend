import React, { useState, useEffect } from 'react';
import {
  Button,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import DownloadRoundedIcon from '@material-ui/icons/GetAppRounded';

const CurrentStudentSubmission = ({ files, description, fetchSubmission }) => {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      await fetchSubmission();
      setLoading(false);
    };
    fetch();
  }, []);

  const RenderComponent = (
    <div className="student-submission">
      {
        files.length === 0
          ? (
            <Typography variant="body1">
              You have no submissions
            </Typography>
          )
          : (
            <>
              <hr />
              <Typography variant="h6">
                Description
              </Typography>
              <Typography variant="body1">{description}</Typography>
              <br />
              <Typography variant="h6">Files</Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Filename</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    files.map((file) => (
                      <TableRow hover>
                        <TableCell>{file.filename}</TableCell>
                        <TableCell>
                          <Link to={file.url} target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                            >
                              <DownloadRoundedIcon />
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </>
          )
      }
    </div>
  );

  return (
    <>
      {
        isLoading ? <LinearProgress /> : RenderComponent
      }
    </>
  );
};

export default CurrentStudentSubmission;
