import {
  HandleResponse,
  ParseJson,
  ParseText
} from './interface/response.interface'

const parseJson: ParseJson = (response) => response.json()
const parseText: ParseText = (response) => response.text()

export const handleResponse: HandleResponse = (options) => async (response) => {
  const { status, statusText, url } = response
  const headers = {} as Record<string, unknown>

  for (const key of response.headers.keys()) {
    Object.assign(headers, { [key]: response.headers.get(key) })
  }

  return ((headers['content-type'] as string)?.startsWith('application/json')
    ? parseJson(response)
    : parseText(response)
  ).then((data: unknown) => ({
    data,
    status,
    statusText,
    headers,
    url,
    options: options ?? {}
  }))
}
