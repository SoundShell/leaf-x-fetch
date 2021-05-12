import * as assert from 'assert';
import {initHandleResponse} from '../src/response';

describe('test/response.test.ts', () => {
  it('should be the result of the response JSON', async () => {
    const response = new Response(JSON.stringify({}), {
      headers: {'content-type': 'application/json; charset=utf-8'},
    });

    await initHandleResponse()(response).then(res =>
      assert(typeof res.data === 'object')
    );
  });

  it('should be the result of the response text', async () => {
    const response = new Response('ok', {
      headers: {'content-type': 'text/plain; charset=utf-8'},
    });

    await initHandleResponse()(response).then(res => assert(res.data === 'ok'));
  });

  it('should respond to the result of the octet stream and convert it to JSON', async () => {
    const response = new Response(Buffer.from(JSON.stringify({})), {
      headers: {'content-type': 'application/octet-stream; charset=utf-8'},
    });

    await initHandleResponse()(response).then(res =>
      assert(typeof res.data === 'object')
    );
  });

  it('should respond to the result of the octet stream and convert it to text', async () => {
    const response = new Response(Buffer.from(''), {
      headers: {'content-type': 'application/octet-stream; charset=utf-8'},
    });

    await initHandleResponse()(response).then(res =>
      assert(typeof res.data === 'string')
    );
  });

  it('should be the result of other data response', async () => {
    const response = new Response('ok', {
      headers: {'content-type': 'text/html; charset=utf-8'},
    });

    await initHandleResponse()(response).then(res => assert(res.data === 'ok'));
  });

  it('should be the result of content-free type response', async () => {
    const response = new Response('ok');

    response.headers.delete('content-type');

    await initHandleResponse()(response).then(res => assert(res.data === 'ok'));
  });
});
