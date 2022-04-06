import {DEFAULTS as defaults} from './defaults';
import {FetchOptions} from './fetch';

/**
 * Handle the request headers information.
 *
 * @param [headers={}] A Headers object, an object literal, or an array of two-item arrays to set request's headers.
 */
export const handleRequestHeaders = (
  headers: FetchOptions['headers'] = {}
): Record<string, string> => {
  const relHeaders = Array.isArray(headers)
    ? headers
        .map(([key, val]) => ({[key]: val}))
        .reduce((a, b) => ({...a, ...b}), {})
    : headers;

  const result = {
    'content-type': 'application/json; charset=utf-8',
    accept: '*/*',
    ...defaults.get('headers'),
    ...relHeaders,
  };

  if (result['content-type'].startsWith('multipart/form-data')) {
    delete result['content-type'];
  }

  return result;
};
