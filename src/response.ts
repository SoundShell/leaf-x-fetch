import {FetchOptions} from './fetch';

/**
 * Request content type.
 */
export enum ContentType {
  JSON = 'json',
  TEXT = 'text',
  OCTET_STREAM = 'octetStream',
  FILE = 'file',
}

/**
 * Request content type string.
 */
export type ContentTypeString = 'JSON' | 'TEXT' | 'OCTET_STREAM' | 'FILE';

/**
 * Request response options.
 */
export interface ResponseOptions {
  /**
   * Request headers information.
   */
  headers: Record<string, string>;

  /**
   * Request response status code.
   */
  status: number;

  /**
   * Request response status code description text.
   */
  statusText: string;

  /**
   * Request URL.
   */
  url: string;
}

/**
 * Initialize the handle request response options.
 */
export interface InitHandleResponseOptions extends FetchOptions {
  /**
   * Request URL.
   */
  url: string;

  /**
   * Request headers.
   */
  headers?: Record<string, string>;
}

/**
 * Initialize the handle request response body options.
 */
export interface InitHandleResponseBodyOptions extends ResponseOptions {
  /**
   * Fetch API options
   */
  options: FetchOptions & {
    /**
     * Request URL.
     */
    url: string;
  };
}

/**
 * Parse JSON data for request response.
 *
 * @param response This Fetch API interface represents the response to a request.
 */
const parseJson = (response: Response) => response.json();

/**
 * Parse the text data of the request response.
 *
 * @param response This Fetch API interface represents the response to a request.
 */
const parseText = (response: Response) => response.text();

/**
 * Parse request file stream data response.
 *
 * @param response This Fetch API interface represents the response to a request.
 */
const parseFile = (response: Response) => response.blob();

/**
 * Parse the octet stream data of the request response.
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
 * Handle the request response body.
 *
 * @param type Request content type string.
 * @param response This Fetch API interface represents the response to a request.
 * @param options Initialize the processing response body options.
 */
const handleResponseBody = async (
  type: ContentTypeString,
  response: Response,
  options: InitHandleResponseBodyOptions
) => {
  const handleBody = {
    json: parseJson,
    text: parseText,
    octetStream: parseOctetStream,
    file: parseFile,
  };

  const data = await handleBody[ContentType[type]](response);
  const result = {...options, data};

  return response.ok ? result : Promise.reject(result);
};

/**
 * Initialize the handle request response body.
 *
 * @param response This Fetch API interface represents the response to a request.
 * @param options Initialize the processing response body options.
 */
const initHandleResponseBody =
  (response: Response, options: InitHandleResponseBodyOptions) =>
  async (type: ContentTypeString) =>
    handleResponseBody(type, response, options);

/**
 * Handle the request response.
 *
 * @param response This Fetch API interface represents the response to a request.
 * @param options Initialize the handle request response options.
 */
const handleResponse = (
  response: Response,
  options: InitHandleResponseOptions
) => {
  const {status, statusText, url} = response;
  const headers = {} as Record<string, string>;

  for (const key of response.headers.keys()) {
    Object.assign(headers, {[key]: response.headers.get(key)});
  }

  const contentType = headers['content-type'];
  const responseBody = initHandleResponseBody(response, {
    status,
    statusText,
    headers,
    url,
    options,
  });

  if (contentType?.startsWith('application/json')) {
    return responseBody('JSON');
  } else if (contentType?.startsWith('application/octet-stream')) {
    return responseBody('OCTET_STREAM');
  } else if (contentType?.startsWith('text/html')) {
    return responseBody('TEXT');
  } else if (contentType?.startsWith('text/plain')) {
    return responseBody('TEXT');
  } else if (contentType?.startsWith('application/vnd.ms-excel')) {
    return responseBody('FILE');
  } else {
    return responseBody('TEXT');
  }
};

/**
 * Initialize the handle request response.
 *
 * @param options Initialize the handle request response options.
 */
export const initHandleResponse =
  (options: InitHandleResponseOptions) => (response: Response) =>
    handleResponse(response, options);
