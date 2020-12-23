import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
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
import editThread from "../../api/graphql/edit-thread";
import toastFetchErrors from "../../Components/tools/toast-fetch-errors";
import getThreadList from "../../api/graphql/get-thread-list";

const useStyles = makeStyles((theme) => ({
  root: {
    padding:"1rem 2rem"
  },
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

function EditComponent({ thread: originThread, handleClose, reloadThread }) {
  const classes = useStyles();
  const [thread, setThread] = useMergeState(originThread);
  const handleSubmit = async (event) => {
      editThread(thread.threadId, thread.title, thread.content)
      .then(JSON.parse)
      .then(data => data?.data?.editThread)
      .then(data => {
        if(data?.success) {
          toast.success("Edit successfully");
          if(typeof reloadThread === 'function') reloadThread();
        } else {
          toast.error(data?.message || "Error");
        }
      })
      .catch(err => toast.error(err.message))
      .finally(()=>handleClose());
  }

  const handleChange = (e) => {
    setThread({[e.target.name]:e.target.value});
  };

  return (
    <>
      <div className={classes.root}>
        <Container className={classes.root}>
          <Grid container direction="row" spacing={5}>
            <Grid container item xs={12} lg={8} direction="column" className={classes.whiteBack} spacing={5}>
              <Typography item variant="h3">
                Edit Post
              </Typography>
              <Typography className={classes.padding13} variant="subtitle2">
                Title
              </Typography>
              <TextField variant="outlined" required value={thread.title} name="title" onChange={handleChange}/>
              <Typography className={classes.padding13} variant="subtitle2">
                Body
              </Typography>
              <CKEditor
                className={classes.editor}
                editor={ClassicEditor}
                data={thread.content}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setThread({content: data});
                }}
              />
              <Button className={classes.padding13} style={{ margin: "20px" }} variant="contained" color="primary" onClick={handleSubmit}>
                Confirm
              </Button>
              <Grid container justify="flex-end">
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
