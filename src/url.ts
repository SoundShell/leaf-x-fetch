import {HandleUrl} from './interface/url.interface';

export const handleUrl: HandleUrl = ({url, params}) => {
  const {searchParams: query, origin, pathname} = new URL(url);
  const requestUrl = `${origin}${pathname}`;
  const searchParams = {};

  for (const key of query.keys()) {
    Object.assign(searchParams, {[key]: query.get(key)});
  }

  const queryParams = {...searchParams, ...params} as Record<string, unknown>;
  const paramsString = Object.keys(queryParams)
    .map(key => `${key}=${queryParams[key]}`)
    .join('&');

  return encodeURI(paramsString ? `${requestUrl}?${paramsString}` : requestUrl);
};
