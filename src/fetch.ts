import AbortController from 'abort-controller'
import * as isomorphicFetch from 'isomorphic-fetch'
import { checkStatus } from './checkStatus'
import { Fetch } from './interface/fetch.interface'
import { parseData } from './parseData'

export const fetch: Fetch = async (url, options) => {
  const { timeout = 3000, ...args } = options ?? {}
  const controller = new AbortController()
  const signal = controller.signal

  setTimeout(() => controller.abort(), timeout)

  return isomorphicFetch(url, { signal, ...args })
    .then(checkStatus)
    .then(parseData)
}
