import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { toast } from "react-toastify";

import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import createCourse from "../../../../api/graphql/create-course";
import toastFetchErrors from "../../../../Components/tools/toast-fetch-errors";

const NewCourseButton = ({ fetchTeacherCourse }) => {
  const [isLoading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const result = await createCourse(name, description, shortDescription);
      const parsedResult = JSON.parse(result);
      if (parsedResult.data) {
        if (parsedResult.data.createCourse.success) {
          toast.success(`Successfully created course ${name}`, {
            autoClose: 3000,
          });
          setDialogOpen(false);
          fetchTeacherCourse();
        } else {
          toast.error(parsedResult.data.createCourse.message);
        }
      } else {
        toastFetchErrors(parsedResult);
      }
    } catch (error) {
      toast.error(error.toString());
    }
  };

  const NewCourseForm = (
    <ValidatorForm onSubmit={handleSubmit}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h6">Course Name</Typography>
          <TextValidator
            label="Course Name"
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            validators={["required"]}
            errorMessages={["This field is required"]}
            variant="outlined"
            fullWidth
            required
          />
        </Grid>
        <Grid item>
          <Typography variant="h6">Short Description</Typography>
          <CKEditor
            editor={ClassicEditor}
            data={shortDescription}
            onBlur={(event, editor) => {
              setShortDescription(editor.getData());
            }}
            require
          />
        </Grid>
        <Grid item>
          <Typography variant="h6">Detail Description</Typography>
          <CKEditor
            editor={ClassicEditor}
            data={description}
            onBlur={(event, editor) => {
              setDescription(editor.getData());
            }}
            requiure
          />
        </Grid>
      </Grid>
    </ValidatorForm>
  );

  return (
    <>
      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="lg">
        <DialogTitle>Add a new course</DialogTitle>
        <DialogContent>{NewCourseForm}</DialogContent>
        <DialogActions>
          <Button
            variant="text"
            color="primary"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Add
          </Button>
          <Button variant="text" onClick={handleDialogClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleDialogOpen}
      >
        <AddRoundedIcon />
        New course
      </Button>
    </>
  );
};

export default NewCourseButton;
