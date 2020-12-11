import { graphQLFetch } from './graphql-fetch';

// eslint-disable-next-line import/prefer-default-export
const getAllCourses = async () => {
  const query = `
    query getAllCourses {
      courseList {
        courseList {
          name
          courseId
          description
          host {
            userId
            username
            pictureUrl
            firstName
            lastName
          }
        }
      }
    }
  `;
  const vars = {};
  const result = await graphQLFetch(query, vars);
  return result;
};

export default getAllCourses;
