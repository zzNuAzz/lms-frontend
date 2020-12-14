import { graphQLFetch } from './graphql-fetch';

const getPostList = async (threadId) => {
  const query = `query getPostList ($threadId: Int!) {
    postList(threadId: $threadId) {
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