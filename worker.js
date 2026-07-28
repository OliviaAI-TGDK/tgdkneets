export default {
  async fetch(request) {
    const url = new URL(request.url);
    // proxy your existing index.html
    const target = "https://oliviaai-tgdk.github.io" + url.pathname + url.search;
    const res = await fetch(target);
    return new Response(res.body, {
      status: res.status,
      headers: { "content-type": "text/html; charset=utf-8" }
    });
  }
}