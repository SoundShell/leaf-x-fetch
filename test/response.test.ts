import * as assert from 'assert'
import { initProcessResponse } from '../src/response'

describe('test/response.test.ts', () => {
  it('should be the result of the processing response JSON data', async () => {
    const response = new Response(JSON.stringify({}), {
      headers: { 'content-type': 'application/json; charset=utf-8' }
    })

    const process = initProcessResponse()
    const result = await process(response)

    assert(typeof result.data === 'object')
  })

  it('should be the result of dealing with the response text data', async () => {
    const response = new Response('ok', {
      headers: { 'content-type': 'text/plain; charset=utf-8' }
    })

    const process = initProcessResponse()
    const result = await process(response)

    assert(result.data === 'ok')
  })

  it('should be the result of the processing response octet stream and convert to JSON data', async () => {
    const response = new Response(Buffer.from(JSON.stringify({})), {
      headers: { 'content-type': 'application/octet-stream; charset=utf-8' }
    })

    const process = initProcessResponse()
    const result = await process(response)

    assert(typeof result.data === 'object')
  })

  it('should be the result of the processing response octet stream and convert to text data', async () => {
    const response = new Response(Buffer.from(''), {
      headers: { 'content-type': 'application/octet-stream; charset=utf-8' }
    })

    const process = initProcessResponse()
    const result = await process(response)

    assert(typeof result.data === 'string')
  })

  it('should be the result of the processing response to other data types', async () => {
    const response = new Response('ok', {
      headers: { 'content-type': 'text/html; charset=utf-8' }
    })

    const process = initProcessResponse()
    const result = await process(response)

    assert(result.data === 'ok')
  })

  it('should be the result of the processing response without data type', async () => {
    const response = new Response('ok')

    response.headers.delete('content-type')

    const process = initProcessResponse()
    const result = await process(response)

    assert(result.data === 'ok')
  })
})
