/**
 * Handle request URL options.
 */
export interface HandleRequestUrlOptions {
  /**
   * Request URL.
   */
  url: string;

  /**
   * Request query parameters.
   */
  params: Record<string, unknown>;
}

/**
 * Handle request URL.
 *
 * @param options HandleRequestUrlOptions
 * @return string
 */
export interface HandleRequestUrl {
  (options: HandleRequestUrlOptions): string;
}
