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
 * Parse the response results.
 */
export interface ParseResponseResult {
  /**
   * Response data.
   */
  data: unknown

  /**
   * This Fetch API interface allows you to perform various actions on HTTP
   * request and response headers. These actions include retrieving, setting,
   * adding to, and removing. A Headers object has an associated header list,
   * which is initially empty and consists of zero or more name and value pairs.
   * You can add to this using methods like append() (see Examples.) In all
   * methods of this interface, header names are matched by case-insensitive
   * byte sequence.
   */
  headers: Headers

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
 * Parse the response.
 */
export interface ParsResponse {
  (options?: FetchOptions): (response: Response) => Promise<ParseResponseResult>
}
