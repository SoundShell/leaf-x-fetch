import * as assert from 'assert'
import { parseData } from '../src/parseData'

describe('test/parseData.ts', () => {
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

    const result = (await parseData(response)) as Record<string, unknown>

    assert(result.ok)
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

    const result = (await parseData(response)) as string

    assert(result === 'ok')
  })
})
