import {FetchOptions} from './fetch';

/**
 * Handle request URL options.
 */
export interface HandleRequestUrlOptions {
  /**
   * Request query parameters.
   */
  params?: FetchOptions['params'];
}

/**
 * Handle the request URL.
 *
 * @param url Request URL.
 * @param options Handle request URL options.
 */
export const handleRequestUrl = (
  url: string,
  {params = {}}: HandleRequestUrlOptions
) => {
  const {searchParams, origin, pathname} = new URL(url);
  const requestUrl = `${origin}${pathname}`;
  const query = {} as Record<string, unknown>;

  for (const key of searchParams.keys()) {
    Object.assign(query, {[key]: searchParams.get(key)});
  }

  const queryParams = {...query, ...params};
  const paramsString = encodeURI(
    Object.keys(queryParams)
      .map(key => `${key}=${queryParams[key]}`)
      .join('&')
  );

  return paramsString ? `${requestUrl}?${paramsString}` : requestUrl;
};
