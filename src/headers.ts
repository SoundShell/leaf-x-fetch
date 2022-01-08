/**
 * Handle the request headers information.
 *
 * @param headers Request headers information.
 */
export const handleRequestHeaders = (headers: HeadersInit) => ({
  'content-type': 'application/json; charset=utf-8',
  accept: '*/*',
  ...headers,
});
