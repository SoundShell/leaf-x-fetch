import { FetchOptions } from './fetch.interface'

/**
 * Parsed to JSON.
 *
 * @param Response This Fetch API interface represents the response to a request.
 */
export interface ParseJson {
  (response: Response): Promise<Record<string, unknown>>
}

/**
 * Parse to text.
 *
 * @param Response This Fetch API interface represents the response to a request.
 */
export interface ParseText {
  (response: Response): Promise<string>
}

/**
 * Handle the request response results.
 */
export interface HandleResponseResult {
  /**
   * Request response data.
   */
  data: unknown

  /**
   * Request response headers.
   */
  headers: Record<string, unknown>

  /**
   * Request response status..
   */
  status: number

  /**
   * Request response status text.
   */
  statusText: string

  /**
   * Request URL address.
   */
  url: string
}

/**
 * Initialize the handling request response.
 *
 * @param options Initialize the fetch options.
 */
export interface InitHandleResponse {
  (options?: FetchOptions): HandleResponse
}

/**
 * Handles the request response.
 *
 * @param This Fetch API interface represents the response to a request.
 */
export interface HandleResponse {
  (response: Response): Promise<HandleResponseResult>
}
