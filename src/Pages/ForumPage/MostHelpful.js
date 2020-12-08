import React, { Fragment} from 'react';
import { Avatar, Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { green, pink, yellow, blue } from '@material-ui/core/colors';

export default function MostHelpful() {
  const classes = useStyles();
  return (
    <Fragment>
      <Box mb={2} ml={3} fontWeight="fontWeightMedium">
        Most helpful members
      </Box>
      <Grid
        item
        container
        direction="row"
        spacing={1}
        justify="flex-start"
        alignItems="center"
      >
        <Grid item>
          <Avatar className={` ${classes.avatar} ${classes.pink}`}>1</Avatar>
        </Grid>
        <Grid item>
          <Avatar src="https://scontent.fhan4-1.fna.fbcdn.net/v/t1.0-9/97277711_1140191562981153_3228275519082463232_n.jpg?_nc_cat=105&ccb=2&_nc_sid=09cbfe&_nc_ohc=eqyhDFSdNBMAX_LFOQK&_nc_ht=scontent.fhan4-1.fna&oh=6ecf601d1ca749eddc7c3504a9dc197c&oe=5FEE8F81">
            C
          </Avatar>
        </Grid>
        <Grid item>
          <div>
            <span>
              <Link to="/">Trần Tuấn Anh</Link>
            </span>{' '}
            <br />
            <Typography variant="subtitle2">1609 points</Typography>
          </div>
        </Grid>
      </Grid>

      <Grid
        item
        container
        direction="row"
        spacing={1}
        justify="flex-start"
        alignItems="center"
      >
        <Grid item>
          <Avatar className={` ${classes.avatar} ${classes.green}`}>2</Avatar>
        </Grid>
        <Grid item>
          <Avatar src="https://scontent.fhan3-3.fna.fbcdn.net/v/t1.0-9/79838491_2226525727647230_3812721358618492928_n.jpg?_nc_cat=100&ccb=2&_nc_sid=730e14&_nc_ohc=QvChy4mmVgYAX-A0uTl&_nc_ht=scontent.fhan3-3.fna&oh=00915964eeb78281bffe42d85c12c24f&oe=5FEAE1A6">
            C
          </Avatar>
        </Grid>
        <Grid item>
          <div>
            <span>
              <Link to="/">Lê Quang Nhật</Link>
            </span>{' '}
            <br />
            <Typography variant="subtitle2">1507 points</Typography>
          </div>
        </Grid>
      </Grid>

      <Grid
        item
        container
        direction="row"
        spacing={1}
        justify="flex-start"
        alignItems="center"
      >
        <Grid item>
          <Avatar className={` ${classes.avatar} ${classes.blue}`}>3</Avatar>
        </Grid>
        <Grid item>
          <Avatar src="https://scontent.fhan3-2.fna.fbcdn.net/v/t1.0-9/118590557_2703025843295513_7932150032520666123_o.jpg?_nc_cat=107&ccb=2&_nc_sid=09cbfe&_nc_ohc=67bXq3YY-1EAX--dm_p&_nc_ht=scontent.fhan3-2.fna&oh=bf039259a7ff66560ad2a2b7cbfeb46b&oe=5FEDAC73">
            C
          </Avatar>
        </Grid>
        <Grid item>
          <div>
            <span>
              <Link to="/">Lê Chung</Link>
            </span>
            <br />
            <Typography variant="subtitle2">1504 points</Typography>
          </div>
        </Grid>
      </Grid>

      <Grid
        item
        container
        direction="row"
        spacing={1}
        justify="flex-start"
        alignItems="center"
      >
        <Grid item>
          <Avatar className={` ${classes.avatar} ${classes.yellow}`}>4</Avatar>
        </Grid>
        <Grid item>
          <Avatar src="https://scontent.fhan3-1.fna.fbcdn.net/v/t1.0-1/s200x200/118923332_1521958727988899_3029914780644670440_n.jpg?_nc_cat=111&ccb=2&_nc_sid=7206a8&_nc_ohc=40XhXgFqoykAX-xyi9r&_nc_ht=scontent.fhan3-1.fna&tp=7&oh=6a99e17cd8e6f04dac2dc25f4e574299&oe=5FED7F48">
            C
          </Avatar>
        </Grid>
        <Grid item>
          <div>
            <span>
              <Link to="/">Đạt Phịt</Link>
            </span>{' '}
            <br />
            <Typography variant="subtitle2">1131 points</Typography>
          </div>
        </Grid>
      </Grid>
      {/* </Grid> */}
    </Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#f5f7fa',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  search: {
    backgroundImage: `url(${'https://uploads-us-west-2.insided.com/coursera-en/attachment/0ee512f0-c148-4e6c-a3c5-ae5ea674bbf9_thumb.jpg'})`,
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    padding: 30,
    width: '100%',
    marginBottom: 50,
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  media: {
    height: 0,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  appBar: {},
  welcome: {
    color: '#ffffff',
    textColor: '#ffffff',
    fontWeight: 600,
  },
  searchBar: {
    width: 300,
    marginBottom: 60,
  },
  m1: {
    margin: 8,
  },
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: 15,
  },
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
  green: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
  },
  yellow: {
    color: theme.palette.getContrastText(yellow[500]),
    backgroundColor: yellow[500],
  },
  blue: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
  },
}));
