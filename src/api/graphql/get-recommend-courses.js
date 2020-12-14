import { graphQLFetch } from './graphql-fetch';

// eslint-disable-next-line import/prefer-default-export
const getRecommendCourses = async (pageSize) => {
  const query = `
  query getAllCourses($pageSize: Int!) {
    courseList(pageSize: $pageSize) {
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
      totalRecords
    }
  }
  `;
  const vars = {
    pageSize,
  };
  const result = await graphQLFetch(query, vars);
  return result;
};

export default getRecommendCourses;
