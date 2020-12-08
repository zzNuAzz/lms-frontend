import React from 'react';
import {
  Avatar,
  IconButton,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export function ReplyCard({ content }) {
  const classes = useStyles();
  const clickOnCard = (id) => {};
  return (
    <Grid item>
      <Card width="100%">
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              src={`https://ritachan.site/${content.author.pictureUrl}`}
            />
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          subheader={content.createAt}
        />
        <CardContent onClick={clickOnCard(1)}>
          <Typography variant="body2" color="textSecondary" component="p">
            {content.content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
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
        </CardActions>
      </Card>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: 15,
  },
}));
