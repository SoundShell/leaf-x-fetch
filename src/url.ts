import {FetchOptions} from './fetch';

/**
 * Options for handling request URL functions.
 */
export interface HandleRequestUrlOptions {
  /**
   * Request URL.
   */
  url: string;

  /**
   * Fetch options.
   */
  params: FetchOptions['params'];
}

/**
 * Handle the request URL.
 *
 * @param options —  HandleRequestUrlOptions
 */
export const handleRequestUrl = ({url, params}: HandleRequestUrlOptions) => {
  const {searchParams, origin, pathname} = new URL(url);
  const requestUrl = `${origin}${pathname}`;
  const query = {};

  for (const key of searchParams.keys()) {
    Object.assign(query, {[key]: searchParams.get(key)});
  }

  const queryParams = {...query, ...params} as Record<string, unknown>;
  const paramsString = encodeURI(
    Object.keys(queryParams)
      .map(key => `${key}=${queryParams[key]}`)
      .join('&')
  );

  return paramsString ? `${requestUrl}?${paramsString}` : requestUrl;
};
