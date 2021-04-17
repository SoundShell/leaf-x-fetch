import {
  ParseData,
  ParseJson,
  ParseText
} from './interface/parseData.interface'

const parseJson: ParseJson = (response) => response.json()
const parseText: ParseText = (response) => response.text()

export const parseData: ParseData = (response) =>
  response.headers.get('content-type')?.startsWith('application/json')
    ? parseJson(response)
    : parseText(response)
