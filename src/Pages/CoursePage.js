import React, { useState } from 'react';
import {
  Button,
  ButtonGroup,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@material-ui/core';
import ListRoundedIcon from '@material-ui/icons/ListRounded';
import CardIcon from '@material-ui/icons/ViewAgendaRounded';
import { CourseCard } from '../Components/course-card/course-card.js';
import { CourseListElement } from '../Components/course-list-element/course-list-element';
import courses from '../sample-data/sample-course';

// TODO: Custom CourseListView
const CourseListView = courses.map((course) => (
  <div style={{ margin: '15px' }}>
    <CourseListElement title={course.name} />
  </div>
));

const CourseCardView = courses.map((course) => (
  <Grid item md={4}>
    <CourseCard title={course.name} id={course.id} />
  </Grid>
));

export default function CoursePage() {
  const [courseView, setCourseView] = useState('list');

  const handleListView = () => {
    setCourseView('list');
  };
  const handleCardView = () => {
    setCourseView('card');
  };

  return (
    <>
      <h1>All Courses</h1>

      {/* List-View Switcher */}
      <Grid
        container
        direction="row"
        justify="flex-end"
        alignContent="center"
        alignItems="center"
      >
        {/* <Grid item>
          <Typography variant="body1">View as:&nbsp;</Typography>
        </Grid> */}
        <Grid item>
          <ButtonGroup color="primary">
            <Button
              variant="outlined"
              color="primary"
              disabled
            >
              View as
            </Button>
            <Button
              variant={courseView === 'list' ? 'contained' : 'outlined'}
              onClick={handleListView}
            >
              <ListRoundedIcon />
              &nbsp;
              List
            </Button>
            <Button
              variant={courseView === 'card' ? 'contained' : 'outlined'}
              onClick={handleCardView}
            >
              <CardIcon />
              &nbsp;
              Card
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
      <br />
      {
        courseView === 'list'
          ? (
            <List>
              {CourseListView}
            </List>
          )
          : (
            <Grid
              container
              direction="row"
              justify="center"
              spacing={3}
            >
              {CourseCardView}
            </Grid>
          )
      }
    </>
  );
}
