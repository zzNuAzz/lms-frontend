import { graphQLFetch } from "./graphql-fetch";

// eslint-disable-next-line import/prefer-default-export
const editThread = async (threadId, title, content) => {
  const query = `
  mutation editThread($threadId: Int!, $title: String, $content: String) {
    editThread(threadId: $threadId, title: $title, content: $content) {
      success
      message
    } 
  }`;
  const vars = {
    threadId,
    title,
    content,
  };
  const result = await graphQLFetch(query, vars);
  return result;
};

export default editThread;
