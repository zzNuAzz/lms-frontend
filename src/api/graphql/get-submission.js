import { graphQLFetch } from './graphql-fetch';

// eslint-disable-next-line import/prefer-default-export
const getSubmission = async (assignmentId) => {
  const query = `
  query getSubmission($assignmentId: Int!) {
    submission(assignmentId: $assignmentId) {
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
  }`;
  const vars = {
    assignmentId,
  };
  const result = await graphQLFetch(query, vars);
  return result;
};

export default getSubmission;
