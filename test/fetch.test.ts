import * as assert from 'assert';
import {fetch} from '../src/fetch';

describe('test/fetch.test.ts', () => {
  it('should be the result of the default request options', async () => {
    await fetch('https://www.bing.com').then(result =>
      assert(typeof result.data === 'string')
    );
  });

  it('should be the result of custom options', async () => {
    await fetch('https://www.bing.com', {
      timeout: 3000,
      headers: {token: 'QXV0aG9yaXphdGlvbg=='},
    }).then(result => typeof result.data === 'string');
  });

  it('should be the result of an exception response to request', async () => {
    await fetch('https://www.bing.com/404', {
      timeout: 3000,
    }).catch(error => assert(error.status === 404));
  });

  it('should be the result of request timeout', async () => {
    await fetch('https://www.bing.com', {
      timeout: 1,
    }).catch(error => error.message === 'The user aborted a request.');
  });
});
