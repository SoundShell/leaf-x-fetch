import { ProcessResponseResult } from './response.interface'

/**
 * Initialize the fetch options.
 *
 * @extends RequestInit
 */
export interface FetchOptions extends RequestInit {
  /**
   * The request timeout period, in milliseconds.
   *
   * Default: 3000ms
   */
  timeout?: number
}

/**
 * Fetch API.
 *
 * @param url       Request URL address.
 * @param options   FetchOptions
 * @return Promise<HandleResponseResult>
 */
export interface Fetch {
  (url: string, options?: FetchOptions): Promise<ProcessResponseResult>
}
