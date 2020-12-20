import React, { Fragment, useEffect, useState } from "react";
import {
  Avatar,
  AppBar,
  IconButton,
  Toolbar,
  Box,
  Menu,
  MenuItem,
  Fade,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Link, useParams, useHistory } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import toastFetchErrors from "../../Components/tools/toast-fetch-errors";
import { toast } from "react-toastify";
import getThreadList from "../../api/graphql/get-thread-list";
import renderHTML from "react-render-html";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import deleteThread from "../../api/graphql/deleteThread";
import moment from "moment";
import getPostList from "../../api/graphql/get-post-list";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import LoginComponent from "../../Components/login-component/login-component";
import EditComponent from "./edit-thread-component";

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
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "fit-content",
    height: "fit-content",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export function CardForum({ forum, isView }) {
  const classes = useStyles();
  const history = useHistory();
  const { courseId } = useParams();
  const cId = parseInt(courseId, 10);
  const userId = parseInt(localStorage.getItem("userId"), 10);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [flag, setFlag] = React.useState(true);
  const [postList, setPostList] = useState(() => []);
  const threadId = parseInt(forum.threadId);
  const profileLink = `/profile/view/${userId}`;

  const [openEditModal, setOpenEditModal] = useState(false);

  const viewThread = () => {
    history.push(`/course/forum/${threadId}`);
  };
  useEffect(() => {
    getPostList(parseInt(threadId, 10))
      .then((result) => {
        if (result.errors) throw new Error(result.errors[0].message);
        const data = result.data.postList.postList;
        setPostList(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [courseId]);
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

  const handleLike = () => {
    setFlag(!flag);
  };

  const openModalEdit = () => {
    setAnchorEl(null);
    setOpenEditModal(true);
  }

  const handleClickOnUser = () => {
    history.push(`/profile/view/${userId}`);
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
      toast.error(error.toString());
    }
  };
  return (
    <Grid item>
      <Card width="100%" className={classes.root}>
        <CardHeader
          avatar={<Avatar aria-label="recipe" className={classes.avatar} src={`${forum.author.pictureUrl}`} onClick={handleClickOnUser} style={{ cursor: "pointer" }}/>}
          action={
            <>
              {forum.author.userId == userId ? (
                <>
                  <IconButton aria-label="settings" onClick={openEditMenu}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu id="fade-menu" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose} TransitionComponent={Fade}>
                    <MenuItem onClick={openModalEdit}>Edit Post</MenuItem>
                    <MenuItem onClick={openAlertDelete}>Delete Post</MenuItem>
                  </Menu>
                </>
              ) : null}
            </>
          }
          // title={`${forum.author.firstName} ${forum.author.lastName}`}
          title={
            <div>
              <Link to={profileLink} style={{ color: "#2A73CC", fontWeight: "bolder" }}>
                {forum.author.firstName} {forum.author.lastName}
              </Link>
            </div>
          }
          subheader={moment(forum.createAt).calendar()}
        />
        <CardContent>
          <Box fontWeight="fontWeightMedium" m={1}>
            {isView ? (
              <Typography variant="h6" style={{ cursor: "pointer" }}>
                {forum.title}
              </Typography>
            ) : (
              <Typography variant="h6" onClick={viewThread} style={{ cursor: "pointer" }}>
                {forum.title}
              </Typography>
            )}
          </Box>
          <Typography variant="body2" color="textSecondary" component="p">
            {renderHTML(forum.content)}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {/* <IconButton
            aria-label="add to favorites"
            onClick={handleLike}
            color={flag ? "action" : "primary"}
          >
            <ThumbUpIcon />
          </IconButton>
          <Typography variant="caption" gutterTop>
            {forum.like} Like
          </Typography> */}
          {isView ? (
            <div></div>
          ) : (
            <div>
              <IconButton aria-label="share">
                <ChatBubbleIcon />
              </IconButton>
              <Typography variant="caption" gutterTop>
                {forum.comment}
                {postList.length} Comment
              </Typography>
            </div>
          )}
        </CardActions>
      </Card>
      <Dialog open={openDialog} TransitionComponent={Transition} keepMounted onClose={handleCloseAlert} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
        <DialogTitle id="alert-dialog-slide-title">
          {"Are you sure to delete this post?"}
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
          <Button onClick={handleCloseAlert} color="primary" variant="contained">
            No, Bring Me Back
          </Button>
        </DialogActions>
      </Dialog>
      <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" className={classes.modal} open={openEditModal} onClose={()=>setOpenEditModal(false)} >
        <Fade in={openEditModal}>
          <div className={classes.paper}>
            <EditComponent thread={forum} handleClose={()=>setOpenEditModal(false)} />
          </div>
        </Fade>
      </Modal>
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
      await fetchThreadList(cId, pageNum - 1, pageSize);
      window.scrollTo(0, 900);
    };
    fetchContent();
  };
  const fetchThreadList = async (cId, pageNumber, pageSize) => {
    try {
      const result = await getThreadList(cId, pageNumber, pageSize);
      const parsedResult = result.data;
      if (parsedResult) {
        setAllThreads(parsedResult.threadList.threadList);
        setTotalPage(parsedResult.threadList.totalPages);
      } else {
        toastFetchErrors(parsedResult);
      }
    } catch (error){
      toast.error(error.toString());
    }
  };
  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      await fetchThreadList(cId, pageNumber - 1, pageSize);
      setLoading(false);
    };
    fetchContent();
  }, [cId]);
  return (
    <>
      {allThreads.map((forum) => (
        <CardForum forum={forum} isView={false} />
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
