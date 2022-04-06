import * as assert from 'assert';
import * as nock from 'nock';
import {leafXFetch} from '../src/fetch';

const GOOD = 'hello world';
const BAD = 'good bye cruel world';

describe('test/fetch.test.ts', () => {
  before(async () => {
    nock('https://leaf-x.com').get('/default/succeed').reply(200, GOOD);
    nock('https://leaf-x.com').get('/custom/succeed').reply(200, GOOD);
    nock('https://leaf-x.com').get('/fail').reply(404, BAD);
    nock('https://leaf-x.com').post('/json/succeed').reply(200, GOOD);
    nock('https://leaf-x.com').post('/text/succeed').reply(200, GOOD);
  });

  it('should be the default request', async () => {
    await leafXFetch('https://leaf-x.com/default/succeed').then(result =>
      assert(result.data === GOOD)
    );
  });

  it('should be a successful request', async () => {
    await leafXFetch('https://leaf-x.com/custom/succeed', {
      timeout: 2000,
      headers: {
        token: 'QXV0aG9yaXphdGlvbg==',
        'content-type': 'multipart/form-data',
      },
    }).then(result => assert(result.data === GOOD));
  });

  it('should be an exception request', async () => {
    await leafXFetch('https://leaf-x.com/fail', {
      timeout: 4000,
    }).catch(error => assert(error.status === 404));
  });

  it('should be a timeout request', async () => {
    await leafXFetch('https://www.leaf-x.com', {
      timeout: 1,
    }).catch(error => assert(error.message === 'The user aborted a request.'));
  });

  it('should be responding to a request for JSON data', async () => {
    await leafXFetch('https://leaf-x.com/json/succeed', {
      method: 'POST',
      data: {leaf: 'OK'},
    }).then(result => assert(result.data === GOOD));
  });

  it('should be responding to a request for text data', async () => {
    await leafXFetch('https://leaf-x.com/text/succeed', {
      method: 'POST',
      data: 'ok',
    }).then(result => assert(result.data === GOOD));
  });
});
