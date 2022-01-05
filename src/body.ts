import {FetchOptions} from './fetch';

/**
 * Handle request body data.
 *
 * @param data FetchOptions['data']
 * @param body FetchOptions['body']
 * @return FetchOptions['body']
 */
export interface HandleRequestBody {
  (
    data: FetchOptions['data'],
    body: FetchOptions['body']
  ): FetchOptions['body'];
}

export const handleRequestBody: HandleRequestBody = (data, body) => {
  if (data) {
    return typeof data === 'object' && data !== null
      ? JSON.stringify(data)
      : data;
  }

  return body;
};
