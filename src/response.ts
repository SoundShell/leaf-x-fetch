import {FetchOptions} from './fetch';

/**
 * Request content type enumeration.
 */
export enum ContentType {
  JSON = 'json',
  TEXT = 'text',
  OCTET_STREAM = 'octetStream',
}

/**
 * Request content type string.
 */
export type ContentTypeString = 'JSON' | 'TEXT' | 'OCTET_STREAM';

/**
 * Request response options.
 */
export interface ResponseOptions {
  /**
   * Response headers information.
   */
  headers: Record<string, string>;

  /**
   * Request response status code.
   */
  status: number;

  /**
   * Request response status code text description.
   */
  statusText: string;

  /**
   * Request URL.
   */
  url: string;
}

/**
 * Initialize the options for handle response body functions.
 */
export interface InitHandleResponseBodyOptions extends ResponseOptions {
  /**
   * Fetch options.
   */
  options: FetchOptions;
}

/**
 * Parsing JSON data.
 *
 * @param response This Fetch API interface represents the response to a request.
 */
const parseJson = (response: Response) => response.json();

/**
 * Parsing text data.
 *
 * @param response This Fetch API interface represents the response to a request.
 */
const parseText = (response: Response) => response.text();

/**
 * Parsing octal stream data.
 *
 * @param response This Fetch API interface represents the response to a request.
 */
const parseOctetStream = (response: Response) =>
  response.text().then(body => {
    let data!: Record<string, unknown> | string;

    try {
      data = JSON.parse(body);
    } catch (error) {
      data = body;
    }

    return data;
  });

/**
 * Handling the response body.
 *
 * @param type Request content type string.
 * @param response This Fetch API interface represents the response to a request.
 * @param options Initialize the options for handle response body functions.
 */
const handleResponseBody = async (
  type: ContentTypeString,
  response: Response,
  options: InitHandleResponseBodyOptions
) => {
  const handleBodyMethod = Object.freeze({
    json: parseJson,
    text: parseText,
    octetStream: parseOctetStream,
  });

  const data = await handleBodyMethod[ContentType[type]](response);
  const result = {...options, data};

  return response.ok ? result : Promise.reject(result);
};

/**
 * Initialize the function that handle the response body.
 *
 * @param response This Fetch API interface represents the response to a request.
 * @param options Initialize the options for handle response body functions.
 */
const initHandleResponseBody =
  (response: Response, options: InitHandleResponseBodyOptions) =>
  async (type: ContentTypeString) =>
    handleResponseBody(type, response, options);

/**
 * Handle responses.
 *
 * @param response This Fetch API interface represents the response to a request.
 * @param options Fetch options.
 */
const handleResponse = (response: Response, options: FetchOptions) => {
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

/**
 * Initialize the handle response function.
 *
 * @param [options={}] Fetch options.
 */
export const initHandleResponse =
  (options: FetchOptions = {}) =>
  (response: Response) =>
    handleResponse(response, options);
