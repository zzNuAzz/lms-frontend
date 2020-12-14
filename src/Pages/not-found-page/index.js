import { makeStyles } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const usesStyle = makeStyles({
  root: {
    display: 'flex',
    justifyContent:'center',
    alignItems: 'center',
    margin: 'auto',
    height: "80vh"
  },
  title: {
    fontSize: 100,
  },
  center: {
    display: 'flex',
    justifyContent:'center'
  },
});

export default function NotFound404() {
  const classes = usesStyle();
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <h1 className={classes.title}>404</h1>
        <p className={classes.center}>Let get you&nbsp;<Link to="/">back</Link></p>
      </div>
    </div>
  );
}
