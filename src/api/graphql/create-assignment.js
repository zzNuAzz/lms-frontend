import { graphQLFetch } from './graphql-fetch';

// eslint-disable-next-line import/prefer-default-export
const createAssignment = async ({ assignment }) => {
  const query = `
  mutation createAssignment($assignment: AssignmentInput!) {
    createAssignment(
      assignment: $assignment
    ) {
      success
      message
      insertedId
    }
  }`;
  const vars = {
    assignment,
  };
  const result = await graphQLFetch(query, vars);
  return result;
};

export default createAssignment;
