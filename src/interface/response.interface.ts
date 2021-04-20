import { FetchOptions } from './fetch.interface'

/**
 * Parsed to JSON.
 *
 * @param response Response
 * @return Promise<Record<string, unknown>>
 */
export interface ParseJson {
  (response: Response): Promise<Record<string, unknown>>
}

/**
 * Parse to text.
 *
 * @param response Response
 * @return Promise<string>
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
   * Request response status.
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
 * @param options FetchOptions
 * @return HandleResponse
 */
export interface InitHandleResponse {
  (options?: FetchOptions): HandleResponse
}

/**
 * Handle the request response.
 *
 * @param response Response
 * @return HandleResponseResult
 */
export interface HandleResponse {
  (response: Response): Promise<HandleResponseResult>
}
