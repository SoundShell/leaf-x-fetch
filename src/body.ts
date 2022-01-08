import {FetchOptions} from './fetch';

/**
 * Handle request body.
 *
 * @param data A BodyInit object or null to set request's body.
 * @param body A BodyInit object or null to set request's body.
 */
export const handleRequestBody = (
  data: FetchOptions['data'],
  body: FetchOptions['body']
) =>
  data
    ? typeof data === 'object' && data !== null
      ? JSON.stringify(data)
      : data
    : body;
