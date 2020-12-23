import { graphQLFetch } from './graphql-fetch';

const getPostList = async (threadId) => {
  const query = `query getPostList ($threadId: Int!, $pageNumber: Int, $pageSize: Int) {
    postList(threadId: $threadId, pageNumber: $pageNumber, pageSize: $pageSize) {
      postList{
        postId
        threadId
        author{
          userId
          username
          firstName
          lastName
          email
          pictureUrl
        }
        content
        createAt
        updateAt
      }
    totalRecords
    totalPages
    pageNumber
    }
}`;
  const vars = {
    threadId,
  };
  const result = await graphQLFetch(query, vars);
  return JSON.parse(result);
};
export default getPostList;