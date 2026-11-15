const API_ORIGIN = 'https://backend-xi-teal-81.vercel.app'

export default async function handler(request, response) {
  const url = new URL(request.url, API_ORIGIN)
  const headers = {}
  const contentType = request.headers['content-type']
  if (contentType) headers['content-type'] = contentType

  const body = request.body === undefined
    ? undefined
    : typeof request.body === 'string' || Buffer.isBuffer(request.body)
      ? request.body
      : JSON.stringify(request.body)

  const upstream = await fetch(url, {
    method: request.method,
    headers,
    body: request.method === 'GET' || request.method === 'HEAD' ? undefined : body,
  })

  response.statusCode = upstream.status
  const upstreamContentType = upstream.headers.get('content-type')
  if (upstreamContentType) response.setHeader('content-type', upstreamContentType)
  response.end(Buffer.from(await upstream.arrayBuffer()))
}
