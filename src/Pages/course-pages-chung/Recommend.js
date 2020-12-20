import React from "react";
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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-elastic-carousel";
import { Link } from "react-router-dom";

export function Recommend({ recommendArr, title }) {
  const classes = useStyles();

  // function shuffle(array) {
  //   var currentIndex = array.length,
  //     temporaryValue,
  //     randomIndex;

  //   // While there remain elements to shuffle...
  //   while (0 !== currentIndex) {
  //     // Pick a remaining element...
  //     randomIndex = Math.floor(Math.random() * currentIndex);
  //     currentIndex -= 1;

  //     // And swap it with the current element.
  //     temporaryValue = array[currentIndex];
  //     array[currentIndex] = array[randomIndex];
  //     array[randomIndex] = temporaryValue;
  //   }

  //   return array;
  // }

  function getRandom(arr, n) {
    var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    while (n > len) n--;
    while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }
  const recommendCoursesImgArr = [
    "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/37/6352a069b511e3ae92c39913bb30e0/DataScientistsToolbox.jpg?auto=format%2Ccompress&dpr=1&w=250",
    "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/7a/569080aab711e79d97bf25c196049d/1200px-square-dark.jpg?auto=format%2Ccompress&dpr=1&w=250",
    "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/3e/3974e00aa311e8840ea7bed5c70ad0/Specialization-logo.jpg?auto=format%2Ccompress&dpr=1&w=250",
    "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/77/e06750f1fb11e782572b9fa3447a7a/TURQUASE-Square-800x800-02.jpg.jpg?auto=format%2Ccompress&dpr=1&w=250",
    "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera.s3.amazonaws.com/topics/algo2/large-icon.png?auto=format%2Ccompress&dpr=1&w=250",
    "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/23/22bc54f77f45a2b057f4ff518d272f/iStock-1169539468.jpg?auto=format%2Ccompress&dpr=1&w=250",
    "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/f4/acffe00bd811e8bfabed507b508fa4/ds0105en-square.png?auto=format%2Ccompress&dpr=1&w=250",
    "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera.s3.amazonaws.com/topics/ml/large-icon.png?auto=format%2Ccompress&dpr=1&w=250",
  ];
  // shuffle(recommendCoursesImgArr);
  const breakPoints = [
    { width: 1, itemsToShow: 1, itemsToScroll: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3, itemsToScroll: 3 },
    // { width: 1200, itemsToShow: 4, itemsToScroll: 4 },
  ];
  // console.log({ recommendArr }, recommendArr.length);
  let recommendCourses = [];
  if (recommendArr.length != 0) recommendCourses = getRandom(recommendArr, 8);

  return (
    <Box my={2}>
      <Container maxWidth="md">
        <Box my={4}>
          <Typography variant="h5" className={classes.fw700}>
            {title}
          </Typography>
        </Box>
      </Container>
      <Container className={classes.root} maxWidth="lg">
        <Carousel breakPoints={breakPoints}>
          {recommendCourses.map((course, index) => (
            <Card className={classes.card}>
              <Link to={`/course/${course.courseId}`}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={recommendCoursesImgArr[index]}
                    title="Contemplative Reptile"
                  />
                  <CardContent className={classes.content}>
                    <Avatar
                      src={course.host.pictureUrl}
                      variant="rounded"
                      className={classes.large}
                    ></Avatar>
                    <Box mt={5}>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        style={{ color: "black" }}
                      >
                        {course.name}
                      </Typography>
                      {/* <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {course.host.firstname} {course.host.lastname}
                      </Typography> */}
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Link>
              <Divider variant="fullWidth"></Divider>
              <CardActions>
                <Box pl={3}>
                  <Link>
                    <Typography variant="subtitle2">
                      Lecturer:{" "}
                      {course.host.lastName + " " + course.host.firstName}
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
    backgroundColor: "#f5f7fa",
  },
  whiteBack: {
    backgroundColor: "#ffffff",
  },
  fw700: {
    fontWeight: 700,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  media: {
    height: 140,
  },
  card: {
    width: "100%",
    marginLeft: 15,
    marginRight: 15,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  content: {
    position: "relative",
    bottom: 30,
    height: 250,
  },
}));
