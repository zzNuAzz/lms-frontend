import { graphQLFetch } from './graphql-fetch';

// eslint-disable-next-line import/prefer-default-export
const editCourse = async (courseId, name, shortDescription, description) => {
  const query = `
  mutation updateCourse($courseId: Int!, $name: String, $shortDescription: String, $description: String) {
    updateCourse(courseId: $courseId, name: $name shortDescription: $shortDescription, description: $description) {
      success
      message
    } 
  }`;
  const vars = {
    courseId,
    description,
  };
  const result = await graphQLFetch(query, vars);
  return result;
};

export default editCourse;
