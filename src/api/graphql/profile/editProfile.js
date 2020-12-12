import { graphQLFetch } from '../graphql-fetch';

// eslint-disable-next-line import/prefer-default-export
export default async ({firstName, lastName, email, address, birthday, phone}) => {
  const query = `
  mutation profile($userProfile: UserUpdateInput!){
    updateUserProfile(changes: $userProfile){
      success
      message
    }
  }`;
  const vars = {
    userProfile: {firstName, lastName, email, address, birthday, phone},
  };
  const result = await graphQLFetch(query, vars);
  return JSON.parse(result).data;
};


