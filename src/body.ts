import {FetchOptions} from './fetch';

/**
 *  Handle the request body.
 *
 * @param data Body of the request, which is a BodyInit object or null.
 * @param body Body of the request, which is a BodyInit object or null.
 */
export const handleRequestBody = (
  data: FetchOptions['data'],
  body: FetchOptions['body']
) => {
  if (!data) {
    return body;
  }

  return typeof data === 'object' && data !== null
    ? JSON.stringify(data)
    : data;
};
