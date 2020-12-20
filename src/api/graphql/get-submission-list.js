import { graphQLFetch } from './graphql-fetch';

// eslint-disable-next-line import/prefer-default-export
const getSubmissionList = async (assignmentId) => {
  const query = `
  query getSubmissionList($assignmentId: Int!, $pageNumber: Int = 0, $pageSize: Int = 100) {
    submissionList(assignmentId: $assignmentId, pageSize: $pageSize, pageNumber: $pageNumber) {
      submissionList {
        submissionId
        assignmentId
        author {
          userId
          username
          firstName
          lastName
          pictureUrl
        }
        description
        files {
          submissionFileId
          filename
          url
          mimetype
        }
        createAt
        updateAt
      }
      totalRecords
      pageNumber
      totalPages
    } 
  }`;
  const vars = {
    assignmentId,
  };
  const result = await graphQLFetch(query, vars);
  return result;
};

export default getSubmissionList;
