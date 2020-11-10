import React from 'react';
import { useParams } from 'react-router-dom';

const CourseDetailPage = () => {
  const { id } = useParams();
  return (
    <h5>{`Placeholder for CourseDetailPage ID ${id}`}</h5>
  );
};

export default CourseDetailPage;
