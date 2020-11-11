import { graphQLFetch } from './graphql-fetch';

// eslint-disable-next-line import/prefer-default-export
export const getUserInformation = async (userId) => {
  const query = `query getUserInformation($userId: Int!){
    userProfile(userId: $userId) {
      userId
      username
      role
      address
      firstName 
      lastName
      phone
      pictureUrl
    }
  }`;
  const vars = {
    userId,
  };
  const result = await graphQLFetch(query, vars);
  return result;
};
