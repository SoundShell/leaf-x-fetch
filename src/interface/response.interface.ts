import { FetchOptions } from './fetch.interface'

/**
 * Parse to JSON.
 */
export interface ParseJson {
  (response: Response): Promise<Record<string, unknown>>
}

/**
 * Parse to text.
 */
export interface ParseText {
  (response: Response): Promise<string>
}

/**
 * Handle the response results.
 */
export interface HandleResponseResult {
  /**
   * Response data.
   */
  data: unknown

  /**
   * Response headers.
   */
  headers: Record<string, unknown>

  /**
   * Response status.
   */
  status: number

  /**
   * Response status text.
   */
  statusText: string

  /**
   * Request URL address.
   */
  url: string
}

/**
 * Handle the response.
 */
export interface HandleResponse {
  (options?: FetchOptions): (
    response: Response
  ) => Promise<HandleResponseResult>
}
