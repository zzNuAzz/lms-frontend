import { graphQLFetch } from './graphql-fetch';

// eslint-disable-next-line import/prefer-default-export
const getTeacherCourseList = async (hostId, pageNumber = 0, pageSize = 100) => {
  const query = `
  query getTeacherCourseList($hostId: Int!, $pageNumber: Int = 0, $pageSize: Int = 100) {
    courseList (hostId: $hostId, pageSize: $pageSize, pageNumber: $pageNumber) {
      courseList {
        courseId
        host {
          userId
          username
          role
          firstName
          lastName
          phone
          address
          email
          birthday
          pictureUrl
        }
        name
        description
        createAt
        updateAt
      }
      totalRecords
      pageNumber
      totalPages
    }
  }
`;
  const vars = {
    hostId,
    pageNumber,
    pageSize,
  };
  const result = await graphQLFetch(query, vars);
  return result;
};

export default getTeacherCourseList;
