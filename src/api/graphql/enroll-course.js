import { graphQLFetch } from './graphql-fetch';

// eslint-disable-next-line import/prefer-default-export
const enrollCourse = async (courseId) => {
  const query = `
    mutation enrollCourse($courseId: Int!, $description: String) {
      enrollCourse(courseId: $courseId, description: $description) {
        success
        message
      } 
    }
  `;
  const vars = {
    courseId,
  };
  const result = await graphQLFetch(query, vars);
  return result;
};

export default enrollCourse;
