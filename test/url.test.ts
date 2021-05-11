import * as assert from 'assert';
import {handleUrl} from '../src/url';

describe('test/fetch.test.ts', () => {
  it('should be the result of handle URLs without parameters', async () => {
    const result = handleUrl({url: 'https://www.bing.com', params: {}});

    assert(result === 'https://www.bing.com/');
  });

  it('should be the result of handle URLs with parameters', async () => {
    const result = handleUrl({
      url: 'https://www.bing.com?test=test',
      params: {
        name: 'bing',
      },
    });

    assert(result === 'https://www.bing.com/?test=test&name=bing');
  });
});
