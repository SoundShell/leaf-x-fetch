/**
 * Parse to JSON data.
 */
export interface ParseJSON {
  (response: Response): Promise<Record<string, unknown>>
}

/**
 * Parse to text data.
 */
export interface ParseText {
  (response: Response): Promise<string>
}

/**
 * Parse the response data.
 */
export interface ParseData {
  (response: Response): Promise<unknown>
}
