/**
 * Options for handle request URLs.
 */
export interface HandleRequestUrlOptions {
  /**
   * URL of the request.
   */
  url: string;

  /**
   * Set the request query parameters, these parameters will be automatically
   * merged with the request URL query characters. If the query parameters and
   * the query string have the same parameters, the query parameters will
   * override the query string.
   */
  params: Record<string, unknown>;
}

/**
 * Handle the request URL.
 *
 * @param options HandleRequestUrlOptions
 * @return string
 */
export interface HandleRequestUrl {
  (options: HandleRequestUrlOptions): string;
}
