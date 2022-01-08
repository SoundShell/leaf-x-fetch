import * as assert from 'assert';
import {handleRequestUrl} from '../src/url';

describe('test/url.test.ts', () => {
  it('Should be handle URLs without parameters', async () => {
    const result = handleRequestUrl('https://leaf-x.app', {params: {}});

    assert(result === 'https://leaf-x.app/');
  });

  it('should be handle URLs with parameters', async () => {
    const result = handleRequestUrl('https://leaf-x.app?test=test', {
      params: {name: 'bing'},
    });

    assert(result === 'https://leaf-x.app/?test=test&name=bing');
  });
});
