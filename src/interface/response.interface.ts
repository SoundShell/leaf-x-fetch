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
 * Parse octet stream data.
 *
 * @param response Response
 * @return Promise<Record<string, unknown> | string>
 */
export interface ParseOctetStream {
  (response: Response): Promise<Record<string, unknown> | string>
}

/**
 * Response options
 */
export interface ResponseOptions {
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
 * Process the response result.
 *
 * @extends ResponseOptions
 */
export interface ProcessResponseResult extends ResponseOptions {
  /**
   * Response data.
   */
  data: unknown
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
 * @return Promise<ProcessResponseResult>
 */
export interface ProcessResponse {
  (response: Response): Promise<ProcessResponseResult>
}

/**
 * Initialize processing body options.
 *
 * @extends ResponseOptions
 */
export interface InitProcessBodyOptions extends ResponseOptions {
  options: FetchOptions
}

/**
 * Process the body type.
 */
export type Type = 'JSON' | 'TEXT' | 'OCTET_STREAM'

/**
 * Process body.
 *
 * @param type Type
 * @return Promise<ProcessResponseResult>
 */
export interface ProcessBody {
  (type?: Type): Promise<ProcessResponseResult>
}

/**
 * Processing body method.
 */
export interface ProcessingBodyMethod {
  readonly json: ParseJson
  readonly text: ParseText
  readonly octetStream: ParseOctetStream
}

/**
 * Initialization processing body.
 *
 * @param options InitProcessBodyOptions
 * @param response Response
 * @return ProcessBody
 */
export interface InitProcessBody {
  (options: InitProcessBodyOptions, response: Response): ProcessBody
}
