import {fetch as relFetch} from './fetch';
export * from './interface/fetch.interface';
export * from './interface/response.interface';
export * from './interface/url.interface';
export * from './url';
export {fetch};

const fetch = relFetch;
