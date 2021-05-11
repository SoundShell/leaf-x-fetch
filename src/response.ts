import {ContentType as ContentTypeEnum} from './enum/content_type.enum';
import {
  HandleBodyMethod,
  InitHandleBody,
  InitHandleResponse,
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

const initHandleBody: InitHandleBody =
  (options, response) =>
  async (type = 'TEXT') => {
    const handleBodyMethod: HandleBodyMethod = Object.freeze({
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
  const headers = {} as Record<string, unknown>;

  for (const key of response.headers.keys()) {
    Object.assign(headers, {[key]: response.headers.get(key)});
  }

  const contentType = headers['content-type'] as string;
  const handleBody = initHandleBody(
    {
      status,
      statusText,
      headers,
      url,
      options: options ?? {},
    },
    response
  );

  if (contentType?.startsWith('application/json')) {
    return handleBody('JSON');
  } else if (contentType?.startsWith('application/octet-stream')) {
    return handleBody('OCTET_STREAM');
  } else if (contentType?.startsWith('text/html')) {
    return handleBody('TEXT');
  } else if (contentType?.startsWith('text/plain')) {
    return handleBody('TEXT');
  } else {
    return handleBody();
  }
};
