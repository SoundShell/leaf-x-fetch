import {DEFAULTS as defaults} from './defaults';
import {FetchOptions} from './fetch';

/**
 * Handle request URL options.
 */
export interface HandleRequestUrlOptions {
  /**
   * Request query params.
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
  const handleFullUrl = () => {
    let fullUrl!: URL;

    try {
      fullUrl = new URL(url);
    } catch (error) {
      fullUrl = new URL(`${defaults.get('baseUrl')}${url}`);
    }

    return fullUrl;
  };

  const {searchParams, origin, pathname} = handleFullUrl();
  const requestUrl = `${origin}${pathname !== '/' ? pathname : ''}`;
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
