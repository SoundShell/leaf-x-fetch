import {AbortController} from 'abort-controller';
import 'isomorphic-fetch';
import {handleRequestBody} from './body';
import {initHandleRequestError} from './error';
import {handleRequestHeaders} from './headers';
import {HandleResponseResult, initHandleResponse} from './response';
import {handleRequestUrl} from './url';

/**
 * Options for the Fetch.
 */
export interface FetchOptions extends RequestInit {
  /**
   * Request timeout time, default is 3000ms.
   */
  timeout?: number;

  /**
   * Request query parameters.
   *
   * These query parameters will be merged with the request URL only string,
   * if the query parameters and the query string have the same parameters,
   * the query parameters will override the query string parameters.
   */
  params?: Record<string, unknown>;

  /**
   * A request body object or null.
   */
  data?: RequestInit['body'] | Record<string, unknown>;
}

/**
 * Fetch.
 *
 * @param url URL of the request.
 * @param options FetchOptions
 * @return Promise<HandleResponseResult | never>
 */
export interface Fetch {
  (url: string, options?: FetchOptions): Promise<HandleResponseResult | never>;
}

export const leafXFetch: Fetch = (url, options = {}) => {
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
