import { HandleResponseResult } from './response.interface'

/**
 *  Fetch options.
 */
export interface FetchOptions extends RequestInit {
  /**
   * Timeout time.
   */
  timeout?: number
}

/**
 * Fetch API.
 */
export interface Fetch {
  (url: string, options?: FetchOptions): Promise<HandleResponseResult | never>
}
