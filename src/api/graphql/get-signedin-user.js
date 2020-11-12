import { graphQLFetch } from './graphql-fetch';

// eslint-disable-next-line import/prefer-default-export
export const getSignedInUser = async () => {
  const query = `query {
  currentUser {
    signedIn
    user {
      userId
      username
      role
    }
  }
}`;
  const result = await graphQLFetch(query);
  return result;
};
