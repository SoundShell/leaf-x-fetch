/**
 * Handle request headers.
 *
 * @param headers HeadersInit
 * @return HeadersInit
 */
export interface HandleRequestHeaders {
  (headers: HeadersInit): HeadersInit;
}
