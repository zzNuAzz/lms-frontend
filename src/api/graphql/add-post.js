import { graphQLFetch } from './graphql-fetch';

const addPost = async (threadId, content) => {
  const query = `mutation createPost($threadId: Int!, $content: String!) {
    createPost(threadId: $threadId, content: $content){
      success
      insertedId
      message
    }
  }`;
  const vars = {
    threadId,
    content,
  };
  const result = await graphQLFetch(query, vars);
  return result;
};

export default addPost;
