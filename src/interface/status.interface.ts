/**
 * Check the response status.
 *
 * @param response Response
 * @return Response | never
 */
export interface CheckStatus {
  (response: Response): Response | never
}
