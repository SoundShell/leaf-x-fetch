import * as assert from 'assert'
import { fetch } from '../src/fetch'

describe('test/fetch.test.ts', () => {
  it('Should be the result of a request for the default options.', async () => {
    const result = await fetch('https://www.bing.com')

    assert(typeof result === 'string')
  })

  it('Should be the result of a request for a custom options.', async () => {
    const result = await fetch('https://www.bing.com', { timeout: 3000 })

    assert(typeof result === 'string')
  })
})
