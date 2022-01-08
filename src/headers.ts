/**
 * Handle the request headers information.
 *
 * @param headers Request headers information.
 */
export const handleRequestHeaders = (headers: Record<string, string>) => ({
  'content-type': 'application/json; charset=utf-8',
  accept: '*/*',
  ...headers,
});
