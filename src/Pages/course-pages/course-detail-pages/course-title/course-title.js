import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 'bolder',
    padding: '20px 20px',
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[10],
    transition: '.3s transform cubic-bezier(.155, 1.105, .295, 1.12), .3s box-shadow, .3s -webkit-transform cubic-bezier(.155, 1.105, .295, 1.12)',

    '&:hover': {
      // boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
      boxShadow: theme.shadows[15],
    },
  },
}));

const CourseTitle = ({ title }) => {
  const classes = useStyles();

  return (
    <div className={classes.title}>
      {title}
    </div>
  );
};

export default CourseTitle;
