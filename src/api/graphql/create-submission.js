import { graphQLFetch } from './graphql-fetch';

// eslint-disable-next-line import/prefer-default-export
const createSubmission = async (assignmentId, description, files) => {
  const query = `
  mutation createSubmission($submission: SubmissionInput!) {
    createSubmission(submission: $submission) {
      success
      insertedId
      message
    } 
  }`;
  const vars = {
    submission: {
      assignmentId,
      description,
      files,
    },
  };
  const result = await graphQLFetch(query, vars);
  return result;
};

export default createSubmission;
