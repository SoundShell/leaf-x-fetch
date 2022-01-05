/**
 * Handle request headers.
 *
 * @param headers HeadersInit
 * @return HeadersInit
 */
export interface HandleRequestHeaders {
  (headers: HeadersInit): HeadersInit;
}

export const handleRequestHeaders: HandleRequestHeaders = headers => ({
  'content-type': 'application/json; charset=utf-8',
  accept: '*/*',
  ...headers,
});
