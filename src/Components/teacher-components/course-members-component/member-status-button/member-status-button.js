import React from 'react';
import {
  Button,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

const AcceptedButton = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.success.main,
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
  },
  outlined: {
    backgroundColor: '#FFFFFF',
    borderColor: theme.palette.success.main,
    color: theme.palette.success.main,
    transition: '0.3s',
    '&:hover': {
      backgroundColor: theme.palette.success.main,
      borderColor: theme.palette.success.dark,
      color: '#FFFFFF',
    },
  },
}))(Button);

const RejectedButton = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.getContrastText(theme.palette.error.main),
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
      color: theme.palette.getContrastText(theme.palette.error.dark),
    },
  },
  outlined: {
    backgroundColor: '#FFFFFF',
    borderColor: theme.palette.error.main,
    color: theme.palette.error.main,
    transition: '0.3s',
    '&:hover': {
      backgroundColor: grey[50],
      borderColor: theme.palette.error.dark,
      color: theme.palette.error.dark,
    },
  },
}))(Button);

const MemberStatusButton = ({ status, onClick }) => {
  return (
    <>
      {
        (() => {
          switch (status) {
            case 'Accepted':
              return <AcceptedButton variant="contained" onClick={onClick}>Accepted</AcceptedButton>;
            case 'Pending':
              return <Button variant="contained" onClick={onClick}>Pending</Button>;
            case 'Rejected':
              return <RejectedButton variant="contained" onClick={onClick}>Rejected</RejectedButton>;
            default:
              return null;
          }
        })()
      }
    </>
  );
};

export default MemberStatusButton;
