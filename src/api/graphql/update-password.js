import { graphQLFetch } from './graphql-fetch';

// eslint-disable-next-line import/prefer-default-export
const updatePassword = async (currentPassword, newPassword) => {

    const query =`
    mutation a($currentPassword: String!, $newPassword: String!){
        updateUserPassword(currentPassword: $currentPassword, newPassword: $newPassword){
          success
          message
        }
    }
    `
    const vars = {
        currentPassword,
        newPassword,
    };
    const result = await graphQLFetch(query, vars);
    return JSON.parse(result);
};

export default updatePassword;
