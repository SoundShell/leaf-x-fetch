import * as assert from 'assert';
import {initHandleRequestError} from '../src/error';

describe('test/error.test.ts', () => {
  it('should be a request code error', async () => {
    try {
      initHandleRequestError({data: 'eC10b2tlbg=='})({
        message: 'Link failed, please check your local network.',
      });
    } catch (error) {
      assert(
        (error as Record<string, Record<string, unknown>>).data.message ===
          'Link failed, please check your local network.'
      );
    }
  });

  it('should be a request error', async () => {
    try {
      initHandleRequestError({data: 'eC10b2tlbg=='})({
        status: 400,
        statusText: 'Parameter error',
        headers: {},
      });
    } catch (error) {
      assert((error as Record<string, unknown>).status === 400);
    }
  });
});
