import { FetchOptions } from './fetch.interface'

/**
 * Parse the JSON.
 *
 * @param response Response
 * @return Promise<Record<string, unknown>>
 */
export interface ParseJSON {
  (response: Response): Promise<Record<string, unknown>>
}

/**
 * Parse the text.
 *
 * @param response Response
 * @return Promise<string>
 */
export interface ParseText {
  (response: Response): Promise<string>
}

/**
 * Parse the octet stream.
 *
 * @param response Response
 * @return Promise<Record<string, unknown> | string>
 */
export interface ParseOctetStream {
  (response: Response): Promise<Record<string, unknown> | string>
}

/**
 * Response options.
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
 * Handle the response result.
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
 * Initialization handle response.
 *
 * @param options FetchOptions
 * @return HandleResponse
 */
export interface InitHandleResponse {
  (options?: FetchOptions): HandleResponse
}

/**
 * Handle response.
 *
 * @param response Response
 * @return Promise<HandleResponseResult>
 */
export interface HandleResponse {
  (response: Response): Promise<HandleResponseResult>
}

/**
 * Initialization handle the body options.
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
 * Handle the body type.
 */
export type Type = 'JSON' | 'TEXT' | 'OCTET_STREAM'

/**
 * Handle body.
 *
 * @param type Type
 * @return Promise<HandleResponseResult>
 */
export interface HandleBody {
  (type?: Type): Promise<HandleResponseResult>
}

/**
 * Handle the body methods.
 */
export interface HandleBodyMethod {
  /**
   * Parse the JSON.
   */
  readonly json: ParseJSON

  /**
   * Parse the text.
   */
  readonly text: ParseText

  /**
   * Parse the octet stream.
   */
  readonly octetStream: ParseOctetStream
}

/**
 * Initialization handle body.
 *
 * @param options   InitHandleBodyOptions
 * @param response  Response
 * @return HandleBody
 */
export interface InitHandleBody {
  (options: InitHandleBodyOptions, response: Response): HandleBody
}
