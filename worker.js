export default {
  async fetch(request) {
    const url = new URL(request.url);
    
    // Origin where your real index.html lives
    const ORIGIN = "https://oliviaai-tgdk.github.io";

    // Build origin URL with same path
    let originUrl = ORIGIN + url.pathname;
    if (url.pathname === "/" || url.pathname === "") {
      originUrl = ORIGIN + "/";
    }
    originUrl += url.search;

    let res = await fetch(originUrl, {
      headers: {
        "User-Agent": request.headers.get("User-Agent") || "TGDK-Worker",
        "Accept": request.headers.get("Accept") || "*/*",
      },
      cf: { cacheTtl: 60, cacheEverything: true }
    });

    // Clone response so we can edit headers
    let newHeaders = new Headers(res.headers);
    newHeaders.set("Cache-Control", "public, max-age=60");
    newHeaders.set("X-Robots-Tag", "noindex"); // remove if you want indexing
    newHeaders.delete("content-security-policy");
    newHeaders.delete("clear-site-data");

    return new Response(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers: newHeaders
    });
  }
}