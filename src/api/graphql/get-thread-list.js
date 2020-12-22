import { graphQLFetch } from './graphql-fetch';

const getThreadList = async (courseId, pageNumber, pageSize) => {
  const query = `query getThreadList ($courseId: Int!, $pageNumber: Int, $pageSize: Int) {
    threadList(courseId: $courseId, pageNumber: $pageNumber, pageSize: $pageSize) {
        threadList {
          threadId
          author {
            userId
            lastName
            firstName
            pictureUrl
          }
          postCount
          title
          content
          createAt
        }
        totalPages
        totalRecords
        pageNumber
      }
}`;
  const vars = {
    courseId,
    pageNumber,
    pageSize
  };
  const result = await graphQLFetch(query, vars);
  return JSON.parse(result);
};
export default getThreadList;