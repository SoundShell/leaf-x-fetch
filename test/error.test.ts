import * as assert from 'assert';
import {initHandleRequestError} from '../src/error';

describe('test/error.test.ts', () => {
  it('should request a code error', async () => {
    try {
      const handleRequestError = initHandleRequestError({data: 'eC10b2tlbg=='});

      handleRequestError({
        message: 'Link failed, please check your local network.',
      });
    } catch (error) {
      assert(
        (error as Record<string, Record<string, unknown>>).data.message ===
          'Link failed, please check your local network.'
      );
    }
  });

  it('should be a request response error', async () => {
    try {
      const handleRequestError = initHandleRequestError({data: 'eC10b2tlbg=='});

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
