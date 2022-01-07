/**
 * Handle request header information.
 *
 * @param headers — HeadersInit
 */
export const handleRequestHeaders = (headers: HeadersInit) => ({
  'content-type': 'application/json; charset=utf-8',
  accept: '*/*',
  ...headers,
});
