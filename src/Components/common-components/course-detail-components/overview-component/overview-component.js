import { Typography } from '@material-ui/core';
import React from 'react';

const OverviewComponent = ({ description }) => {
  return (
    <>
      <Typography variant="h4">
        Description
      </Typography>
      <br />
      <Typography
        variant="body1"
        style={{fontSize: '20px'}}
      >
        {description}
      </Typography>
    </>
  );
};

export default OverviewComponent;
