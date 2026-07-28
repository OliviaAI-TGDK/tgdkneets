export default {
  async fetch(request) {
    // change this to your real repo if needed
    const r = await fetch("https://oliviaai-tgdk.github.io/");
    return new Response(await r.text(), {
      headers: { "content-type": "text/html;charset=UTF-8", "cache-control": "no-cache" }
    });
  }
}