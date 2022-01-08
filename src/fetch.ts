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
   * The timeout for executing the request, default is 3000 ms.
   */
  timeout?: number;

  /**
   * Execute the requested query parameters.
   *
   * The query parameter will be merged with the URL string parameter
   * automatically, if the query parameter and the URL string parameter have
   * the same key, then the query parameter will overwrite the URL string
   * parameter.
   */
  params?: Record<string, unknown>;

  /**
   * A BodyInit object or null to set request's body.
   */
  data?: RequestInit['body'] | Record<string, unknown>;

  /**
   * Request headers information.
   */
  headers?: Record<string, string>;
}

/**
 * Fetch.
 *
 * @param url Request URL.
 * @param [options={}] Fetch options.
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
  const requestUrl = handleRequestUrl(url, {params});
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
