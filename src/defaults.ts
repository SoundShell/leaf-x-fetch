import {FetchOptions} from '.';

/**
 * Handle default options.
 */
export interface HandleDefaultsOptions {
  /**
   * Request base URL.
   *
   * BaseURL` will be automatically prepended to `url`, unless `url` is an
   * absolute URL.
   */
  baseUrl?: string;

  /**
   * Request header information.
   */
  headers?: FetchOptions['headers'];

  /**
   * Request timeout time.
   */
  timeout?: FetchOptions['timeout'];
}

/**
 * Default value container.
 *
 * @param options Handle default options.
 */
export const DEFAULTS = new Map();

/**
 * Handle default values.
 *
 * @param options Handle default options.
 */
export const handleDefaults = (options: HandleDefaultsOptions) =>
  Object.keys(options).forEach(key =>
    DEFAULTS.set(key, options[key as keyof HandleDefaultsOptions])
  );
