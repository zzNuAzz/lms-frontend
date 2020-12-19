import { graphQLFetch } from './graphql-fetch';

// eslint-disable-next-line import/prefer-default-export
const createCourse = async (name, description) => {
  const query = `
  mutation createCourse($name: String!, $description: String!) {
    createCourse(name: $name, description: $description) {
      success
      insertedId
      message
    } 
  }`;
  const vars = {
    name,
    description,
  };
  const result = await graphQLFetch(query, vars);
  return result;
};

export default createCourse;
