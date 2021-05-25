import {ContentTypeString} from '../enum/content_type.enum';
import {FetchOptions} from './fetch.interface';

/**
 * Options for the request response body.
 */
export interface ResponseOptions {
  /**
   * Request response headers.
   */
  headers: Record<string, string>;

  /**
   * Request response status code.
   */
  status: number;

  /**
   * Request response status text description.
   */
  statusText: string;

  /**
   * URL of the originating request.
   */
  url: string;
}

/**
 * Parse the response to a request for an application/json response body.
 *
 * @param response Response
 * @return Promise<Record<string, unknown>>;
 */
export interface ParseJson {
  (response: Response): Promise<Record<string, unknown>>;
}

/**
 * Parsing the response to a request with a text/plain response body.
 *
 * @param response Response
 * @return Promise<string>
 */
export interface ParseText {
  (response: Response): Promise<string>;
}

/**
 * Parse the response to a request for an application/octet-stream response
 * body.
 *
 * @param response Response
 * @return Promise<Record<string, unknown> | string>
 */
export interface ParseOctetStream {
  (response: Response): Promise<Record<string, unknown> | string>;
}

/**
 * Initialize the options for handle the request response body.
 *
 * @extends ResponseOptions
 */
export interface InitHandleResponseBodyOptions extends ResponseOptions {
  /**
   * Options for the Fetch API.
   */
  options: FetchOptions;
}

/**
 * Initialize the function that handle the request response body.
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
 * Handle the request response body.
 *
 * @param type ContentTypeString
 * @return HandleResponseResult
 */
export interface HandleResponseBody {
  (type: ContentTypeString): Promise<HandleResponseResult>;
}

/**
 * Handle response body method.
 */
export interface HandleResponseBodyMethod {
  /**
   * Parse the response to a request for an application/json response body.
   */
  readonly json: ParseJson;

  /**
   * Parse the response to a request for an text/plain response body.
   */
  readonly text: ParseText;

  /**
   * Parse the response to a request for an application/octet-stream response
   * body.
   */
  readonly octetStream: ParseOctetStream;
}

/**
 * The result of handle the request response.
 *
 * @extends ResponseOptions
 */
export interface HandleResponseResult extends ResponseOptions {
  /**
   * Data of the request response.
   */
  data: unknown;
}

/**
 * Initialize the functions that handle the request response.
 *
 * @param options FetchOptions
 * @return HandleResponse
 */
export interface InitHandleResponse {
  (options?: FetchOptions): HandleResponse;
}

/**
 * Handle request response.
 *
 * @param response Response
 * @return Promise<HandleResponseResult>
 */
export interface HandleResponse {
  (response: Response): Promise<HandleResponseResult>;
}
