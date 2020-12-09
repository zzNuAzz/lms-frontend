import React from 'react';
import {
  Button,
  ButtonGroup,
  Grid,
} from '@material-ui/core';
import ListRoundedIcon from '@material-ui/icons/ListRounded';
import CardIcon from '@material-ui/icons/ViewAgendaRounded';

const SwitchViewButton = ({ courseView, setCourseView }) => {
  return (
    <Grid
      container
      direction="row"
      justify="flex-end"
      alignContent="center"
      alignItems="center"
    >
      <Grid item>
        <ButtonGroup color="primary">
          <Button
            variant="text"
            color="primary"
          >
            View as
          </Button>
          <Button
            variant={courseView === 'list' ? 'contained' : 'outlined'}
            onClick={() => setCourseView('list')}
          >
            <ListRoundedIcon />
            &nbsp;
            List
          </Button>
          <Button
            variant={courseView === 'card' ? 'contained' : 'outlined'}
            onClick={() => setCourseView('card')}
          >
            <CardIcon />
            &nbsp;
            Card
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default SwitchViewButton;
