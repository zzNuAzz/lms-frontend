import React from 'react';
import { useParams } from 'react-router-dom';
import { getUserInformation } from '../api/get-user-information';
import { graphQLFetch } from '../api/graphql-fetch';

const CourseDetailPage = () => {
  const { id } = useParams();
  const result = getUserInformation(4);
  if (result) {
    console.log(result);
  }
  return (
    <h5>{`Placeholder for CourseDetailPage ID ${id}`}</h5>
  );
};

export default CourseDetailPage;
