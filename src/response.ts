import {
  InitHandleResponse,
  ParseJson,
  ParseText
} from './interface/response.interface'

const parseJson: ParseJson = (response) => response.json()
const parseText: ParseText = (response) => response.text()

const handleText = (options) => (response) =>
  parseJson(response).then((data) => ({ data, ...options }))

const handleJson = (options) => (response) =>
  parseJson(response).then((data) => ({ data, ...options }))

const handleOctetStream = (options) => (response) =>
  parseText(response).then((data) => {
    let result!: unknown

    try {
      result = JSON.parse(data)
    } catch (error) {
      result = data
    }

    return { data: result, ...options }
  })

export const initHandleResponse: InitHandleResponse = (options) => async (
  response
) => {
  const { status, statusText, url } = response
  const headers = {} as Record<string, unknown>

  for (const key of response.headers.keys()) {
    Object.assign(headers, { [key]: response.headers.get(key) })
  }

  const contentType = headers['content-type'] as string
  const responseOptions = {
    status,
    statusText,
    headers,
    url,
    options: options ?? {}
  }

  if (contentType?.startsWith('application/json')) {
    return handleJson(responseOptions)(response)
  }

  if (contentType?.startsWith('application/octet-stream')) {
    return handleOctetStream(responseOptions)(response)
  }

  return handleText(responseOptions)(response)
}
