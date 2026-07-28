export default {
  async fetch(request) {
    return new Response(`

`, {
      headers: { 
        "content-type": "text/html;charset=UTF-8",
        "cache-control": "no-store"
      }
    });
  }
}