import {AbortController} from 'abort-controller';
import {handleRequestBody} from './body';
import {handleRequestHeaders} from './headers';
import {Fetch} from './interface/fetch.interface';
import {initHandleResponse} from './response';
import {handleRequestUrl} from './url';

const REACT_NATIVE =
  typeof navigator !== 'undefined' && navigator.product === 'ReactNative';

if (!REACT_NATIVE) {
  require('isomorphic-fetch');
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
  const requestInit = {
    method,
    headers: requestHeaders,
    body: requestBody,
    ...args,
  };

  const handleResponse = initHandleResponse({timeout, ...requestInit});
  const abortController = new AbortController();
  const signal = abortController.signal;
  const requestUrl = handleRequestUrl({url, params});

  setTimeout(() => abortController.abort(), timeout);

  return fetch(requestUrl, {signal, ...requestInit})
    .then(handleResponse)
    .catch(error => {
      if (error.data && error.options) {
        throw error;
      }

      throw Object.assign(new Error('Invalid request.'), {
        data: {message: error.message},
        options: requestInit,
      });
    });
};
