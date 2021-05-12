import * as assert from 'assert';
import {fetch} from '../src/fetch';

describe('test/fetch.test.ts', () => {
  it('should be the result of the default request options', async () => {
    await fetch('https://www.bing.com').then(res =>
      assert(typeof res.data === 'string')
    );
  });

  it('should be the result of custom options', async () => {
    await fetch('https://www.bing.com', {
      timeout: 3000,
      headers: {token: 'QXV0aG9yaXphdGlvbg=='},
    }).then(res => typeof res.data === 'string');
  });

  it('should be the result of an exception response to request', async () => {
    await fetch('https://www.bing.com/404', {
      timeout: 3000,
    }).catch(err => assert(err.status === 404));
  });

  it('should be the result of request timeout', async () => {
    await fetch('https://www.bing.com', {
      timeout: 1,
    }).catch(err => err.message === 'The user aborted a request.');
  });
});
