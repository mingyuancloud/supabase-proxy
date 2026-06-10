const SUPABASE_ORIGIN = 'https://eoysdsmsyeaflhxcczr.supabase.co';
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PATCH,PUT,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization,apikey,X-Client-Info,Prefer,Accept',
};
export default async function handler(req) {
  if (req.method === 'OPTIONS') { return new Response(null, { status: 204, headers: CORS }); }
  let path = new URL(req.url).pathname + new URL(req.url).search;
  try {
    const r = await fetch(SUPABASE_ORIGIN + path, { method: req.method, headers: Object.fromEntries(Object.entries(req.headers).filter(h => !['host','connection'].includes(h[0]))), body: req.body });
    const h = {}; r.headers.forEach((v,k) => { if (!['content-encoding','content-length'].includes(k)) h[k] = v; });
    return new Response(await r.text(), { status: r.status, headers: {...h,...CORS} });
  } catch(e) { return new Response(JSON.stringify({error:e.message}), {status:502,headers:{'content-type':'application/json',...CORS}}); }
}
