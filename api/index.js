const SUPABASE_ORIGIN = 'https://eoysdsmsyeaflhxcczr.supabase.co';
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PATCH,PUT,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization,apikey,X-Client-Info,Prefer,Accept',
};
export default async function handler(request) {
  const url = new URL(request.url);
  const targetUrl = SUPABASE_ORIGIN + url.pathname + url.search;
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS });
  }
  try {
    const resp = await fetch(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });
    const headers = {};
    resp.headers.forEach((v, k) => { headers[k] = v; });
    Object.assign(headers, CORS);
    return new Response(await resp.text(), {
      status: resp.status,
      headers,
    });
  } catch(e) {
    return new Response(JSON.stringify({error: e.message}), {
      status: 502,
      headers: {'content-type': 'application/json', ...CORS},
    });
  }
}
