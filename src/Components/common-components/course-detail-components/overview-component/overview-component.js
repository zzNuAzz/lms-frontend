import {
  Typography, makeStyles, Grid, Avatar, LinearProgress,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ReactHtmlParser from 'react-html-parser';
import getCourseHost from '../../../../api/graphql/get-course-host';
import getCourseDetails from '../../../../api/graphql/get-course-details';
import toastFetchErrors from '../../../tools/toast-fetch-errors';

const useStyles = makeStyles((theme) => ({
  title: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  contactInfo: {

  },
  hostAvatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
}));

const OverviewComponent = ({
  courseId,
}) => {
  const classes = useStyles();
  const [host, setHost] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    birthday: '',
    address: '',
    pictureUrl: '',
  });
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseShortDescription, setCourseShortDescription] = useState('');
  const [isLoading, setLoading] = useState(true);

  const fetchCourseHost = async () => {
    try {
      const result = await getCourseHost(parseInt(courseId, 10));
      const parsedResult = JSON.parse(result);
      if (parsedResult.data) {
        setHost({
          firstName: parsedResult.data.course.host.firstName,
          lastName: parsedResult.data.course.host.lastName,
          phone: parsedResult.data.course.host.phone,
          email: parsedResult.data.course.host.email,
          birthday: parsedResult.data.course.host.birthday,
          address: parsedResult.data.course.host.address,
          pictureUrl: parsedResult.data.course.host.pictureUrl,
        });
      } else {
        toast(result);
      }
    } catch (error) {
      toast(error);
    }
  };

  const fetchCourseDetails = async () => {
    try {
      let result = await getCourseDetails(parseInt(courseId, 10));
      result = JSON.parse(result);
      if (result.data) {
        setCourseName(result.data.course.name);
        setCourseShortDescription(result.data.course.shortDescription || '');
        setCourseDescription(result.data.course.description || '');
      } else {
        toastFetchErrors(result);
      }
    } catch (error) {
      toast.error(error.toString());
    }
  };

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      await fetchCourseDetails();
      await fetchCourseHost();
      setLoading(false);
    };
    fetch();
  }, []);

  const RenderComponent = (
    <div className="overview">
      <div className={classes.title}>
        <Typography variant="h3">
          {courseName}
        </Typography>
        <Typography variant="body1">
          {`by ${host.lastName.concat(' ', host.firstName)}`}
        </Typography>
      </div>
      <hr />
      <div className="course-description">
        {ReactHtmlParser(courseDescription)}
      </div>
      <hr />
      <div className={classes.contactInfo}>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="flex-start"
          spacing={2}
        >
          <Grid item>
            <Avatar className={classes.hostAvatar} src={host.pictureUrl} />
          </Grid>
          <Grid item>
            <Typography variant="h6">
              {`Taught by: ${host.lastName.concat(' ', host.firstName)}`}
            </Typography>
            <Typography variant="body2">
              Professor at UET - VNU
            </Typography>
            <Typography variant="body2">
              Computer Science
            </Typography>
            <Typography variant="body2">
              {'Email: '}
              <a href={`mailto:${host.email}`}>{host.email}</a>
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );

  return (
    <>
      {
        isLoading
          ? <LinearProgress />
          : RenderComponent
      }
    </>
  );
};

export default OverviewComponent;
