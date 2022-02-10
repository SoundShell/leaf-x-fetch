import * as assert from 'assert';
import {initHandleResponse} from '../src/response';

describe('test/response.test.ts', () => {
  it('should be a JSON data response', async () => {
    const response = new Response(JSON.stringify({}), {
      headers: {'content-type': 'application/json; charset=utf-8'},
    });

    const handleResponse = initHandleResponse({url: 'https://leaf-x.com'});

    await handleResponse(response).then(result =>
      assert(typeof result.data === 'object')
    );
  });

  it('should be a text data response', async () => {
    const response = new Response('ok', {
      headers: {'content-type': 'text/plain; charset=utf-8'},
    });

    const handleResponse = initHandleResponse({url: 'https://leaf-x.com'});

    await handleResponse(response).then(result => assert(result.data === 'ok'));
  });

  it('should be octal stream data response and formatted as JSON data', async () => {
    const response = new Response(Buffer.from(JSON.stringify({})), {
      headers: {'content-type': 'application/octet-stream; charset=utf-8'},
    });

    const handleResponse = initHandleResponse({url: 'https://leaf-x.com'});

    await handleResponse(response).then(result =>
      assert(typeof result.data === 'object')
    );
  });

  it('should be octal stream data response and formatted as text data', async () => {
    const response = new Response(Buffer.from(''), {
      headers: {'content-type': 'application/octet-stream; charset=utf-8'},
    });

    const handleResponse = initHandleResponse({url: 'https://leaf-x.com'});

    await handleResponse(response).then(result =>
      assert(typeof result.data === 'string')
    );
  });

  it('should be other types of data response', async () => {
    const response = new Response('ok', {
      headers: {'content-type': 'text/html; charset=utf-8'},
    });

    const handleResponse = initHandleResponse({url: 'https://leaf-x.com'});

    await handleResponse(response).then(result => assert(result.data === 'ok'));
  });

  it('should be no data response', async () => {
    const response = new Response('ok');

    response.headers.delete('content-type');

    const handleResponse = initHandleResponse({url: 'https://leaf-x.com'});

    await handleResponse(response).then(result => assert(result.data === 'ok'));
  });
});
