/**
 * Check the response status.
 */
export interface CheckStatus {
  (response: Response): Response | never
}
