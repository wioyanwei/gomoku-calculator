export async function onRequest(context) {
  // 请确保这个 URL 在无痕模式下可以直接下载文件
  const githubUrl = "https://github.com/wioyanwei/gomoku-calculator/releases/download/v1.0/rapfi.data";
  
  const response = await fetch(githubUrl, {
    redirect: 'follow'
  });
  
  // 如果 GitHub 返回 404 等错误，直接抛出，方便在 Network 面板排查
  if (!response.ok) {
    return new Response("Failed to fetch weights from GitHub", { status: response.status });
  }
  
  const newResponse = new Response(response.body, response);
  
  newResponse.headers.set("Access-Control-Allow-Origin", "*");
  newResponse.headers.set("Cross-Origin-Resource-Policy", "cross-origin");
  newResponse.headers.set("Cross-Origin-Embedder-Policy", "require-corp");
  newResponse.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  newResponse.headers.set("Cache-Control", "public, max-age=31536000");
  
  return newResponse;
}
