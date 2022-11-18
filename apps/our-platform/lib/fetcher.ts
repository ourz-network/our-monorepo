/* eslint-disable import/no-default-export */
/* eslint-disable @typescript-eslint/no-unsafe-return */
export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const response = await fetch(input, init)

  return response.json()
}

export default fetcher
