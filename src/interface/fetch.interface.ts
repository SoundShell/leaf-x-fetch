import {HandleResponseResult} from './response.interface';

/**
 * Options for the Fetch API.
 *
 * @extends RequestInit
 */
export interface FetchOptions extends RequestInit {
  /**
   * Set the request timeout in milliseconds. The default timeout is 3000
   * milliseconds.
   */
  timeout?: number;

  /**
   * Set the request query parameters, these parameters will be automatically
   * merged with the request URL query characters. If the query parameters and
   * the query string have the same parameters, the query parameters will
   * override the query string.
   */
  params?: Record<string, unknown>;

  /**
   * A BodyInit object or null to set request's body.
   */
  data?: RequestInit['body'] | Record<string, unknown>;
}

/**
 * Fetch API.
 *
 * @param url URL of the request.
 * @param options FetchOptions
 * @return Promise<HandleResponseResult | never>
 */
export interface Fetch {
  (url: string, options?: FetchOptions): Promise<HandleResponseResult | never>;
}
