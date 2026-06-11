const DEFAULT_ALLOWED_ORIGIN = 'https://noctavianstudio.github.io';

function sendJson(response, status, body, origin) {
  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json');
  response.setHeader('Access-Control-Allow-Origin', origin);
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  response.end(JSON.stringify(body));
}

module.exports = async function handler(request, response) {
  const allowedOrigin = process.env.ALLOWED_ORIGIN || DEFAULT_ALLOWED_ORIGIN;

  if (request.method === 'OPTIONS') {
    sendJson(response, 200, { ok: true }, allowedOrigin);
    return;
  }

  if (request.method !== 'POST') {
    sendJson(response, 405, { error: 'Method not allowed' }, allowedOrigin);
    return;
  }

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER || 'noctavianstudio';
  const repo = process.env.GITHUB_REPO || 'fxsite_final';
  const password = process.env.ADMIN_SAVE_PASSWORD;

  if (!token || !password) {
    sendJson(response, 500, { error: 'Server is missing required secrets' }, allowedOrigin);
    return;
  }

  if (request.body.password !== password) {
    sendJson(response, 401, { error: 'Invalid publishing password' }, allowedOrigin);
    return;
  }

  if (typeof request.body.content !== 'string' || !request.body.content.includes('FX_TEXTILE_EXPORTED_CONTENT')) {
    sendJson(response, 400, { error: 'Invalid content payload' }, allowedOrigin);
    return;
  }

  const apiBase = `https://api.github.com/repos/${owner}/${repo}/contents/data.js`;
  const headers = {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'User-Agent': 'fx-textile-admin'
  };

  const currentResponse = await fetch(`${apiBase}?ref=main`, { headers });
  if (!currentResponse.ok) {
    sendJson(response, 502, { error: 'Could not read current data.js from GitHub' }, allowedOrigin);
    return;
  }

  const current = await currentResponse.json();
  const encodedContent = Buffer.from(request.body.content, 'utf8').toString('base64');
  const updateResponse = await fetch(apiBase, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      message: request.body.message || 'Update site content',
      content: encodedContent,
      sha: current.sha,
      branch: 'main'
    })
  });

  const result = await updateResponse.json().catch(() => ({}));
  if (!updateResponse.ok) {
    sendJson(response, 502, { error: result.message || 'GitHub update failed' }, allowedOrigin);
    return;
  }

  sendJson(response, 200, {
    ok: true,
    commit: result.commit && result.commit.html_url
  }, allowedOrigin);
};
