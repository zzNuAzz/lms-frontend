// import { sendPostRequest } from './api-send';
import fetch from 'isomorphic-fetch';

// eslint-disable-next-line import/prefer-default-export
export const graphQLFetch = async (query, variables = {}) => {
  // const result = await sendPostRequest(url, JSON.stringify({ query, variables }));
  const response = await fetch('/api/graphql', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });
  const result = response.text();
  if (!result) {
    const err = {
      success: false,
    };
    return JSON.stringify(err);
  }
  return result;
};
