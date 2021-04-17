import {
  ParseData,
  ParseJSON,
  ParseText
} from './interface/parseData.interface'

const parseJSON: ParseJSON = (response) => response.json()
const parseText: ParseText = (response) => response.text()

export const parseData: ParseData = (response) =>
  response.headers.get('content-type')?.startsWith('application/json')
    ? parseJSON(response)
    : parseText(response)
