import * as assert from 'assert';
import {initHandleRequestError} from '../src/error';

describe('test/error.test.ts', () => {
  it('should be handle local request errors', async () => {
    try {
      const handleRequestError = initHandleRequestError({
        data: 'eC10b2tlbg==',
        url: 'https://leaf-x.com',
      });

      handleRequestError(
        new Error('Link failed, please check your local network.')
      );
    } catch (error) {
      assert(
        (error as Record<string, unknown>).message ===
          'Link failed, please check your local network.'
      );
    }
  });

  it('should be handle request response errors', async () => {
    try {
      const handleRequestError = initHandleRequestError({
        data: 'eC10b2tlbg==',
        url: 'https://leaf-x.com',
      });

      handleRequestError({
        status: 400,
        statusText: 'Parameter error',
        headers: {},
      });
    } catch (error) {
      assert((error as Record<string, unknown>).status === 400);
    }
  });
});
