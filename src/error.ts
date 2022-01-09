import {FetchOptions} from './fetch';

/**
 * Initialize the options for the request error handle function.
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
 * @param options Fetch options.
 */
const handleRequestError = (
  error: unknown,
  options: InitHandleRequestErrorOptions
) => {
  const relError = error as Record<string, unknown>;
  const isResponseError =
    relError.status && relError.statusText && relError.headers;

  if (isResponseError) {
    throw relError;
  }

  throw Object.assign(relError, {options});
};

/**
 * Initialize the request error handle function.
 *
 * @param options Fetch options.
 */
export const initHandleRequestError =
  (options: InitHandleRequestErrorOptions) => (error: unknown) =>
    handleRequestError(error, options);
