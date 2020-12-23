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
import Pagination from "@material-ui/lab/Pagination";
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
  const [pageNumber, setPageNumber] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(1);
  const pageSize = 5;
  
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

  const fetchPostList = async (threadId, pageNumber, pageSize) => {
    try{
      const result = await getPostList(parseInt(threadId, 10), pageNumber, pageSize);
      console.log({result})
      const parsedResult = result.data;
      console.log({parsedResult})
      if(parsedResult){
        setPostList(parsedResult.postList.postList);
        setTotalPage(parsedResult.postList.totalPages)
      } else {
        toast.error(parsedResult?.message || "Error");
      }
    } catch (error){
      toast.error(error.message);
    }
  }

  const fetchContent = async () => {
    await fetchPostList(parseInt(threadId, 10), pageNumber - 1, pageSize);
  }

  useEffect(() => {
    fetchContent();
  }, [courseId]);

  const handlePagination = (event, pageNum) => {
    setPageNumber(pageNum);
    const fetchContent = async () => {
      await fetchPostList(threadId, pageNum -1, pageSize);
      window.scrollTo(0, 900);
    }
    fetchContent();
  }

  courseId = thread.courseId;
  const forumLink = `/course/${courseId}/forum`;

  console.log(thread.postCount);

  // useEffect(() => {
  //   getPostList(parseInt(threadId, 10), 0, thread.postCount)
  //     .then((result) => {
  //       if (result.errors) throw new Error(result.errors[0].message);
  //       // console.log("Post List", { result });
  //       const data = result.data.postList.postList;
  //       setPostList(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [courseId]);


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
      } else {
        toastFetchErrors(parsedResult);
      }
    } catch (error) {
      toast.error(error.toString());
    }
    fetchContent();
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
                      {thread.postCount < 2
                        ? `${thread.postCount} reply:`
                        : `${thread.postCount} replies:`}
                    </Typography>
                  </CardContent>
                </Card>

                {postList.map((post) => (
                  <Grid>
                    <ReplyCard content={post} fetchPostList={fetchContent} />
                  </Grid>
                ))}
              </Grid>
              <Grid container justify="center">
                <Pagination
                  count={totalPage}
                  page={pageNumber}
                  color="primary"
                  onChange={handlePagination}
                />
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
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setReplyContent(data);
                  }}
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
              {console.log({courseId})}
              <NewPostBox Id={courseId}/>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}
