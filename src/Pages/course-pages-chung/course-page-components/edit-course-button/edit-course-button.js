import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import editCourse from "../../../../api/graphql/edit-course";

const EditCourseButton = ({
  courseId,
  courseName,
  courseShortDescription,
  courseDescription,
  fetchTeacherCourse,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState(courseName);
  const [shortDescription, setShortDescription] = useState(
    courseShortDescription
  );
  const [description, setDescription] = useState(courseDescription);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSubmit = async () => {
    const result = await editCourse(
      courseId,
      name,
      shortDescription,
      description
    );
    const parsedResult = JSON.parse(result);
    if (parsedResult.data) {
      console.log({ parsedResult });
      if (parsedResult.data.editCourse.success) {
        toast.success(`Successfully update course ${name}`, {
          autoClose: 3000,
        });
        setDialogOpen(false);
        fetchTeacherCourse();
      }
    }
  };

  const NewCourseForm = (
    <ValidatorForm
      onSubmit={handleSubmit}
      onError={(errors) => console.log(errors)}
    >
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <TextValidator
            label="Course Name"
            id="name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            validators={["required"]}
            errorMessages={["This field is required"]}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item>
          <TextValidator
            label="Short Description"
            // id="shortDescription"
            name="shortDescription"
            // type="text"
            value={shortDescription}
            onChange={(event) => setShortDescription(event.target.value)}
            validators={["required", "maxLength=255"]}
            errorMessages={[
              "This field is required",
              "Please limit your short description in 255 characters!",
            ]}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item>
          <CKEditor
            editor={ClassicEditor}
            data={description}
            onBlur={(event, editor) => {
              setDescription(editor.getData());
            }}
          />
        </Grid>
      </Grid>
    </ValidatorForm>
  );

  return (
    <>
      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="lg">
        <DialogTitle>{`Edit ${courseName}`}</DialogTitle>
        <DialogContent>{NewCourseForm}</DialogContent>
        <DialogActions>
          <Button
            variant="text"
            color="primary"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Update
          </Button>
          <Button variant="text" onClick={handleDialogClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Button
        variant="contained"
        color="primary"
        onClick={handleDialogOpen}
        size="small"
      >
        Edit
      </Button>
    </>
  );
};

export default EditCourseButton;
