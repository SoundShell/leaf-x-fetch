import {FetchOptions} from './fetch.interface';

/**
 * Handle request body.
 *
 * @param data FetchOptions['data']
 * @param body FetchOptions['body']
 * @return FetchOptions['body']
 */
export interface HandleRequestBody {
  (
    data: FetchOptions['data'],
    body: FetchOptions['body']
  ): FetchOptions['body'];
}
