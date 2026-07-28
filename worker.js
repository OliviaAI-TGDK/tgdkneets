export default {
  async fetch(request) {
    const url = new URL(request.url);
    
    // THIS is where your big index.html lives
    const ORIGIN_BASE = "https://oliviaai-tgdk.github.io/tgdkneets";

    // keep the same path (/ or /about etc)
    let target = ORIGIN_BASE + url.pathname + url.search;
    if (url.pathname === "/" || url.pathname === "") target = ORIGIN_BASE + "/" + url.search;

    const res = await fetch(target, { cf: { cacheTtl: 60 } });
    
    // return as-is, streaming — works even if index.html is 10MB
    return new Response(res.body, {
      status: res.status,
      headers: {
        "content-type": res.headers.get("content-type") || "text/html;charset=UTF-8",
        "cache-control": "public, max-age=60",
        "access-control-allow-origin": "*"
      }
    });
  }
}