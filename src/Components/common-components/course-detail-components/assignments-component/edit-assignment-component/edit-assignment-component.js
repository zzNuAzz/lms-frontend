import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
  Typography,
  Paper,
} from '@material-ui/core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { toast } from 'react-toastify';

import createAssignment from '../../../../../api/graphql/create-assignment';
import { grey } from '@material-ui/core/colors';

const useStyle = makeStyles((theme) => ({
  dialog: {
    width: '960px',
  },
  paper: {
    display: 'flex',
    flexDirection: 'row',
    padding: '10px 10px',
  },
  title: {
    flexBasis: '33.33%',
    flexShrink: 0,
    fontWeight: theme.typography.fontWeightBold,
  },
  dueDate: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    flexGrow: 1,
  },
}));

const EditAssignmentComponent = ({
  assignment,
  fetchAssignments
}) => {
  const [title, setTitle] = useState(assignment.title);
  const [content, setContent] = useState(assignment.content);
  const [dueDate, setDueDate] = useState(new Date(assignment.dueDate));

  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const classes = useStyle();

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDeleteDialogOpen = () => {
  };

  const handleSubmit = async () => {

  };

  const EditAssignmentForm = (
    <ValidatorForm onSubmit={handleSubmit}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={6}>
          <TextValidator
            label="New Title"
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            validators={['required']}
            errorMessages={['This field is required']}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextValidator
            id="date"
            name="date"
            label="New Due Date"
            type="date"
            variant="outlined"
            onChange={(event) => setDueDate(event.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            validators={['required']}
            errorMessages={['This field is required']}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextValidator
            label="New Content"
            name="content"
            type="text"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            validators={['required']}
            errorMessages={['This field is required']}
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>
    </ValidatorForm>
  );

  return (
    <>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Edit Assignment</DialogTitle>
        <DialogContent>
          {EditAssignmentForm}
        </DialogContent>
        <DialogActions>
          <Button
            variant="text"
            color="primary"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Submit
          </Button>
          <Button
            variant="text"
            onClick={handleDialogClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Paper elevation={2} className={classes.paper}>
        <Typography className={classes.title} variant="h6">{assignment.title}</Typography>
        <Typography className={classes.dueDate} variant="h6">
          {`Due: ${assignment.dueDate ? dueDate.toLocaleString() : 'none'}`}
        </Typography>
        <Button
          variant="text"
          color="primary"
          size="small"
          onClick={handleDialogOpen}
          style={{ float: 'right' }}
        >
          Edit
        </Button>
        <Button
          variant="text"
          color="secondary"
          size="small"
          onClick={handleDeleteDialogOpen}
          style={{ float: 'right' }}
        >
          Delete
        </Button>
      </Paper>
    </>
  );
};

export default EditAssignmentComponent;
