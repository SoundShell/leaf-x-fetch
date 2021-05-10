import {ContentType as ContentTypeEnum} from './enum/content_type.enum';
import {
  HandleBodyMethod,
  InitHandleBody,
  InitHandleResponse,
  ParseJSON,
  ParseOctetStream,
  ParseText,
} from './interface/response.interface';

const parseJSON: ParseJSON = async response => response.json();
const parseText: ParseText = async response => response.text();
const parseOctetStream: ParseOctetStream = async response =>
  response.text().then(body => {
    let data!: Record<string, unknown> | string;

    try {
      data = JSON.parse(body);
    } catch (error) {
      data = body;
    }

    return data;
  });

const initHandleBody: InitHandleBody = (options, response) => async (
  type = 'TEXT'
) => {
  const handleBodyMethod: HandleBodyMethod = Object.freeze({
    json: parseJSON,
    text: parseText,
    octetStream: parseOctetStream,
  });

  return handleBodyMethod[ContentTypeEnum[type]](response).then(data => ({
    ...options,
    data,
  }));
};

export const initHandleResponse: InitHandleResponse = options => async response => {
  const {status, statusText, url} = response;
  const headers = {} as Record<string, unknown>;

  for (const key of response.headers.keys()) {
    Object.assign(headers, {[key]: response.headers.get(key)});
  }

  const responseOptions = {
    status,
    statusText,
    headers,
    url,
    options: options ?? {},
  };

  const contentType = headers['content-type'] as string;
  const handleBody = initHandleBody(responseOptions, response);

  if (contentType?.startsWith('application/json')) {
    return handleBody('JSON');
  } else if (contentType?.startsWith('application/octet-stream')) {
    return handleBody('OCTET_STREAM');
  } else if (contentType?.startsWith('text/plain')) {
    return handleBody('TEXT');
  } else {
    return handleBody();
  }
};
