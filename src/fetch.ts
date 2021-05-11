import AbortController from 'abort-controller';
import * as isomorphicFetch from 'isomorphic-fetch';
import {Fetch} from './interface/fetch.interface';
import {initHandleResponse} from './response';
import {handleUrl} from './url';

export const fetch: Fetch = (url, options) => {
  const {
    method = 'GET',
    params = {},
    timeout = 3000,
    headers,
    ...args
  } = options ?? {};

  const {
    'content-type': contentType = 'application/json; charset=utf-8',
    accept = '*/*',
    ...headersArgs
  } = (headers ?? {}) as Record<string, string>;

  const requestInit = {
    method,
    headers: {'content-type': contentType, accept, ...headersArgs},
    ...args,
  };

  const handleResponse = initHandleResponse({timeout, ...requestInit});
  const abortController = new AbortController();
  const signal = abortController.signal;
  const requestUrl = handleUrl({url, params});

  setTimeout(() => abortController.abort(), timeout);

  return isomorphicFetch(requestUrl, {signal, ...requestInit}).then(
    handleResponse
  );
};
