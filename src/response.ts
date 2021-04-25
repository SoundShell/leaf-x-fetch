import {
  InitHandleResponse,
  ParseJson,
  ParseText
} from './interface/response.interface'

const parseJson: ParseJson = (response) => response.json()
const parseText: ParseText = (response) => response.text()

export const initHandleResponse: InitHandleResponse = (options) => async (
  response
) => {
  const { status, statusText, url } = response
  const headers = {} as Record<string, unknown>

  for (const key of response.headers.keys()) {
    Object.assign(headers, { [key]: response.headers.get(key) })
  }

  const type = headers['content-type'] as string
  const responseOptions = {
    status,
    statusText,
    headers,
    url,
    options: options ?? {}
  }

  if (type?.startsWith('application/json')) {
    return parseJson(response).then((data) => ({ data, ...responseOptions }))
  }

  if (type?.startsWith('application/octet-stream')) {
    return parseText(response).then((data) => {
      let result!: unknown

      try {
        result = JSON.parse(data)
      } catch (error) {
        result = data
      }

      return { data: result, ...responseOptions }
    })
  }

  return parseText(response).then((data) => ({ data, ...responseOptions }))
}
