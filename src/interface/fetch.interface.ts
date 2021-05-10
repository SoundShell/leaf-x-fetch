import {HandleResponseResult} from './response.interface';

/**
 * Fetch options.
 *
 * @extends RequestInit
 */
export interface FetchOptions extends RequestInit {
  /**
   * The request timeout time in milliseconds.
   *
   * Default 3000ms
   */
  timeout?: number;

  /**
   * Query parameters.
   */
  params?: Record<string, unknown>;
}

/**
 * Fetch API.
 *
 * @param url       Request URL address.
 * @param options   FetchOptions
 * @return Promise<HandleResponseResult>
 */
export interface Fetch {
  (url: string, options?: FetchOptions): Promise<HandleResponseResult>;
}
