import AbortController from 'abort-controller'
import * as isomorphicFetch from 'isomorphic-fetch'
import { Fetch } from './interface/fetch.interface'
import { handleResponse } from './response'
import { checkStatus } from './status'

export const fetch: Fetch = async (url, options) => {
  const {
    timeout = 3000,
    headers = { 'content-type': 'application/json', accept: '*/*' },
    method = 'GET',
    ...args
  } = options ?? {}

  const initOptions = { method, headers, ...args }
  const response = handleResponse({ timeout, ...initOptions })
  const abortController = new AbortController()
  const signal = abortController.signal

  setTimeout(() => abortController.abort(), timeout)

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
