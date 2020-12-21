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
import FileViewer from '../../../../file-viewer/file-viewer';

const CurrentStudentSubmission = ({ files, description, fetchSubmission }) => {
  const [isLoading, setLoading] = useState(true);

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
              <Typography variant="h6">Description</Typography>
              <Typography variant="body1">{description}</Typography>
              <br />
              <Typography variant="h6">Files</Typography>
              <FileViewer files={files} key={description} />
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
