import * as assert from 'assert';
import {initHandleResponse} from '../src/response';

describe('test/response.test.ts', () => {
  it('should be handle JSON', async () => {
    const response = new Response(JSON.stringify({}), {
      headers: {'content-type': 'application/json; charset=utf-8'},
    });

    await initHandleResponse()(response).then(result =>
      assert(typeof result.data === 'object')
    );
  });

  it('should be handle text', async () => {
    const response = new Response('ok', {
      headers: {'content-type': 'text/plain; charset=utf-8'},
    });

    await initHandleResponse()(response).then(result =>
      assert(result.data === 'ok')
    );
  });

  it('should handle octal streams and convert to JSON', async () => {
    const response = new Response(Buffer.from(JSON.stringify({})), {
      headers: {'content-type': 'application/octet-stream; charset=utf-8'},
    });

    await initHandleResponse()(response).then(result =>
      assert(typeof result.data === 'object')
    );
  });

  it('should handle octal streams and convert them to text', async () => {
    const response = new Response(Buffer.from(''), {
      headers: {'content-type': 'application/octet-stream; charset=utf-8'},
    });

    await initHandleResponse()(response).then(result =>
      assert(typeof result.data === 'string')
    );
  });

  it('should be handle other response', async () => {
    const response = new Response('ok', {
      headers: {'content-type': 'text/html; charset=utf-8'},
    });

    await initHandleResponse()(response).then(result =>
      assert(result.data === 'ok')
    );
  });

  it('should be handle no content type response', async () => {
    const response = new Response('ok');

    response.headers.delete('content-type');

    await initHandleResponse()(response).then(result =>
      assert(result.data === 'ok')
    );
  });
});
