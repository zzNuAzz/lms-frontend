import { graphQLFetch } from './graphql-fetch';

// eslint-disable-next-line import/prefer-default-export
const checkUsernameAvailability = async (username) => {
  const query = `query checkUsernameAvailability ($username: String!){
    usernameAvailability(username:$username)
}`;
  const vars = {
    username,
  };
  const result = await graphQLFetch(query, vars);
  return result;
};

export default checkUsernameAvailability;
