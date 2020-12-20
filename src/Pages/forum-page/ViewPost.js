import React, { Fragment, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
} from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { toast } from "react-toastify";
import MostHelpful from "./MostHelpful";
import { CardForum } from "./ThreadList";
import { ReplyCard } from "./ReplyCard";
import { NewPostBox } from "./NewPostBox";

import getPostList from "../../api/graphql/get-post-list";
import getThreadById from "../../api/graphql/get-thread-by-id";
import addPost from "../../api/graphql/add-post";
import toastFetchErrors from "../../Components/tools/toast-fetch-errors";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f5f7fa",
  },
  search: {
    backgroundImage: `url(${"https://uploads-us-west-2.insided.com/coursera-en/attachment/0ee512f0-c148-4e6c-a3c5-ae5ea674bbf9_thumb.jpg"})`,
    backgroundPosition: "center center",
    backgroundSize: "cover",
    padding: 30,
    width: "100%",
    height: 250,
    marginBottom: 50,
  },
  whiteBack: {
    backgroundColor: "#ffffff",
    marginBottom: 20,
    marginTop: 10,
    marginRight: 5,
    marginLeft: 5,
  },
  padding13: {
    paddingBottom: 13.5,
    paddingTop: 13.5,
    fontSize: 14,
    fontWeight: 700,
  },
  editor: {
    height: 500,
  },
  replyWidth: {
    backgroundColor: "#f5f7fa",
    maxWidth: "800px",
  },
}));

export default function ViewPost({ courseId }) {
  const classes = useStyles();
  const [thread, setThread] = useState("");
  const [postList, setPostList] = useState(() => []);
  const [replyContent, setReplyContent] = useState();
  const { threadId } = useParams();
  // const forum = {
  //   author: {
  //     userId: '5',
  //     lastName: null,
  //     firstName: null,
  //     pictureUrl: '/file/avatar/0.png',
  //   },
  //   content: `Hi everyone,

  //   I came across this article which features a new Coursera course. COVID-19 Contact Tracing (offered by Johns Hopkins) provides a promotion option right now which enables you to earn a free Course Certificate. As stated in the FAQ section, “you will need to enroll via a web browser on either a computer or a mobile device and not via the Coursera mobile app to enroll for the course and certificate for free. Unfortunately, the promotional price is not redeemable through the mobile app”.

  //   If you have not taken the course, don’t miss the chance! If you’ve already taken the course, feel free to share your takeaway in the comment section. :point_down:

  //   Stay safe!

  //   (It was edited to add some more info.)`,
  //   createAt: '2020-10-29T07:51:58.662Z',
  //   forumThreadId: 6,
  //   title: 'A New Course with Free Certificate: COVID-19 Contact Tracing 🔊',
  // };
  useEffect(() => {
    getThreadById(parseInt(threadId, 10))
      .then((result) => {
        if (result.errors) throw new Error(result.errors[0].message);
        const data = result.data.thread;
        setThread(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [threadId]);

  courseId = thread.courseId;
  const forumLink = `/course/${courseId}/forum`;

  useEffect(() => {
    getPostList(parseInt(threadId, 10))
      .then((result) => {
        if (result.errors) throw new Error(result.errors[0].message);
        // console.log("Post List", { result });
        const data = result.data.postList.postList;
        setPostList(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [courseId]);

  const handleReply = async () => {
    // console.log(replyContent);
    try {
      const result = await addPost(parseInt(threadId, 10), replyContent);
      // TODO
      const parsedResult = JSON.parse(result);
      if (parsedResult.data) {
        toast.success("Replied", {
          autoClose: 3000,
        });
        setTimeout(() => {
          // console.log("replied successfully");
        }, 3000);
        window.location.reload();
      } else {
        toastFetchErrors(parsedResult);
      }
    } catch (error) {
      toast.error(error.toString());
    }
  };
  return (
    <>
      <div className={classes.root}>
        <Box className={classes.search} />
        <Container className={classes.root}>
          <Grid container direction="row" spacing={5}>
            <Grid
              container
              item
              xs={12}
              lg={8}
              direction="column"
              spacing={3}
              className={classes.whiteBack}
            >
              {/* title */}
              <Typography variant="h4" style={{ fontWeight: "700" }}>
                {thread.title}
                {/* {console.log({ thread })} */}
              </Typography>
              <hr style={{ color: "#000000" }} />
              {/* topic */}
              <Grid item>
                {thread && <CardForum forum={thread} isView={true} />}
              </Grid>
              {/* replyList */}
              <Grid item>
                <Card width="100%" className={classes.replyWidth}>
                  <CardContent>
                    <Typography variant="h6" style={{ fontWeight: "700" }}>
                      {postList.length < 2
                        ? `${postList.length} reply:`
                        : `${postList.length} replies:`}
                    </Typography>
                  </CardContent>
                </Card>

                {postList.reverse().map((post) => (
                  <Grid>
                    <ReplyCard content={post} />
                  </Grid>
                ))}
              </Grid>
              {/* reply */}
              <Grid item>
                <Typography variant="h6" style={{ fontWeight: "900" }}>
                  Reply
                </Typography>
                <hr />
                <CKEditor
                  className={classes.editor}
                  editor={ClassicEditor}
                  data={replyContent}
                  onReady={(editor) => {}}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setReplyContent(data);
                  }}
                  onBlur={(event, editor) => {}}
                  onFocus={(event, editor) => {}}
                />
                <Button
                  className={classes.padding13}
                  style={{ margin: "20px" }}
                  variant="contained"
                  color="primary"
                  onClick={handleReply}
                >
                  Reply
                </Button>
                <Grid container justify="flex-end">
                  <Link to={forumLink} variant="caption">
                    Back to forum.
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid container item xs={12} lg={4} direction="column" spacing={2}>
              <MostHelpful />
              <NewPostBox />
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}
