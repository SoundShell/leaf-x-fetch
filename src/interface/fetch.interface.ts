import { ParseDataResult } from './parseResponse.interface'

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
  (url: string, options?: FetchOptions): Promise<ParseDataResult | never>
}
