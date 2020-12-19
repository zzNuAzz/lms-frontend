import { graphQLFetch } from './graphql-fetch';

// eslint-disable-next-line import/prefer-default-export
const createDocument = async (courseId, title, description, files) => {
  const query = `
  mutation createDocument($document: DocumentInput!) {
    createDocument(document: $document) {
      success
      insertedId
      message
    }
  }`;
  const vars = {
    document: {
      courseId,
      title,
      description,
      files,
    },
  };
  const result = await graphQLFetch(query, vars);
  return result;
};

export default createDocument;
