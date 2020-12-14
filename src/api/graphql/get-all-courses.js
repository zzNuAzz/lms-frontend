import { graphQLFetch } from './graphql-fetch';

// eslint-disable-next-line import/prefer-default-export
const getAllCourses = async (pageNumber, pageSize) => {
  const query = `
  query getAllCourses($pageNumber: Int!, $pageSize: Int!) {
    courseList(pageNumber: $pageNumber, pageSize: $pageSize) {
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
      totalPages
      totalRecords
      pageNumber
    }
  }
  `;
  const vars = {
    pageNumber,
    pageSize,
  };
  const result = await graphQLFetch(query, vars);
  return result;
};

export default getAllCourses;
