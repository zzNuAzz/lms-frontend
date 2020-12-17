import { graphQLFetch } from './graphql-fetch';

const getAssignmentsList = async (courseId, pageNumber = 0, pageSize = 10) => {
  const query = `
  query getAssignments(
    $courseId: Int!
    $pageNumber: Int = 0 
    $pageSize: Int = 100
  ) {
    assignmentList(courseId: $courseId, pageNumber: $pageNumber, pageSize: $pageSize) {
      assignmentList {
        assignmentId
        title
        content
        dueDate
      }
      pageNumber
      totalPages
      totalRecords
    }
  }
`;
  const variables = {
    courseId,
    pageSize,
    pageNumber,
  };
  const result = await graphQLFetch(query, variables);
  return result;
};

export default getAssignmentsList;
