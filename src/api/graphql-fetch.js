import { sendPostRequest } from './api-send';

// eslint-disable-next-line import/prefer-default-export
export const graphQLFetch = async ({ query, variables = {} }) => {
  const url = '/graphql';
  const result = await sendPostRequest(url, JSON.stringify({ query, variables }));
  if (result) {
    return result.data;
  }
};
