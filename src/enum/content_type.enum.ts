/**
 * Enumerates the request response content data type.
 */
export enum ContentType {
  JSON = 'json',
  TEXT = 'text',
  OCTET_STREAM = 'octetStream',
}

/**
 * Request response content data type string.
 */
export type ContentTypeString = 'JSON' | 'TEXT' | 'OCTET_STREAM';
