import { graphQLFetch } from "./graphql-fetch";

// eslint-disable-next-line import/prefer-default-export
const createCourse = async (name, description, shortDescription) => {
  const query = `
  mutation createCourse($name: String!, $description: String!, $shortDescription: String!) {
    createCourse(name: $name, description: $description, shortDescription: $shortDescription) {
      success
      insertedId
      message
    } 
  }`;
  const vars = {
    name,
    description,
    shortDescription,
  };
  const result = await graphQLFetch(query, vars);
  return result;
};

export default createCourse;
