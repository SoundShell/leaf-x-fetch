import {ContentType as ContentTypeEnum} from './enum/content_type.enum';
import {
  HandleResponseBodyMethod,
  InitHandleResponse,
  InitHandleResponseBody,
  ParseJson,
  ParseOctetStream,
  ParseText,
} from './interface/response.interface';

const parseJson: ParseJson = response => response.json();
const parseText: ParseText = response => response.text();
const parseOctetStream: ParseOctetStream = response =>
  response.text().then(body => {
    let data!: Record<string, unknown> | string;

    try {
      data = JSON.parse(body);
    } catch (error) {
      data = body;
    }
    return data;
  });

const initHandleResponseBody: InitHandleResponseBody =
  (response, options) => async type => {
    const handleBodyMethod: HandleResponseBodyMethod = Object.freeze({
      json: parseJson,
      text: parseText,
      octetStream: parseOctetStream,
    });

    const data = await handleBodyMethod[ContentTypeEnum[type]](response);
    const result = {...options, data};

    return response.ok ? result : Promise.reject(result);
  };

export const initHandleResponse: InitHandleResponse = options => response => {
  const {status, statusText, url} = response;
  const headers = {} as Record<string, string>;

  for (const key of response.headers.keys()) {
    Object.assign(headers, {[key]: response.headers.get(key)});
  }

  const contentType = headers['content-type'] as string;
  const handleResponseBody = initHandleResponseBody(response, {
    status,
    statusText,
    headers,
    url,
    options: options ?? {},
  });

  if (contentType?.startsWith('application/json')) {
    return handleResponseBody('JSON');
  } else if (contentType?.startsWith('application/octet-stream')) {
    return handleResponseBody('OCTET_STREAM');
  } else if (contentType?.startsWith('text/html')) {
    return handleResponseBody('TEXT');
  } else if (contentType?.startsWith('text/plain')) {
    return handleResponseBody('TEXT');
  } else {
    return handleResponseBody('TEXT');
  }
};
