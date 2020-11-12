// import { sendPostRequest } from './api-send';
import fetch from 'isomorphic-fetch';

// eslint-disable-next-line import/prefer-default-export
export const graphQLFetch = async (query, variables = {}) => {
  // const result = await sendPostRequest(url, JSON.stringify({ query, variables }));
  const response = await fetch('/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });
  const result = response.text();
  if (result) {
    return result;
  } else {
    const err = {
      success: false,
    }
    return JSON.stringify(err);
  }
};
