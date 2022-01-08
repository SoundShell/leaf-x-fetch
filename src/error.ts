import {FetchOptions} from './fetch';

/**
 * Handle request errors.
 *
 * @param error Error.
 * @param options Fetch options.
 */
const handleRequestError = (error: unknown, options: FetchOptions) => {
  const relError = error as Record<string, unknown>;
  const isResponseError =
    relError.status && relError.statusText && relError.headers;

  if (isResponseError) {
    throw relError;
  }

  throw Object.assign(new Error('Invalid request.'), {
    data: {message: relError.message},
    options,
  });
};

/**
 * Initialize the request error handle function.
 *
 * @param options Fetch options.
 */
export const initHandleRequestError =
  (options: FetchOptions) => (error: unknown) =>
    handleRequestError(error, options);
