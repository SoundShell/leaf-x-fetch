import {FetchOptions} from './fetch';

/**
 * Handle the request body options.
 */
export interface HandleRequestBodyOptions {
  /**
   * Body of the request, which is a BodyInit object or null.
   */
  data?: FetchOptions['data'];

  /**
   * Body of the request, which is a BodyInit object or null.
   */
  body?: FetchOptions['body'];

  /**
   * Request headers.
   */
  headers: Record<string, string>;
}

/**
 *  Handle the request body.
 *
 * @param options
 */
export const handleRequestBody = ({
  data,
  body,
  headers,
}: HandleRequestBodyOptions) => {
  const relData = data ?? body;
  const isJson =
    typeof data === 'object' &&
    data !== null &&
    headers['content-type']?.startsWith('application/json');

  return isJson ? JSON.stringify(relData) : relData;
};
