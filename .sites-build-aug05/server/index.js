const HAS_FILE_EXTENSION = /\.[a-z0-9]+$/i;

export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);

    if (response.status !== 404 || request.method !== "GET") {
      return response;
    }

    const url = new URL(request.url);

    if (url.pathname !== "/" && !HAS_FILE_EXTENSION.test(url.pathname)) {
      url.pathname = `${url.pathname.replace(/\/$/, "")}.html`;
      return env.ASSETS.fetch(new Request(url, request));
    }

    return response;
  },
};
