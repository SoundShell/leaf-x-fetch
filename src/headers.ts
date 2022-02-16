import {DEFAULTS as defaults} from './defaults';
import {FetchOptions} from './fetch';

/**
 * Handle the request headers information.
 *
 * @param [headers={}] A Headers object, an object literal, or an array of two-item arrays to set request's headers.
 */
export const handleRequestHeaders = (headers: FetchOptions['headers'] = {}) => {
  const relHeaders = Array.isArray(headers)
    ? headers
        .map(([key, val]) => ({[key]: val}))
        .reduce((a, b) => ({...a, ...b}), {})
    : headers;

  return {
    'content-type': 'application/json; charset=utf-8',
    accept: '*/*',
    ...defaults.get('headers'),
    ...relHeaders,
  };
};
