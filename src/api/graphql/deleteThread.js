import { graphQLFetch } from './graphql-fetch';

const deleteThread = async (threadId) => {
  const query = `mutation deleteThread($threadId: Int!) {
    deleteThread(threadId: $threadId){
      success
      message
    }
  }`;
  const vars = {
    threadId,
  };
  const result = await graphQLFetch(query, vars);
  return result;
};

export default deleteThread;
