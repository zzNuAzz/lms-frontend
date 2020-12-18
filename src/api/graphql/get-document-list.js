import { graphQLFetch } from './graphql-fetch';

// eslint-disable-next-line import/prefer-default-export
const getDocumentList = async (courseId, pageNumber = 0, pageSize = 100) => {
  const query = `
  query getDocumentList($courseId: Int!, $pageNumber: Int = 0, $pageSize: Int = 100) {
    documentList(courseId: $courseId, pageNumber: $pageNumber, pageSize: $pageSize) {
      documentList {
        documentId
        title
        description
        files {
          documentFileId
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
    courseId,
    pageNumber,
    pageSize,
  };
  const result = await graphQLFetch(query, vars);
  return result;
};

export default getDocumentList;
