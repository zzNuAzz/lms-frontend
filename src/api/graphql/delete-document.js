import { graphQLFetch } from './graphql-fetch';

// eslint-disable-next-line import/prefer-default-export
const deleteDocument = async (documentId) => {
  const query = `
  mutation deleteDocument($documentId: Int!) {
    deleteDocument(documentId: $documentId) {
      success
      message
    } 
  }`;
  const vars = {
    documentId,
  };
  const result = await graphQLFetch(query, vars);
  return result;
};

export default deleteDocument;
