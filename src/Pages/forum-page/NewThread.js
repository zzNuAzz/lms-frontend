import React, { Fragment, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import { toast } from "react-toastify";
import { Link, useHistory, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import MostHelpful from "./MostHelpful";
import createThread from "../../api/graphql/create-thread";
import toastFetchErrors from "../../Components/tools/toast-fetch-errors";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f5f7fa",
  },
  searchBar: {
    width: 300,
    marginBottom: 60,
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
  welcome: {
    color: "#ffffff",
    textColor: "#ffffff",
    fontWeight: 600,
    marginLeft: "auto",
    marginRight: "auto",
  },
  whiteBack: {
    backgroundColor: "#ffffff",
    marginBottom: 20,
    marginTop: 10,
    marginRight: 10,
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
}));

export default function NewThread() {
  const classes = useStyles();
  const history = useHistory();
  const [body, setBody] = useState("");
  const titleInput = useRef(null);
  const tagInput = useRef(null);
  let courseId = useParams();
  const forumLink = `/course/${courseId.courseId}/forum`;

  courseId = parseInt(courseId.courseId, 10);
  const handlePublish = async () => {
    const title = titleInput.current.value;
    const tag = tagInput.current.value;

    try {
      const result = await createThread(courseId, title, body);
      // TODO
      const parsedResult = JSON.parse(result);
      if (parsedResult.data) {
        toast.success("Your topic will be displayed after 3 seconds", {
          autoClose: 3000,
        });
        setTimeout(() => {
          history.push(`/course/${courseId}/forum`);
        }, 3000);
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
              className={classes.whiteBack}
              spacing={5}
            >
              <Typography item variant="h3">
                Write new post
              </Typography>
              <Typography item variant="caption">
                Start a conversation, ask a question or share your idea
              </Typography>
              <Typography className={classes.padding13} variant="subtitle2">
                Title
              </Typography>
              <TextField
                variant="outlined"
                required
                placeholder="Provide a short but descriptive title"
                inputRef={titleInput}
              />
              <Typography className={classes.padding13} variant="subtitle2">
                Body
              </Typography>
              <CKEditor
                className={classes.editor}
                editor={ClassicEditor}
                placeholder="holder"
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setBody(data);
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
                placeholder='Add tags (separated by ",")'
                inputRef={tagInput}
              />
              <Button
                className={classes.padding13}
                style={{ margin: "20px" }}
                variant="contained"
                color="primary"
                onClick={handlePublish}
              >
                Publish
              </Button>
              <Grid container justify="flex-end">
                <Link to={forumLink} variant="caption">
                  Back to forum.
                </Link>
              </Grid>
            </Grid>
            <Grid container item xs={12} lg={4} direction="column" spacing={2}>
              <MostHelpful />
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}
