import * as assert from 'assert';
import {handleUrl} from '../src/url';

describe('test/fetch.test.ts', () => {
  it('should be the result of handle URLs without parameters', async () => {
    const result = handleUrl({url: 'https://leaf-x.app', params: {}});

    assert(result === 'https://leaf-x.app/');
  });

  it('should be the result of handle URLs with parameters', async () => {
    const result = handleUrl({
      url: 'https://leaf-x.app?test=test',
      params: {
        name: 'bing',
      },
    });

    assert(result === 'https://leaf-x.app/?test=test&name=bing');
  });
});
