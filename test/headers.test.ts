import * as assert from 'assert';
import {handleRequestHeaders} from '../src/headers';

describe('test/headers.test.ts', () => {
  it('should handle the request headers', async () => {
    const result = handleRequestHeaders({
      'x-token': 'eC10b2tlbg==',
    });

    assert(typeof result === 'object');
    assert((result as Record<string, string>)['x-token'] === 'eC10b2tlbg==');
  });
});
