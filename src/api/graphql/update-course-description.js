import { graphQLFetch } from './graphql-fetch';

// eslint-disable-next-line import/prefer-default-export
const updateCourseDescription = async (courseId, description) => {
  const query = `
  mutation updateCourse($courseId: Int!, $description: String!) {
    updateCourse(courseId: $courseId, description: $description) {
      success
      message
    } 
  }`;
  const vars = {
    courseId,
    description,
  };
  const result = await graphQLFetch(query, vars);
  return result;
};

export default updateCourseDescription;
