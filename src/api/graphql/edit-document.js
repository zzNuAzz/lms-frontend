import { graphQLFetch } from './graphql-fetch';

// eslint-disable-next-line import/prefer-default-export
const editDocument = async (documentId, title, description, removeFileId = [], newFiles = []) => {
  const query = `
  mutation editDocument($changes: DocumentEdit!) {
    editDocument(changes: $changes) {
      success
      message
    } 
  }
  `;
  const vars = {
    changes: {
      documentId,
      title,
      description,
      removeFileId,
      newFiles,
    },
  };
  const result = await graphQLFetch(query, vars);
  return result;
};

export default editDocument;
