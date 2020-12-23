import { graphQLFetch } from './graphql-fetch';

// eslint-disable-next-line import/prefer-default-export
const getEnrollStatus = async (courseId) => {
  const query = `query($courseId: Int!){
    getEnrollStatus(courseId: $courseId)
  }`;
  const vars = {
    courseId,
  };
  const result = await graphQLFetch(query, vars);
  return JSON.parse(result);
};

export default getEnrollStatus;
