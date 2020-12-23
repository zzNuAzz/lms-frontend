import { graphQLFetch } from './graphql-fetch';

// eslint-disable-next-line import/prefer-default-export
const editAssignment = async (assignmentId, title, content, dueDate, removeFileId = [], newFiles = []) => {
  const query = `
  mutation editAssignment($changes: AssignmentEdit!) {
    editAssignment(changes: $changes) {
      success
      message
    } 
  }
  `;
  const vars = {
    changes: {
      assignmentId,
      title,
      content,
      dueDate,
      removeFileId,
      newFiles,
    },
  };
  const result = await graphQLFetch(query, vars);
  return result;
};

export default editAssignment;
