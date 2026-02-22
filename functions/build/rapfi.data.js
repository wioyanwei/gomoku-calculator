export async function onRequest(context) {
 
  const githubUrl = "https://github.com/wioyanwei/gomoku-calculator/releases/download/v1.0/rapfi.data";
  
  const response = await fetch(githubUrl, {
    redirect: 'follow'
  });
  
  if (!response.ok) {
    return new Response(`GitHub fetch failed: ${response.status}`, { status: 502 });
  }
  
  // 拦截 HTML：如果拉到的是网页（比如 404 页或登录页），直接报错 500
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("text/html")) {
    return new Response("Error: Fetched HTML instead of weights. Is your GitHub repo PUBLIC?", { status: 500 });
  }
  
  const newResponse = new Response(response.body, response);
  
  // 必须的跨域与多线程隔离头
  newResponse.headers.set("Access-Control-Allow-Origin", "*");
  newResponse.headers.set("Cross-Origin-Resource-Policy", "cross-origin");
  newResponse.headers.set("Cross-Origin-Embedder-Policy", "require-corp");
  newResponse.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  newResponse.headers.set("Cache-Control", "public, max-age=31536000");
  newResponse.headers.set("Content-Type", "application/octet-stream");
  
  return newResponse;
}