import React from 'react';
import { useParams } from 'react-router-dom';
import { graphQLFetch } from '../api/graphql-fetch';

const CourseDetailPage = () => {
  const { id } = useParams();
  const query = `
    query getUserInformation($userId: Int!){
      userProfile(userId: $userId) {
        userId
        username
        role
        address
        firstName 
        lastName
        phone
        pictureUrl
      }
    }
  `;

  console.log(result);
  return (
    <h5>{`Placeholder for CourseDetailPage ID ${id}`}</h5>
  );
};

export default CourseDetailPage;
