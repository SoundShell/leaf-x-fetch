/**
 * Handle request headers.
 *
 * @param headers HeadersInit
 */
export interface HandleRequestHeaders {
  (headers: HeadersInit): HeadersInit;
}
