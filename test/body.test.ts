import * as assert from 'assert';
import {handleRequestBody} from '../src/body';

describe('test/body.test.ts', () => {
  it('should be handle the request body.', async () => {
    const result = handleRequestBody({'x-token': 'eC10b2tlbg=='}, undefined);

    assert(typeof result === 'string');
    assert(
      result ===
        JSON.stringify({
          'x-token': 'eC10b2tlbg==',
        })
    );
  });
});
