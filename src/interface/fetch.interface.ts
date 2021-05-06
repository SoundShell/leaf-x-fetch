import { HandleResponseResult } from './response.interface'

/**
 * Fetch options.
 *
 * @extends RequestInit
 */
export interface FetchOptions extends RequestInit {
  /**
   * Request timeout, unit milliseconds.
   *
   * Default 3000ms
   */
  timeout?: number
}

/**
 * Fetch API.
 *
 * @param url       Request the URL address.
 * @param options   FetchOptions
 * @return Promise<HandleResponseResult>
 */
export interface Fetch {
  (url: string, options?: FetchOptions): Promise<HandleResponseResult>
}
