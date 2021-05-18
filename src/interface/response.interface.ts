import {ContentTypeString} from '../enum/content_type.enum';
import {FetchOptions} from './fetch.interface';

/**
 * Request response options.
 */
export interface ResponseOptions {
  /**
   * Response headers.
   */
  headers: Record<string, string>;

  /**
   * Response status code.
   */
  status: number;

  /**
   * Response status text.
   */
  statusText: string;

  /**
   * Response URL.
   */
  url: string;
}

/**
 * Parse JSON.
 *
 * @param response Response
 * @return Promise<Record<string, unknown>>;
 */
export interface ParseJson {
  (response: Response): Promise<Record<string, unknown>>;
}

/**
 * Parse text.
 *
 * @param response Response
 * @return Promise<string>
 */
export interface ParseText {
  (response: Response): Promise<string>;
}

/**
 * Parse octet stream.
 *
 * @param response Response
 * @return Promise<Record<string, unknown> | string>
 */
export interface ParseOctetStream {
  (response: Response): Promise<Record<string, unknown> | string>;
}

/**
 * Initialize the handle response body options.
 *
 * @extends ResponseOptions
 */
export interface InitHandleResponseBodyOptions extends ResponseOptions {
  /**
   * Fetch options.
   */
  options: FetchOptions;
}

/**
 * Initialize the handle response body.
 *
 * @param response Response
 * @param options InitHandleResponseBodyOptions
 * @return HandleResponseBody
 */
export interface InitHandleResponseBody {
  (
    response: Response,
    options: InitHandleResponseBodyOptions
  ): HandleResponseBody;
}

/**
 * Handle the response body.
 *
 * @param type ContentTypeString
 * @return HandleResponseResult
 */
export interface HandleResponseBody {
  (type: ContentTypeString): Promise<HandleResponseResult>;
}

/**
 * Handle response body methods.
 */
export interface HandleResponseBodyMethod {
  /**
   * Parse JSON.
   */
  json: ParseJson;

  /**
   * Parse text.
   */
  text: ParseText;

  /**
   * Parse octet stream.
   */
  octetStream: ParseOctetStream;
}

/**
 * Handle the request response result.
 *
 * @extends ResponseOptions
 */
export interface HandleResponseResult extends ResponseOptions {
  /**
   * Response data.
   */
  data: unknown;
}

/**
 * Initialize the handle response.
 *
 * @param options FetchOptions
 * @return HandleResponse
 */
export interface InitHandleResponse {
  (options?: FetchOptions): HandleResponse;
}

/**
 * Handle response.
 *
 * @param response Response
 * @return Promise<HandleResponseResult>
 */
export interface HandleResponse {
  (response: Response): Promise<HandleResponseResult>;
}
