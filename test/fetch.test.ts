import * as assert from 'assert'
import { fetch } from '../src/fetch'

describe('test/fetch.test.ts', () => {
  it('Should be the result of a default option request.', async () => {
    const result = await fetch('https://www.bing.com')

    assert(typeof result.data === 'string')
  })

  it('Should be the result of a custom option request.', async () => {
    const result = await fetch('https://www.bing.com', { timeout: 3000 })

    assert(typeof result.data === 'string')
  })

  it('Should be the result of a request error response.', async () => {
    const result = await fetch('https://www.bing.com/404', {
      timeout: 3000
    }).catch((err) => err)

    assert(result.status === 404)
  })

  it('Should be the result of a request error.', async () => {
    const result = await fetch('https://www.bing.com', {
      timeout: 1
    }).catch((err) => err)

    assert(result.message === 'The user aborted a request.')
  })
})
