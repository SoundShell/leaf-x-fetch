import {FetchOptions} from './fetch';

/**
 * Options for handle request URLs.
 */
export interface HandleRequestUrlOptions {
  /**
   * URL of the request.
   */
  url: string;

  /**
   * FetchOptions['params']
   */
  params: FetchOptions['params'];
}

/**
 * Handle the request URL.
 *
 * @param options HandleRequestUrlOptions
 * @return string
 */
export interface HandleRequestUrl {
  (options: HandleRequestUrlOptions): string;
}

export const handleRequestUrl: HandleRequestUrl = ({url, params}) => {
  const {searchParams, origin, pathname} = new URL(url);
  const requestUrl = `${origin}${pathname}`;
  const query = {};

  for (const key of searchParams.keys()) {
    Object.assign(query, {[key]: searchParams.get(key)});
  }

  const queryParams = {...query, ...params} as Record<string, unknown>;
  const paramsString = Object.keys(queryParams)
    .map(key => `${key}=${queryParams[key]}`)
    .join('&');

  return encodeURI(paramsString ? `${requestUrl}?${paramsString}` : requestUrl);
};
