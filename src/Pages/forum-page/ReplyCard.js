import React from "react";
import {
  Avatar,
  Fade,
  IconButton,
  MenuItem,
  Menu,
  Button,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { toast } from "react-toastify";
import toastFetchErrors from "../../Components/tools/toast-fetch-errors";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import deletePost from "../../api/graphql/deletePost";
import renderHTML from "react-render-html";
import moment from "moment";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: 15,
  },
  root: {
    maxWidth: 800,
  },
}));

export function ReplyCard({ content, fetchPostList }) {
  const classes = useStyles();
  const clickOnCard = (id) => {};
  const userId = parseInt(localStorage.getItem("userId"), 10);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openDialog, setOpenDialog] = React.useState(false);
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
  const handleDeletePost = async () => {
    setOpenDialog(false);
    try {
      const result = await deletePost(content.postId);
      // TODO
      const parsedResult = JSON.parse(result);
      if (parsedResult.data) {
        toast.success(`Your comment is successfully deleted`, {
          autoClose: 3000,
        });
        fetchPostList();
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
          avatar={
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              src={`https://ritachan.site/${content.author.pictureUrl}`}
            />
          }
          action={
            <>
              {content.author.userId == userId ? (
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
          title={`${content.author.firstName} ${content.author.lastName}`}
          subheader={moment(content.createAt).calendar()}
        />
        <CardContent onClick={clickOnCard(1)}>
          <Typography variant="body2" color="textSecondary" component="p">
            {renderHTML(content.content)}
          </Typography>
        </CardContent>
        {/* <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <ThumbUpIcon />
          </IconButton>
          <Typography variant="caption" gutterTop>
            {content.like} like
          </Typography>
          <IconButton aria-label="share">
            <ChatBubbleIcon />
          </IconButton>
          <Typography variant="caption" gutterTop>
            {content.comment} comment
          </Typography>
        </CardActions> */}
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
          {"Are you sure to delete this comment?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            This comment will rest in peace for sure if you delete it.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeletePost}
            color="secondary"
            variant="contained"
          >
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
