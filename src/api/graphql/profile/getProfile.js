import { graphQLFetch } from '../graphql-fetch';

// eslint-disable-next-line import/prefer-default-export
export default async (userId) => {
  const query = `query profile($userId: Int!){
    userProfile(userId: $userId){
      userId
      username
      role
      firstName
      lastName
      phone
      address
      email
      birthday
      pictureUrl
    }
}`;
  const vars = {
    userId,
  };
  const result = await graphQLFetch(query, vars);
  return JSON.parse(result).data;
};
