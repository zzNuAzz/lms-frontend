import { graphQLFetch } from './graphql-fetch';

const createThread = async (
  courseId,
  title,
  content
) => {
  const query = `mutation newThread($courseId: Int!, $title: String!, $content: String!) {
    createThread(courseId: $courseId, title: $title, content: $content){
      success
      insertedId
      message
    }
  }`;
  const vars = {
    courseId,
    title,
    content
  };
  const result = await graphQLFetch(query, vars);
  return result;
};

export default createThread;
