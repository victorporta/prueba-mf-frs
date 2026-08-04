import { HttpError } from './HttpError'

export async function request<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(input, init)

  if (!response.ok) {
    throw new HttpError(response.status, response.statusText)
  }

  return (await response.json()) as T
}
