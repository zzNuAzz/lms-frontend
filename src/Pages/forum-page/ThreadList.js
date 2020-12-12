import React, { Fragment } from 'react';
import {
  Avatar,
  AppBar,
  IconButton,
  Toolbar,
  Box,
  Menu,
  MenuItem,
  Fade,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import SearchBar from 'material-ui-search-bar';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import {
  green, pink, yellow, blue,
} from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useParams, useHistory } from 'react-router-dom';

import getThreadList from '../../api/graphql/get-thread-list';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
  },
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: 15,
  },
}));

export function CardForum({ forum }) {
  const classes = useStyles();
  const history = useHistory();
  const { courseId } = useParams();
  const cId = parseInt(courseId);
  const viewThread = () => {
    console.log(forum.threadId);
    const threadId = parseInt(forum.threadId);
    console.log(cId, threadId, 'abcdefg');
    history.push(`/course/forum/${threadId}`);
  };
  return (
    <Grid item>
      <Card width="100%" className={classes.root}>
        <CardHeader
          avatar={(
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              src={`https://ritachan.site/${forum.author.pictureUrl}`}
            />
          )}
          action={(
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          )}
          title={`${forum.author.firstName} ${forum.author.lastName}`}
          subheader={forum.createAt}
        />
        <CardContent>
          <Box fontWeight="fontWeightMedium" m={1}>
            <Typography variant="h6">{forum.title}</Typography>
          </Box>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            onClick={viewThread}
            style={{ cursor: 'pointer' }}
          >
            {forum.content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" color="primary">
            <ThumbUpIcon />
          </IconButton>
          <Typography variant="caption" gutterTop>
            {forum.like}
            {' '}
            forum_like
          </Typography>
          <IconButton aria-label="share">
            <ChatBubbleIcon />
          </IconButton>
          <Typography variant="caption" gutterTop>
            {forum.comment}
            {' '}
            forum_comment
          </Typography>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default function ({ thread }) {
  console.log({ thread });
  return (
    <>
      {thread.map((forum) => (
        <CardForum forum={forum} />
      ))}
    </>
  );
}
