import { FetchOptions } from './fetch.interface'

/**
 * Parse JSON.
 *
 * @param response Response
 * @return Promise<Record<string, unknown>>
 */
export interface ParseJSON {
  (response: Response): Promise<Record<string, unknown>>
}

/**
 * Parse text.
 *
 * @param response Response
 * @return Promise<string>
 */
export interface ParseText {
  (response: Response): Promise<string>
}

/**
 * Parse octet stream.
 *
 * @param response Response
 * @return Promise<Record<string, unknown> | string>
 */
export interface ParseOctetStream {
  (response: Response): Promise<Record<string, unknown> | string>
}

/**
 * Request response options.
 */
export interface ResponseOptions {
  /**
   * Response headers.
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
   * Request URL address.
   */
  url: string
}

/**
 * Handle the request response results.
 *
 * @extends ResponseOptions
 */
export interface HandleResponseResult extends ResponseOptions {
  /**
   * Response data.
   */
  data: unknown
}

/**
 * Initialize the handle request response.
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
 * @return Promise<HandleResponseResult>
 */
export interface HandleResponse {
  (response: Response): Promise<HandleResponseResult>
}

/**
 * Initialize the handle request response body options.
 *
 * @extends ResponseOptions
 */
export interface InitHandleBodyOptions extends ResponseOptions {
  /**
   * Fetch options.
   */
  options: FetchOptions
}

/**
 * Handle the request response body type.
 */
export type Type = 'JSON' | 'TEXT' | 'OCTET_STREAM'

/**
 * Handle the request response body.
 *
 * @param type Type
 * @return Promise<HandleResponseResult>
 */
export interface HandleBody {
  (type?: Type): Promise<HandleResponseResult>
}

/**
 * Handle the request response body method.
 */
export interface HandleBodyMethod {
  /**
   * Parse JSON.
   */
  readonly json: ParseJSON

  /**
   * Parse text.
   */
  readonly text: ParseText

  /**
   * Parse octet stream.
   */
  readonly octetStream: ParseOctetStream
}

/**
 * Initialize the handle request response body.
 *
 * @param options   InitHandleBodyOptions
 * @param response  Response
 * @return HandleBody
 */
export interface InitHandleBody {
  (options: InitHandleBodyOptions, response: Response): HandleBody
}
