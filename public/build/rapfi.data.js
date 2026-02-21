export async function onRequest(context) {
  const githubUrl = "https://github.com/wioyanwei/gomoku-calculator/releases/download/v1.0/rapfi.data";
  
  // 发起请求，明确要求跟随重定向 (GitHub Releases 会 302 重定向到 AWS S3)
  const response = await fetch(githubUrl, {
    redirect: 'follow'
  });
  
  // 复制响应流
  const newResponse = new Response(response.body, response);
  
  // 注入多线程和跨域必须的灵魂 Header
  newResponse.headers.set("Access-Control-Allow-Origin", "*");
  newResponse.headers.set("Cross-Origin-Resource-Policy", "cross-origin");
  newResponse.headers.set("Cross-Origin-Embedder-Policy", "require-corp");
  newResponse.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  
  // 强缓存策略，缓解慢速网络问题
  newResponse.headers.set("Cache-Control", "public, max-age=31536000");
  
  return newResponse;
}
