import {
  ParseJson,
  ParseText,
  ParsResponse
} from './interface/parseResponse.interface'

const parseJson: ParseJson = (response) => response.json()
const parseText: ParseText = (response) => response.text()

export const parseResponse: ParsResponse = (options) => async (response) => {
  const { status, statusText, headers, url } = response

  return (response.headers.get('content-type')?.startsWith('application/json')
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
