import {AbortController} from 'abort-controller';
import 'isomorphic-fetch';
import {handleRequestBody} from './body';
import {initHandleRequestError} from './error';
import {handleRequestHeaders} from './headers';
import {initHandleResponse} from './response';
import {handleRequestUrl} from './url';

/**
 * Fetch API options.
 */
export interface FetchOptions extends RequestInit {
  /**
   * Request timeout time.
   *
   * The default value is 3000 milliseconds.
   */
  timeout?: number;

  /**
   * Request query parameters.
   *
   * The query parameter will be merged with the URL string parameter,
   * if the query parameter and the URL string parameter have the same key,
   * then the query parameter will overwrite the URL string parameter.
   */
  params?: Record<string, string>;

  /**
   * Body of the request., which is a BodyInit object or null.
   */
  data?: RequestInit['body'] | Record<string, unknown>;

  /**
   * Request header information.
   *
   * The default 'content-type' is 'application/json; charset=utf-8'.
   */
  headers?: Record<string, string>;
}

/**
 * The Fetch API provides a JavaScript interface for accessing and manipulating
 * specific parts of the HTTP pipeline, such as requests and responses.
 *
 * @param url Request URL.
 * @param options Fetch API options.
 */
export const leafXFetch = (url: string, options: FetchOptions = {}) => {
  const {
    method = 'GET',
    params,
    timeout = 3000,
    headers,
    data,
    body,
    ...args
  } = options;

  const requestHeaders = handleRequestHeaders(headers);
  const requestBody = handleRequestBody(data, body);
  const requestUrl = handleRequestUrl(url, {params});
  const requestInit = {
    method,
    headers: requestHeaders,
    body: requestBody,
    ...args,
  };

  const fetchOptions = {url: requestUrl, timeout, params, ...requestInit};
  const handleResponse = initHandleResponse(fetchOptions);
  const handleError = initHandleRequestError(fetchOptions);
  const abortController = new AbortController();
  const signal = abortController.signal;

  setTimeout(() => abortController.abort(), timeout);

  return fetch(requestUrl, {signal, ...requestInit})
    .then(handleResponse)
    .catch(handleError);
};
