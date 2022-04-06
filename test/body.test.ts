import * as assert from 'assert';
import {handleRequestBody} from '../src/body';

describe('test/body.test.ts', () => {
  it('should be handle the request body', async () => {
    const result = handleRequestBody({
      data: {'x-token': 'eC10b2tlbg=='},
      headers: {'content-type': 'application/json'},
    });

    assert(typeof result === 'string');
    assert(
      result ===
        JSON.stringify({
          'x-token': 'eC10b2tlbg==',
        })
    );
  });
});
