import { graphQLFetch } from './graphql-fetch';

// eslint-disable-next-line import/prefer-default-export
const deleteAssignment = async (assignmentId) => {
  const query = `
  mutation deleteAssignment($assignmentId: Int!) {
    deleteAssignment(assignmentId: $assignmentId) {
      success
      message
    } 
  }
  `;
  const vars = {
    assignmentId,
  };
  const result = await graphQLFetch(query, vars);
  return result;
};

export default deleteAssignment;
