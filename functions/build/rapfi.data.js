export async function onRequest(context) {
  const githubUrl = "https://github.com/wioyanwei/gomoku-calculator/releases/download/v1.0/rapfi.data";
  
  // 让 Cloudflare 服务端去跟随重定向，把最终文件拉回来
  const response = await fetch(githubUrl, {
    redirect: 'follow'
  });
  
  const newResponse = new Response(response.body, response);
  
  // 加上所有必须的跨域和多线程头
  newResponse.headers.set("Access-Control-Allow-Origin", "*");
  newResponse.headers.set("Cross-Origin-Resource-Policy", "cross-origin");
  newResponse.headers.set("Cross-Origin-Embedder-Policy", "require-corp");
  newResponse.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  newResponse.headers.set("Cache-Control", "public, max-age=31536000");
  
  return newResponse;
}