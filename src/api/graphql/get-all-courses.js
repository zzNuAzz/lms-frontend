import { graphQLFetch } from "./graphql-fetch";

// eslint-disable-next-line import/prefer-default-export
const getAllCourses = async (pageNumber, pageSize) => {
  const query = `
  query getAllCourses(
    $statusEclude:[EnrollStatus!]
    $order: [[String!]!]
    $pageNumber: Int!
    $pageSize: Int!
    
  ) {
    userCourseListExclude(statusExclude: $statusEclude, pageNumber: $pageNumber, pageSize: $pageSize, order: $order){
      courseList {
          name
          courseId
          description
          shortDescription
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
