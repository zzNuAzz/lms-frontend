import { graphQLFetch } from './graphql-fetch';

// eslint-disable-next-line import/prefer-default-export
const getCourseDetails = async (courseId) => {
  const query = `query getCourseById ($courseId: Int!) {
  course(courseId: $courseId) {
    courseId
    name
    description
  }
}`;
  const vars = {
    courseId,
  };
  const result = await graphQLFetch(query, vars);
  return result;
};

export default getCourseDetails;
