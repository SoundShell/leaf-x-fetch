import {FetchOptions} from './fetch';

/**
 * Initialize the request error function.
 *
 * @param options — FetchOptions
 */
export const initHandleRequestError =
  (options: FetchOptions) => (error: unknown) =>
    handleRequestError(error, options);

/**
 * Handle request errors.
 *
 * @param error — unknown
 * @param options — FetchOptions
 */
export const handleRequestError = (error: unknown, options: FetchOptions) => {
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
