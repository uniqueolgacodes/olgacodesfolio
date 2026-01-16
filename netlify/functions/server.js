import { createRequestHandler } from '@remix-run/netlify';
import * as build from '../../build/server/index.js';

const handler = createRequestHandler({
  build,
  mode: process.env.NODE_ENV,
});

function getRawPath(event) {
  const rawPath = event.rawPath || event.path || '/';
  const searchParams = new URLSearchParams();
  if (event.multiValueQueryStringParameters) {
    for (const [key, values] of Object.entries(
      event.multiValueQueryStringParameters
    )) {
      if (!values) continue;
      for (const value of values) {
        searchParams.append(key, value);
      }
    }
  } else if (event.queryStringParameters) {
    for (const [key, value] of Object.entries(event.queryStringParameters)) {
      if (value === undefined || value === null) continue;
      searchParams.append(key, value);
    }
  }

  const rawParams = searchParams.toString();
  return rawParams ? `${rawPath}?${rawParams}` : rawPath;
}

export default async function netlifyHandler(event, context) {
  if (!event.rawUrl) {
    const host =
      event.headers?.host || event.headers?.['x-forwarded-host'] || 'localhost';
    const proto = event.headers?.['x-forwarded-proto'] || 'https';
    const rawPath = getRawPath(event);
    event = { ...event, rawUrl: `${proto}://${host}${rawPath}` };
  }

  return handler(event, context);
}
