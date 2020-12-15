import React, { Fragment, useEffect, useState } from 'react';
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
import Pagination from '@material-ui/lab/Pagination';
import toastFetchErrors from '../../Components/tools/toast-fetch-errors';
import { toast } from 'react-toastify';
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
  const [value, setValue] = React.useState(0);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(1);
  const [totalPageAllThreads, setTotalPageAllThreads] = React.useState(1);
  const [isLoading, setLoading] = useState(false);
  const [allThreads, setAllThreads] = useState([]);
  const pageSize = 10;
  const handlePagination = (event, pageNum) => {
    setPageNumber(pageNum);
    const fetchContent = async () => {
      if(value == 0){
        await fetchThreadList(pageNum - 1, pageSize);
        window.scrollTo(0, 900);
      }
    };
    fetchContent();
  }
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const fetchThreadList = async (pageNumber, pageSize) => {
    try{
      const result = await getThreadList(pageNumber, pageSize);
      const parsedResult = JSON.parse(result);
      if(parsedResult.data){
        setAllThreads(parsedResult.data.threadList.threadList);
        setTotalPageAllThreads(parsedResult.data.threadList.totalPages);
        setTotalPage(parsedResult.data.threadList.totalPages);
      } else {
        toastFetchErrors(parsedResult);
      }
    } catch (error){
      toast(error);
    }
  }
  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      await fetchThreadList(pageNumber - 1, pageSize);
      setLoading(false);
    };
    fetchContent();
  }, []);
  return (
    <>
      {thread.map((forum) => (
        <CardForum forum={forum} />
      ))}
      {/* PAGINATE */}
      <Grid container justify="center">
        <Pagination
          count={totalPage}
          page={pageNumber}
          color="primary"
          onChange={handlePagination}
        />
      </Grid>
    </>
  );
}
