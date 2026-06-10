export default async function handler(request) {
  const url = new URL(request.url);
  const target = 'https://eoysdsmsyeaflhxcczr.supabase.co' + url.pathname.replace('/api', '') + url.search;
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PATCH,PUT,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': '*'
    }});
  }
  try {
    const r = await fetch(target, { method: request.method, headers: request.headers, body: request.body });
    const h = {}; r.headers.forEach((v,k) => h[k] = v);
    h['Access-Control-Allow-Origin'] = '*';
    return new Response(await r.text(), { status: r.status, headers: h });
  } catch(e) {
    return new Response(JSON.stringify({error: String(e)}), { status: 502, headers: {'content-type':'application/json'} });
  }
}
