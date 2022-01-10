import {DEFAULTS as defaults} from './defaults';
import {FetchOptions} from './fetch';

/**
 * Handle the request header information.
 *
 * @param [headers={}] Request header information.
 */
export const handleRequestHeaders = (
  headers: FetchOptions['headers'] = {}
) => ({
  'content-type': 'application/json; charset=utf-8',
  accept: '*/*',
  ...defaults.get('headers'),
  ...headers,
});
