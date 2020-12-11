import React from 'react';
import {
  Box,
  Container,
  Typography,
  Divider,
  Avatar,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 'react-elastic-carousel';
import { Link } from 'react-router-dom';

export function Recommend({ allCourses }) {
  const classes = useStyles();
  const breakPoints = [
    { width: 1, itemsToShow: 1, itemsToScroll: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3, itemsToScroll: 3 },
    // { width: 1200, itemsToShow: 4, itemsToScroll: 4 },
  ];
  const recommendCourses = allCourses.slice(Math.max(allCourses.length - 8, 0));
  return (
    <Box my={2}>
      <Container maxWidth="md">
        <Box my={4}>
          <Typography variant="h5" className={classes.fw700}>
            Recommend courses for Computer Science
          </Typography>
        </Box>
      </Container>
      <Container className={classes.root} maxWidth="lg">
        <Carousel breakPoints={breakPoints}>
          {recommendCourses.map((course) => (
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/53/01bee0502a11e58ddc8ff4d6e0523a/pythonnetworkdata_thumbnail_1x1.png?auto=format%2Ccompress&dpr=1&w=250"
                  title="Contemplative Reptile"
                />
                <CardContent className={classes.content}>
                  <Avatar
                    src={course.host.pictureUrl}
                    variant="rounded"
                    className={classes.large}
                  ></Avatar>
                  <Box mt={5}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {course.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Số tín chỉ: 3
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
              <Divider variant="fullWidth"></Divider>
              <CardActions>
                <Box pl={3}>
                  <Link>
                    <Typography variant="subtitle2">
                      Lecturer: {course.host.username}
                    </Typography>
                  </Link>
                </Box>
              </CardActions>
            </Card>
          ))}

          {/* TEMP */}
        </Carousel>
      </Container>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#f5f7fa',
  },
  whiteBack: {
    backgroundColor: '#ffffff',
  },
  fw700: {
    fontWeight: 700,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  media: {
    height: 140,
  },
  card: {
    width: '100%',
    marginLeft: 15,
    marginRight: 15,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  content: {
    position: 'relative',
    bottom: 30,
    height: 250,
  },
}));
