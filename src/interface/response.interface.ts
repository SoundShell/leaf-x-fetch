import { FetchOptions } from './fetch.interface'

/**
 * Parse JSON data.
 *
 * @param response Response
 * @return Promise<Record<string, unknown>>
 */
export interface ParseJson {
  (response: Response): Promise<Record<string, unknown>>
}

/**
 * Parse text data.
 *
 * @param response Response
 * @return Promise<string>
 */
export interface ParseText {
  (response: Response): Promise<string>
}

/**
 * Process the response result.
 */
export interface ProcessResponseResult {
  /**
   * Response data.
   */
  data: unknown

  /**
   * Respond headers.
   */
  headers: Record<string, unknown>

  /**
   * Response status code.
   */
  status: number

  /**
   * Response status text.
   */
  statusText: string

  /**
   * Request the URL address.
   */
  url: string
}

/**
 * Initialization process response.
 *
 * @param options FetchOptions
 * @return ProcessResponse
 */
export interface InitProcessResponse {
  (options?: FetchOptions): ProcessResponse
}

/**
 * Processing response.
 *
 * @param response Response
 * @return ProcessResponseResult
 */
export interface ProcessResponse {
  (response: Response): Promise<ProcessResponseResult>
}
