// import { sendPostRequest } from './api-send';

// eslint-disable-next-line import/prefer-default-export
export const graphQLFetch = async (query, variables = {}) => {
  // const result = await sendPostRequest(url, JSON.stringify({ query, variables }));
  const result = await fetch('/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });
  if (result) {
    return result.data;
  }
};
