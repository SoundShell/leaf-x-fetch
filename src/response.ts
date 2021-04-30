import { ContentType as ContentTypeEnum } from './enum/contentType.enum'
import {
  InitProcessBody,
  InitProcessResponse,
  ParseJson,
  ParseOctetStream,
  ParseText,
  ProcessingBodyMethod
} from './interface/response.interface'

const parseJson: ParseJson = async (response) => response.json()
const parseText: ParseText = async (response) => response.text()
const parseOctetStream: ParseOctetStream = async (response) =>
  response.text().then((body) => {
    let data!: Record<string, unknown> | string

    try {
      data = JSON.parse(body)
    } catch (error) {
      data = body
    }

    return data
  })

const initProcessBody: InitProcessBody = (options, response) => async (
  type = 'TEXT'
) => {
  const processingBodyMethod: ProcessingBodyMethod = Object.freeze({
    json: parseJson,
    text: parseText,
    octetStream: parseOctetStream
  })

  return processingBodyMethod[ContentTypeEnum[type]](response).then((data) =>
    Object.assign({}, options, { data })
  )
}

export const initProcessResponse: InitProcessResponse = (options) => async (
  response
) => {
  const { status, statusText, url } = response
  const headers = {} as Record<string, unknown>

  for (const key of response.headers.keys()) {
    Object.assign(headers, { [key]: response.headers.get(key) })
  }

  const responseOptions = {
    status,
    statusText,
    headers,
    url,
    options: options ?? {}
  }

  const contentType = headers['content-type'] as string
  const processBody = initProcessBody(responseOptions, response)

  if (contentType?.startsWith('application/json')) {
    return processBody('JSON')
  }

  if (contentType?.startsWith('application/octet-stream')) {
    return processBody('OCTET_STREAM')
  }

  if (contentType?.startsWith('text/plain')) {
    return processBody('TEXT')
  }

  return processBody()
}
