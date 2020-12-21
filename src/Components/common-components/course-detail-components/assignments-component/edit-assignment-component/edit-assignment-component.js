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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
} from '@material-ui/core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { toast } from 'react-toastify';

import createAssignment from '../../../../../api/graphql/create-assignment';
import { grey } from '@material-ui/core/colors';
import moment from 'moment';
import { ExpandMoreRounded } from '@material-ui/icons';

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
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const classes = useStyle();

  const handleDelete = () => {
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
            value={moment(dueDate).format('YYYY-MM-DD')}
            variant="outlined"
            onChange={(event) => setDueDate(new Date(event.target.value))}
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
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
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
            onClick={() => setEditDialogOpen(false)}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>{`Are you sure you want to delete ${title}?`}</DialogTitle>
        <DialogActions>
          <Button
            variant="text"
            color="secondary"
            onClick={handleDelete}
            disabled={isLoading}
          >
            Yes
          </Button>
          <Button
            variant="text"
            onClick={() => setDeleteDialogOpen(false)}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreRounded />}>
          <Typography className={classes.title}>{assignment.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* <Typography variant="h6">Description</Typography>
          <Typography variant="body1">{assignment.content}</Typography> */}
          {EditAssignmentForm}
        </AccordionDetails>
        <AccordionActions>
          <Button
            variant="text"
            color="primary"
            size="small"
            onClick={() => setEditDialogOpen(true)}
            style={{ float: 'right' }}
          >
            Edit
          </Button>
          <Button
            variant="text"
            color="secondary"
            size="small"
            onClick={() => setDeleteDialogOpen(true)}
            style={{ float: 'right' }}
          >
            Delete
          </Button>
        </AccordionActions>
      </Accordion>
    </>
  );
};

export default EditAssignmentComponent;
