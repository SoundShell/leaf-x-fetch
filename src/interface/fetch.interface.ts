import {HandleResponseResult} from './response.interface';

/**
 * Fetch options.
 *
 * @extends RequestInit
 */
export interface FetchOptions extends RequestInit {
  /**
   * Request timeout, in milliseconds.
   *
   * Default value:3000ms
   */
  timeout?: number;

  /**
   * Request query parameters.
   */
  params?: Record<string, unknown>;

  /**
   * Request data.
   */
  data?: RequestInit['body'] | Record<string, unknown>;
}

/**
 * Fetch API.
 *
 * @param url Request URL.
 * @param options FetchOptions
 * @return Promise<HandleResponseResult>
 */
export interface Fetch {
  (url: string, options?: FetchOptions): Promise<HandleResponseResult>;
}
