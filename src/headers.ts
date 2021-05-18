import {HandleRequestHeaders} from './interface/headers.interface';

export const handleRequestHeaders: HandleRequestHeaders = headers => ({
  'content-type': 'application/json; charset=utf-8',
  accept: '*/*',
  ...headers,
});
