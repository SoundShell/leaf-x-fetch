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
    headers = {
      'content-type': 'application/json; charset=utf-8',
      accept: '*/*',
    },
    ...args
  } = options ?? {};

  const requestInit = {method, headers, ...args};
  const handleResponse = initHandleResponse({timeout, ...requestInit});
  const abortController = new AbortController();
  const signal = abortController.signal;
  const requestUrl = handleUrl({url, params});

  setTimeout(() => abortController.abort(), timeout);

  return isomorphicFetch(requestUrl, {signal, ...requestInit}).then(
    handleResponse
  );
};
