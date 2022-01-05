import {FetchOptions} from './fetch';

/**
 * Enumerates the request response content data type.
 */
export enum ContentType {
  JSON = 'json',
  TEXT = 'text',
  OCTET_STREAM = 'octetStream',
}

/**
 * Request response content data type string.
 */
export type ContentTypeString = 'JSON' | 'TEXT' | 'OCTET_STREAM';

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
 * @return Promise<Record<string, unknown>>
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
   * Options for the Fetch.
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

const parseJson: ParseJson = response => response.json();
const parseText: ParseText = response => response.text();
const parseOctetStream: ParseOctetStream = response =>
  response.text().then(body => {
    let data!: Record<string, unknown> | string;

    try {
      data = JSON.parse(body);
    } catch (error) {
      data = body;
    }

    return data;
  });

const initHandleResponseBody: InitHandleResponseBody =
  (response, options) => async type => {
    const handleBodyMethod: HandleResponseBodyMethod = Object.freeze({
      json: parseJson,
      text: parseText,
      octetStream: parseOctetStream,
    });

    const data = await handleBodyMethod[ContentType[type]](response);
    const result = {...options, data};

    return response.ok ? result : Promise.reject(result);
  };

export const initHandleResponse: InitHandleResponse =
  (options = {}) =>
  response => {
    const {status, statusText, url} = response;
    const headers = {} as Record<string, string>;

    for (const key of response.headers.keys()) {
      Object.assign(headers, {[key]: response.headers.get(key)});
    }

    const contentType = headers['content-type'];
    const handleResponseBody = initHandleResponseBody(response, {
      status,
      statusText,
      headers,
      url,
      options,
    });

    if (contentType?.startsWith('application/json')) {
      return handleResponseBody('JSON');
    } else if (contentType?.startsWith('application/octet-stream')) {
      return handleResponseBody('OCTET_STREAM');
    } else if (contentType?.startsWith('text/html')) {
      return handleResponseBody('TEXT');
    } else if (contentType?.startsWith('text/plain')) {
      return handleResponseBody('TEXT');
    } else {
      return handleResponseBody('TEXT');
    }
  };
