import AbortController from 'abort-controller';
import {Fetch} from './interface/fetch.interface';
import {initHandleResponse} from './response';
import {handleUrl} from './url';

const isomorphicFetch =
  typeof document !== 'undefined' || typeof process !== 'undefined';

if (isomorphicFetch) {
  require('isomorphic-fetch');
}

export const leafXFetch: Fetch = (url, options) => {
  const {
    method = 'GET',
    params = {},
    timeout = 3000,
    headers,
    data,
    body,
    ...args
  } = options ?? {};

  const {
    'content-type': contentType = 'application/json; charset=utf-8',
    accept = '*/*',
    ...headersArgs
  } = (headers ?? {}) as Record<string, string>;

  const requestBody = data
    ? typeof data === 'object' && data !== null
      ? JSON.stringify(data)
      : data
    : body;

  const requestInit = {
    method,
    headers: {'content-type': contentType, accept, ...headersArgs},
    body: requestBody,
    ...args,
  };

  const handleResponse = initHandleResponse({timeout, ...requestInit});
  const abortController = new AbortController();
  const signal = abortController.signal;
  const requestUrl = handleUrl({url, params});

  setTimeout(() => abortController.abort(), timeout);

  return fetch(requestUrl, {signal, ...requestInit}).then(handleResponse);
};
