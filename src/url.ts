import {HandleRequestUrl} from './interface/url.interface';

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
