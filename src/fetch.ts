import AbortController from 'abort-controller'
import * as isomorphicFetch from 'isomorphic-fetch'
import { checkStatus } from './checkStatus'
import { Fetch } from './interface/fetch.interface'
import { parseResponse } from './parseResponse'

export const fetch: Fetch = async (url, options) => {
  const {
    timeout = 3000,
    headers = { 'content-type': 'application/json', accept: '*/*' },
    method = 'GET',
    ...args
  } = options ?? {}

  const initOptions = { method, headers, ...args }
  const response = parseResponse({ timeout, ...initOptions })
  const controller = new AbortController()
  const signal = controller.signal

  setTimeout(() => controller.abort(), timeout)

  try {
    return await isomorphicFetch(url, { signal, ...initOptions })
      .then(checkStatus)
      .then(response)
  } catch (error) {
    if (error.response) {
      throw await response(error.response)
    }

    throw error
  }
}
