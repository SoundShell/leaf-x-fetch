import {FetchOptions} from './fetch';

/**
 * Initialize the error handling request.
 *
 * @param options FetchOptions
 * @return (error: Record<string, unknown>) => never
 */
export interface InitHandleRequestError {
  (options: FetchOptions): (error: Record<string, unknown>) => never;
}

/**
 * Handle request errors.
 *
 * @param error  Request error.
 * @param options  FetchOptions
 * @return never
 */
export interface HandleRequestError {
  (error: Record<string, unknown>, options: FetchOptions): never;
}

export const initHandleRequestError: InitHandleRequestError =
  options => error =>
    handleRequestError(error, options);

export const handleRequestError: HandleRequestError = (error, options) => {
  const isResponseError = error.status && error.statusText && error.headers;

  if (isResponseError) {
    throw error;
  }

  throw Object.assign(new Error('Invalid request.'), {
    data: {message: error.message},
    options,
  });
};
