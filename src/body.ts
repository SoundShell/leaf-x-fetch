import {FetchOptions} from './fetch';

/**
 * Handle request body.
 *
 * @param data — FetchOptions['data']
 * @param body — FetchOptions['body']
 */
export const handleRequestBody = (
  data: FetchOptions['data'],
  body: FetchOptions['body']
) => {
  if (data) {
    return typeof data === 'object' && data !== null
      ? JSON.stringify(data)
      : data;
  }

  return body;
};
