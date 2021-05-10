/**
 * Handle URL options.
 */
export interface HandleUrlOptions {
  /**
   * Request URL address.
   */
  url: string;

  /**
   * Query parameters.
   */
  params: Record<string, unknown>;
}

/**
 * Handle URL.
 *
 * @param options HandleUrlOptions
 * @return string
 */
export interface HandleUrl {
  (options: HandleUrlOptions): string;
}
