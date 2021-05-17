import * as assert from 'assert';
import * as nock from 'nock';
import {leafXFetch} from '../src/fetch';

const good = 'hello world';
const bad = 'good bye cruel world';

describe('test/fetch.test.ts', () => {
  before(async () => {
    nock('https://leaf-x.app').get('/default/succeed').reply(200, good);
    nock('https://leaf-x.app').get('/custom/succeed').reply(200, good);
    nock('https://leaf-x.app').get('/fail').reply(404, bad);
    nock('https://leaf-x.app').post('/json/succeed').reply(200, good);
    nock('https://leaf-x.app').post('/text/succeed').reply(200, good);
  });

  it('should be the result of the default request options', async () => {
    await leafXFetch('https://leaf-x.app/default/succeed').then(result =>
      assert(result.data === good)
    );
  });

  it('should be the result of custom options', async () => {
    await leafXFetch('https://leaf-x.app/custom/succeed', {
      timeout: 3000,
      headers: {token: 'QXV0aG9yaXphdGlvbg=='},
    }).then(result => assert(result.data === good));
  });

  it('should be the result of an exception response to request', async () => {
    await leafXFetch('https://leaf-x.app/fail', {
      timeout: 3000,
    }).catch(error => assert(error.status === 404));
  });

  it('should be the result of request timeout', async () => {
    await leafXFetch('https://www.leaf-x.app', {
      timeout: 1,
    }).catch(error =>
      assert(error.data.message === 'The user aborted a request.')
    );
  });

  it('should be the result of post JSON data', async () => {
    await leafXFetch('https://leaf-x.app/json/succeed', {
      method: 'POST',
      data: {leaf: 'OK'},
    }).then(result => assert(result.data === good));
  });

  it('should be the result of post text data', async () => {
    await leafXFetch('https://leaf-x.app/text/succeed', {
      method: 'POST',
      data: 'ok',
    }).then(result => assert(result.data === good));
  });
});
