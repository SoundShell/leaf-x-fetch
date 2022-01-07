import {FetchOptions} from './fetch';

/**
 * Enumeration of request content type words.
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
   * Request response header information.
   */
  headers: Record<string, string>;

  /**
   * Request response status.
   */
  status: number;

  /**
   * Text description of the request response status.
   */
  statusText: string;

  /**
   * Request URL.
   */
  url: string;
}

/**
 * Initialize the function options for handling the response body.
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
 * Parsing JSON data response.
 *
 * @param response —  Response
 */
const parseJson = (response: Response) => response.json();

/**
 * Parsing text data responses.
 *
 * @param response —  Response
 */
const parseText = (response: Response) => response.text();

/**
 * Parsing octal stream data response.
 *
 * @param response — Response
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
 * Initialize the request response body function.
 *
 * @param response — Response
 * @param options — InitHandleResponseBodyOptions
 */
const initHandleResponseBody =
  (response: Response, options: InitHandleResponseBodyOptions) =>
  async (type: ContentTypeString) => {
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
 * Initialize the request response function.
 *
 * @param options — FetchOptions
 */
export const initHandleResponse =
  (options: FetchOptions = {}) =>
  (response: Response) => {
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
