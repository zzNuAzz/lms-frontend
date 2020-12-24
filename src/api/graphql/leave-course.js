import { graphQLFetch } from './graphql-fetch';

// eslint-disable-next-line import/prefer-default-export
const leaveCourse = async (courseId) => {
  const query = `
  mutation leaveCourse ($courseId: Int!) {
    leaveCourse(courseId: $courseId){
      success
      message
    }
  }`;
  const vars = {
    courseId,
  };
  const result = await graphQLFetch(query, vars);
  return result;
};

export default leaveCourse;
