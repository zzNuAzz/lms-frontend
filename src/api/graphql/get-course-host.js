import { graphQLFetch } from './graphql-fetch';

// eslint-disable-next-line import/prefer-default-export
const getCourseHost = async (courseId) => {
  const query = `query getCourseById ($courseId: Int!) {
  course(courseId: $courseId) {
    host {
      userId
      username
      firstName
      lastName
      phone
      email
      address
      birthday
      pictureUrl
    }
  }
}`;

  const vars = {
    courseId,
  };
  const result = await graphQLFetch(query, vars);
  return result;
};

export default getCourseHost;
