/**
 * Check the request response status.
 *
 * @param response This Fetch API interface represents the response to a request.
 */
export interface CheckStatus {
  (response: Response): Response | never
}
