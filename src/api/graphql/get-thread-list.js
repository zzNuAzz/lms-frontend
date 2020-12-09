import { graphQLFetch } from './graphql-fetch';

const getThreadList = async (courseId) => {
  const query = `query getThreadList ($courseId: Int!) {
    threadList(courseId: $courseId) {
        threadList {
          threadId
          author {
            userId
            lastName
            firstName
            pictureUrl
          }
          title
          content
          createAt
        }
        totalPages
        totalRecords
        pageNumber
      }
      course(courseId: $courseId) {
        courseId
        name
      }
}`;
  const vars = {
    courseId,
  };
  const result = await graphQLFetch(query, vars);
  return JSON.parse(result);
};
export default getThreadList;