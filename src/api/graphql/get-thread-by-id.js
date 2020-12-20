import { graphQLFetch } from "./graphql-fetch";

const getThreadById = async (threadId) => {
  const query = `query getThreadById ($threadId: Int!) {
    thread(threadId: $threadId){
      author{
        userId
        username
        firstName
        lastName
        email
        pictureUrl
      }
      courseId
      title
      content
      tags
      createAt
      updateAt
    }
}`;
  const vars = {
    threadId,
  };
  const result = await graphQLFetch(query, vars);
  return JSON.parse(result);
};
export default getThreadById;
