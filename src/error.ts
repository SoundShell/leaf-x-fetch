import {FetchOptions} from './fetch';

/**
 * Initialize the request error handle options.
 */
export interface InitHandleRequestErrorOptions extends FetchOptions {
  /**
   * Request URL.
   */
  url: string;
}

/**
 * Handle request errors.
 *
 * @param error Error.
 * @param options Initialize the request error handle options.
 */
const handleRequestError = (
  error: unknown,
  options: InitHandleRequestErrorOptions
) => {
  const relError = error as Record<string, unknown>;
  const isResponseError =
    relError.status && relError.statusText && relError.headers;

  if (relError.message === 'Aborted') {
    throw Object.assign(new Error('Request Timeout'), {status: 408});
  }

  if (isResponseError) {
    throw relError;
  }

  throw Object.assign(relError, {options});
};

/**
 * Initialize the handle request error.
 *
 * @param options Initialize the request error handle options.
 */
export const initHandleRequestError =
  (options: InitHandleRequestErrorOptions) => (error: unknown) =>
    handleRequestError(error, options);
