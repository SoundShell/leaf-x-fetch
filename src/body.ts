import {HandleRequestBody} from './interface/body.interface';

export const handleRequestBody: HandleRequestBody = (data, body) => {
  if (data) {
    return typeof data === 'object' && data !== null
      ? JSON.stringify(data)
      : data;
  }

  return body;
};
