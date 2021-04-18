import * as assert from 'assert'
import { handleResponse } from '../src/response'

describe('test/response.test.ts', () => {
  it('Should be the result of responding to JSON data.', async () => {
    const response = new Response(JSON.stringify({}), {
      headers: { 'content-type': 'application/json' }
    })

    const result = await handleResponse()(response)

    assert(typeof result.data === 'object')
  })

  it('Should be the result of responding to text data.', async () => {
    const result = await handleResponse()(new Response('ok'))

    assert(result.data === 'ok')
  })
})
