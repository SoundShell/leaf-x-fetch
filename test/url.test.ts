import * as assert from 'assert';
import {handleDefaults} from '../src/defaults';
import {handleRequestUrl} from '../src/url';

describe('test/url.test.ts', () => {
  it('should be handle URLs without params', async () => {
    const result = handleRequestUrl('https://leaf-x.com', {params: {}});

    assert(result === 'https://leaf-x.com');
  });

  it('should be handle URLs with params', async () => {
    const result = handleRequestUrl('https://leaf-x.com?test=test', {
      params: {name: 'bing'},
    });

    assert(result === 'https://leaf-x.com?test=test&name=bing');
  });

  it('should be the handle path.', async () => {
    handleDefaults({baseUrl: 'https://leaf-x.com'});

    const result = handleRequestUrl('/v1/api?test=test', {
      params: {name: 'bing'},
    });

    assert(result === 'https://leaf-x.com/v1/api?test=test&name=bing');
  });
});
