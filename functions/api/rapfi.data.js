export async function onRequest(context) {
  const githubUrl = "https://github.com/wioyanwei/gomoku-calculator/releases/download/v1.0/rapfi.data";
  
  const response = await fetch(githubUrl, {
    redirect: 'follow'
  });
  
  // 检查返回的内容类型，如果 GitHub 返回了 HTML（比如登录页或404页），直接报错拦截
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("text/html")) {
    return new Response("Error: GitHub returned an HTML page instead of the binary weights file. Check if the repo is public.", { status: 500 });
  }
  
  const newResponse = new Response(response.body, response);
  
  newResponse.headers.set("Access-Control-Allow-Origin", "*");
  newResponse.headers.set("Cross-Origin-Resource-Policy", "cross-origin");
  newResponse.headers.set("Cross-Origin-Embedder-Policy", "require-corp");
  newResponse.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  newResponse.headers.set("Cache-Control", "public, max-age=31536000");
  
  return newResponse;
}
