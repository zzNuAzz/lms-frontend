import { graphQLFetch } from './graphql-fetch';

// eslint-disable-next-line import/prefer-default-export
export const getCourseById = async (courseId) => {
  const query = `query getCourseById ($courseId: Int!) {
  course(courseId: $courseId) {
    courseId
    host {
      userId
      username
      firstName
      lastName
    }
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
