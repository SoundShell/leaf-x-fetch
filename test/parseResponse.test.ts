import * as assert from 'assert'
import { parseResponse } from '../src/parseResponse'

describe('test/parseResponse.test.ts', () => {
  it('Should be the JSON data result of the response.', async () => {
    const response = {
      json: async () => ({ ok: true }),
      headers: {
        get: (name: string) => {
          const headers = { 'content-type': 'application/json' }

          return headers[name as keyof typeof headers]
        }
      }
    } as Response

    const result = await parseResponse()(response)

    assert((result.data as Record<string, unknown>).ok)
  })

  it('Should be the text data result of the response.', async () => {
    const response = {
      text: async () => 'ok',
      headers: {
        get: (name: string) => {
          const headers = { 'x-ip': '127.0.0.1' }

          return headers[name as keyof typeof headers]
        }
      }
    } as Response

    const result = await parseResponse()(response)

    assert(result.data === 'ok')
  })
})
