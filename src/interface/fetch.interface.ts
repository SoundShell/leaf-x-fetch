import { HandleResponseResult } from './response.interface'

/**
 * Initialize the fetch options.
 */
export interface FetchOptions extends RequestInit {
  /**
   * The request timeout time in milliseconds.
   */
  timeout?: number
}

/**
 * Fetch API.
 *
 * @param url       Request URL address.
 * @param options   Initialize the fetch options.
 */
export interface Fetch {
  (url: string, options?: FetchOptions): Promise<HandleResponseResult | never>
}
