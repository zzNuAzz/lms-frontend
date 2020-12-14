import { graphQLFetch } from './graphql-fetch';

const deletePost = async (postId) => {
  const query = `mutation deletePost($postId: Int!) {
    deletePost(postId: $postId){
      success
      message
    }
  }`;
  const vars = {
    postId,
  };
  const result = await graphQLFetch(query, vars);
  return result;
};

export default deletePost;
