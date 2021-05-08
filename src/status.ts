import {CheckStatus} from './interface/status.interface';

export const checkStatus: CheckStatus = response => {
  if (response.ok) {
    return response;
  } else {
    const error = new Error(response.statusText);

    throw Object.assign(error, {response});
  }
};
