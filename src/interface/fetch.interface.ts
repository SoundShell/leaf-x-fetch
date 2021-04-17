/**
 * Fetch API.
 */
export interface Fetch {
  (url: string, options?: RequestInit & { timeout?: number }): Promise<unknown>
}
