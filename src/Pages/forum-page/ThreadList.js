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
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useParams, useHistory } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import toastFetchErrors from '../../Components/tools/toast-fetch-errors';
import { toast } from 'react-toastify';
import getThreadList from '../../api/graphql/get-thread-list';
import renderHTML from 'react-render-html';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import deleteThread from '../../api/graphql/deleteThread';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
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
  const cId = parseInt(courseId, 10);
  const userId = parseInt(localStorage.getItem('userId'), 10);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openDialog, setOpenDialog] = React.useState(false);
  const viewThread = () => {
    // console.log(forum.threadId);
    const threadId = parseInt(forum.threadId);
    // console.log(cId, threadId, 'abcdefg');
    history.push(`/course/forum/${threadId}`);
  };
  

  const openAlertDelete = () => {
    setAnchorEl(null);
    setOpenDialog(true);
  };

  const handleCloseAlert = () => {
    setOpenDialog(false);
  };
  const openEditMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEdit = () => {
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const deleteCourse = async () => {
    setOpenDialog(false);
    try {
      const title = forum.title;
      const result = await deleteThread(forum.threadId);
      // TODO
      const parsedResult = JSON.parse(result);
      if (parsedResult.data) {
        toast.success(`Delete Post: ${title} Successfully`, {
          autoClose: 3000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        toastFetchErrors(parsedResult);
      }
    } catch (error) {
      toast(error);
    }
  };
  // console.log({ forum });
  return (
    <Grid item>
      <Card width="100%" className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              src={`https://ritachan.site/${forum.author.pictureUrl}`}
            />
          }
          action={
            <>
              {forum.author.userId == userId ? (
                <>
                  <IconButton aria-label="settings" onClick={openEditMenu}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="fade-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                  >
                    <MenuItem onClick={handleEdit}>Edit Post</MenuItem>
                    <MenuItem onClick={openAlertDelete}>Delete Post</MenuItem>
                  </Menu>
                </>
              ) : (
                <></>
              )}
            </>
          }
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
            {renderHTML(forum.content)}
            {console.log("forum content: " ,forum.content)}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" color="primary">
            <ThumbUpIcon />
          </IconButton>
          <Typography variant="caption" gutterTop>
            {forum.like} forum_like
          </Typography>
          <IconButton aria-label="share">
            <ChatBubbleIcon />
          </IconButton>
          <Typography variant="caption" gutterTop>
            {forum.comment} forum_comment
          </Typography>
        </CardActions>
      </Card>
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseAlert}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {'Are you sure to delete this post?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            All the contents, comments will be deleted with this post.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteCourse} color="secondary" variant="contained">
            Yes, I'm SURE
          </Button>
          <Button
            onClick={handleCloseAlert}
            color="primary"
            variant="contained"
          >
            No, Bring Me Back
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default function ({ thread }) {
  const [value, setValue] = React.useState(0);
  const [pageNumber, setPageNumber] = React.useState(1);
  const { courseId } = useParams();
  const cId = parseInt(courseId, 10);
  const [totalPage, setTotalPage] = React.useState(1);
  const [isLoading, setLoading] = useState(false);
  const [allThreads, setAllThreads] = useState([]);
  const pageSize = 5;
  const handlePagination = (event, pageNum) => {
    setPageNumber(pageNum);
    const fetchContent = async () => {
      await fetchThreadList(cId ,pageNum - 1, pageSize);
      window.scrollTo(0, 900);
    };
    fetchContent();
  }
  const fetchThreadList = async (cId , pageNumber, pageSize) => {
    try{
      const result = await getThreadList(cId ,pageNumber, pageSize);
      const parsedResult = result.data;
      if(parsedResult){
        setAllThreads(parsedResult.threadList.threadList);
        setTotalPage(parsedResult.threadList.totalPages);
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
      await fetchThreadList(cId ,pageNumber - 1, pageSize);
      setLoading(false);
    };
    fetchContent();
  }, []);
  return (
    <>
      {allThreads.map((forum) => (
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
