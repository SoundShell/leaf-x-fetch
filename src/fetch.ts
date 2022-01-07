import {AbortController} from 'abort-controller';
import 'isomorphic-fetch';
import {handleRequestBody} from './body';
import {initHandleRequestError} from './error';
import {handleRequestHeaders} from './headers';
import {initHandleResponse} from './response';
import {handleRequestUrl} from './url';

/**
 * Fetch options.
 */
export interface FetchOptions extends RequestInit {
  /**
   * Request timeout, default 3000 milliseconds.
   */
  timeout?: number;

  /**
   * Request query parameters.
   *
   * The query parameter will be merged with the URL string parameter
   * automatically, if the URL parameter and the query parameter have the same
   * parameter, the query parameter will overwrite the same URL string
   * parameter.
   */
  params?: Record<string, unknown>;

  /**
   * Request data.
   */
  data?: RequestInit['body'] | Record<string, unknown>;
}

/**
 * Fetch.
 *
 * @param url —  URL of the request.
 * @param options — FetchOptions
 */
export const leafXFetch = (url: string, options: FetchOptions = {}) => {
  const {
    method = 'GET',
    params = {},
    timeout = 3000,
    headers = {},
    data,
    body,
    ...args
  } = options;

  const requestHeaders = handleRequestHeaders(headers);
  const requestBody = handleRequestBody(data, body);
  const requestUrl = handleRequestUrl({url, params});
  const requestInit = {
    method,
    headers: requestHeaders,
    body: requestBody,
    ...args,
  };

  const fetchOptions = {timeout, ...requestInit};
  const handleResponse = initHandleResponse(fetchOptions);
  const handleError = initHandleRequestError(fetchOptions);

  const abortController = new AbortController();
  const signal = abortController.signal;

  setTimeout(() => abortController.abort(), timeout);

  return fetch(requestUrl, {signal, ...requestInit})
    .then(handleResponse)
    .catch(handleError);
};
