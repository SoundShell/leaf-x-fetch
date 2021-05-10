import AbortController from 'abort-controller';
import * as isomorphicFetch from 'isomorphic-fetch';
import {Fetch} from './interface/fetch.interface';
import {initHandleResponse} from './response';
import {checkStatus} from './status';
import {handleUrl} from './url';

export const fetch: Fetch = async (url, options) => {
  const {
    params = {},
    method = 'GET',
    timeout = 3000,
    headers = {
      'content-type': 'application/json; charset=utf-8',
      accept: '*/*',
    },
    ...args
  } = options ?? {};

  const requestOptions = {method, headers, ...args};
  const handleResponse = initHandleResponse({timeout, ...requestOptions});
  const abortController = new AbortController();
  const signal = abortController.signal;
  const requestUrl = handleUrl({url, params});

  setTimeout(() => abortController.abort(), timeout);

  return isomorphicFetch(requestUrl, {signal, ...requestOptions})
    .then(checkStatus)
    .then(handleResponse)
    .catch(error => {
      if (error.response) {
        throw handleResponse(error.response);
      }

      throw error;
    });
};
