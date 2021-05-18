import {HandleRequestBody} from './interface/body.interface';

export const handleRequestBody: HandleRequestBody = (data, body) =>
  data
    ? typeof data === 'object' && data !== null
      ? JSON.stringify(data)
      : data
    : body;
