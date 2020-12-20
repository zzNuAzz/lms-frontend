import { makeStyles } from "@material-ui/core/styles";
import React, { Fragment, useState, useRef, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import { toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import toastFetchErrors from "../../Components/tools/toast-fetch-errors";
import MostHelpful from "./MostHelpful";
import createThread from "../../api/graphql/create-thread";
import getThreadById from "../../api/graphql/get-thread-by-id";

const useStyles = makeStyles((theme) => ({
  paper: {
    // marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  h5: {
    margin: 20,
  },
  editor: {
    height: 500,
  },
}));

function EditComponent({ threadId, handleClose }) {
  const classes = useStyles();
  const history = useHistory();
  const [body, setBody] = useState("");
  // const titleInput = useRef(null);
  // const tagInput = useRef(null);
  const [thread, setThread] = useMergeState({});
  let courseId = useParams();
  const forumLink = `/course/${courseId.courseId}/forum`;

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
  console.log({ thread });

  courseId = parseInt(courseId.courseId, 10);
  const handlePublish = async () => {
    // const title = titleInput.current.value;
    // const tag = tagInput.current.value;

    try {
      // const result = await createThread(courseId, title, body);
      // // TODO
      // const parsedResult = JSON.parse(result);
      // if (parsedResult.data) {
      //   // toast.success("Your topic will be displayed after 3 seconds", {
      //   //   autoClose: 3000,
      //   // });
      //   // setTimeout(() => {
      //   //   history.push(`/course/${courseId}/forum`);
      //   // }, 3000);
      //   console.log({ parsedResult });
      //   history.push(`/course/${courseId}/forum`);
      // } else {
      //   toastFetchErrors(parsedResult);
      // }
    } catch (error) {
      toast(error);
    }
  };

  const handleChange = (e, val) => {
    console.log("12", e.target.value, val);
  };

  return (
    <>
      <div className={classes.root}>
        <Container className={classes.root}>
          <Grid container direction="row" spacing={5}>
            <Grid
              container
              item
              xs={12}
              lg={8}
              direction="column"
              className={classes.whiteBack}
              spacing={5}
            >
              <Typography item variant="h3">
                Edit Post
              </Typography>
              <Typography className={classes.padding13} variant="subtitle2">
                Title
              </Typography>
              <TextField
                variant="outlined"
                // required
                value={thread.title}
                name="title"
                onFocus={() => console.log("a")}
                onChange={handleChange}
                // inputRef={titleInput}
              />
              <Typography className={classes.padding13} variant="subtitle2">
                Body
              </Typography>
              {console.log(thread.content)}
              <CKEditor
                className={classes.editor}
                editor={ClassicEditor}
                data={thread.content}
                onChange={(event, editor) => {
                  // const data = editor.getData();
                  // setBody(data);
                }}
              />
              <Typography
                className={classes.padding13}
                required
                variant="subtitle2"
              >
                Tags (Optional)
              </Typography>
              <TextField
                variant="outlined"
                // value={thread.tags}
                // inputRef={tagInput}
              />
              <Button
                className={classes.padding13}
                style={{ margin: "20px" }}
                variant="contained"
                color="primary"
                onClick={handlePublish}
              >
                Confirm
              </Button>
              <Grid container justify="flex-end">
                {/* <Link to={forumLink} variant="caption">
                  Back to forum.
                </Link> */}
                <Button onClick={handleClose}>Back to forum</Button>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}

export default EditComponent;

function useMergeState(initialState) {
  const [state, setState] = useState(initialState);
  const setMergedState = (newState) =>
    setState((prevState) => Object.assign({}, prevState, newState));
  return [state, setMergedState];
}
