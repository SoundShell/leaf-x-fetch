import AbortController from 'abort-controller';
import 'isomorphic-fetch';
import {handleRequestBody} from './body';
import {DEFAULTS as defaults, handleDefaults} from './defaults';
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
   * Request query params.
   *
   * The query params will be merged with the URL string params,
   * if the query params and the URL string params have the same key,
   * then the query params will overwrite the URL string params.
   */
  params?: Record<string, string>;

  /**
   * Body of the request, which is a BodyInit object or null.
   */
  data?: RequestInit['body'] | Record<string, unknown>;

  /**
   * Whether to encode URLs or not.
   */
  isEncode?: boolean;

  /**
   * The AbortController.
   *
   * @see — https://dom.spec.whatwg.org/#abortcontroller
   */
  abortController?: AbortController;
}

/**
 * Leaf-x fetch type.
 */
type LeafXFetchType = typeof relFetch & {
  defaults: typeof handleDefaults;
};

/**
 * The Fetch API provides a JavaScript interface for accessing and manipulating
 * specific parts of the HTTP pipeline, such as requests and responses.
 *
 * @param url Request URL.
 * @param options Fetch API options.
 */
const relFetch = (url: string, options: FetchOptions = {}) => {
  const {
    method = 'GET',
    params,
    timeout,
    headers,
    data,
    body,
    isEncode,
    abortController,
    ...args
  } = options;

  const requestHeaders = handleRequestHeaders(headers);
  const requestBody = handleRequestBody(data, body);
  const requestUrl = handleRequestUrl(url, {params, isEncode});
  const requestInit = {
    method,
    headers: requestHeaders,
    body: requestBody,
    ...args,
  };

  const requestTimeout = timeout ?? defaults.get('timeout') ?? 3000;
  const fetchOptions = {
    url: requestUrl,
    timeout: requestTimeout,
    params,
    ...requestInit,
  };

  const handleResponse = initHandleResponse(fetchOptions);
  const handleError = initHandleRequestError(fetchOptions);
  const abort = abortController ?? new AbortController();
  const signal = abort.signal;
  const timer = setTimeout(() => abort.abort(), requestTimeout);

  return fetch(requestUrl, {signal, ...requestInit})
    .then(response => {
      clearTimeout(timer);

      return handleResponse(response);
    })
    .catch(handleError);
};

/**
 * Defines the request default params settings.
 */
Object.defineProperty(relFetch, 'defaults', {
  value: handleDefaults,
});

export const leafXFetch = relFetch as LeafXFetchType;
