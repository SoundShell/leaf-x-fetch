import * as assert from 'assert';
import {initHandleResponse} from '../src/response';

describe('test/response.test.ts', () => {
  it('should be responding to JSON data', async () => {
    const response = new Response(JSON.stringify({}), {
      headers: {'content-type': 'application/json; charset=utf-8'},
    });

    const handleResponse = initHandleResponse();

    await handleResponse(response).then(result =>
      assert(typeof result.data === 'object')
    );
  });

  it('should be responding to text data', async () => {
    const response = new Response('ok', {
      headers: {'content-type': 'text/plain; charset=utf-8'},
    });

    const handleResponse = initHandleResponse();

    await handleResponse(response).then(result => assert(result.data === 'ok'));
  });

  it('should respond to octal stream data and convert it to JSON', async () => {
    const response = new Response(Buffer.from(JSON.stringify({})), {
      headers: {'content-type': 'application/octet-stream; charset=utf-8'},
    });

    const handleResponse = initHandleResponse();

    await handleResponse(response).then(result =>
      assert(typeof result.data === 'object')
    );
  });

  it('should respond to octal stream data and convert it to text', async () => {
    const response = new Response(Buffer.from(''), {
      headers: {'content-type': 'application/octet-stream; charset=utf-8'},
    });

    await initHandleResponse()(response).then(result =>
      assert(typeof result.data === 'string')
    );
  });

  it('should respond to other data types', async () => {
    const response = new Response('ok', {
      headers: {'content-type': 'text/html; charset=utf-8'},
    });

    const handleResponse = initHandleResponse();

    await handleResponse(response).then(result => assert(result.data === 'ok'));
  });

  it('should be no content in the response', async () => {
    const response = new Response('ok');

    response.headers.delete('content-type');

    const handleResponse = initHandleResponse();

    await handleResponse(response).then(result => assert(result.data === 'ok'));
  });
});
